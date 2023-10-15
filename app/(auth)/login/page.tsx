"use client";
import Image from "next/image";
import img from "@/public/login.jpg";
import Loginform from "@/components/form/Loginform";

export default function Page() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="h-[150vh] md:h-[80vh] bg-white m-3 w-screen md:w-[80vw] shadow-2xl rounded-lg flex flex-col md:flex-row justify-center items-center">
        <div className="h-1/2 w-full md:h-full md:w-1/2 flex flex-col justify-center items-center">
          <Image
            className="mix-blend-multiply"
            draggable={false}
            src={img}
            width={700}
            height={700}
            alt="login"
          />
        </div>
        <Loginform />
      </div>
    </div>
  );
}
