"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

const formEmailSchema = z.object({
  email: z.string().min(10, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const formGrSchema = z.object({
  gr_no: z.string().refine(
    (value) => {
      return value === "" || (!isNaN(Number(value)) && value.length >= 6);
    },
    {
      message: "Gr. No. must be atleast 6 digit long.",
    }
  ),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function Loginform() {
  const { toast } = useToast();
  const router = useRouter();

  const [resetMail, setResetMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formEmail = useForm<z.infer<typeof formEmailSchema>>({
    resolver: zodResolver(formEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formGr = useForm<z.infer<typeof formGrSchema>>({
    resolver: zodResolver(formGrSchema),
    defaultValues: {
      gr_no: "",
      password: "",
    },
  });

  async function reset() {
    try {
      setLoading(true);
      console.log(resetMail);
      const res = await axios.post("/api/reset-mail", { email: resetMail });
      if (res.status === 200) {
        toast({
          title: "Reset mail sent",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(
    values: z.infer<typeof formEmailSchema> | z.infer<typeof formGrSchema>
  ) {
    try {
      setLoading(true);
      const res = await axios.post("/api/login", values);
      console.log(values);
      console.log(res);
      if (res.status === 200) {
        toast({
          title: "Login Success",
          duration: 2000,
        });
        router.push("/");
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        toast({
          title: "User Not Found",
          description: "The user was not found.",
        });
      }

      if (error.response.status === 401) {
        toast({
          title: "Unauthorized",
          description: "Authentication failed.",
        });
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-1/2 w-full md:h-full md:w-[40vw] p-5 z-50 flex items-center justify-center">
      <Tabs
        defaultValue="email"
        className="w-[320px] h-[525px] md:w-[400px]  border shadow-2xl rounded-lg p-5"
      >
        <h1 className="text-2xl font-semibold mb-5">Login 🔐</h1>
        <p className="text-sm font-thin my-3">
          *use college email YourFirstName.YourGrNo@srttc.ac.in
        </p>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="gr">Gr. No.</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <Form {...formEmail}>
            <form
              onSubmit={formEmail.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={formEmail.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be your college email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formEmail.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Password" {...field} />
                    </FormControl>
                    <FormDescription>
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button variant="link">Forgot Password ?</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogDescription>
                              A mail will be sent to your email to reset your
                              password.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Your Email
                              </Label>
                              <Input
                                id="email"
                                className="col-span-3"
                                onChange={(e) => setResetMail(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              disabled={loading}
                              className="w-full mt-3"
                              onClick={() => {
                                reset();
                                setOpen(false);
                              }}
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Please wait
                                </>
                              ) : (
                                "Send reset link"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={loading} className="w-full mt-3" type="submit">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="gr">
          <Form {...formGr}>
            <form
              onSubmit={formGr.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <FormField
                control={formGr.control}
                name="gr_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gr. No.</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Your Gr" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be your college Gr. No.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formGr.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Password" {...field} />
                    </FormControl>
                    <FormDescription>
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button variant="link">Forgot Password ?</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogDescription>
                              A mail will be sent to your email to reset your
                              password.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Your Email
                              </Label>
                              <Input
                                id="email"
                                className="col-span-3"
                                onChange={(e) => setResetMail(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              disabled={loading}
                              className="w-full mt-3"
                              onClick={() => {
                                reset();
                                setOpen(false);
                              }}
                            >
                              {loading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Please wait
                                </>
                              ) : (
                                "Send reset link"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={loading} className="w-full mt-3" type="submit">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
        <p className="mt-5 font-normal text-sm">
          Contact with college if any issue.{" "}
        </p>
      </Tabs>
    </div>
  );
}
