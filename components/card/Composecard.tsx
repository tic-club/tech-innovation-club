import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import axios from "axios";
import { useToast } from "../ui/use-toast";

export default function Composecard() {
  const { toast } = useToast();

  const [data, setData] = useState({
    id: 0,
    caption: "",
  });

  async function submitHandler() {
    const token = await axios.get("/api/getTokenValue");
    const userId = token.data.id;
    console.log(token.data.id, "token");
    setData({ ...data, id: token.data.id });
    console.log(data);
    const res = await axios.post("/api/post", data);

    if (res.status === 200) {
      toast({
        title: "Posted Succesfully ✅",
        duration: 2000,
      });
    } else {
      toast({
        title: "Post failed",
        duration: 2000,
      });
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-36 font-semibold p-3 text-md rounded-3xl bg-[#857df8] hover:bg-[#857df8]/90"
          >
            Post
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center justify-start gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                Create a post
              </div>
            </DialogTitle>
            <DialogDescription>Add your thoughts</DialogDescription>
          </DialogHeader>
          <div>
            <Textarea
              placeholder="Whats happening?!"
              onChange={(e: any) =>
                setData({ ...data, caption: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={submitHandler}>
                Post
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
