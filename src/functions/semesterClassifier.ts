export function classifySemester(rollNum: string) {
    const year = rollNum.slice(0, 2);

    if (year == "21") {
        return "8"
    } else if (year == "22") {
        return "6"
    } else if (year == "23") {
        return "4"
    } else if (year == "24") {
        return "2"
    } else if (year == "25") {
        return "1"
    } else {
        return "0"
    }
}