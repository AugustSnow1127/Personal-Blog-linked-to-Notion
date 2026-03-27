/**
 * Static data for CraftShorts.ai portfolio showcase
 * Replaces API calls from the original project
 */

// ===== BRAND =====
export const BRAND = {
  APP_NAME: 'CraftShorts',
  APP_NAME_FULL: 'CraftShorts.ai',
  DOMAIN: 'craftshorts.ai',
  TAGLINE: 'AI-powered short video creation platform',
  COPYRIGHT: '© 2025 CraftShorts.ai. All rights reserved.',
};

// ===== Showcase Videos =====
export interface ShowcaseVideo {
  id: string;
  videoUrl: string;
  title: string;
  category: string;
  description: string;
  sortOrder: number;
}

export const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  { id: '1', videoUrl: '/showcase-videos/video-1.mp4', title: 'ASMR Slicing', category: 'ASMR Slicing', description: '', sortOrder: 0 },
  { id: '2', videoUrl: '/showcase-videos/video-2.mp4', title: 'Satisfying', category: 'Satisfying', description: '', sortOrder: 1 },
  { id: '3', videoUrl: '/showcase-videos/video-3.mp4', title: 'ASMR Soap', category: 'ASMR Soap', description: '', sortOrder: 2 },
  { id: '4', videoUrl: '/showcase-videos/video-4.mp4', title: 'Fruit Soda', category: 'Fruit Soda', description: '', sortOrder: 3 },
  { id: '5', videoUrl: '/showcase-videos/video-5.mp4', title: 'Planetary', category: 'Planetary', description: '', sortOrder: 4 },
  { id: '6', videoUrl: '/showcase-videos/video-6.mp4', title: 'Kinetic Sand', category: 'Kinetic Sand', description: '', sortOrder: 5 },
  { id: '7', videoUrl: '/showcase-videos/video-7.mp4', title: 'Lemon Soda', category: 'Fruit Soda', description: '', sortOrder: 6 },
  { id: '8', videoUrl: '/showcase-videos/video-8.mp4', title: 'Peach Soda', category: 'Fruit Soda', description: '', sortOrder: 7 },
  { id: '9', videoUrl: '/showcase-videos/video-9.mp4', title: 'Galaxy', category: 'Planetary', description: '', sortOrder: 8 },
];

// ===== Creator Avatars (Social Proof) =====
export const CREATOR_AVATARS = [
  { id: 'a1', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' },
  { id: 'a2', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { id: 'a3', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Milo' },
  { id: 'a4', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna' },
  { id: 'a5', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zara' },
];

export const CREATOR_COUNT = 5000;

// ===== ASMR Objects (for TemplateSelectorDemo) =====
export interface AsmrObject {
  id: string;
  label: string;
  thumbnailUrl: string;
  category: string;
}

export const ASMR_OBJECTS_GROUPED: Record<string, AsmrObject[]> = {
  'planetary_cosmic': [
    { id: 'planet_03', label: 'Earth', thumbnailUrl: '/showcase-videos/video-1.mp4', category: 'planetary_cosmic' },
    { id: 'planet_04', label: 'Mars', thumbnailUrl: '/showcase-videos/video-2.mp4', category: 'planetary_cosmic' },
    { id: 'planet_06', label: 'Saturn', thumbnailUrl: '/showcase-videos/video-3.mp4', category: 'planetary_cosmic' },
    { id: 'planet_08', label: 'Neptune', thumbnailUrl: '/showcase-videos/video-4.mp4', category: 'planetary_cosmic' },
  ],
  'fruit_soda': [
    { id: 'fruit_01', label: 'Orange', thumbnailUrl: '/showcase-videos/video-5.mp4', category: 'fruit_soda' },
    { id: 'fruit_10', label: 'Pineapple', thumbnailUrl: '/showcase-videos/video-6.mp4', category: 'fruit_soda' },
    { id: 'fruit_03', label: 'Lemon', thumbnailUrl: '/showcase-videos/video-7.mp4', category: 'fruit_soda' },
    { id: 'fruit_08', label: 'Peach', thumbnailUrl: '/showcase-videos/video-8.mp4', category: 'fruit_soda' },
  ],
};

// ===== Art Style Options (for StyleSelectorDemo) =====
export const ART_STYLE_OPTIONS = [
  { value: 'realistic', label: 'Realistic' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'anime', label: 'Anime' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'cyberpunk', label: 'Cyberpunk' },
  { value: 'comic-book', label: 'Comic Book' },
  { value: 'sci-fi', label: 'Sci-Fi' },
];

// ===== Pricing Plans =====
export interface PricingPlan {
  name: string;
  icon: string;
  credits: number;
  monthlyPrice: number;
  yearlyPrice: number;
  uploadQuota: number;
  features: {
    voiceovers: boolean;
    aiGeneratedContent: boolean;
    noWatermark: boolean;
    autoPublish: boolean;
    veo3ASMR: boolean;
    royaltyFreeBgm: boolean;
  };
  highlighted: boolean;
}

export const PAID_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    icon: '🚀',
    credits: 100,
    monthlyPrice: 19,
    yearlyPrice: 11,
    uploadQuota: 3,
    features: { voiceovers: true, aiGeneratedContent: true, noWatermark: true, autoPublish: true, veo3ASMR: true, royaltyFreeBgm: true },
    highlighted: false,
  },
  {
    name: 'Growth',
    icon: '📈',
    credits: 400,
    monthlyPrice: 39,
    yearlyPrice: 23,
    uploadQuota: 7,
    features: { voiceovers: true, aiGeneratedContent: true, noWatermark: true, autoPublish: true, veo3ASMR: true, royaltyFreeBgm: true },
    highlighted: true,
  },
  {
    name: 'Influencer',
    icon: '⭐',
    credits: 1200,
    monthlyPrice: 69,
    yearlyPrice: 41,
    uploadQuota: 14,
    features: { voiceovers: true, aiGeneratedContent: true, noWatermark: true, autoPublish: true, veo3ASMR: true, royaltyFreeBgm: true },
    highlighted: false,
  },
  {
    name: 'Ultra',
    icon: '🏆',
    credits: 2400,
    monthlyPrice: 129,
    yearlyPrice: 77,
    uploadQuota: -1,
    features: { voiceovers: true, aiGeneratedContent: true, noWatermark: true, autoPublish: true, veo3ASMR: true, royaltyFreeBgm: true },
    highlighted: false,
  },
];

export const YEARLY_SAVINGS_PERCENTAGE = 40;

export const getPrice = (plan: PricingPlan, billingCycle: 'monthly' | 'yearly'): number => {
  return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
};
