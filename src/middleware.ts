import { auth } from "@/auth"

export default auth((req) => {
    if (req.auth) {
        if (req.nextUrl.pathname === "/app/auth/login") {
            const url = req.url.replace(req.nextUrl.pathname, "/app/details")
            return Response.redirect(url)
        }
    }
})