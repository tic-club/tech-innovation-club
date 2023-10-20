"use client";
import Image from "next/image";
import { calculatePostAge } from "@/lib/postAge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import axios from "axios";
import {
  VerifiedIcon,
  HeartIcon,
  MessageCircleIcon,
  Share2Icon,
  MoreHorizontalIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { User } from "@/types";
import { useRouter } from "next/navigation";

export default function Profilepostcard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("/api/getUserPosts");
        if (res.status === 200) {
          if (res.data) {
            console.log(res.data);
            setUser(res.data);
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
    <div className="flex flex-col">
      {user
        ? user.post.length > 0
          ? user.post.map((post: any) => (
              <Card className="w-full my-3 cursor-pointer" key={post.id}>
                <CardHeader
                  onClick={() => {
                    router.push(`${user.gr_no}/post/${post.id}`);
                  }}
                >
                  <CardTitle>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={
                              user.avatarUrl
                                ? user.avatarUrl
                                : "https://github.com/shadcn.png"
                            }
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-1">
                          <Button variant="link" className="p-1">
                            <h1 className="text-base">
                              {user.first_name} {user.last_name}
                            </h1>
                          </Button>

                          {user.isAdmin ? (
                            <VerifiedIcon
                              height={20}
                              width={20}
                              color="#049fec"
                              strokeWidth={3}
                            />
                          ) : (
                            ""
                          )}
                          <h4 className="text-sm font-light">@{user.gr_no}</h4>
                          <h4 className="text-sm font-light ml-2 hidden md:block">
                            {calculatePostAge(post.dateCreated)}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <Badge className="ml-12">{user.branch}</Badge>
                  </CardTitle>
                  <CardDescription className="pt-3 text-lg">
                    {post.caption}
                  </CardDescription>
                </CardHeader>
                <CardContent className="m-auto">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      height={100}
                      width={100}
                      alt="post"
                    />
                  ) : (
                    <Image
                      className="w-full h-auto"
                      src={"/login.jpg"}
                      height={500}
                      width={500}
                      alt="post"
                    />
                  )}
                </CardContent>
                <CardFooter>
                  <div className="flex gap-5">
                    <Button
                      className="rounded-full"
                      onClick={() => setLike(!like)}
                    >
                      <HeartIcon
                        height={20}
                        width={20}
                        fill={like ? "red" : undefined}
                      />
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
            ))
          : "No Posts yet"
        : "Loading..."}
    </div>
  );
}
