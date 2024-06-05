'use server';

import { signIn } from "@/auth";


export async function SignInwithGoogle() {
    await signIn("google", { redirectTo: "/app" });
}

export async function SignInwithGithub() {
    await signIn("github", { redirectTo: "/app" });
}
