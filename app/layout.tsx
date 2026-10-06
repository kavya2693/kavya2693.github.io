import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/nav/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["italic"], weight: ["400"], variable: "--font-fraunces", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s — Kavyasri Jadala" },
  description: SITE.description,
  authors: [{ name: SITE.name }],
  openGraph: { type: "website", url: SITE.url, title: SITE.title, description: SITE.description, siteName: SITE.name },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#080b0f", colorScheme: "dark" };

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: "Senior AI Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Purdue University" },
  knowsAbout: ["Knowledge graphs", "Graph-RAG", "Agentic AI", "Applied machine learning", "AI evaluation"],
  sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <Nav />
        <main id="main" className="page-grid relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
