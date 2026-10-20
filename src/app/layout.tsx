import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollRestoration from "@/components/ScrollRestoration";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Q Y X O Labs — Next-Gen AI, Robotics & Data Science Labs for Schools",
  description:
    "Turnkey B2B STEM infrastructure, lab engineering, and world-class curricula partnering with K-12 and high schools to cultivate the next generation of deep-tech leaders.",
  keywords: [
    "EdTech B2B",
    "School Robotics Lab",
    "K-12 Artificial Intelligence",
    "Data Science Curriculum",
    "STEM Lab Infrastructure",
    "School Lab Setup",
  ],
  authors: [{ name: "Q Y X O Labs" }],
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased scrollbar-none overflow-x-clip max-w-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white antialiased selection:bg-lime-300 selection:text-lime-900 scrollbar-none overflow-x-clip max-w-full w-full">
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
