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
    var announcements = await db.announcements.findMany()
    announcements = announcements.filter((announcement) => {
        const visibleFrom = new Date(announcement.Visiblefrom);
        const visibleTill = new Date(announcement.VisibleTill);
        const currentDate = new Date();
        return visibleFrom <= currentDate && currentDate <= visibleTill;
    });
    return announcements;
}

export async function getTimelines() {
    var timelines = await db.timeline.findMany();

    // timelines = timelines.filter((timelines) => {
    //     const visibleFrom = new Date(timelines.Visiblefrom);
    //     const visibleTill = new Date(timelines.VisibleTill);
    //     const currentDate = new Date();
    //     return visibleFrom <= currentDate && currentDate <= visibleTill;
    // });

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
    var events = await db.events.findMany();
    events = events.filter((event) => {
        const visibleFrom = new Date(event.Visiblefrom);
        const visibleTill = new Date(event.VisibleTill);
        const currentDate = new Date();
        return visibleFrom <= currentDate && currentDate <= visibleTill;
    });
    return events;
}