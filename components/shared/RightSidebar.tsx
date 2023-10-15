import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useEffect } from "react";

function RightSidebar() {
  return (
    <section className="custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-[30vw] flex-col justify-between gap-12 overflow-auto border-l px-10 pb-6 pt-20 max-xl:hidden">
      <div className="flex flex-1 flex-col justify-start">
        <h1 className="font-bold text-xl my-5">Announcements</h1>
        <Card className=" shadow-xl">
          <CardHeader>
            <CardTitle>Student Profile System</CardTitle>
            <CardDescription>For All Students</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Every student who wish to apply for Online Exam Form need to be
              registered on Student Profile System.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Visit</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default RightSidebar;
