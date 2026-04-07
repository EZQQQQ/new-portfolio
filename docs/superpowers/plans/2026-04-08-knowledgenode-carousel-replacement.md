# KnowledgeNode Carousel Replacement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all WebGL-based carousels on the KnowledgeNode project page with native high-fidelity rendering: Embla carousel for Q&A, overlapping two-image sidebars for Assessment and Chat, and an external iframe for the video.

**Architecture:** A new `EmblaCarousel` component is created in `app/components/embla-carousel/` using `embla-carousel-react`. The KnowledgeNode page JSX and CSS are updated to remove all `Carousel` usage, restore the original overlapping two-image sidebar pattern for §3 and §7, replace the Q&A section with `EmblaCarousel`, and swap the local video for a responsive iframe. The WebGL `Carousel` component is left untouched — it is merely no longer imported from this page.

**Tech Stack:** React 18, Remix, `embla-carousel-react`, CSS Modules, Lightning CSS (via Vite), macOS `sips`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `app/components/embla-carousel/embla-carousel.jsx` | Create | Embla carousel component with dots + arrows |
| `app/components/embla-carousel/embla-carousel.module.css` | Create | Styles for embla wrapper, slides, controls |
| `app/components/embla-carousel/index.js` | Create | Re-export `EmblaCarousel` |
| `app/routes/projects.knowledgenode/knowledgenode.jsx` | Modify | Remove old imports/sections, add new JSX |
| `app/routes/projects.knowledgenode/knowledgenode.module.css` | Modify | Remove `.sidebarCarousel`, restore `.sidebarImages`/`.sidebarImage`, add `.videoWrapper` |
| `package.json` | Modify | Add `embla-carousel-react` dependency |

---

## Task 1: Install `embla-carousel-react`

**Files:**
- Modify: `package.json`

This is a pure dependency install — no tests required for package installation.

- [ ] **Step 1: Install the package**

```bash
npm install embla-carousel-react
```

- [ ] **Step 2: Verify it appears in `package.json` dependencies**

```bash
grep embla package.json
```

Expected output includes a line like `"embla-carousel-react": "^8.x.x"`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add embla-carousel-react dependency"
```

---

## Task 2: Create the `EmblaCarousel` component

**Files:**
- Create: `app/components/embla-carousel/embla-carousel.jsx`
- Create: `app/components/embla-carousel/embla-carousel.module.css`
- Create: `app/components/embla-carousel/index.js`

**Background:** This project uses React 18 with CSS Modules. The existing `Image` component is at `~/components/image` and accepts `srcSet`, `placeholder`, and `alt` props. It does blur-up placeholder behaviour internally. CSS nesting (`& child {}`) is supported natively via Vite's Lightning CSS — no PostCSS plugin needed.

**No automated tests exist for UI components in this codebase** — visual verification in the browser is the standard. Skip the TDD steps for JSX/CSS files and verify visually after Task 3.

- [ ] **Step 1: Create `app/components/embla-carousel/embla-carousel.jsx`**

```jsx
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { Image } from '~/components/image';
import styles from './embla-carousel.module.css';

