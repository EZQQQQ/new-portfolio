# KnowledgeNode — Carousel Replacement Design

**Date:** 2026-04-08
**Status:** Draft
**Goal:** Replace all WebGL-based carousels on the KnowledgeNode project page with high-quality native rendering. Prioritise image fidelity and clean UX over feature breadth — the video covers everything else.

---

## 1. Context and Root Cause

Three problems were identified with the previous implementation:

1. **Aspect ratio distortion** — The Q&A carousel forced five screenshots with wildly inconsistent aspect ratios (from 2.7:1 panoramic to 1.07:1 near-square) into a fixed 940×560 WebGL canvas, stretching or cropping each image.
2. **WebGL texture blur** — Three.js texture sampling degrades image sharpness regardless of source file resolution.
3. **Poor cursor UX** — The grabbing-hand drag cursor felt heavy; the shader transition animation was distracting.
4. **Video quality loss** — The original 257 MB `.mov` was re-encoded to 13 MB (720p CRF 28) to fit Cloudflare Pages' 25 MB per-file limit.

**Decision:** Only screenshots with consistent, clean landscape aspect ratios are kept. All others are dropped — the demo video covers the full feature set. The WebGL `Carousel` component is removed from this page entirely (it is not used anywhere else in the codebase).

---

## 2. Final Page Structure

| # | Section | Change |
|---|---------|--------|
| 1 | Header | Unchanged |
| 2 | Landing hero | Unchanged |
| 3 | Bringing it together (Assessment) | REVERT — restore original overlapping two-image sidebar |
| 4 | Enhancing course engagement (Explore) | Unchanged |
| 5 | Meaningful details (Profile) | Unchanged |
| 6 | Engage and Inquire (Q&A) | REPLACE — WebGL Carousel → EmblaCarousel, 3 curated slides |
| 7 | Always connected (Chat) | SIMPLIFY — overlapping two-image sidebar, same pattern as §3 |
| 8 | See it all in action (Video) | REPLACE — local `.mp4` → responsive external video iframe |
| — | Footer | Unchanged |

---

## 3. Section-by-Section Specification

### §3 — Bringing it together (Assessment) — REVERT to original

Restore the original overlapping two-image sidebar exactly as it existed before the carousel was introduced.

**Layout:** `<ProjectSectionColumns centered className={styles.columns}>` — text left (`styles.imagesText`), images right (`styles.sidebarImages`).

Note: `styles.imagesText` is a pre-existing class name used in the JSX but not defined in any CSS file — this is a pre-existing gap in the codebase. The text renders correctly through the project layout component's own styles. Do not add a definition for it.

**Pre-existing asset note:** The assessment `-large` files (`knowledgenode-assessment-professor-large.jpg` at 318×615 and `knowledgenode-assessment-student-large.jpg` at 320×480) are identical in dimensions to their base counterparts — no genuine high-DPI variant exists. The `width`/`height` props (`350×750`) also do not match the actual file dimensions (318×615 and 320×480); they were the original developer's display-intent values. Both are pre-existing conditions in the codebase. This revert restores the exact original JSX as it existed before our carousel changes — do not attempt to fix these pre-existing values, as doing so is out of scope and would cause unintended visual changes to the layout.

**Full JSX for the images div (exact revert of original):**
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

No new assets required — both already exist in `app/assets/`.

---

### §6 — Engage and Inquire (Q&A) — EmblaCarousel, 3 slides

Replace the WebGL `<Carousel>` with the new `<EmblaCarousel>` component.

**Why 3 slides, not 5:** The five processed screenshots have incompatible aspect ratios. `ask-question.jpg` is 940×875 (near-square) and `answer.jpg` is 940×350 (2.7:1 panoramic). Forcing these into any fixed-height container would letterbox them severely or crop content. The three remaining images share a consistent landscape ratio (~1.82–2.08:1) and display cleanly at full quality with no distortion.

**Slides (in order):**

