"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Home() {
  async function logout() {
    await axios.get("/api/logout");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className=" text-[#ffffff]">TEST</h1>
      <Button onClick={logout}>Logout</Button>
    </main>
  );
}
