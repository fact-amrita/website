"use server"

import { db } from "@/lib/db";
import { promoteUser } from "@/lib/UserOperations";
import { SignOutfromAll } from "@/lib/signout";

export default async function DataSave(dataGot: any) {
    const DataDict = {
        "name": dataGot["Name"],
        "email": dataGot["Email"],
        "image": dataGot["image"],
        "branch": dataGot["answers"]["branchcode"]["value"][0],
        "RollNumber": dataGot["answers"]["rollnum"]["value"],
        "Domain": dataGot["answers"]["domain"]["value"][0],
        "Birthday": dataGot["answers"]["birthdate"]["value"],
        "PhoneNum": dataGot["answers"]["phonenum"]["value"],
        "LinkedIn": dataGot["answers"]["linkedIn"]["value"],
        "github": dataGot["answers"]["github"]["value"],
        "about": dataGot["answers"]["about"]["value"]
    }

    const factID = "FACT_" + DataDict["branch"] + "_" + DataDict["RollNumber"]

    const IDExisting = await db.user.findUnique({
        where: {
            FactID: factID
        }
    })

    if (IDExisting) {
        return false
    }

    await db.user.create({
        data: {
            name: DataDict["name"],
            email: DataDict["email"],
            image: DataDict["image"],
            FactID: factID,
            domain: DataDict["Domain"],
            birthday: DataDict["Birthday"],
            phone: DataDict["PhoneNum"],
            RegisterDate: new Date().toISOString(),
            role: "member",
            linkedInURL: DataDict["LinkedIn"],
            githubURL: DataDict["github"],
            About: DataDict["about"]
        }
    })

    await promoteUser(DataDict["email"])

    await db.points.create({
        data: {
            FactID: factID,
            points: 0,
            domain: DataDict["Domain"]
        },
    });

    return true
}