export const EmblaCarousel = ({ images, placeholder }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {images.map((image, index) => (
            <div className={styles.embla__slide} key={index}>
              <Image
                srcSet={image.srcSet}
                placeholder={index === 0 ? placeholder : image.placeholder}
                alt={image.alt}
                sizes="(max-width: 768px) 100vw, 940px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <button
          className={`${styles.embla__button} ${styles['embla__button--prev']}`}
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.embla__dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.embla__dot}${index === selectedIndex ? ` ${styles['embla__dot--selected']}` : ''}`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          className={`${styles.embla__button} ${styles['embla__button--next']}`}
          onClick={scrollNext}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Create `app/components/embla-carousel/embla-carousel.module.css`**

```css
.embla {
  overflow: hidden;
  width: 100%;
}

.embla__viewport {
  overflow: hidden;
  width: 100%;
  cursor: default;
}

.embla__container {
  display: flex;
  touch-action: pan-y;
}

.embla__slide {
  flex: 0 0 100%;
  min-width: 0;

  & img,
  & video {
    width: 100%;
    height: auto;
    display: block;
  }
}

.embla__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
}

.embla__dots {
  display: flex;
  gap: 8px;
  align-items: center;
}

.embla__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: background 0.2s ease;
}

.embla__dot--selected {
  background: var(--primary);
}

.embla__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgb(var(--rgbPrimary) / 0.4);
  background: var(--background);
  color: var(--primary);
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--primary);
  }

  & svg {
    width: 16px;
    height: 16px;
  }
}
```

- [ ] **Step 3: Create `app/components/embla-carousel/index.js`**

```js
export { EmblaCarousel } from './embla-carousel';
```

- [ ] **Step 4: Commit**

```bash
git add app/components/embla-carousel/
git commit -m "feat: add EmblaCarousel component with dots and arrow navigation"
```

---

## Task 3: Update `knowledgenode.module.css`

**Files:**
- Modify: `app/routes/projects.knowledgenode/knowledgenode.module.css`

**Background:** The current CSS file has `.sidebarCarousel` (flex-based sidebar) but is missing `.sidebarImages` and `.sidebarImage` (grid-based overlapping layout). The spec requires removing `.sidebarCarousel` and restoring the two grid classes, plus adding the new `.videoWrapper`.

The current file content is:
```css
.columns { margin: 20px 0 60px; }
.grid { ... }
.gridImage { ... }
.gridBackground { ... }
.gridForeground { ... }
.gridText { ... }
.sidebarCarousel { ... }  ← REMOVE THIS
```

- [ ] **Step 1: Open `app/routes/projects.knowledgenode/knowledgenode.module.css` and replace `.sidebarCarousel` with `.sidebarImages`, `.sidebarImage`, and `.videoWrapper`**

Remove the entire `.sidebarCarousel` block:
```css
.sidebarCarousel {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (--mediaTablet) {
    justify-content: center;
    padding: 0 80px;
    margin-top: 60px;
  }

  @media (--mediaMobile) {
    padding: 0 20px;
    margin-top: 40px;
  }
}
```

Replace it with these three blocks appended at the end of the file:
```css
.sidebarImages {
  display: grid;
  grid-template-columns: repeat(6, [col] 1fr);
  align-items: center;

  @media (--mediaTablet) {
    padding: 0 80px;
    margin-top: 60px;
  }

  @media (--mediaMobile) {
    padding: 0 20px;
    margin-top: 40px;
  }
}

.sidebarImage {
  &:first-child {
    grid-column: col 1 / span 4;
    grid-row: 1;
    position: relative;
    top: 5%;
    opacity: 0.4;
  }

  &:last-child {
    grid-column: col 3 / span 4;
    grid-row: 1;
    position: relative;
    top: -5%;
  }
}

.videoWrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
}
```

- [ ] **Step 2: Verify the file looks correct (no `.sidebarCarousel` remains)**

```bash
grep -n "sidebarCarousel\|sidebarImages\|sidebarImage\|videoWrapper" app/routes/projects.knowledgenode/knowledgenode.module.css
```

Expected: only `sidebarImages`, `sidebarImage`, `videoWrapper` appear — no `sidebarCarousel`.

- [ ] **Step 3: Commit**

```bash
git add app/routes/projects.knowledgenode/knowledgenode.module.css
git commit -m "feat: update knowledgenode CSS — remove sidebarCarousel, restore sidebarImages/sidebarImage, add videoWrapper"
```

---

## Task 4: Update `knowledgenode.jsx` — imports and all sections

**Files:**
- Modify: `app/routes/projects.knowledgenode/knowledgenode.jsx`

**Background:** This is the main page file. The current state (after the previous carousel implementation) imports many assets and the WebGL `Carousel` component. The spec requires removing unused imports, adding `EmblaCarousel`, and updating three sections (§3 Assessment, §6 Q&A, §7 Chat, §8 Video).

Do all four changes in one task to keep the file consistent — a partially-updated file that references removed imports would fail to build.

**Current import block to reference:** The file currently imports `knowledgeNodeAssessmentTask`, `knowledgeNodeOnboarding`, `knowledgeNodeAskQuestion`, `knowledgeNodeAnswer`, `knowledgeNodeChatFilter`, `knowledgeNodeReportedContent`, `knowledgeNodeDemo`, `knowledgeNodeDemoPlaceholder`, and `{ Carousel }` — all of which must be removed.

- [ ] **Step 1: Remove unused asset imports**

Open `app/routes/projects.knowledgenode/knowledgenode.jsx`.

Remove these import lines (they are no longer used after this change):
```js
import knowledgeNodeAskQuestion from '~/assets/knowledgenode-ask-question.jpg';
import knowledgeNodeAskQuestionLarge from '~/assets/knowledgenode-ask-question-large.jpg';
import knowledgeNodeAskQuestionPlaceholder from '~/assets/knowledgenode-ask-question-placeholder.jpg';
import knowledgeNodeAnswer from '~/assets/knowledgenode-answer.jpg';
import knowledgeNodeAnswerLarge from '~/assets/knowledgenode-answer-large.jpg';
import knowledgeNodeAnswerPlaceholder from '~/assets/knowledgenode-answer-placeholder.jpg';
// Assessment task modal
import knowledgeNodeAssessmentTask from '~/assets/knowledgenode-assessment-task.jpg';
import knowledgeNodeAssessmentTaskLarge from '~/assets/knowledgenode-assessment-task-large.jpg';
import knowledgeNodeAssessmentTaskPlaceholder from '~/assets/knowledgenode-assessment-task-placeholder.jpg';
// Onboarding modal
import knowledgeNodeOnboarding from '~/assets/knowledgenode-onboarding.jpg';
import knowledgeNodeOnboardingLarge from '~/assets/knowledgenode-onboarding-large.jpg';
import knowledgeNodeOnboardingPlaceholder from '~/assets/knowledgenode-onboarding-placeholder.jpg';
// Demo video
import knowledgeNodeDemo from '~/assets/knowledgenode-demo.mp4';
import knowledgeNodeDemoPlaceholder from '~/assets/knowledgenode-demo-placeholder.jpg';
// Chat filter and reported content
import knowledgeNodeChatFilter from '~/assets/knowledgenode-chat-filter.jpg';
import knowledgeNodeChatFilterLarge from '~/assets/knowledgenode-chat-filter-large.jpg';
import knowledgeNodeChatFilterPlaceholder from '~/assets/knowledgenode-chat-filter-placeholder.jpg';
import knowledgeNodeReportedContent from '~/assets/knowledgenode-reported-content.jpg';
import knowledgeNodeReportedContentLarge from '~/assets/knowledgenode-reported-content-large.jpg';
import knowledgeNodeReportedContentPlaceholder from '~/assets/knowledgenode-reported-content-placeholder.jpg';
```

- [ ] **Step 2: Replace `{ Carousel }` import with `{ EmblaCarousel }`**

Remove:
```js
import { Carousel } from '~/components/carousel';
```

Add (in the component imports section, after the existing `import { Footer }` line or alongside it):
```js
import { EmblaCarousel } from '~/components/embla-carousel';
```

- [ ] **Step 3: Update §3 Assessment — replace Carousel with overlapping two-image sidebar**

Find the `{/* Section 2: assessment Interfaces */}` block. It currently has:
```jsx
<div className={styles.sidebarCarousel}>
  <Carousel
    width={350}
    height={750}
    placeholder={knowledgeNodeAssessmentProfessorPlaceholder}
    images={[...]}
  />
