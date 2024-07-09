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

export async function getAnnouncements() {
    const announcements = await db.announcements.findMany({
        where: {
            Visiblefrom: {
                lte: (new Date()).toString()
            },
            VisibleTill: {
                gte: (new Date()).toString()
            }
        }
    })

    return announcements;
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

export async function createEvent(description: string, visibleFromDate: string, visibleToDate: string, link: string) {
    await db.events.create({
        data: {
            Description: description,
            Visiblefrom: visibleFromDate,
            VisibleTill: visibleToDate,
            Link: link,
        },
    });
}

export async function getEvents() {
    const events = await db.events.findMany({
        where: {
            Visiblefrom: {
                lte: (new Date()).toString()
            },
            VisibleTill: {
                gte: (new Date()).toString()
            }
        }
    });

    return events;
}