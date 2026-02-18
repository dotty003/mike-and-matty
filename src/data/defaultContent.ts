import { SiteContent, BrandingContent } from "@/lib/types";

export const defaultBranding: BrandingContent = {
  colors: {
    background: "#111F1B",
    surface: "#1A2925",
    primary: "#36594E",
    accent: "#FFD747",
    accentHover: "#ffe175",
    dark: "#0B1412",
  },
  fonts: {
    heading: "Young Serif",
    body: "Helvetica Neue",
    display: "Space Grotesk",
  },
  borderRadius: "10",
  interactions: {
    animationPreset: "smooth",
    cursorEnabled: false,
    cursorSize: "md",
    cursorIntensity: 50,
  },
};

export const defaultContent: SiteContent = {
  global: {
    siteTitle: "Mike & Matty - Strategy Call",
    metaDescription: "Grow Your Income with YouTube. The exact system used by Mike & Matty to build a multi-million dollar education business.",
    faviconUrl: "https://images.squarespace-cdn.com/content/v1/675a118bf08387223db19e47/d5f23eef-5adb-402d-a541-981db4b9247e/favicon.ico?format=100w",
  },
  navigation: {
    logoUrl: "https://images.squarespace-cdn.com/content/v1/675a118bf08387223db19e47/86a414b6-bcf0-4acc-a34c-a2dcb30cac54/favicon+website.png?format=1500w",
    ctaText: "Apply Now",
  },
  hero: {
    badgeText: "Accepting Applications for",
    headline: "Grow Your Income",
    headlineAccent: "YouTube",
    subheadline: "The exact system used by Mike & Matty to build a multi-million dollar education business without burning out.",
    youtubeVideoId: "kLGs1ukvwDc",
    ctaText: "Book Your Strategy Call",
    ctaSubtext: "Limited spots available for this cohort",
  },
  trustBar: {
    label: "Trusted by Creators & Industry Leaders",
    partners: [
      { name: "YouTube", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg", displayStyle: "image" },
      { name: "Notion", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", displayStyle: "image-text" },
      { name: "Ali Abdaal", displayStyle: "serif-italic" },
      { name: "Skillshare", displayStyle: "display-bold" },
      { name: "Tiago Forte", displayStyle: "serif-italic" },
    ],
  },
  features: {
    forTitle: "Who This Is",
    forAccent: "For",
    forItems: [
      "Experts who want to monetize their knowledge.",
      "Content creators stuck on the 'hamster wheel'.",
      "Teachers looking to build scalable online income.",
      "Professionals wanting to transition into education.",
      "Anyone seeking a proven roadmap to $10k/mo.",
    ],
    notForTitle: "Who This Is",
    notForAccent: "NOT",
    notForItems: [
      "People looking for a 'get rich quick' scheme.",
      "Those unwilling to put in the work to build assets.",
      "People who want to remain anonymous forever.",
      "Anyone looking for crypto/forex trading advice.",
      "People who blame others for their lack of results.",
    ],
    systemTitle: "The",
    systemAccent: "Accelerator",
    systemDescription: "We don't just teach you \"theory\". We give you the exact templates, systems, and infrastructure we used to generate millions in sales.",
    featureCards: [
      {
        iconName: "Zap",
        title: "The Content Engine",
        description: "Create high-converting content in less time. Stop guessing what works and start using proven viral frameworks.",
      },
      {
        iconName: "Users",
        title: "Community Building",
        description: "Turn passive viewers into raving fans and paying students using our proprietary community architecture.",
      },
      {
        iconName: "Rocket",
        title: "Scalable Monetization",
        description: "Launch courses and coaching programs that sell themselves. No sleazy sales tactics required.",
      },
    ],
  },
  about: {
    imageUrl: "https://yt3.googleusercontent.com/ytc/AIdro_k62q_4qjC0zK9x7G7tXg9w3_8x7q7x_8x7q7x_8w=s900-c-k-c0x00ffffff-no-rj",
    imageAlt: "Mike and Matty",
    founderName: "Mike & Matty",
    founderSubtitle: "Doctors turned Educators",
    title: "From Medical Doctors to",
    titleAccent: "Full-Time Creators",
    paragraphs: [
      "We started our journey in medicine, optimizing our brains for peak performance. But we realized our true passion wasn't in the hospital—it was in <strong>teaching others how to learn and grow</strong>.",
      "After building our own channels to over <strong class=\"text-white\">1 Million+ followers</strong> and generating millions in revenue, we systematized everything we learned.",
      "We realized that most creators burn out because they treat content creation like a lottery. We treat it like an engineering problem.",
    ],
    pullQuote: "We built the system we wish we had when we started. Now, we want to hand it to you.",
  },
  testimonials: {
    title: "Real Results.",
    titleAccent: "Real People.",
    subtitle: "Join hundreds of successful students",
    items: [
      {
        name: "Sarah Jenkins",
        role: "Digital Artist",
        quote: "I went from 0 to $5k/month in just 12 weeks. The systems Mike and Matty teach are literally plug-and-play.",
      },
      {
        name: "Dr. Ali Abdaal",
        role: "Productivity Expert",
        quote: "These guys understand the education meta better than anyone else. Their strategies are solid gold.",
      },
      {
        name: "James Chen",
        role: "Coding Instructor",
        quote: "The community building aspect changed everything for me. I finally have a loyal fan base that buys everything I launch.",
      },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      {
        question: "Who is this for?",
        answer: "This accelerator is designed for experts, coaches, teachers, and professionals who want to monetize their knowledge. Whether you're looking to escape the content hamster wheel or build a scalable education business, this system provides the infrastructure to reach $10k/mo and beyond.",
      },
      {
        question: "Do I need to have a YouTube channel already?",
        answer: "No, you don't. In fact, starting from scratch can be an advantage because you won't have any bad habits to unlearn. We'll show you how to build your channel on a solid foundation from day one, ensuring you attract the right audience for your offer.",
      },
      {
        question: "I'm already monetized. Is this still for me?",
        answer: "Absolutely. Many of our most successful students came to us with large followings but low revenue. We help you transition from relying on ad revenue (which is volatile) to building your own assets and offers, which is the key to a sustainable, high-income business.",
      },
      {
        question: "Is this just a bunch of tips I could find on YouTube for free?",
        answer: "YouTube has 'information', but we provide 'transformation'. We don't just give you tips; we give you a complete operating system, templates, and a step-by-step roadmap. Plus, you get the community and accountability that you simply can't find by watching random videos.",
      },
      {
        question: "How long will it take to complete?",
        answer: "The core curriculum is designed to be implemented in 12 weeks, but you have lifetime access to the materials. Most students see significant traction within the first 30-60 days if they consistently apply the methods.",
      },
      {
        question: "Is this for beginners or advanced creators?",
        answer: "It works for both. Beginners get a proven roadmap to start correctly without wasting years on trial and error. Advanced creators use our systems to optimize their workflows, launch better offers, and scale their revenue without working more hours.",
      },
      {
        question: "Is there 1:1 support included?",
        answer: "Yes. Unlike other courses where you're left on your own, we provide strategy calls, feedback on your work, and a community of peers. We believe that personalized feedback is crucial for overcoming specific roadblocks.",
      },
      {
        question: "Is this for a specific type of channel or niche?",
        answer: "This system works best for 'Education' based channels. If you teach something—whether it's coding, productivity, fitness, music, or business—this system is built for you. It is less suited for pure entertainment or vlog-style channels.",
      },
    ],
  },
  booking: {
    title: "Ready to Build Your",
    titleAccent: "Education Empire?",
    description: "Book a free 15-minute strategy call to see if you qualify for the accelerator program.",
    sessionTitle: "Strategy Session",
    sessionDuration: "15 Minutes",
    sessionType: "Video Call",
    ctaText: "Select a Time",
    calendarUrl: "https://calendly.com",
    securityText: "Secure Booking via Calendly",
    footnote: "* We only accept 5 new students per month to ensure quality.",
  },
  footer: {
    logoUrl: "https://images.squarespace-cdn.com/content/v1/675a118bf08387223db19e47/86a414b6-bcf0-4acc-a34c-a2dcb30cac54/favicon+website.png?format=1500w",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Support", href: "#" },
    ],
    copyrightText: "Mike & Matty. All rights reserved.",
  },
};
