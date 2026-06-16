import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Saran Baral | Frontend Engineer",
  description:
    "Results-driven Frontend Engineer with 4+ years of experience building modern web applications with React.js, Next.js, and TypeScript.",
  keywords: ["Frontend Engineer", "React", "Next.js", "TypeScript", "Web Development", "UI/UX", "Saran Baral"],
  author: "Saran Baral",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Saran Baral | Frontend Engineer",
    description:
      "Results-driven Frontend Engineer with 4+ years of experience building modern web applications with React.js, Next.js, and TypeScript.",
    type: "website",
    locale: "en_US",
    siteName: "Saran Baral Portfolio",
  },
  metadataBase: new URL("https://www.saranbaral.com.np"),
  twitter: {
    card: "summary_large_image",
    title: "Saran Baral | Frontend Engineer",
    description:
      "Results-driven Frontend Engineer with 4+ years of experience building modern web applications with React.js, Next.js, and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-base text-main antialiased font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}