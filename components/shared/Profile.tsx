import React from "react";
import { User } from "@/types";
import { Button } from "../ui/button";
import { FileMinus, Grid3X3, UserCircle2 } from "lucide-react";
import { profilePhotos } from "@/constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Profilepostcard from "../card/Profilepostcard";

type ProfileProps = {
  data: User;
};

const Profile: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div>
      <div className="gap-4 flex justify-between">
        <div>
          <h1 className=" text-5xl font-thin">My Profile</h1>
          <div className=" md:m-10">
            <UserCircle2 height={100} width={100} className=" max-md:mt-5" />

            <h1 className=" text-3xl  max-md:text-xl mt-5 font-serif">
              {data.first_name} {data.last_name}
            </h1>
            <h1 className=" text-xl  font-serif ">@{data.gr_no}</h1>
            <h1 className=" text-xl  font-serif">{data.gender}</h1>
            <h1 className=" text-xl font-serif">{data.branch}</h1>
          </div>
        </div>
        <div>
          <Button className=" max-md:hidden rounded-full">
            Edit profile...
          </Button>
          <Button className=" md:hidden rounded-full">Edit... </Button>
        </div>
      </div>
      <hr className=" m-2" />
      <section className="post">
        <Tabs defaultValue="post" className="w-auto flex-shrink">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">
              {" "}
              <div className=" flex gap-4 items-center justify-center">
                <Grid3X3 className="w-5 h-5" />{" "}
                <h1 className=" max-md:hidden">Posts</h1>
              </div>
            </TabsTrigger>
            <TabsTrigger value="certificate">
              {" "}
              <div className=" flex gap-4 items-center justify-center">
                <FileMinus className=" w-5 h-5" />{" "}
                <h1 className="max-md:hidden">Certificate</h1>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <CardHeader>
                <CardTitle>Posts</CardTitle>
                <CardDescription>
                  Create or post to share with your friends.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Profilepostcard />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="certificate">
            <Card>
              <CardHeader>
                <CardTitle>Certificates</CardTitle>
                <CardDescription>
                  Upload your all completed certificates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="max-md:flex max-md:flex-col max-md:gap-4 max-md:items-center grid grid-cols-3 grid-rows-3 gap-4">
                  <Image
                    src="/assets/dummy1.jpg"
                    alt={"certificate"}
                    height={600}
                    width={260}
                    className=" aspect-[4/3] rounded-md"
                  />
                  <Image
                    src="/assets/dummy2.jpg"
                    alt={"certificate"}
                    height={600}
                    width={260}
                    className=" aspect-[4/3] rounded-md"
                  />
                  <Image
                    src="/assets/dummy3.jpg"
                    alt={"certificate"}
                    height={600}
                    width={260}
                    className="aspect-[4/3] rounded-md"
                  />
                  <Image
                    src="/assets/dummy4.jpg"
                    alt={"certificate"}
                    height={600}
                    width={260}
                    className="aspect-[4/3] rounded-md"
                  />
                  <Image
                    src="/assets/dummy5.jpg"
                    alt={"certificate"}
                    height={600}
                    width={260}
                    className="aspect-[4/3] rounded-md"
                  />
                  <Image
                    src="/assets/dummy6.jpg"
                    alt={"certificate"}
                    height={600}
                    width={260}
                    className="aspect-[4/3] rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Profile;
