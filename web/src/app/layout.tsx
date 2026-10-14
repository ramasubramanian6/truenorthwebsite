import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { SITE } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

const DESCRIPTION = "True North IT Consulting builds, tests and runs software for organisations: custom software development, QA and test automation, cloud and managed support, and implementation and consulting. Makers of GRIT, the school operating system.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: { default: "True North IT Consulting: Engineering That Points True North", template: "%s | True North IT Consulting" },
  description: DESCRIPTION,
  applicationName: SITE.name,
  openGraph: { type: "website", siteName: SITE.name, locale: "en_IN", title: "True North IT Consulting", description: DESCRIPTION, url: "/" },
  twitter: { card: "summary_large_image", title: "True North IT Consulting", description: DESCRIPTION },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#fbfaf8", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={montserrat.variable}>
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-red focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <Providers>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
