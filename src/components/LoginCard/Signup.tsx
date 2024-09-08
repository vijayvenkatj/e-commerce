"use client"
import Image from "next/image"
import loginimg from "../icons/loginimg.svg"
import { SignupCard } from "./SignupCard"
export const SignUp = () => {
    return(
        <div className="p-4 relative flex flex-col min-h-screen">
            <div className="bg-gray-200  flex justify-center gap-4 rounded-xl">
                <Image src={loginimg} alt="insert image" className="hidden sm:flex" />
                <SignupCard />
            </div>
        </div> 
    )
}