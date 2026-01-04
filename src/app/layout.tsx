import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "AugustSnow",
  description: "A personal blog powered by Notion",
  icons: {
    icon: '/avatar.jpg',
    apple: '/avatar.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
