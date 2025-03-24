import type { Metadata } from "next";
import { Geist_Mono, Sofia_Sans } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggle } from "@/components/ModeToggle";

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          
        <SessionProvider>
          {authModal}
          {children}
          <Toaster />
        </SessionProvider>

        <div className="fixed bottom-4 right-4">
          <ModeToggle />
        </div>
        </ThemeProvider>
      </body>

      
    </html>
  );
}
