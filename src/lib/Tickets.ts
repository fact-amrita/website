"use server"

import { db } from '@/lib/db';
import { TicketIdGen } from '@/functions/TicketIdgen';

export async function createTicket(ticketData: any) {

    let ticketId = TicketIdGen();
    let task = await db.tickets.findFirst({
        where: {
            TicketId: ticketId
        }
    });
    while (task) {
        ticketId = TicketIdGen();
        task = await db.tickets.findFirst({
            where: {
                TicketId: ticketId
            }
        });
    }

    let clearanceState: boolean;
    if (ticketData.TicketType === "Feedback") {
        clearanceState = true;
    } else {
        clearanceState = false;
    }

    if (!ticketData.FactID) {
        ticketData.FactID = "Anonymous"; // temporary fix
    }

    const ticket = await db.tickets.create({
        data: {
            TicketId: ticketId,
            FactID: ticketData.FactID,
            TicketType: ticketData.TicketType,
            TicketContent: ticketData.TicketContent,
            DateTime: new Date().valueOf(),
            cleared: clearanceState
        }
    })

    return ticket.TicketId
}

export async function getTickets() {
    return await db.tickets.findMany({
        orderBy: {
            DateTime: "desc"
        }
    });
}

export async function getTicketsByType(ticketType: string) {
    if (ticketType === "Feedback" || ticketType === "Complaint") {
        return await db.tickets.findMany({
            where: {
                TicketType: ticketType
            }
        });
    } else {
        return await db.tickets.findMany();
    }
}

export async function getTicketById(ticketId: string) {
    return await db.tickets.findUnique({
        where: {
            TicketId: ticketId
        }
    });
}

export async function getTicketsByClearanceStatus(cleared: boolean) {
    return await db.tickets.findMany({
        where: {
            cleared: cleared
        }
    });
}

export async function clearTicket(ticketId: string) {
    return await db.tickets.update({
        where: {
            TicketId: ticketId
        },
        data: {
            cleared: true
        }
    });
}

export async function getTicketsByUserId(userId: string) {
    return await db.tickets.findMany({
        where: {
            FactID: userId
        }
    });
}