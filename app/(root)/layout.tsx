import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TIC_Club',
  description: 'A website for TIC club'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Topbar />

        
        {children}
      

      <Toaster />
    </div>
  );
}