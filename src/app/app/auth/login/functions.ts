'use server';

import { signIn } from "@/auth";


export async function SignInwithGoogle(redirectURL: string) {
    await signIn("google", { redirectTo: redirectURL });
}

export async function SignInwithGithub(redirectURL: string) {
    await signIn("github", { redirectTo: redirectURL });
}
