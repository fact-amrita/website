export default function titleGet(role: string) {
    if (role === "admin") {
        return "Administrator"
    } else if (role === "newbie") {
        return "Guest"
    } else if (role === "member") {
        return "Member"
    } else if (role === "onboarding") {
        return ("Onboarding")
    } else if (role === "moderator") {
        return "Moderator"
    } else if (role === "president") {
        return "President"
    } else {
        return "Guest"
    }
}