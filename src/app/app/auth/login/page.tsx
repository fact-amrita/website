// "use client"

// import { useSearchParams } from 'next/navigation';
import Image from "next/image"
import logo from "@/images/logo.png"
import { Poppins } from "next/font/google";
import { LoginForm } from "@/components/auth/login-form";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function LoginPage() {
  // const searchParams = useSearchParams();
  // const errorParam = searchParams.get("error");
  // const errorString = "Error Detected: " + errorParam;


  return (
    <main className="flex h-full inset-0 bg-cover items-center justify-center bg-custom-gradient bg-custom-position">
      <div className="absolute space-y-6 text-center">
        <Image
          src={logo}
          alt="FACT Logo"
          width={500}
          height={300} />
        <div>
          <LoginForm />
          {/* {errorParam && <p style={{ color: "red" }}>{errorString}</p>} */}
        </div>
      </div>
    </main>
  );
}