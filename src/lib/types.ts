export interface SiteContent {
  global: GlobalContent;
  navigation: NavigationContent;
  hero: HeroContent;
  trustBar: TrustBarContent;
  features: FeaturesContent;
  about: AboutContent;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  booking: BookingContent;
  footer: FooterContent;
  branding?: BrandingContent;
}

export interface BrandingContent {
  colors: {
    background: string;
    surface: string;
    primary: string;
    accent: string;
    accentHover: string;
    dark: string;
  };
  fonts: {
    heading: string;
    body: string;
    display: string;
  };
  borderRadius: string;
  interactions?: {
    animationPreset: 'smooth' | 'lift' | 'energetic' | 'minimal' | 'none';
    cursorStyle: 'off' | 'glow' | 'ring' | 'colorshift' | 'trail' | 'magnetic';
    cursorSize: 'sm' | 'md' | 'lg';
    cursorIntensity: number;
  };
}

export interface GlobalContent {
  siteTitle: string;
  metaDescription: string;
  faviconUrl: string;
}

export interface NavigationContent {
  logoUrl: string;
  ctaText: string;
}

export interface HeroContent {
  badgeText: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  youtubeVideoId: string;
  ctaText: string;
  ctaSubtext: string;
}

export interface TrustBarContent {
  label: string;
  youtubeChannels?: Array<{
    channelUrl: string;
    photoUrl: string;
    channelName: string;
    subscriberCount: string;
  }>;
  partners: Array<{
    name: string;
    logoUrl?: string;
    displayStyle: "image" | "image-text" | "serif-italic" | "display-bold";
  }>;
}

export interface FeaturesContent {
  forTitle: string;
  forAccent: string;
  forItems: string[];
  notForTitle: string;
  notForAccent: string;
  notForItems: string[];
  systemTitle: string;
  systemAccent: string;
  systemDescription: string;
  featureCards: Array<{
    iconName: string;
    title: string;
    description: string;
  }>;
}

export interface AboutContent {
  imageUrl: string;
  imageAlt: string;
  founderName: string;
  founderSubtitle: string;
  title: string;
  titleAccent: string;
  paragraphs: string[];
  pullQuote: string;
}

export interface TestimonialsContent {
  title: string;
  titleAccent: string;
  subtitle: string;
  items: Array<{
    name: string;
    role: string;
    quote: string;
    avatarUrl?: string;
    imageUrl?: string;
  }>;
}

export interface FAQContent {
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export interface BookingContent {
  title: string;
  titleAccent: string;
  description: string;
  sessionTitle: string;
  sessionDuration: string;
  sessionType: string;
  ctaText: string;
  calendarUrl: string;
  securityText: string;
  footnote: string;
}

export interface FooterContent {
  logoUrl: string;
  links: Array<{ label: string; href: string }>;
  copyrightText: string;
}