| Slide | srcSet | Alt |
|-------|--------|-----|
| 1 | `knowledgeNodeQuestions 940w, knowledgeNodeQuestionsLarge 1880w` | Question feed on KnowledgeNode |
| 2 | `knowledgeNodeSearchPoll 940w, knowledgeNodeSearchPollLarge 1880w` | Search results with poll voting |
| 3 | `knowledgeNodeBookmarks 940w, knowledgeNodeBookmarksLarge 1880w` | Bookmarked questions with embedded PDF viewer |

**Top-level `placeholder`:** `knowledgeNodeQuestionsPlaceholder` (first slide).

**Component usage:**
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

---

### §7 — Always connected (Chat) — overlapping two-image sidebar

Replace the chat carousel with the same overlapping two-image sidebar pattern used by §3 Assessment. The chat screenshots are portrait (491–550px wide, 700px tall) — the same portrait shape as the assessment screenshots — so the overlapping grid pattern fits naturally.

**Layout:** `<ProjectSection padding="top" light>` → `<ProjectSectionColumns centered className={styles.columns}>` — text left (`styles.imagesText`), images right (`styles.sidebarImages`).

**Declared dimensions:** Use the actual pixel dimensions of each file for the `width`/`height` props (which tell the browser the intrinsic aspect ratio for resource loading). The CSS grid controls the rendered size on screen — both images will be displayed at comparable widths within their 4/6-column slots regardless of declared dimensions.

**Full JSX for the images div:**
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

Note: `knowledgeNodeChatLiveLarge` is 981×1400 and `knowledgeNodeNotificationsLarge` is 1099×1400 — these are the actual large-variant dimensions from the previous asset processing run.

Assets already exist in `app/assets/` from the previous processing run.

---

### §8 — See it all in action (Video) — external iframe

The local `.mp4` was compressed from 257 MB to 13 MB to fit Cloudflare Pages' 25 MB file limit, causing visible quality loss. The fix is to host the video externally and embed it via iframe.

**Recommended platform:** Vimeo (free tier — up to 500 MB/week, 1080p streaming, clean embeds with no ads or recommended-video overlays, suitable for a recruiter portfolio).

**Prerequisite (user action required before implementation):** Upload `Timeline 1.mov` to Vimeo (or YouTube unlisted) and obtain the embed URL. Provide this URL before implementation of this section.

**Layout:** `<ProjectSection padding="top">` → `<ProjectSectionContent>` → `<ProjectTextRow>` (heading + subtext) → `<div className={styles.videoWrapper}>` → `<iframe>`.

**Heading:** "See it all in action"

**Copy:** "A complete walkthrough of KnowledgeNode — from registration and community creation through to real-time assessment collaboration, Q&A, and chat."

**JSX:**
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

---

## 4. New Component: EmblaCarousel

**Location:** `app/components/embla-carousel/`

**Files:**
- `embla-carousel.jsx`
- `embla-carousel.module.css`
- `index.js` — contents: `export { EmblaCarousel } from './embla-carousel';`

**Dependency:** `embla-carousel-react` — install via `npm install embla-carousel-react`.

**Props:**
```jsx
EmblaCarousel({
  images: Array<{ srcSet: string, placeholder: string, alt: string }>,
  placeholder: string,  // first slide placeholder for initial load
})
```

**Behaviour:**
- `useEmblaCarousel({ loop: true })` — loops seamlessly
- `cursor: default` always — no grab/grabbing cursor at any point
- Each slide renders the project's existing `Image` component (`~/components/image`) with `srcSet`, `placeholder`, and `alt` — preserving blur-up placeholder behaviour
- Images display at their **natural aspect ratio** (`width: 100%; height: auto`) — no forced canvas, no distortion, no letterboxing
- Prev/next arrow buttons: subtle SVG chevrons, visible always (not hover-only), styled to the site's dark theme using CSS custom properties already present in the codebase (`--primary`, `--background`, etc.)
- Dot indicators below the slides: one dot per slide, active dot highlighted. Track selected index with `useState`. On mount and on every `"select"` event from the Embla API, call `emblaApi.selectedScrollSnap()` to get the current index and update state. Apply `styles['embla__dot--selected']` to the dot at the active index.
- Transition: Embla's default CSS-based sliding transition — no shader effects

