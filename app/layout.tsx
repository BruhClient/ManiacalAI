import type { Metadata } from "next";
import { Poppins, Sofia_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from 'react-hot-toast';
import Navbar from "@/components/common/Navbar";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const sofiaSans = Sofia_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Poppins({
  variable: "--font-serif",
  weight : ["400","500","800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maniacal.io",
  description: "Ai PDF Summarizer with chat",
  
};

export default function RootLayout({
  children,
  authModal 
}: Readonly<{
  children: React.ReactNode;
  authModal : React.ReactNode,
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body
        className={`${sofiaSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ReactQueryProvider>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          
        <SessionProvider>
          <Navbar />
          {authModal}
          {children}
          <Toaster />
  
        </SessionProvider>

        </ThemeProvider>
        </ReactQueryProvider>
      </body>

      
    </html>
  );
}
