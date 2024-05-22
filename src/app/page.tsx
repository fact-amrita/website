import { Button } from "@/components/ui/button"
import Image from "next/image"
import logo from "../images/logo.png"
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Secondary } from "@/stories/Button.stories";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight:["600"]
})

export default function Home() {
  return (
   <main className="flex h-full flex-col items-center justify-center bg-custom-gradient bg-custom-size bg-custom-position">
        <div className="space-y-6 text-center">
          <Image
          src={logo}
          alt="FACT Logo"
          width={500}
          height={300}/>
          <div>
          <LoginButton mode={"modal"}>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
          </div>   
        </div>
   </main>
  );
}
