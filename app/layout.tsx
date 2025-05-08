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
  title: "Maniacal AI",
  description: "Ai PDF Summarizer with chat",
  icons :{
    icon : "/icon.svg"
  },
  keywords : ["NextJs" , "TypeScript","JavaScript"], 
  metadataBase : new URL("https://www.maniacalai.com"), 
  twitter : { 
    card: "summary_large_image", 
    site : "https://www.maniacalai.com", 
    creator : "@TravisAng", 
    title : "Maniacal AI | Ai PDF Summarizer with chat", 
    description : "View PDFs differently", 
    images: ["feature.png"]
  }, 
  openGraph : { 
    title : "Maniacal AI | Ai PDF Summarizer with chat", 
    description : "Maniacal AI", 
    url : "https://www.maniacalai.com",
    siteName :"Recursion Error",
    images: ["feature.png"], 

  }
  
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
        <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(var(--muted),transparent_1px)] [background-size:16px_16px]"></div>
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