</div>
```

Replace the entire `<div className={styles.sidebarCarousel}>…</div>` block with:
```jsx
<div className={styles.sidebarImages}>
  <Image
    className={styles.sidebarImage}
    srcSet={`${knowledgeNodeAssessmentProfessor} 350w, ${knowledgeNodeAssessmentProfessorLarge} 700w`}
    width={350}
    height={750}
    placeholder={knowledgeNodeAssessmentProfessorPlaceholder}
    alt="Professor interface of KnowledgeNode"
    sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
  />
  <Image
    className={styles.sidebarImage}
    srcSet={`${knowledgeNodeAssessmentStudent} 350w, ${knowledgeNodeAssessmentStudentLarge} 700w`}
    width={350}
    height={750}
    placeholder={knowledgeNodeAssessmentStudentPlaceholder}
    alt="Student interface of KnowledgeNode"
    sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
  />
</div>
```

- [ ] **Step 4: Update §6 Q&A — replace 5-slide Carousel with 3-slide EmblaCarousel**

Find the `{/* Section 5: Engage and Inquire */}` block. It currently has:
```jsx
<Carousel
  width={940}
  height={560}
  placeholder={knowledgeNodeQuestionsPlaceholder}
  images={[...5 slides...]}
/>
```

Replace the entire `<Carousel …/>` element with:
```jsx
<EmblaCarousel
  placeholder={knowledgeNodeQuestionsPlaceholder}
  images={[
    {
      srcSet: `${knowledgeNodeQuestions} 940w, ${knowledgeNodeQuestionsLarge} 1880w`,
      placeholder: knowledgeNodeQuestionsPlaceholder,
      alt: 'Question feed on KnowledgeNode',
    },
    {
      srcSet: `${knowledgeNodeSearchPoll} 940w, ${knowledgeNodeSearchPollLarge} 1880w`,
      placeholder: knowledgeNodeSearchPollPlaceholder,
      alt: 'Search results with poll voting',
    },
    {
      srcSet: `${knowledgeNodeBookmarks} 940w, ${knowledgeNodeBookmarksLarge} 1880w`,
      placeholder: knowledgeNodeBookmarksPlaceholder,
      alt: 'Bookmarked questions with embedded PDF viewer',
    },
  ]}
/>
```

- [ ] **Step 5: Update §7 Chat — replace 4-slide Carousel with overlapping two-image sidebar**

Find the `{/* Section 7: Real-time Community Chat */}` block. It currently has:
```jsx
<ProjectSection padding="top" light>
  <ProjectSectionColumns centered className={styles.columns}>
    <div className={styles.imagesText}>
      ...heading and text...
    </div>
    <div className={styles.sidebarCarousel}>
      <Carousel width={350} height={650} .../>
    </div>
  </ProjectSectionColumns>
