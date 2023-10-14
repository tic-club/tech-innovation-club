import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";


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
        
      <main className='flex flex-row'>
            <LeftSidebar />

            <section className=' main-container'> 
              <div className='w-full max-w-4xl'>
                  {children}
              </div>
            </section>

            <RightSidebar />
          </main>
      
          <Bottombar /> 
      <Toaster />
    </div>
  );
}