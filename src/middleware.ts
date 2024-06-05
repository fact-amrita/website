import { auth } from "@/auth"

export default auth((req) => {
    if (req.auth && req.nextUrl.pathname === "/app/auth/login") {
        const url = req.url.replace(req.nextUrl.pathname, "/app")
        // deepcode ignore OR: The redirect URL is already mentioned by the previous line and is not changable from the client side
        return Response.redirect(url)
    }


    if (!req.auth && req.nextUrl.pathname === "/app") {
        const url = req.url.replace(req.nextUrl.pathname, "/app/auth/login?error=You should be logged in to access")
        return Response.redirect(url)
    }
})