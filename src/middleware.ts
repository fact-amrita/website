import { auth } from "@/auth"

export default auth((req) => {


    if (req.auth && req.nextUrl.pathname === "/app/auth/login") {
        const url = req.url.replace(req.nextUrl.pathname, "/app")
        // deepcode ignore OR: The redirect URL is already mentioned by the previous line and is not changable from the client side
        return Response.redirect(url)
    }

    if (req.nextUrl.pathname === "/app/task") {
        if (!req.auth) {
            const url = req.url.replace(req.nextUrl.pathname, "/app/auth/login?error=You should be logged in to access")
            return Response.redirect(url)
        }

        if (req.auth) {
            const userdat = req.auth.user as { name: string; email: string; role: string; image: string; factId: string };
            if (userdat.role == "newbie") {
                const url = req.url.replace(req.nextUrl.pathname, "/app?message=Sorry, you can only access this page if you are a member")
                return Response.redirect(url)
            }
        }
    }

    if (req.nextUrl.pathname === "/app/onboarding") {
        if (!req.auth) {
            const url = req.url.replace(req.nextUrl.pathname, "/app/auth/login?error=You should be logged in to access")
            return Response.redirect(url)
        }
        if (req.auth && req.auth.user) {
            const userdat = req.auth.user as { name: string; email: string; role: string; image: string; factId: string };
            if (userdat.role !== "onboarding") {
                const url = req.url.replace(req.nextUrl.pathname, "/app?message=You don't need to onboard again. You are already onboarded.")
                return Response.redirect(url)
            }
        }

    }

    if (!req.auth && req.nextUrl.pathname === "/app") {
        const url = req.url.replace(req.nextUrl.pathname, "/app/auth/login?error=You should be logged in to access")
        return Response.redirect(url)
    }
})