**CSS structure:**
```
.embla            — outer wrapper, overflow: hidden
.embla__viewport  — embla ref target
.embla__container — display: flex (Embla manages transform)
.embla__slide     — flex: 0 0 100%; min-width: 0
.embla__controls  — flex row wrapping dots and arrows
.embla__dots      — dot container
.embla__dot       — individual dot (small circle, outlined)
.embla__dot--selected — filled/highlighted dot
.embla__button    — arrow button base
.embla__button--prev / .embla__button--next — directional variants
```

---

## 5. CSS Changes to `knowledgenode.module.css`

| Class | Action | Reason |
|-------|--------|--------|
| `.sidebarCarousel` | **Remove** | No longer used — sidebar carousels replaced with static images |
| `.sidebarImages` | **Add back** | Required for overlapping two-image layout in §3 and §7 |
| `.sidebarImage` | **Add back** | Required for individual image positioning within `.sidebarImages` grid |
| `.videoWrapper` | **Add new** | 16:9 responsive iframe container |

**`.sidebarImages`** (restore):
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
```

**`.sidebarImage`** (restore):
```css
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
```

**`.videoWrapper`** (new):

Note: CSS nesting (`& iframe {}`) is used throughout this codebase and resolves via native CSS support in modern browsers (Vite processes it with Lightning CSS — no PostCSS nesting plugin is required).

```css
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

---

## 6. Import Cleanup in `knowledgenode.jsx`

**Remove (no longer used):**
- `import { Carousel } from '~/components/carousel'`
- `knowledgeNodeAssessmentTask` / `Large` / `Placeholder`
- `knowledgeNodeOnboarding` / `Large` / `Placeholder`
- `knowledgeNodeAskQuestion` / `Large` / `Placeholder`
- `knowledgeNodeAnswer` / `Large` / `Placeholder`
- `knowledgeNodeChatFilter` / `Large` / `Placeholder`
- `knowledgeNodeReportedContent` / `Large` / `Placeholder`
- `knowledgeNodeDemo` (the `.mp4`)
- `knowledgeNodeDemoPlaceholder`

**Add:**
- `import { EmblaCarousel } from '~/components/embla-carousel'`

**Retain (unchanged):**
- All landing page, background, explore, profile images
- `knowledgeNodeAssessmentProfessor` / `Large` / `Placeholder`
- `knowledgeNodeAssessmentStudent` / `Large` / `Placeholder`
- `knowledgeNodeQuestions` / `knowledgeNodeQuestionsPlaceholder` / `knowledgeNodeQuestionsLarge` (Q&A slide 1)
- `knowledgeNodeSearchPoll` / `Large` / `Placeholder` (Q&A slide 2)
- `knowledgeNodeBookmarks` / `Large` / `Placeholder` (Q&A slide 3)
- `knowledgeNodeChatLive` / `Large` / `Placeholder` (Chat image 1)
- `knowledgeNodeNotifications` / `Large` / `Placeholder` (Chat image 2)

---

## 7. Files Modified / Created

| File | Action |
|------|--------|
| `app/components/embla-carousel/embla-carousel.jsx` | **Create** |
| `app/components/embla-carousel/embla-carousel.module.css` | **Create** |
| `app/components/embla-carousel/index.js` | **Create** |
| `app/routes/projects.knowledgenode/knowledgenode.jsx` | **Modify** |
| `app/routes/projects.knowledgenode/knowledgenode.module.css` | **Modify** |
| `package.json` | **Modify** (add `embla-carousel-react`) |

The WebGL `Carousel` component (`app/components/carousel/`) is **not deleted** — it is no longer imported from this page but may be used in future.

---

## 8. Out of Scope

- Any changes to §1 Landing hero, §4 Explore, §5 Profile, §1 Header, or Footer
- Re-processing screenshot assets — existing files are sufficient; quality issues were caused by WebGL rendering, not file resolution
- Replacing the WebGL Carousel on other pages (none currently use it)
- Mobile-specific layout changes beyond what Embla and the existing CSS handle
- Deleting the processed but now-unused asset files from `app/assets/` (harmless, low priority)
