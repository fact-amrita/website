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
    var timelines = await db.timeline.findMany({
        orderBy: {
            Date: 'desc',
        },
    });
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

export async function changeSemester(year: string, semester: string) {
    const users = await db.user.findMany();

    const filteredUsers = users.filter((user) => {
        const factId = user.FactID;
        return factId.split("_")[2].slice(0, 2) == year;
    });

    try {
        for (const user of filteredUsers) {
            await db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    semester,
                },
            });
        }
    }
    catch (e) {
        console.log(e);
        return false;
    }

    return true;
}

// FACT of the Day updating

export async function getLatestFACT(){
    const factofTheDays = await db.factofTheDay.findMany();
    const factofTheDay=factofTheDays.filter((factofTheDay) => {
        const currentDate = new Date();
        const factDate = new Date(factofTheDay.Date);
        return factDate.toDateString() === currentDate.toDateString();
    })[0];
    return factofTheDay?.Fact;
}

export async function getFACTs() {
    var factofTheDays = await db.factofTheDay.findMany();
    return factofTheDays;
}

export async function addToFACT(description: string, date: string, Creator: string) {
    await db.factofTheDay.create({
        data: {
            Fact: description,
            Date: date,
            Creator: Creator,
        },
    });

    const factofTheDays = await db.factofTheDay.findMany();
    return factofTheDays;
}

export async function deleteFACT(id: string) {
    await db.factofTheDay.delete({
        where: {
            id,
        },
    });

    const factofTheDays = await db.factofTheDay.findMany();
    return factofTheDays;
}

