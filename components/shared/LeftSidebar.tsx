"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Composecard from "../card/Composecard";
import Annouscard from "../card/Annouscard";
import { useEffect, useState } from "react";
import axios from "axios";

function LeftSidebar() {
  const pathname = usePathname();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function getTokenValue() {
      const res = await axios.get("/api/getTokenValue");
      setIsAdmin(res.data.isAdmin);
    }
    getTokenValue();
  });

  return (
    <section className=" leftsidebar custom-scrollbar fixed left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r-2 pb-5 pt-28  max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link relative flex justify-start gap-4 rounded-lg p-4 ${
                isActive
                  ? "bg-[#857df8]"
                  : "hover:bg-slate-200 dark:hover:bg-gray-900"
              }`}
            >
              {link.imgURL}
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}

        <div className="mt-5 flex flex-col items-center justify-center gap-3">
          <Composecard />
          {isAdmin ? <Annouscard /> : ""}
        </div>
      </div>
    </section>
  );
}

export default LeftSidebar;
