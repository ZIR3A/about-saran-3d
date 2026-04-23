import { Geist, Geist_Mono } from "next/font/google";
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
  description: "Frontend Engineer crafting high-performance web experiences. Building scalable, modern web platforms with focus on UX.",
  keywords: ["Frontend Engineer", "React", "Next.js", "Web Development", "UI/UX", "Saran Baral"],
  author: "Saran Baral",
  openGraph: {
    title: "Saran Baral | Frontend Engineer",
    description: "Frontend Engineer crafting high-performance web experiences",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saran Baral | Frontend Engineer",
    description: "Frontend Engineer crafting high-performance web experiences",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-base text-main antialiased">
        {children}
      </body>
    </html>
  );
}