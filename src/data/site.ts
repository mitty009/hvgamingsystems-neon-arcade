import {
  Cable,
  Crown,
  Gamepad2,
  HandCoins,
  MapPin,
  ShieldCheck,
  Trophy,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Category = {
  title: string;
  description: string;
  image: string;
};

export type Highlight = {
  value: string;
  label: string;
};

export type GalleryItem = {
  title: string;
  image: string;
  tag: string;
  blurb: string;
  accent?: 'pink' | 'cyan' | 'violet';
  featured?: boolean;
};

export type GalleryStory = {
  title: string;
  image: string;
  tag: string;
  bestFor: string;
  mix: string;
  outcome: string;
  accent?: 'pink' | 'cyan' | 'violet';
};

export type Sector = {
  title: string;
  description: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ContentItem = {
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export const site = {
  name: 'High Voltage Gaming Systems',
  email: 'info@hvgamingsystems.com.au',
  tagline: 'Arcade machines, commercial game machines, pool tables and amusement equipment for venues that want guests to stay, play and come back.',
  region: 'Murray / Riverina region',
  heroTitle: 'Arcade machines, commercial game machines, pool tables and venue-ready entertainment for hospitality, tourism and leisure spaces across the Murray and Riverina.',
  heroText:
    'High Voltage Gaming Systems helps venues build a stronger games offering with arcade games, prize machines, dependable support and zero-upfront-cost placement options for suitable sites.',
  ctaPrimary: 'Contact us',
  ctaSecondary: 'View our range',
  aboutTitle: 'Veteran-owned, regionally focused and serious about keeping venues moving.',
  aboutText:
    'High Voltage Gaming Systems works with hotels, clubs, holiday parks and entertainment venues across the Murray and Riverina. From the first conversation through to servicing, the focus is simple: the right machines for the room, a clean install and reliable support when the venue needs it.',
  footerBlurb:
    'Arcade machines, commercial game machines, pool tables, prize attractions, zero-upfront-cost placement options and technical support for hospitality, tourism and entertainment venues across the Murray / Riverina region.',
};

export const highlights: Highlight[] = [
  { value: 'Game machines', label: 'Arcade games and commercial machines that turn quiet floor space into active entertainment' },
  { value: 'Pool tables', label: 'Commercial tables for pubs, clubs, parks and social venues' },
  { value: 'Zero upfront', label: 'Placement options for suitable venues without an initial machine purchase' },
  { value: 'Qualified support', label: 'Technical backup to keep equipment presentable and operating' },
];

export const services: Service[] = [
  {
    title: 'Arcade machine supply',
    description:
      'Arcade games and commercial game machines selected for the available space, guest profile and visual impact the venue wants on the floor.',
    icon: Gamepad2,
  },
  {
    title: 'Pool tables and social games',
    description:
      'Pool, air hockey and other proven social games that give groups a familiar reason to settle in and stay longer.',
    icon: Trophy,
  },
  {
    title: 'Zero-upfront-cost placements',
    description:
      'Leasing and profit-share pathways for suitable venues that want a stronger entertainment offer without buying every machine upfront.',
    icon: HandCoins,
  },
  {
    title: 'Repairs and maintenance',
    description:
      'Servicing from qualified technical people who understand that downtime, presentation and reliability matter.',
    icon: Wrench,
  },
];

export const differentiators: Service[] = [
  {
    title: 'Veteran-owned values',
    description:
      'Clear communication, accountability and follow-through from first enquiry through to ongoing support.',
    icon: ShieldCheck,
  },
  {
    title: 'Regional specialists',
    description:
      'Focused support across the Murray / Riverina region with a strong understanding of local venues and operators.',
    icon: MapPin,
  },
  {
    title: 'Qualified technical team',
    description:
      'Electronic technicians and engineers give each placement real backup beyond delivery and setup.',
    icon: Cable,
  },
  {
    title: 'Entertainment that earns its place',
    description:
      'Every machine should justify the floor space by adding appeal, dwell time or repeat play.',
    icon: Crown,
  },
];

export const categories: Category[] = [
  {
    title: 'Car racing systems',
    description: 'Linked racing cabinets bring instant competition, movement and strong visual pull for groups.',
    image: '/assets/gallery/curated/neon-racing-lane.webp',
  },
  {
    title: 'Air hockey and social play',
    description: 'Fast-start games for guests who want something quick, social and easy to join.',
    image: '/assets/gallery/curated/air-hockey-table-detail.jpg',
  },
  {
    title: 'Pool tables',
    description: 'A familiar drawcard for pubs, clubs, accommodation venues and social spaces.',
    image: '/assets/gallery/curated/pool-table-graffiti.jpg',
  },
  {
    title: 'Claw and skill testers',
    description: 'Prize machines add colour, family appeal and repeat play for younger guests.',
    image: '/assets/gallery/curated/claw-prize-bank.webp',
  },
];

export const sectors: Sector[] = [
  {
    title: 'Hotels and pubs',
    description: 'Give locals and visitors another reason to stay after a meal, a drink or a round of pool.',
  },
  {
    title: 'Holiday parks',
    description: 'Create a family-friendly attraction guests can return to throughout their stay.',
  },
  {
    title: 'Tourism and entertainment venues',
    description: 'Add colour, movement and competitive play to spaces built around memorable visitor experiences.',
  },
  {
    title: 'Clubs and social spaces',
    description: 'Build a reliable games mix for repeat local audiences and group nights.',
  },
];

export const stats: Stat[] = [
  { value: 'Arcade', label: 'Machine supply' },
  { value: 'Pool', label: 'Tables & games' },
  { value: 'Flexible', label: 'Zero-upfront options' },
  { value: 'Regional', label: 'Service support' },
];

export const galleryStories: GalleryStory[] = [
  {
    title: 'A games room families return to throughout their stay.',
    image: '/assets/gallery/curated/venue-floor-wide.webp',
    tag: 'Full-room install',
    bestFor: 'Holiday parks, family venues and dedicated entertainment rooms',
    mix: 'Linked racers, prize machines, arcade cabinets and quick-play social games.',
    outcome:
      'A visible destination inside the venue that gives guests a reason to come back between meals, activities and downtime.',
    accent: 'pink',
  },
  {
    title: 'A quiet wall becomes a reason to stop and play.',
    image: '/assets/gallery/curated/cactus-arcade-entry.webp',
    tag: 'Venue activation',
    bestFor: 'Pubs, clubs and hospitality venues with quiet walls or transitional spaces',
    mix: 'Feature cabinets, music games, prize pieces and machines with strong lighting.',
    outcome:
      'The games area becomes part of the venue atmosphere instead of something hidden in the corner.',
    accent: 'cyan',
  },
  {
    title: 'Fast social play without taking over the whole floor.',
    image: '/assets/gallery/curated/racing-air-hockey-room.webp',
    tag: 'Social mix',
    bestFor: 'Venues that want group activity, casual competition and easy supervision',
    mix: 'Air hockey, pool tables, racing cabinets and short-play machines.',
    outcome:
      'Guests can jump in quickly, play in pairs or groups, and keep moving between games, food and drinks.',
    accent: 'violet',
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: 'Linked racing that pulls groups in',
    image: '/assets/gallery/curated/neon-racing-lane.webp',
    tag: 'Group play',
    blurb:
      'Guests understand racing instantly. Friends can compete side by side, and the cabinets create a bright anchor for the room.',
    accent: 'pink',
  },
  {
    title: 'Prize machines for repeat family play',
    image: '/assets/gallery/curated/claw-prize-bank.webp',
    tag: 'Prize attraction',
    blurb:
      'Approachable, bright and easy to revisit. Prize machines work especially well where families and younger guests are part of the audience.',
    accent: 'cyan',
  },
  {
    title: 'Pool tables as the social anchor',
    image: '/assets/gallery/curated/pool-table-graffiti.jpg',
    tag: 'Pool table',
    blurb:
      'A familiar longer-form game for pubs, clubs and accommodation venues where guests naturally gather in groups.',
    accent: 'violet',
  },
  {
    title: 'Air hockey for fast turnover',
    image: '/assets/gallery/curated/air-hockey-table-detail.jpg',
    tag: 'Quick play',
    blurb:
      'Short games, quick turns and no learning curve make air hockey a strong fit near food, drinks and social seating.',
    accent: 'pink',
  },
  {
    title: 'Feature cabinets that change the room feel',
    image: '/assets/gallery/curated/pirate-shooter-cabinet.webp',
    tag: 'Feature cabinet',
    blurb:
      'A feature cabinet adds height, colour and theatre when a room needs a stronger focal point.',
    accent: 'cyan',
  },
  {
    title: 'Compact skill pieces for tighter footprints',
    image: '/assets/gallery/curated/bullseye-skill-cabinet.webp',
    tag: 'Small footprint',
    blurb:
      'For tighter rooms, compact skill pieces add colour and participation without demanding a large footprint.',
    accent: 'violet',
  },
];

export const venueOutcomes: ContentItem[] = [
  {
    title: 'Longer customer stay',
    description: 'Give guests a reason to stay after they have eaten, checked in or finished the main activity.',
  },
  {
    title: 'Better use of floor space',
    description: 'Match the machine mix to the room shape, audience and traffic flow before anything is placed.',
  },
  {
    title: 'A family-friendly drawcard',
    description: 'Prize machines, air hockey and racing games give mixed-age groups something easy to enjoy together.',
  },
  {
    title: 'Ongoing reliability',
    description: 'Keep machines presentable, operating and ready for guests with technical support behind the install.',
  },
];

export const serviceAreas: ContentItem[] = [
  {
    title: 'Albury-Wodonga',
    description: 'Support for hotels, clubs, pubs, parks and entertainment venues across the border region.',
  },
  {
    title: 'Murray and Riverina',
    description: 'Arcade machines, commercial game machines, pool tables and amusement equipment for venues across the Murray corridor and wider Riverina.',
  },
  {
    title: 'Wider regional radius',
    description: 'Priority coverage within roughly 300 km, including suitable Shepparton and Goulburn Valley enquiries handled directly or referred through trusted partners.',
  },
];

export const enquiryTypes = [
  'New venue setup',
  'Zero-upfront-cost placement',
  'Pool tables',
  'Repairs and maintenance',
  'General enquiry',
];

export const faqs: Faq[] = [
  {
    question: 'Do you offer leasing or profit-share arrangements?',
    answer:
      'Yes. Suitable venues can discuss zero-upfront-cost placements, leasing-style options or profit-share arrangements around the floor space, expected traffic and equipment mix.',
  },
  {
    question: 'Do you help choose the right machines for a venue?',
    answer:
      'Yes. Recommendations start with the room, guest profile and commercial goal so the final mix suits the venue.',
  },
  {
    question: 'Do you service machines after installation?',
    answer:
      'Yes. Ongoing servicing and maintenance support are part of the offer, backed by qualified electronic technicians and engineers.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'The business focuses on Albury-Wodonga, the Murray and the Riverina, with suitable enquiries considered across roughly a 300 km regional radius.',
  },
  {
    question: 'Do you supply game machines near me?',
    answer:
      'For commercial venues across Albury-Wodonga, Shepparton, the Murray and the Riverina, High Voltage Gaming Systems can discuss arcade game machines, prize machines, pool tables and zero-upfront-cost placement options for suitable sites.',
  },
  {
    question: 'Do you supply gaming machines or pokies?',
    answer:
      'No. High Voltage Gaming Systems supplies non-gambling arcade, amusement, pool, prize and venue entertainment equipment rather than poker machines.',
  },
  {
    question: 'Can you supply pool tables as well as arcade machines?',
    answer:
      'Yes. Pool tables, arcade cabinets, racing games, prize machines, air hockey and other social games can all be considered as part of the venue mix.',
  },
];

export const process = [
  {
    title: 'Talk through the venue',
    description: 'Share the floor space, audience and the kind of result you want from the games area.',
  },
  {
    title: 'Build the right mix',
    description: 'Choose machines, pool tables and commercial options that fit the room and the audience.',
  },
  {
    title: 'Install and present',
    description: 'Deliver a clean, professional setup that is ready for guests from day one.',
  },
  {
    title: 'Keep it running',
    description: 'Back everything with dependable servicing, maintenance and qualified technical support.',
  },
];
