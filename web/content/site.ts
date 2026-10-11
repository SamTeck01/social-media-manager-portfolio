// All site copy and media live here. Drop files into /public/media and list them below;
// sections with no media hide themselves automatically.
// Rule: only real, client-confirmed numbers. No placeholder metrics.

export type Category = "Fashion & Retail" | "Health & Education" | "Faith & Events";

export type Video = {
  src: string; // /media/videos/xxx.mp4 (vertical 9:16, H.264, ideally < 8MB)
  poster: string; // /media/posters/xxx.webp
  title: string;
  client: string;
  category: Category;
  metric?: string; // only if she gives the real number for this video
};

export type VoiceClip = {
  src: string; // /media/voice/xxx.mp3
  title: string;
  style: "Commercial" | "Narration" | "Conversational";
  duration?: string;
};

export type Work = {
  id: string;
  client: string;
  location: string;
  medium: string; // her role, written like a gallery label's medium line
  summary: string;
  result: string[]; // each line must be defensible
  links: { label: string; href: string }[];
  // Optional hung media. Until set, the work shows as a typographic plate.
  image?: { src: string; alt: string; width: number; height: number };
  video?: { src: string; poster: string };
};

export const site = {
  name: "Miracle Akhimien",
  fullName: "Miracle Wealth Akhimien",
  disciplines: "Social media manager, content creator and voice-over artist",
  // TODO(client): confirm public email, booking link and her own handles.
  email: "",
  booking: "",
  socials: [] as { label: string; href: string }[],
  url: "https://example.com",
};

export const clients = [
  { name: "The Fly Foot Doctor", place: "Houston" },
  { name: "ADOSE Fashion", place: "Abuja" },
  { name: "Taramoda Luxury", place: "Nigeria" },
  { name: "ParentalPal", place: "Nigeria" },
  { name: "The Covenant Nation", place: "Maryland" },
];

export const works: Work[] = [
  {
    id: "adose",
    client: "ADOSE Fashion",
    location: "Abuja, Nigeria",
    medium: "Social media management, campaign planning, product content and community",
    summary:
      "Built an online bag and shoe retailer's Instagram from zero, then planned and ran the Summer Shoes campaign.",
    result: ["0 → 9,837 Instagram followers, all organic", "1,000+ pairs sold out in the Summer Shoes campaign"],
    links: [
      { label: "Instagram", href: "https://www.instagram.com/adose.fashion/" },
      { label: "adosefashion.com.ng", href: "https://www.adosefashion.com.ng" },
    ],
  },
  {
    id: "fly-foot-doctor",
    client: "The Fly Foot Doctor",
    location: "Houston, USA",
    medium: "Scriptwriting, video editing, graphic design and social media management",
    summary:
      "Writes, edits and designs educational foot-care content for a Houston surgeon's creator brand across YouTube, Instagram and TikTok, including the launch of her recorded heel-care course.",
    result: ["800+ heel-care course purchases"],
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@theflyfootdoctor" },
      { label: "Instagram", href: "https://www.instagram.com/the_fly_foot_doctor/" },
    ],
  },
  {
    id: "taramoda",
    client: "Taramoda Luxury",
    location: "Nigeria",
    medium: "Daily content creation and promotional campaigns",
    summary:
      "Creates content every day for a women's fashion boutique, keeping new pieces visible and carrying its promotions, including a campaign that sold out.",
    result: ["A promotional campaign that sold out"],
    links: [{ label: "Instagram", href: "https://www.instagram.com/taramodaluxury/" }],
  },
];

export const testimony = {
  text: "Miracle has played a valuable role in ADOSE Fashion's digital growth journey. One of the highlights of our collaboration was the Summer Shoes campaign, which resulted in over 1,000 pieces being sold out. She also supported our organic audience growth, taking our Instagram community from zero to over 9,800 followers.",
  author: "Adesuwa Jane Oseghale",
  org: "ADOSE Fashion",
};

// TODO(client): add her best 3–5 videos per project.
export const videos: Video[] = [];

// TODO(client): add 2–3 voice samples. The Voice room stays hidden until then.
export const voice: VoiceClip[] = [];

export const rooms = [
  {
    name: "Strategy",
    body: "Social media management, campaign planning and community building across Instagram, TikTok, YouTube, Facebook and LinkedIn.",
  },
  {
    name: "Story",
    body: "Content creation, scriptwriting, video editing, graphic design and event videography, made in the brand's own voice.",
  },
  {
    name: "Voice",
    body: "Professional voice-over for ads, explainers and narration, so the brand sounds as good as it looks.",
  },
];

export const commission = [
  { title: "Brief", body: "A short call about your brand, your audience and the goal." },
  { title: "Plan", body: "A content and campaign plan, agreed before anything is made." },
  { title: "Make", body: "Scripts, shoots, edits, design and voice, from one person." },
  { title: "Grow", body: "Publishing, community and monthly results you can read." },
];

export const note = {
  heading: "One creative, the whole story.",
  body: [
    "I'm a multidisciplinary digital creative. I help brands say what they're worth through strategic content, visual storytelling and digital media.",
    "My work spans social media management, content creation, video editing, scriptwriting, graphic design, event videography and voice-over. Strategy gives the work direction, content gives it form, and voice gives it personality.",
  ],
};
