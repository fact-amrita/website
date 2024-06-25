"use client"
import { getUserCredByemail } from '@/lib/UserFetch';

export async function roleUpdateCheck(factId: string, role: string) {
    const user = await getUserCredByemail(factId);
    console.log(user, role)
    if (user) {
        if (user.role !== role) {
            window.location.href = '/app/auth/logout';
        }
    }
}