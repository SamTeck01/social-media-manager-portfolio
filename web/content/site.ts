import contact from "./contact.json";
import videoData from "./videos.json";
import voiceData from "./voice.json";

// Videos, voice clips and contact details are edited by the client at /admin (Sveltia CMS),
// which writes the JSON files imported above. Everything else lives here.
// Rule: only real, client-confirmed numbers. No placeholder metrics.

export type Video = {
  src: string; // /media/... mp4 (H.264, ideally < 25MB); fallback when there is no stream
  hls?: string; // adaptive stream (master.m3u8): starts fast, climbs to full quality
  aspect?: string; // CSS aspect-ratio, e.g. "16 / 9"; defaults to vertical 9 / 16
  poster?: string; // optional; the first frame is shown if missing
  title: string;
  client: string;
  category: string; // free text; each distinct value becomes a tab
  metric?: string; // only if she gives the real number for this video
};

export type VoiceClip = {
  src: string; // /media/voice/xxx.mp3
  title: string;
  style: string; // each distinct value becomes a tab
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
  // Real screenshots of the brand's channels (supplied by the client).
  screens: Screen[];
};

export type Screen = { src: string; alt: string; platform: string; handle: string; href: string };

export const site = {
  name: "Miracle Akhimien",
  fullName: "Miracle Wealth Akhimien",
  disciplines: "Social Media Manager, Content Creator & Voice-Over Artist",
  pitch:
    "Helping ambitious brands build a stronger digital presence through strategic content, creative storytelling and social media management.",
  reach: "Working with brands across global markets.",
  email: contact.email,
  booking: contact.booking,
  socials: contact.socials as { label: string; href: string }[],
  url: "https://miracle-akhimien.vercel.app",
  cv: "/miracle-akhimien-cv.pdf",
};

export const clients = [
  { name: "The Fly Foot Doctor", place: "Houston" },
  { name: "DeNiel Foot & Ankle Center", place: "Houston" },
  { name: "Hadassah Bridals", place: "UK market" },
  { name: "PharmAbbey", place: "Lagos" },
  { name: "4ruit Naturel", place: "Lagos" },
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
    screens: [
      {
        src: "/media/adose-instagram.webp",
        alt: "ADOSE Fashion Instagram profile showing 9,837 followers",
        platform: "Instagram",
        handle: "@adose.fashion",
        href: "https://www.instagram.com/adose.fashion/",
      },
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
    screens: [
      {
        src: "/media/ffd-youtube.webp",
        alt: "The Fly Foot Doctor YouTube channel",
        platform: "YouTube",
        handle: "@theflyfootdoctor",
        href: "https://www.youtube.com/@theflyfootdoctor",
      },
      {
        src: "/media/ffd-instagram.webp",
        alt: "The Fly Foot Doctor Instagram profile",
        platform: "Instagram",
        handle: "@the_fly_foot_doctor",
        href: "https://www.instagram.com/the_fly_foot_doctor/",
      },
      {
        src: "/media/ffd-tiktok.webp",
        alt: "The Doc in Bloom TikTok profile with short educational videos",
        platform: "TikTok",
        handle: "@flyfootdoctor",
        href: "https://www.tiktok.com/@flyfootdoctor",
      },
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
    screens: [],
  },
];

export const testimony = {
  text: "Miracle has played a valuable role in ADOSE Fashion's digital growth journey. One of the highlights of our collaboration was the Summer Shoes campaign, which resulted in over 1,000 pieces being sold out. She also supported our organic audience growth, taking our Instagram community from zero to over 9,800 followers.",
  author: "Adesuwa Jane Oseghale",
  org: "ADOSE Fashion",
};

export const videos: Video[] = videoData.items;

// TODO(client): add 2–3 voice samples. The Voice room stays hidden until then.
export const voice: VoiceClip[] = voiceData.items;

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

// From her CV (October 2026).
export const career = {
  roles: [
    { org: "PharmAbbey", place: "Lagos", role: "Social Media Manager", when: "2026 – now", line: "TikTok grown from ~100 to 3,300+ followers and 22,000+ likes." },
    { org: "DeNiel Foot & Ankle Center", place: "Houston, USA · remote", role: "Social Media Manager", when: "2026 – now", line: "Instagram and TikTok for a foot and ankle clinic." },
    { org: "4ruit Naturel", place: "Lagos", role: "Social Media Manager", when: "2025 – now", line: "Reels, carousels and campaigns driving Instagram and WhatsApp enquiries." },
    { org: "Hadassah Bridals", place: "Lagos · UK market", role: "Social Media Manager", when: "2024 – 2025", line: "50%+ Instagram follower growth in a year; ~30% of consultations came from Instagram DMs." },
    { org: "The Fly Foot Doctor", place: "Houston, USA · remote", role: "Video editor, scriptwriter, designer", when: "Ongoing", line: "800+ course purchases; a 20,000+ subscriber community." },
    { org: "ADOSE Fashion", place: "Abuja · remote", role: "Social Media Manager", when: "2021 – now", line: "0 → 9,935 Instagram followers; 1.47M views and 94K accounts reached." },
  ],
  education: "BSc Economics & Statistics, Ambrose Alli University, 2021",
  certifications: ["Google Social Media Marketing Certificate, 2023", "Social Media Made Easy: Content Strategy & Creation, 2025"],
  tools: ["Meta Business Suite", "Meta Ads Manager", "Hootsuite", "CapCut", "Adobe Premiere Pro", "Canva"],
};

export const note = {
  heading: "One creative, the whole story.",
  body: [
    "I'm a multidisciplinary digital creative. I help brands say what they're worth through strategic content, visual storytelling and digital media.",
    "My work spans social media management, content creation, video editing, scriptwriting, graphic design, event videography and voice-over. Strategy gives the work direction, content gives it form, and voice gives it personality.",
  ],
};