</ProjectSection>
```

Replace the entire `<div className={styles.sidebarCarousel}>…</div>` block with:
```jsx
<div className={styles.sidebarImages}>
  <Image
    className={styles.sidebarImage}
    srcSet={`${knowledgeNodeChatLive} 491w, ${knowledgeNodeChatLiveLarge} 981w`}
    width={491}
    height={700}
    placeholder={knowledgeNodeChatLivePlaceholder}
    alt="Real-time community chat between two users"
    sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
  />
  <Image
    className={styles.sidebarImage}
    srcSet={`${knowledgeNodeNotifications} 550w, ${knowledgeNodeNotificationsLarge} 1099w`}
    width={550}
    height={700}
    placeholder={knowledgeNodeNotificationsPlaceholder}
    alt="Real-time notifications drawer with reply alerts"
    sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
  />
</div>
```

- [ ] **Step 6: Update §8 Video — replace local ProjectImage video with responsive iframe**

Find the `{/* Section 8: Full demo video */}` block. It currently has:
```jsx
<ProjectSection padding="top">
  <ProjectSectionContent>
    <ProjectTextRow>
      <ProjectSectionHeading>See it all in action</ProjectSectionHeading>
      <ProjectSectionText>
        A complete walkthrough of KnowledgeNode...
      </ProjectSectionText>
    </ProjectTextRow>
    <ProjectImage
      src={knowledgeNodeDemo}
      width={1920}
      height={1080}
      placeholder={knowledgeNodeDemoPlaceholder}
      alt="KnowledgeNode full feature walkthrough video"
      reveal
      delay={300}
    />
  </ProjectSectionContent>
</ProjectSection>
```

Replace the entire `<ProjectSection padding="top">` block (the §8 video section only) with:
```jsx
<ProjectSection padding="top">
  <ProjectSectionContent>
    <ProjectTextRow>
      <ProjectSectionHeading>See it all in action</ProjectSectionHeading>
      <ProjectSectionText>
        A complete walkthrough of KnowledgeNode — from registration and community
        creation through to real-time assessment collaboration, Q&amp;A, and chat.
      </ProjectSectionText>
    </ProjectTextRow>
    <div className={styles.videoWrapper}>
      <iframe
        src="EMBED_URL_HERE"
        title="KnowledgeNode full feature walkthrough"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  </ProjectSectionContent>
</ProjectSection>
```

**Note:** Leave `src="EMBED_URL_HERE"` as the placeholder — the video embed URL is a user prerequisite that hasn't been provided yet. The iframe will render as an empty frame until the URL is filled in.

- [ ] **Step 7: Verify the build compiles with no errors**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds with no errors. If there are "is not defined" errors, a removed import was still referenced — find and fix.

- [ ] **Step 8: Commit**

```bash
git add app/routes/projects.knowledgenode/knowledgenode.jsx
git commit -m "feat: replace WebGL carousels with EmblaCarousel (Q&A), static sidebars (Assessment/Chat), and iframe video placeholder"
```

---

## Task 5: Visual verification

**No files to modify** — this task verifies the implementation in the browser.

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Navigate to the KnowledgeNode page**

Open `http://localhost:5173/projects/knowledgenode` (or whatever port the dev server reports).

- [ ] **Step 3: Verify each section**

Check the following, fixing any issues before proceeding:

| Section | What to check |
|---------|--------------|
| §3 Assessment | Two images overlap with CSS grid (first image behind at opacity 0.4, second in front). No carousel UI. |
| §6 Q&A | Embla carousel renders with 3 slides. Arrow buttons visible on both sides. Dot indicators below. Clicking arrows advances slides. Images display at natural aspect ratio (no stretching). Cursor is `default` (no grabbing hand). |
| §7 Chat | Two images overlap, same pattern as §3. No carousel UI. |
| §8 Video | Blank iframe container visible at 16:9 ratio. No broken video element. |

- [ ] **Step 4: Check browser console for errors**

Open DevTools → Console. There should be no errors.

- [ ] **Step 5: Commit any fixes**

If you made small fixes during verification, commit them:
```bash
git add -p
git commit -m "fix: visual verification corrections"
```

---

## Out of Scope

- Video embed URL replacement — requires user to upload `Timeline 1.mov` to Vimeo/YouTube first and provide the URL
- Mobile layout testing beyond what Embla and the existing CSS handle
- Deleting unused asset files (`knowledgenode-demo.mp4`, `knowledgenode-assessment-task.jpg`, etc.) — harmless to leave in place
- Any changes to §1 Landing hero, §4 Explore, §5 Profile, Header, or Footer
