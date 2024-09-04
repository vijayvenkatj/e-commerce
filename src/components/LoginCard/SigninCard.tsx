import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SigninCard() {
  return (
    <Card className="w-[400px] bg-white">
      <CardHeader>
        <CardTitle className="mt-2 mb-1">Login</CardTitle>
        <CardDescription>SignIn to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-4">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" placeholder="Username" />
            </div>
            <div className="flex flex-col space-y-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>SignIn</Button>
      </CardFooter>
    </Card>
  )
}
