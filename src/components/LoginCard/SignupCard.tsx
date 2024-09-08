import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import Link from "next/link";


export function SignupCard() {
  const { toast } = useToast()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function CancelHandler() {
    console.log("Cancelled");
    setEmail("");
    setPassword("");
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    try {
      console.log("Signing up...");
      const res = await axios.post("/api/user/signup", {
        email,
        password,
      });
      console.log(res.data);
      if(res.data.message == "User already exists."){
        toast({
          variant: "destructive",
          title: "User already exists.",
        })
      }
      else {
        if (res.request.responseURL) {
          toast({
            title: "User Signup successful.",
            className: "bg-black text-white",
          });
          window.location.href = res.request.responseURL; 
        }
      }
    } catch (error: any) {
      console.log("Error during sign-up:", error);
      toast({
        variant: "destructive",
        title: "An error occurred during sign-up.",
        description: error.response?.data?.message || "Please try again.",
      });
    }
  }

  return (
    <Card className="w-[400px] bg-white">
      <CardHeader>
        <CardTitle className="mt-2 mb-1">Sign up</CardTitle>
        <CardDescription>Sign up to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <Button type="button" variant="outline" onClick={CancelHandler}>
              Cancel
            </Button>
            <Button type="submit">Sign Up</Button>
          </div>
        </form>
        <div className=" flex justify-center mt-5">
        <Link href='/login'><span className="mt-5">Already an user? Click here to Login.</span></Link>
        </div>
       
      </CardContent>
      <Toaster />
    </Card>
  );
}
