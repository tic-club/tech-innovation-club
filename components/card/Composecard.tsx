import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";

export default function Composecard() {
  const { toast } = useToast();

  const [data, setData] = useState({
    id: 0,
    caption: "",
    path: "",
  });
  const [file, setFile] = useState(null);
  const [gr, setGr] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTokenId() {
      try {
        const token = await axios.get("/api/getTokenValue");
        console.log(token.data.gr_no);

        setGr(token.data.gr_no);

        setData((prevData) => ({ ...prevData, id: token.data.id }));
      } catch (error) {
        console.error("Error fetching token:", error);
        toast({
          title: "An error occurred while fetching token.",
          duration: 2000,
        });
      }
    }
    getTokenId();
  }, []);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const submitHandler = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (file && gr) {
        formData.append("file", file);
        formData.append("grNumber", gr.toString());

        const uploadResponse = await axios.post("/api/upload-file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const path2 = uploadResponse.data.path;

        if (uploadResponse.status === 200) {
          const postData = { ...data, path: path2 };
          const postResponse = await axios.post("/api/post", postData);

          if (postResponse.status === 200) {
            toast({
              title: "Posted Successfully ✅",
              duration: 2000,
            });
          } else {
            toast({
              title: "Post failed",
              duration: 2000,
            });
          }
        } else {
          toast({
            title: "File upload failed",
            duration: 2000,
          });
        }
      } else {
        const postResponse = await axios.post("/api/post", data);

        if (postResponse.status === 200) {
          toast({
            title: "Posted Successfully ✅",
            duration: 2000,
          });
        } else {
          toast({
            title: "Post failed",
            duration: 2000,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "An error occurred.",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-36 font-semibold p-3 text-md rounded-3xl shadow-2xl bg-[#857df8] hover:bg-[#857df8]/90"
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
              placeholder="What's happening?!"
              onChange={(e) =>
                setData((prevData) => ({
                  ...prevData,
                  caption: e.target.value,
                }))
              }
            />
            <label>
              Upload
              <Input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </label>
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
