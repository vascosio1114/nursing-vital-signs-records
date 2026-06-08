import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://humanos.ai"),
  title: "HumanOS | AI Wellbeing Intelligence Platform",
  description:
    "HumanOS helps schools and high-pressure organizations turn stress signals into early support through private wellbeing check-ins, AI daily support plans, and anonymized institutional dashboards.",
  keywords: [
    "AI wellbeing platform",
    "workplace wellbeing",
    "student wellbeing",
    "burnout awareness",
    "school wellbeing dashboard",
    "HR wellbeing analytics",
    "Macao startup",
    "AI wellness",
    "mental wellbeing",
    "employee wellbeing",
    "corporate wellness",
    "AI 福祉平台",
    "學生福祉",
    "企業福祉",
    "壓力覺察",
    "學校 wellbeing dashboard",
    "HR 福祉分析",
    "澳門創業",
    "員工福祉",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HumanOS | AI Wellbeing Intelligence Platform",
    description:
      "Turn stress signals into early support with AI-guided daily plans and anonymized wellbeing dashboards for schools and organizations.",
    url: "https://humanos.ai",
    siteName: "HumanOS",
    images: [
      {
        url: "/og-humanos.svg",
        width: 1200,
        height: 630,
        alt: "HumanOS wellbeing command center preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HumanOS | AI Wellbeing Intelligence Platform",
    description:
      "AI wellbeing support for students and high-pressure teams with anonymized organization dashboards.",
    images: ["/og-humanos.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
