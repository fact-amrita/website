"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { SignInwithGoogle, SignInwithGithub } from "./functions";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/images/logo.png";
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

const LoginPage = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const errorParam = searchParams.get("error");
  const signedOutParam = searchParams.get("signedout");
  const [redirectURL, setRedirectURL] = useState("/app");
  console.log(redirectURL);

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
    if (signedOutParam !== null) {
      toast({
        variant: "success",
        title: "Sign Out Successful!",
        description: "You have been successfully Signed Out."
      })
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }
    if (searchParams.get("redirect")) {
      setRedirectURL(searchParams.get("redirect") as string);
      const newUrl = window.location.pathname;
      window.history.replaceState(null, '', newUrl);
    }
  }, [errorParam, signedOutParam, searchParams, toast]);

  return (
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
            <div className={styles.form}>
              <p id={styles.heading}>Login</p>
              <div>
                <form action={() => { SignInwithGoogle(redirectURL) }}>
                  <button className={styles.button1} style={{ display: "flex", alignItems: "center" }}>
                    <FcGoogle />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login with Google&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                </form>
              </div>
              <div>
                <form action={() => { SignInwithGithub(redirectURL) }}>
                  <button className={styles.button2} style={{ display: "flex", alignItems: "center" }}>
                    <FaGithub />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login with Github&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                </form>
              </div>
              <div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
};

const LoginPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LoginPage />
  </Suspense>
);

export default LoginPageWithSuspense;
