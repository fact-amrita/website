"use server"

import { signOut } from "@/auth"

export async function SignOutfromAll() {
    await signOut({ redirectTo: "/app/auth/login" });
}