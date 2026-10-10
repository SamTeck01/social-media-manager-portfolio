# Client Portfolio Website: Full Project Brief

Status: planning. No code yet. Next action is sending the content form (Part 7) to the client.

---

## 1. The Project

**Client:** a woman who works as a Social Media Manager, Content Creator (UGC) and Voice Actor.
**Goal:** a portfolio website she can use to pitch and land international brands.
**Client wishes:**
- Something in the style of designbyultra.figma.site
- Black and white with a gold accent
- Not flashy, "not too much"
- Hates stress, so the process should be simple for her
- Has paid in full

**Builder's goal (SamTeck):** a premium site that wows her and makes her come back for more website work. Build tool: Codex. Claude's role here is project manager and UI/UX designer, with the emphasis on UX.

**Success test, two reactions:**
1. A visitor thinks: "This woman is seriously good."
2. An international brand thinks: "I can confidently hire her."

The site is not a resume, not an agency site, and not a SaaS landing page. It is an editorial portfolio built around proof.

---

## 2. What Makes a Portfolio Win International Work

Findings from research and the earlier planning:
- Case studies with real numbers beat claims. Show results, not just deliverables.
- Fast load and mobile-first. Brand managers often look on phones.
- Testimonials placed near the decision points.
- One clear call to action per screen.
- Position her as one end-to-end operator: strategy, visuals and voice from one person. Do not present three unrelated freelancers.
- No fake logos, fake testimonials or fake numbers. Real client history builds the credibility.

---

## 3. The Two Reference Sites (reviewed from screenshots)

**DesignByUltra (what the client pointed to)**
- Dark near-black background with a restrained gold accent (one headline word, small labels, skill bars, one button)
- Photo-led hero, availability badge, stat cards
- Skill bars, six-card services grid, filterable project cards, numbered 4-step process, experience timeline, tools grid, testimonial carousel, dark contact form
- Verdict: clean and competent, but template DNA (skill bars, 01-02-03-04 process row, icon cards). Not truly premium.
- Note: the live site could not be fetched (it renders client-side), so this read comes from the screenshot.

**Baskeykoer (Framer, the premium benchmark)**
- Light warm-grey background, handwritten signature logo, large friendly serif greeting
- Minimal slash-style text nav (/About /Works /Gallery /Contact)
- Quiet timeline rows with generous whitespace, stacked 3D card fan of projects, small tools row
- Contact built as a fake iMessage chat
- Verdict: art-directed, restrained, human. This is the level of craft to match.

**Decision:** keep the content logic the client asked for, and execute it with Baskeykoer-level restraint and craft. Translate, don't merge.

---

## 4. Design Direction

**Locked**
- No chat UI. The iMessage contact idea is dropped. Contact is a simple, confident line, a clean inquiry form, an email address and a booking link.
- No glassmorphic floating nav, no pulsing "online now" dot, no marquee ticker, no fake chat widget, no skill bars, no icon-in-a-circle cards, no hover-lift-and-glow.
- Cards are allowed only where content needs a container (project and case-study units). They should be quiet: thin borders or whitespace separation.
- Editorial and asymmetric layout. Work section mixes compositions: one huge, one narrow, one vertical, one full-width.
- Gold is used sparingly: an ink, not a glow. For example one italic serif word in a headline, a hairline rule under section labels, a few small details.
- Typography does the premium work: a confident serif for headlines paired with a clean grotesk for body and UI.

**Open decision: base palette (needs a call before design starts)**
- The client asked for black, white and gold.
- Recommendation: a warm light base (bone/off-white around `#F7F5F1`, near-black ink around `#141311`) with gold as a thin accent, because dark-plus-gold is heavily overused and light and warm reads more human and premium.
- Safe alternative if she insists on dark: warm near-black (`#0E0D0C`, not blue-tinted), off-white text, gold in the same restrained way.
- Suggested approach: show her the light direction first, and keep the dark version as the fallback.
- Gold options: muted champagne (`#C6A664`) or `#D4AF37`. Muted champagne is safer.

---

## 5. Experience Hierarchy (locked)

**INTRODUCE → SHOW → PROVE → EXPLORE → HEAR → KNOW HER → INQUIRE**

The number and names of sections underneath are not decided. They depend on what she gives us in the form. Candidate sections, to be merged or cut based on her real proof:

| Beat | Candidate section | Notes |
|---|---|---|
| Introduce | Hero | Her name, a statement tying the three disciplines together, her strongest visual, a small proof line. Direction idea: SOCIAL. STORIES. VOICE. (revisit once we know her real brand voice). No fake numbers. |
| Show | Selected Work | Heart of the site. Large project, then CLIENT / ROLE / WORK / RESULT. Varied compositions per project. |
| Prove | Social Media Management | Brands, campaigns, platforms, results, analytics screenshots, audience demographics if she has them. |
| Explore | Content Creation | More visual, less text. Reels, UGC, campaigns, scripts. Let the work speak. |
| Hear | Voice | A different rhythm. Big type ("HEAR HER."), real audio player with real waveforms (for example wavesurfer.js), tone categories, studio info if she provides it. |
| Prove | Case Studies | 3 to 5 best projects: The Brief, The Approach, The Work, The Result. |
| Know her | About | Strong portrait, her story and philosophy. Strategy gives direction, content gives form, voice gives personality. Copy comes from her form answers. |
| Prove | Testimonials / client proof | Real names and real companies where permitted. No star ratings. |
| Inquire | Contact | Big line ("Have something in mind?"), email, Instagram, LinkedIn, booking link, short inquiry form (name, brand/company, budget, message). |

