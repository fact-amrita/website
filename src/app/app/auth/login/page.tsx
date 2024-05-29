"use client";

import { SignInwithGoogle, SignInwithGithub } from "./functions";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Suspense, useEffect } from "react";
import Image from "next/image";
import logo from "@/images/logo.png";
import { Poppins } from "next/font/google";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useSearchParams } from 'next/navigation';
import { BackgroundGradientAnimation } from "@/components/ui/background_animation";

import styles from "./page.module.css";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default function LoginPage({ check }: { check: any }) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  useEffect(() => {
    if (errorParam) {
      toast({
        variant: "destructive",
        title: "Uh oh! Error Detected",
        description: `${errorParam}`,
        duration: Infinity,
      });
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }
  }, [errorParam, toast]);

  const handleGoogleSignIn = async () => {
    await SignInwithGoogle();
};

const handleGithubSignIn = async () => {
    await SignInwithGithub();
};



  return (
    <Suspense key={check} fallback={<div>Loading...</div>}>
    <main className="flex h-full inset-0 bg-cover items-center justify-center bg-black">
      <BackgroundGradientAnimation />
      <div className="absolute space-y-6 text-center">
        <Image
          src={logo}
          alt="FACT Logo"
          width={500}
          height={300}
        />
        <div className={styles.card}>
          <div className={styles.card2}>
            <form className={styles.form}>
              <p id={styles.heading}>Login</p>
              <div>
                <button className={styles.button1} style={{ display: "flex", alignItems: "center" }} onClick={handleGoogleSignIn}>
                  <FcGoogle />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login with Google&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
              </div>
              <div>
                <button className={styles.button2} style={{ display: "flex", alignItems: "center" }} onClick={handleGithubSignIn}>
                  <FaGithub />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login with Github&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </button>
              </div>
                  <div>
                  </div>
                  <div>
                  </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  </Suspense>
  );
}
