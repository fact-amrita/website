"use server"

import { db } from "@/lib/db";

export async function createAnnouncement(visibleFromDate: string, visibleToDate: string, description: string) {
    const announcement = await db.announcements.create({
        data: {
            Visiblefrom: visibleFromDate,
            VisibleTill: visibleToDate,
            Announcement: description,
        },
    });

    return announcement;
}

export async function getTimelines() {
    const timelines = await db.timeline.findMany();
    return timelines;
}

export async function addToTimeline(description: string, date: string) {
    await db.timeline.create({
        data: {
            Title: description,
            Date: date,
        },
    });

    const timelines = await db.timeline.findMany();
    return timelines;
}

export async function deleteTimeline(id: string) {
    await db.timeline.delete({
        where: {
            id,
        },
    });

    const timelines = await db.timeline.findMany();
    return timelines;
}