import { db } from '@/lib/db';

export async function createTicket(ticketData: any) {
    const ticket = await db.tickets.create({
        data: {
            TicketId: ticketData.TicketId,
            FactID: ticketData.UserId,
            TicketType: ticketData.TicketType,
            DateTime: new Date().toISOString(), 
            cleared: false
        }
    })
}

export async function getTickets() {
    return await db.tickets.findMany();
}

export async function getTicketsByType(ticketType: string) {
    return await db.tickets.findMany({
        where: {
            TicketType: ticketType
        }
    });
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