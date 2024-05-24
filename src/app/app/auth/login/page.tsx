"use client";

import { useEffect } from "react";
import Image from "next/image";
import logo from "@/images/logo.png";
import { Poppins } from "next/font/google";
import { LoginForm } from "@/components/auth/login-form";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useSearchParams } from 'next/navigation';
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

export default function LoginPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const router = useRouter();

  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace('/app/details');
      }
    });
  }, [router]);

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

  return (
    <main className="flex h-full inset-0 bg-cover items-center justify-center bg-custom-gradient bg-custom-position">
      <div className="absolute space-y-6 text-center">
        <Image
          src={logo}
          alt="FACT Logo"
          width={500}
          height={300}
        />
        <div>
          <LoginForm />
        </div>
      </div>
      <Toaster />
    </main>
  );
}
