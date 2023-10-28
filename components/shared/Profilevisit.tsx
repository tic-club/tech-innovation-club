import React from "react";
import { User } from "@/types";
import { Button } from "../ui/button";
import {
  BookOpenIcon,
  FileMinus,
  Grid3X3,
  MailIcon,
  UserCircle2,
} from "lucide-react";
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
import Profilecertificatecard from "../card/Profilecertificatecard";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/profileavatar";
import { Badge } from "../ui/badge";

type ProfileProps = {
  data: User;
};

const Profile: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div>
      <div className="gap-4 flex justify-between">
        <div>
          <div className="md:m-10">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>TIC</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl  max-md:text-xl mt-5 font-semibold">
              {data.first_name} {data.last_name}
            </h1>
            <div className="flex gap-2 my-2">
              <h1 className="text-sm font-light">@{data.gr_no}</h1>

              <Badge>{data.gender}</Badge>
            </div>
            <p className="my-5 text-md font-light">{data.bio}</p>
            <div className="flex gap-4">
              <div className="flex justify-start items-center gap-1">
                <BookOpenIcon height={18} width={18} />
                <h1>{data.branch}</h1>
              </div>
              <div className="flex justify-start items-center gap-1">
                <MailIcon height={18} width={18} />
                <h1>{data.email}</h1>
              </div>
            </div>
          </div>
        </div>
        <div></div>
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
                <Profilecertificatecard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Profile;
