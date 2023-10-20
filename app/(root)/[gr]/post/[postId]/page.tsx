"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { calculatePostAge } from "@/lib/postAge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import {
  VerifiedIcon,
  HeartIcon,
  MessageCircleIcon,
  Share2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type Params = {
  params: {
    postId: number;
  };
};

export default function page({ params: { postId } }: Params) {
  const [post, setPost] = useState<any>();
  useEffect(() => {
    async function fetchPostData() {
      try {
        const res = await axios.post("/api/getPost", postId);
        setPost(res.data);
        console.log(post);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPostData();
  }, [postId]);

  if (!post) {
    return <div>Null</div>;
  }

  return (
    <div>
      <Card className="w-full my-3 cursor-pointer">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between items-center">
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
            </div>
            <Badge className="ml-12">{post.User.branch}</Badge>
          </CardTitle>
          <CardDescription className="pt-3 text-lg">
            {post.caption}
          </CardDescription>
        </CardHeader>
        <CardContent className="m-auto">
          {post && post.imageUrl ? (
            <Image src={post.imageUrl} height={100} width={100} alt="post" />
          ) : null}
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

      <Input type="text" />
    </div>
  );
}