**Risk to manage:** nine sections is a lot. If her proof is thin, sections 03, 04, 05 and 06 will repeat the same few projects from different angles. Plan a lean version first: merge Social, Content and Voice into one tabbed Selected Work area and keep Case Studies for her 2 or 3 best. Expand only if her assets justify it.

**Site shape:** single scrolling page with a minimal text nav. Whether Social, Content and Voice deserve separate sub-pages can be decided after the form.

---

## 6. Process

**FORM → understand her career → identify strongest proof → decide content hierarchy → design the site → then code (Codex).**

Do not design around placeholders. The form decides the architecture.

**Technical stack**
- Next.js (App Router) and TypeScript
- Tailwind CSS with custom color tokens
- Framer Motion for restrained motion (reveals, tab transitions)
- Real `<audio>` playback for the voice reel (not CSS-faked waveform bars)
- Deploy on Vercel with a custom domain
- Mobile-first, 9:16 video frames must scale cleanly on phones

**Things still unknown (the form should answer these)**
- Her actual name and brand name
- Whether she has a domain
- Which real case studies, numbers and testimonials exist
- Her strongest reels, voice samples and clients
- Whether she has worked with international brands already

---

## 7. The Content Form (copy into Google Forms)

Use Google Forms Sections for A to E. Make Projects 1 to 3 required and 4 to 5 optional, and say so above them. File uploads should accept images, video and audio, multiple files, with a generous size limit. Turn on "Collect email addresses".

**Title:** Let's Build Your Portfolio: Quick Content Form

**Description:** This isn't a boring intake form. It's how we figure out what actually makes your work impressive so the site can prove it. Answer in as much or as little detail as you want; screenshots and links are more useful than perfect writing. Skip anything that doesn't apply to you. Should take 15 to 20 minutes.

### Section A: The Basics
1. Full name [Short answer]
2. What name/brand do you want on the site? [Short answer]
3. Email [Short answer]
4. Phone / WhatsApp (for us, not the site) [Short answer]
5. Instagram / TikTok / LinkedIn / other links [Paragraph]
6. One-line description of what you do, in your own words [Short answer]
7. Professional headshot(s), as many as you like [File upload]

### Section B: Everything You've Done
*Don't sort yourself into neat boxes. Just tell us everything, we'll organize it.*

8. Which of these have you done professionally? [Checkboxes: Social Media Management, Content Creation / UGC, Voice Acting, Other]
9. Roughly how long have you been doing this work? [Short answer]
10. List every brand/client you've worked with, even briefly [Paragraph]
11. Which platforms have you worked across? [Checkboxes: Instagram, TikTok, YouTube, LinkedIn, Twitter/X, Podcasts, Ads/commercial, Other]
12. Have you worked with international brands/clients (outside your home country)? If yes, which ones and where were they based? [Paragraph]

### Section C: The Proof
*Pick your best work, as few as 2 or as many as 5. Skip any project block you don't need.*

**Project 1 (repeat the same 8 questions for Projects 2 to 5; 4 and 5 optional)**
13. Client/brand name (can stay anonymous if under NDA) [Short answer]
14. What did you actually do? (strategy, content, voiceover, or a mix) [Paragraph]
15. What was the goal/objective of the project? [Short answer]
16. What did you create or manage? [Paragraph]
17. Results/metrics (views, growth %, engagement, reach, conversions, whatever you have) [Paragraph]
18. Links to the actual work (posts, reels, campaign, audio) [Paragraph]
19. Screenshots/analytics/assets [File upload]
20. Did the client give you a testimonial, or would they? Include their name/title if so. [Paragraph]

### Section D: Voice Acting
*Skip this section if voice acting isn't part of your work.*

21. Do you have voice reel samples? [File upload, audio]
22. What tones/styles do you do well? [Checkboxes: Warm/conversational, Corporate/authoritative, Energetic/commercial, Storytelling/narration, Other]
23. Accents/languages you can perform in [Short answer]
24. Do you record professionally, and what's your typical turnaround time? [Short answer]

### Section E: Your Personal Brand
25. How do you want people to see you when they land on this site? [Paragraph]
26. What kind of clients do you want more of? [Paragraph]
27. What industries excite you most to work with? [Checkboxes: Beauty, Fashion, Tech/SaaS, E-commerce, Hospitality/Travel, Wellness, Food & Beverage, Other]
28. What makes you different from other people who do this work? [Paragraph]
29. How would you describe your personality/tone, as it should come across on the site? [Short answer]
30. Any awards, recognitions, or features? [Short answer]
31. Anything else you think we should know that we haven't asked? [Paragraph]

---

## 8. Next Steps

1. Build the form in Google Forms from Part 7 and send it to her.
2. Settle the palette question (Part 4) before design starts.
3. When her answers arrive, pick the strongest proof and decide the real section list under the locked hierarchy.
4. Write the section-by-section spec with real copy, type choices and layout, then hand it to Codex.
5. Share a staging link so she can react to something real.
