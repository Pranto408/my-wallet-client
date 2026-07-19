import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyWallet - Premium Personal Finance Tracker",
  description: "Take control of your money with budget tracking, transaction insights, and AI-powered smart spending analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
        <Providers>
          <AuthProvider>
            <Navbar />
            <div className="flex-grow flex flex-col">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
