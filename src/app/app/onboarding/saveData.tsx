"use server"

export default async function DataSave(data:any){
    // console.log(data)
    const DataDict={
        "branch":data["answers"]["branchcode"]["value"][0],
        "RollNumber":data["answers"]["rollnum"]["value"],
        "Domain":data["answers"]["domain"]["value"][0],
        "Birthday":data["answers"]["birthdate"]["value"],
        "PhoneNum":data["answers"]["phonenum"]["value"]
    }

    console.log(DataDict)
}