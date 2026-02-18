import { BrandingContent } from "@/lib/types";
import { defaultBranding } from "@/data/defaultContent";

const GOOGLE_FONTS = new Set([
  "Young Serif",
  "Playfair Display",
  "Lora",
  "Merriweather",
  "Crimson Text",
  "EB Garamond",
  "Libre Baskerville",
  "Space Grotesk",
  "Inter",
  "Poppins",
  "Montserrat",
  "Raleway",
  "DM Sans",
  "Plus Jakarta Sans",
  "Outfit",
]);

function buildGoogleFontsUrl(fonts: string[]): string | null {
  const unique = [...new Set(fonts.filter((f) => GOOGLE_FONTS.has(f)))];
  if (unique.length === 0) return null;
  const families = unique
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@300;400;500;600;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

function fontStack(font: string, fallback: string): string {
  return `'${font}', ${fallback}`;
}

export function BrandingStyle({ branding }: { branding?: BrandingContent }) {
  const b = branding || defaultBranding;

  const fontsUrl = buildGoogleFontsUrl([
    b.fonts.heading,
    b.fonts.body,
    b.fonts.display,
  ]);

  const css = `
    :root {
      --color-brand-bg: ${b.colors.background};
      --color-brand-primary: ${b.colors.primary};
      --color-brand-accent: ${b.colors.accent};
      --color-brand-accent-hover: ${b.colors.accentHover};
      --color-brand-surface: ${b.colors.surface};
      --color-brand-dark: ${b.colors.dark};
      --brand-radius: ${b.borderRadius}px;
      --font-sans: ${fontStack(b.fonts.body, "sans-serif")};
      --font-serif: ${fontStack(b.fonts.heading, "serif")};
      --font-display: ${fontStack(b.fonts.display, "sans-serif")};
    }
  `;

  return (
    <>
      {fontsUrl && (
        // eslint-disable-next-line @next/next/no-page-custom-font
        <link rel="stylesheet" href={fontsUrl} />
      )}
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </>
  );
}
