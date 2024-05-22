"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


import { SignInwithGoogle } from "./functions";
import { SignInwithGithub } from "./functions";

import { Button } from "../ui/button";

export const Social = () => {
    return (
        <div className="flex items-center w-full gap-x-2">


            <form action={SignInwithGoogle}>
                <Button
                    size="lg"
                    className="w-full"
                    style={{width: "100%"}}
                    variant="outline">
                    <FcGoogle className="h-5 w-5" />
                </Button>
            </form>


            <form action={SignInwithGithub}>
                <Button
                    size="lg"
                    className="w-full"
                    variant="outline">
                    <FaGithub className="h-5 w-5" />
                </Button>
            </form>



        </div>
    )
}