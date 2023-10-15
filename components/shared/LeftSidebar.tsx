"use client";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Composecard from "../card/Composecard";
import { Button } from "../ui/button";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();

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

        <div className="mt-5 flex items-center justify-center">
          {/* <Button className="h-12 w-36 font-semibold p-3 text-md rounded-3xl"> */}
          <Composecard />
        </div>
      </div>
    </section>
  );
}

export default LeftSidebar;
