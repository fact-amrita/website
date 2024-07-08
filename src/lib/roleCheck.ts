"use client"
import { getUserCredByemail } from '@/lib/UserFetch';

export async function roleUpdateCheck(factId: string, role: string) {
    const user = await getUserCredByemail(factId);
    if (user) {
        if (user.role !== role) {
            window.location.href = '/app/logout';
        }
    }
}