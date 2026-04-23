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
  description: "Frontend Engineer building fast, intuitive web experiences.",
  keywords: ["Frontend Engineer", "React", "Next.js", "Web Development", "UI/UX", "Saran Baral"],
  author: "Saran Baral",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Saran Baral | Frontend Engineer",
    description: "Frontend Engineer building fast, intuitive web experiences",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saran Baral | Frontend Engineer",
    description: "Frontend Engineer building fast, intuitive web experiences",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-base text-main antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}