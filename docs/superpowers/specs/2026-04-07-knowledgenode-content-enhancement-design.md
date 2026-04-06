# KnowledgeNode Page — Content Enhancement Design

**Date:** 2026-04-07
**Status:** Approved
**Goal:** Add curated screenshots and a full demo video to the KnowledgeNode project page in a way that is visually impactful, non-intrusive, and consistent with the existing site aesthetic at `https://ezekielloh.pages.dev/projects/knowledgenode`.

---

## 1. Context

The KnowledgeNode project page currently has 5 content sections displaying static images. The owner has provided 19 feature demo videos and ~50 screenshots. The goal is to enrich the page for a **recruiter audience** — curating the highest-impact content only, not documenting every feature.

**Decisions made:**
- Primary video: `Timeline 1.mov` (comprehensive walkthrough) — placed as the page finale
- Screenshots: curated set, grouped by feature, presented as swipeable carousels within relevant sections
- Technical content (architecture diagrams, ERD, API testing, usability docs) omitted — too technical for recruiter focus
- Two new sections added: Real-time Chat and Video Demo

---

## 2. Final Page Structure

| # | Section | Change |
|---|---------|--------|
| 1 | Header | Unchanged |
| 2 | Landing hero screenshot | Unchanged |
| 3 | Bringing it together (Assessment) | Sidebar images → 4-slide Carousel |
| 4 | Enhancing course engagement (Explore) | Unchanged |
| 5 | Meaningful details (Profile) | Unchanged |
| 6 | Engage and Inquire (Q&A) | Single image → 5-slide Carousel |
| 7 | Real-time Community Chat *(new)* | Two-column section with 4-slide Carousel |
| 8 | See it all in action *(new)* | Full-width video player (Timeline 1.mov) |
| — | Footer | Unchanged |

---

## 3. Section-by-Section Specification

### §3 — Bringing it together (Assessment) — carousel upgrade

**Layout:** Unchanged two-column (text left, images right). The two static `<Image>` components in `.sidebarImages` are replaced by a single `<Carousel>`.

**Carousel dimensions:** `width={350}` `height={750}` (matches existing sidebar image dimensions)

**Slides (in order):**

| Slide | Source file | Alt text |
|-------|-------------|----------|
| 1 | `knowledgenode-assessment-professor.jpg` | Professor interface of KnowledgeNode |
| 2 | `knowledgenode-assessment-student.jpg` | Student interface of KnowledgeNode |
| 3 | `knowledgenode-assessment-task.jpg` | Add Assessment Task modal |
| 4 | `knowledgenode-onboarding.jpg` | Professor onboarding features walkthrough |

**Source screenshots:**
- Slide 3: `Screenshot 2025-03-17 at 4.02.36 AM.png`
- Slide 4: `Screenshot 2025-03-16 at 4.34.43 AM.png`

---

### §6 — Engage and Inquire (Q&A) — carousel upgrade

**Layout:** Existing `<ProjectTextRow>` (heading + text) stays. The single `<Image src={knowledgeNodeQuestions} ...>` is replaced by a `<Carousel>`.

**Carousel dimensions:** `width={940}` `height={560}`

**Slides (in order):**

| Slide | Source file | Alt text |
|-------|-------------|----------|
| 1 | `knowledgenode-questions.jpg` | Question feed on KnowledgeNode (existing asset) |
| 2 | `knowledgenode-ask-question.jpg` | Ask a public question form with rich text editor |
| 3 | `knowledgenode-answer.jpg` | Answering a question — split view interface |
| 4 | `knowledgenode-search-poll.jpg` | Search results with poll voting |
| 5 | `knowledgenode-bookmarks.jpg` | Bookmarked questions with embedded PDF viewer |

**Source screenshots:**
- Slide 2: `Screenshot 2025-03-16 at 4.43.19 AM.png`
- Slide 3: `Screenshot 2025-03-16 at 6.31.42 PM.png`
- Slide 4: `Screenshot 2025-03-16 at 7.33.41 PM.png`
- Slide 5: `Screenshot 2025-03-16 at 7.46.38 PM.png`

---

### §7 — Real-time Community Chat *(new section)*

**Placement:** After §6 Engage and Inquire, before §8 Video. Uses `light` prop for visual contrast break.

**Layout:** `<ProjectSectionColumns centered>` — text left, Carousel right. Mirrors the existing Assessment section pattern exactly.

**Heading:** "Always connected"

**Copy:**
> KnowledgeNode features WebSocket-powered real-time chat within every community. Messages are anonymised after 24 hours, keeping discussions focused while protecting student privacy. A built-in profanity filter and an admin moderation panel allow professors to maintain a safe learning environment.

**Carousel dimensions:** `width={350}` `height={650}`

**Slides (in order):**

| Slide | Source file | Alt text |
|-------|-------------|----------|
| 1 | `knowledgenode-chat-live.jpg` | Real-time community chat between two users |
| 2 | `knowledgenode-chat-filter.jpg` | Profanity filter blocking an inappropriate message |
| 3 | `knowledgenode-reported-content.jpg` | Admin moderation view for reported content |
| 4 | `knowledgenode-notifications.jpg` | Real-time notifications drawer with reply alerts |

