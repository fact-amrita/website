"use server";

import { signOut } from "@/auth"

export async function SignOutfromAll() {
    try {
        await signOut({ redirectTo: "/app/auth/login" });
    } catch (error) {
        return {
            error: 'Something went wrong. Please try again.'
        }
    }
    
}