"use client";
import { InfoIcon, Menu, MenuIcon, Moon, Sun, UserCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import axios from "axios";
import { useRouter } from "next/navigation";

function Topbar() {
  const { setTheme } = useTheme();
  const router = useRouter();

  async function logout() {
    await axios.get("/api/logout");
    router.push("/login");
  }

  async function profile() {
    const token = await axios.get("/api/getTokenValue");
    const grno = token.data.gr_no;
    router.push(`/${grno}`);
  }

  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-[#968ff5] dark:bg-[#101012] px-6 py-3">
      <Link href="/" className=" flex items-center gap-4">
        <Image
          src="/assets/TIC_LOG.png"
          alt="logo tic"
          width={40}
          height={40}
        />
        <p className=" text-heading3-bold max-xs:hidden">TIC Club</p>
      </Link>

      <div className="flex justify-center items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* // Profile */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <div className="h-15 w-fit rounded-sm p-1 px-3 cursor-pointer border bg-slate-100 dark:bg-black flex justify-between items-center gap-3">
                <UserCircle2 height={30} width={30} />
                <h1 className="hidden md:block">Personal</h1>
                <InfoIcon height={24} width={24} className="hidden md:block" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mx-10">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={profile} className="cursor-pointer">
                <User className="mr-2 h-4 w-4 " />
                <span>Profile</span>
                <DropdownMenuShortcut>shift/⌘ + P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />

            <Link href={"/https://github.com/tic-club"}>
              <DropdownMenuItem className="cursor-pointer">
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud className="mr-2 h-4 w-4" />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Topbar;
