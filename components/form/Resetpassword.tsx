"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function ResetForm(token: any) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  console.log(token.token, "token");

  const _token = token.token;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(data: { password: any; confirmPassword: any }) {
    const { password, confirmPassword } = data;

    if (confirmPassword !== password) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords don't match",
      });
    }

    console.log(password, confirmPassword);

    try {
      setLoading(true);
      const res = await axios.post("/api/reset-password", { password, _token });
      if (res.status === 200) {
        toast({
          title: "Password Changed Successfully ✅",
        });
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        toast({
          variant: "destructive",
          title: "User Not Found",
          description: "The Unauthorized Token !",
        });
      }

      if (error.response.status === 401) {
        toast({
          variant: "destructive",
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
    <div className="w-[320px] md:w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm your password" {...field} />
                </FormControl>
                <FormDescription>Confirm your password.</FormDescription>
                <FormMessage>
                  {form.formState.errors.confirmPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
