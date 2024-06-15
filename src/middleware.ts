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

    if (req.nextUrl.pathname === "/app/task/create") {
        if (!req.auth) {
            const url = req.url.replace(req.nextUrl.pathname, "/app/auth/login?error=You should be logged in to access")
            return Response.redirect(url)
        }
        if (req.auth) {
            const userdat = req.auth.user as { name: string; email: string; role: string; image: string; factId: string };
            if (userdat.role == "newbie" || userdat.role == "onboarding" || userdat.role == "member") {
                return Response.redirect(new URL('/404', req.url));
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



// Plan of optimization
// import { auth } from "@/auth"

// export default auth((req) => {
//     const { auth: requestAuth, nextUrl, url } = req;
//     const userdat = requestAuth?.user as { name: string; email: string; role: string; image: string; factId: string };

//     const redirectToLogin = (message: string) => {
//         const newUrl = url.replace(nextUrl.pathname, `/app/auth/login?error=${message}`);
//         return Response.redirect(newUrl);
//     }

//     const redirectToApp = (message: string) => {
//         const newUrl = url.replace(nextUrl.pathname, `/app?message=${message}`);
//         return Response.redirect(newUrl);
//     }

//     if (!requestAuth && nextUrl.pathname !== "/app/auth/login") {
//         return redirectToLogin("You should be logged in to access");
//     }

//     if (requestAuth) {
//         switch (nextUrl.pathname) {
//             case "/app/auth/login":
//                 return Response.redirect(url.replace(nextUrl.pathname, "/app"));
//             case "/app/task":
//                 if (userdat.role === "newbie") {
//                     return redirectToApp("Sorry, you can only access this page if you are a member");
//                 }
//                 break;
//             case "/app/task/create":
//                 if (["newbie", "onboarding", "member"].includes(userdat.role)) {
//                     return Response.redirect(new URL('/404', url));
//                 }
//                 break;
//             case "/app/onboarding":
//                 if (userdat.role !== "onboarding") {
//                     return redirectToApp("You don't need to onboard again. You are already onboarded.");
//                 }
//                 break;
//             default:
//                 break;
//         }
//     }
// });