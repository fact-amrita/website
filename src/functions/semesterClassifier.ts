export function classifySemester(rollNum: string) {
    const year = rollNum.slice(0, 2);

    if (year == "21") {
        return "7"
    } else if (year == "22") {
        return "5"
    } else if (year == "23") {
        return "3"
    } else if (year == "24") {
        return "1"
    } else if (year == "25") {
        return "1"
    } else {
        return "0"
    }
}