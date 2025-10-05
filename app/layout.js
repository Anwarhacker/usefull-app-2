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
  title: "DevTools - Developer Utility App",
  description:
    "A comprehensive tool for managing key-value pairs, projects, commands, and notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen overflow-x-hidden`}
      >
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
          {children}
        </div>
      </body>
    </html>
  );
}
