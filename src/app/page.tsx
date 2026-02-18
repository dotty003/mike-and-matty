import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { BrandingStyle } from "@/components/BrandingStyle";
import { CustomCursor } from "@/components/CustomCursor";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const content = await getContent();

  return (
    <div className="min-h-screen text-slate-200 relative bg-brand-bg">
      <BrandingStyle branding={content.branding} />
      {content.branding?.interactions?.cursorStyle &&
        content.branding.interactions.cursorStyle !== "off" && (
          <CustomCursor
            style={content.branding.interactions.cursorStyle}
            size={content.branding.interactions.cursorSize ?? "md"}
            intensity={content.branding.interactions.cursorIntensity ?? 50}
          />
        )}
      <GradientBackground />
      <Navigation content={content.navigation} />
      <main className="relative z-10">
        <Hero content={content.hero} />
        <TrustBar content={content.trustBar} />
        <Features content={content.features} />
        <About content={content.about} />
        <Testimonials content={content.testimonials} />
        <FAQ content={content.faq} />
        <Booking content={content.booking} />
      </main>
      <Footer content={content.footer} />
    </div>
  );
}
