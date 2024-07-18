"use server"

import { db } from "@/lib/db";
import { promoteUser } from "@/lib/UserOperations";
import { classifySemester } from "@/functions/semesterClassifier"

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
        "about": dataGot["answers"]["about"]["value"],
        "reactexp": (dataGot["answers"]["reactexp"] && dataGot["answers"]["reactexp"]["value"] !== undefined) ? dataGot["answers"]["reactexp"]["value"] : null,
        "jsexp": (dataGot["answers"]["jsexp"] && dataGot["answers"]["jsexp"]["value"] !== undefined) ? dataGot["answers"]["jsexp"]["value"] : null,
        "pyexp": (dataGot["answers"]["pyexp"] && dataGot["answers"]["pyexp"]["value"] !== undefined) ? dataGot["answers"]["pyexp"]["value"] : null,
        "njsexp": (dataGot["answers"]["njsexp"] && dataGot["answers"]["njsexp"]["value"] !== undefined) ? dataGot["answers"]["njsexp"]["value"] : null,
        "htmlcssexp": (dataGot["answers"]["htmlcssexp"] && dataGot["answers"]["htmlcssexp"]["value"] !== undefined) ? dataGot["answers"]["htmlcssexp"]["value"] : null,
    }

    const factID = "FACT_" + DataDict["branch"] + "_" + DataDict["RollNumber"]

    const semester = classifySemester(DataDict["RollNumber"]);

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
            About: DataDict["about"],
            ReactExp: DataDict["reactexp"],
            NodeExp: DataDict["njsexp"],
            HTMLCSSExp: DataDict["htmlcssexp"],
            PythonExp: DataDict["pyexp"],
            JSExp: DataDict["jsexp"],
            semester: semester
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