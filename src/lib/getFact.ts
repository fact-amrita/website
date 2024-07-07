"use server"

import facts from "@/public/data.json";

export async function getFact() {
    const today = new Date().toISOString();
    const formattedDate = today.split("T")[0];
    // get the text where the date is formattedDate
    let fact = ""
    for (let i = 0; i < facts.length; i++) {
        if (facts[i]["date"].includes(formattedDate)) {
            fact = facts[i]["text"]
        }
    }
    return fact;
}