**Source screenshots:**
- Slide 1: `Screenshot 2025-03-17 at 5.14.25 AM.png`
- Slide 2: `Screenshot 2025-03-17 at 5.14.55 AM.png`
- Slide 3: `Screenshot 2025-03-16 at 7.19.05 PM.png`
- Slide 4: `Screenshot 2025-03-17 at 5.08.01 AM.png`

---

### §8 — See it all in action *(new section — video finale)*

**Placement:** After §7 Chat, immediately before `<Footer />`.

**Layout:** `<ProjectSectionContent>` containing a `<ProjectTextRow>` (heading + subtext) above a `<ProjectImage>` video player.

**Heading:** "See it all in action"

**Copy:**
> A complete walkthrough of KnowledgeNode — from registration and community creation through to real-time assessment collaboration, Q&A, and chat.

**Video asset:** `Timeline 1.mov` → converted to `knowledgenode-demo.mp4` via ffmpeg, placed in `app/assets/`

**`<ProjectImage>` props:** `noPauseButton={false}` (show play/pause), `reveal`, `delay={300}`

---

## 4. Asset Pipeline

All source files live on the local desktop/downloads. Each screenshot needs three output sizes following the existing convention:

| Variant | Suffix | Purpose |
|---------|--------|---------|
| Base | `knowledgenode-[name].jpg` | Standard resolution (~800–1000px wide) |
| Large | `knowledgenode-[name]-large.jpg` | 2× for hi-DPI (~1600–2000px wide) |
| Placeholder | `knowledgenode-[name]-placeholder.jpg` | Tiny blur, ~20px wide, base64-able |

**Commands (ffmpeg / sips):**

```bash
# Screenshot: resize + compress (sips on macOS)
sips -Z 1000 input.png --out output.jpg

# Placeholder: tiny blur
sips -Z 20 input.png --out placeholder.jpg

# Video: .mov → .mp4
ffmpeg -i "Timeline 1.mov" -vcodec h264 -acodec aac -crf 23 knowledgenode-demo.mp4
```

**Assets to produce (14 screenshot sets + 1 video):**

| Asset name | Source screenshot |
|------------|-------------------|
| `knowledgenode-assessment-task` | `Screenshot 2025-03-17 at 4.02.36 AM.png` |
| `knowledgenode-onboarding` | `Screenshot 2025-03-16 at 4.34.43 AM.png` |
| `knowledgenode-ask-question` | `Screenshot 2025-03-16 at 4.43.19 AM.png` |
| `knowledgenode-answer` | `Screenshot 2025-03-16 at 6.31.42 PM.png` |
| `knowledgenode-search-poll` | `Screenshot 2025-03-16 at 7.33.41 PM.png` |
| `knowledgenode-bookmarks` | `Screenshot 2025-03-16 at 7.46.38 PM.png` |
| `knowledgenode-chat-live` | `Screenshot 2025-03-17 at 5.14.25 AM.png` |
| `knowledgenode-chat-filter` | `Screenshot 2025-03-17 at 5.14.55 AM.png` |
| `knowledgenode-reported-content` | `Screenshot 2025-03-16 at 7.19.05 PM.png` |
| `knowledgenode-notifications` | `Screenshot 2025-03-17 at 5.08.01 AM.png` |
| `knowledgenode-demo.mp4` | `Timeline 1.mov` |

---

## 5. Component Usage

### Carousel
```jsx
import { Carousel } from '~/components/carousel';

<Carousel
  width={350}
  height={750}
  placeholder={knowledgeNodeAssessmentProfessorPlaceholder}
  images={[
    {
      srcSet: `${slide1} 350w, ${slide1Large} 700w`,
      placeholder: slide1Placeholder,
      alt: 'Alt text',
    },
    // ...
  ]}
/>
```

The `placeholder` prop on `<Carousel>` takes the first slide's placeholder for the initial load state.

### Video (ProjectImage)
```jsx
<ProjectImage
  src={knowledgeNodeDemo}
  width={1920}
  height={1080}
  placeholder={knowledgeNodeDemoPlaceholder}
  alt="KnowledgeNode full feature walkthrough video"
  reveal
  delay={300}
/>
```

The `<Image>` component auto-detects `.mp4` and renders a `<video>` element with autoplay, muted, loop, and a play/pause overlay.

---

## 6. Files Modified

| File | Change |
|------|--------|
| `app/routes/projects.knowledgenode/knowledgenode.jsx` | Add imports, replace Images with Carousels, add §7 and §8 sections |
| `app/assets/knowledgenode-*.jpg` | New asset files (10 screenshot sets × 3 sizes) |
| `app/assets/knowledgenode-demo.mp4` | New video asset |

No new components needed. No CSS changes needed. The `Carousel` and `Image`/`ProjectImage` components are already implemented and handle all rendering, WebGL fallback, and responsive behaviour.

---

## 7. Out of Scope

- Architecture diagrams, ERD, API testing screenshots, usability test plan, backend folder tree — omitted (too technical for recruiter audience)
- Other `.mov` feature clips — omitted (Timeline 1 covers everything)
- Any copy changes to existing sections §3–6 text
- Mobile-specific layout adjustments beyond what the existing carousel component handles
