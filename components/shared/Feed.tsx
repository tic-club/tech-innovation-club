"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import axios from "axios";
import { Toggle } from "../ui/toggle";
import {
  BellIcon,
  HeartIcon,
  MessageCircleIcon,
  Share2,
  Share2Icon,
  VerifiedIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { calculatePostAge } from "@/lib/postAge";

export default function feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("/api/feed");
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            setPosts(res.data);
          }
        } else {
          console.error("Error fetching data:", res.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="w-full space-y-3">
      <div className="md:hidden">
        <Button className="w-full h-10 rounded-3xl text-white ">
          Check out new Announcements <BellIcon height={18} />
        </Button>
      </div>
      <div className="hidden md:block">
        <Button className="w-full h-10 rounded-3xl text-white ">
          Contribute On Github <BellIcon height={18} />
        </Button>
      </div>

      {posts.map((post: any) => (
        <Card className="w-full my-3" key={post.User.id}>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={
                      post.User.avatarUrl
                        ? post.User.avatarUrl
                        : "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <Button variant="link" className="p-1">
                    <h1 className="text-base">
                      {post.User.first_name} {post.User.last_name}
                    </h1>
                  </Button>

                  {post.User.isAdmin ? (
                    <VerifiedIcon
                      height={20}
                      width={20}
                      color="#049fec"
                      strokeWidth={3}
                    />
                  ) : (
                    ""
                  )}
                  <h4 className="text-sm font-light">@{post.User.gr_no}</h4>
                  <h4 className="text-sm font-light ml-2 hidden md:block">
                    {calculatePostAge(post.dateCreated)}
                  </h4>
                </div>
              </div>
              <Badge className="ml-12">{post.User.branch}</Badge>
            </CardTitle>
            <CardDescription className="pt-3  text-lg">
              {post.caption}
            </CardDescription>
          </CardHeader>
          <CardContent className="m-auto">
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                height={500}
                width={500}
                loading="lazy"
                alt="post"
              />
            ) : (
              ""
            )}
          </CardContent>
          <CardFooter>
            <div className="flex gap-5">
              <Button className="rounded-full">
                <HeartIcon height={20} width={20} />
              </Button>
              <Button className="rounded-full">
                <MessageCircleIcon height={20} width={20} />
              </Button>
              <Button className="rounded-full">
                <Share2Icon height={20} width={20} />
              </Button>
            </div>
          </CardFooter>
          <h4 className="text-sm font-light m-5 md:hidden flex justify-end">
            {calculatePostAge(post.dateCreated)}
          </h4>
        </Card>
      ))}
    </div>
  );
}
