// All site copy and media live here. Drop files into /public/media and list them below;
// sections with no media hide themselves automatically.
// Rule: only real, client-confirmed numbers. No placeholder metrics.

export type Video = {
  src: string; // /media/videos/xxx.mp4 (vertical 9:16, H.264, ideally < 8MB)
  poster: string; // /media/posters/xxx.webp
  title: string;
  client: string;
  category: Category;
  metric?: string; // only if she gives the real number for this video
};

export type Category = "Fashion & Retail" | "Health & Education" | "Faith & Events";

export type VoiceClip = {
  src: string; // /media/voice/xxx.mp3
  title: string;
  style: "Commercial" | "Narration" | "Conversational";
  duration?: string;
};

export type CaseStudy = {
  id: string;
  client: string;
  location: string;
  industry: string;
  role: string;
  work: string[];
  summary: string;
  metrics: { value: string; label: string }[];
  links: { label: string; href: string }[];
  quote?: { text: string; author: string };
};

export const site = {
  name: "Miracle Akhimien",
  fullName: "Miracle Wealth Akhimien",
  role: "Social Media Manager · Content Creator · Voice-Over Artist",
  // TODO(client): confirm public email, booking link and her own handles.
  email: "",
  booking: "",
  socials: [] as { label: string; href: string }[],
  url: "https://example.com",
};

export const proof = [
  { value: "0 → 9.8K", label: "Organic Instagram growth, ADOSE Fashion" },
  { value: "1,000+", label: "Pairs sold out in one campaign" },
  { value: "800+", label: "Course sales supported, The Fly Foot Doctor" },
  { value: "NG · US", label: "Brands served in Nigeria and the United States" },
];

export const clients = [
  "The Fly Foot Doctor",
  "ADOSE Fashion",
  "Taramoda Luxury",
  "ParentalPal",
  "The Covenant Nation Maryland",
];

export const caseStudies: CaseStudy[] = [
  {
    id: "adose",
    client: "ADOSE Fashion",
    location: "Abuja, Nigeria",
    industry: "Fashion & Retail",
    role: "Social Media Manager",
    work: ["Social strategy", "Campaign planning", "Product content", "Community"],
    summary:
      "Built an online retail brand's Instagram from zero, then ran the Summer Shoes campaign that sold out more than a thousand pairs.",
    metrics: [
      { value: "0 → 9,837", label: "Instagram followers, organic" },
      { value: "1,000+", label: "Pairs sold, Summer Shoes campaign" },
    ],
    links: [
      { label: "Instagram", href: "https://www.instagram.com/adose.fashion/" },
      { label: "Website", href: "https://www.adosefashion.com.ng" },
    ],
    quote: {
      text: "One of the highlights of our collaboration was the Summer Shoes campaign, which resulted in over 1,000 pieces being sold out. She also supported our organic audience growth, taking our Instagram community from zero to over 9,800 followers.",
      author: "Adesuwa Jane Oseghale, ADOSE Fashion",
    },
  },
  {
    id: "fly-foot-doctor",
    client: "The Fly Foot Doctor",
    location: "Houston, USA",
    industry: "Health & Education",
    role: "Social Media Manager & Video Editor",
    work: ["Scriptwriting", "Video editing", "Graphic design", "Social management"],
    summary:
      "Scripts, edits and designs educational foot-care content for a Houston surgeon's creator brand across YouTube, Instagram and TikTok, including the launch of her recorded heel-care course.",
    metrics: [{ value: "800+", label: "Heel-care course purchases" }],
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@theflyfootdoctor" },
      { label: "Instagram", href: "https://www.instagram.com/the_fly_foot_doctor/" },
    ],
  },
  {
    id: "taramoda",
    client: "Taramoda Luxury",
    location: "Nigeria",
    industry: "Fashion & Retail",
    role: "Content Creator",
    work: ["Daily content", "Product showcases", "Promotional campaigns"],
    summary:
      "Creates content every day for a women's boutique, keeping new pieces visible and driving promotions, including a campaign that sold out.",
    metrics: [],
    links: [{ label: "Instagram", href: "https://www.instagram.com/taramodaluxury/" }],
  },
];

// TODO(client): add her best 3–5 videos per project.
export const videos: Video[] = [];

// TODO(client): add 2–3 voice samples. The Voice section stays hidden until then.
export const voice: VoiceClip[] = [];

export const capabilities = [
  {
    title: "Strategy",
    body: "Social media management, campaign planning and community building across Instagram, TikTok, YouTube, Facebook and LinkedIn.",
  },
  {
    title: "Story",
    body: "Content creation, scriptwriting, video editing, graphic design and event videography, made to the brand's voice and audience.",
  },
  {
    title: "Voice",
    body: "Professional voice-over for ads, explainers and narration, so the brand sounds as good as it looks.",
  },
];

export const process = [
  { title: "Brief", body: "A short call to understand your brand, audience and goal." },
  { title: "Plan", body: "A clear content and campaign plan, agreed before anything is made." },
  { title: "Create", body: "Scripts, shoots, edits, design and voice, all from one person." },
  { title: "Grow", body: "Publishing, community and monthly results you can see." },
];

export const about = {
  heading: "One creative, the whole story.",
  body: [
    "I'm a multidisciplinary digital creative helping brands communicate their value through strategic content, visual storytelling and digital media.",
    "My work spans social media management, content creation, video editing, scriptwriting, graphic design, event videography and voice-over. Strategy gives the work direction, content gives it form, and voice gives it personality.",
  ],
};
