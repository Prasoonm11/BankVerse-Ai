import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BankVerse AI | Autonomous Multi-Agent Digital Banking",
  description: "Experience the future of autonomous banking with BankVerse AI. Powered by 7 specialized AI agents driving digital adoption, onboarding customers, optimizing finances, detecting fraud, and creating personalized recommendations.",
  keywords: ["AI Banking", "Autonomous Finance", "Fintech AI", "Multi-Agent AI System", "Digital Banking", "Financial Twin", "Fraud Protection"],
  authors: [{ name: "BankVerse AI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-navy-bg text-slate-100 font-sans selection:bg-cyan-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
