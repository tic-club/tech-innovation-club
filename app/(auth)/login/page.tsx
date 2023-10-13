"use client";
import Loginform from "@/components/form/Loginform";

export default function page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-center items-center border rounded-xl h-[60vh] w-[450px]">
        <Loginform />
      </div>
    </div>
  );
}
