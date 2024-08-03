import { auth } from "@/auth"

export default auth((req) => {
    const url = new URL(req.url);
    const isAuthenticated = req.auth;
    const requestedPath = req.nextUrl.pathname;

    // General redirection for unauthenticated users trying to access /app routes
    if (!isAuthenticated && requestedPath.startsWith("/app") && requestedPath !== "/app/login") {
        url.pathname = "/app/login";
        url.searchParams.set("redirect", requestedPath);
        return Response.redirect(url.toString());
    }

    if (isAuthenticated && requestedPath === "/app/login") {
        url.pathname = "/app";
        return Response.redirect(url.toString());
    }

    if (requestedPath === "/app/tasks") {
        if (!isAuthenticated) {
            url.pathname = "/app/login";
            url.searchParams.set("error", "You should be logged in to access");
            return Response.redirect(url.toString());
        } else {
            const userdat = req.auth?.user as { name: string; email: string; role: string; image: string; factId: string };
            if (userdat.role === "newbie" || userdat.role === "onboarding") {
                url.pathname = "/app";
                url.searchParams.set("message", "Sorry, you can only access this page if you are a member");
                return Response.redirect(url.toString());
            }
        }
    }

    if (requestedPath === "/app/ticket/ticket-table") {
        if (isAuthenticated) {
            const userdat = req.auth?.user as { name: string; email: string; role: string; image: string; factId: string };
            if (userdat.role !== "admin") {
                return Response.redirect(new URL('/404', req.url));
            }
        } else {
            url.pathname = "/app/login";
            url.searchParams.set("error", "You should be logged in to access");
            return Response.redirect(url.toString());
        }
    }

    if (requestedPath === "/app/profile/undefined") {
        if (isAuthenticated) {
            url.pathname = "/app";
            url.searchParams.set("message", "This user does not exist.");
            return Response.redirect(url.toString());
        }
    }

    if (requestedPath === "/app/tasks/create") {
        if (!isAuthenticated) {
            url.pathname = "/app/login";
            url.searchParams.set("error", "You should be logged in to access");
            return Response.redirect(url.toString());
        } else {
            const userdat = req.auth?.user as { name: string; email: string; role: string; image: string; factId: string };
            if (userdat.role === "newbie" || userdat.role === "onboarding" || userdat.role === "member") {
                return Response.redirect(new URL('/404', req.url));
            }
        }
    }

    if (requestedPath === "/app/onboarding") {
        if (!isAuthenticated) {
            url.pathname = "/app/login";
            url.searchParams.set("error", "You should be logged in to access");
            return Response.redirect(url.toString());
        } else if (isAuthenticated && req.auth?.user) {
            const userdat = req.auth?.user as { name: string; email: string; role: string; image: string; factId: string };
            if (userdat.role !== "onboarding") {
                url.pathname = "/app";
                url.searchParams.set("message", "You don't need to onboard again. You are already onboarded.");
                return Response.redirect(url.toString());
            }
        } else {
            return Response.redirect(new URL('/404', req.url));
        }
    }

    if (!isAuthenticated && requestedPath === "/app") {
        url.pathname = "/app/login";
        url.searchParams.set("error", "You should be logged in to access");
        return Response.redirect(url.toString());
    }

    if (isAuthenticated && requestedPath.startsWith("/app/administration")) {
        const userdat = req.auth?.user as { name: string; email: string; role: string; image: string; factId: string };
        if ((userdat.role !== "admin") && (userdat.role !== "president") && (userdat.role !== "moderator")) {
            return Response.redirect(new URL('/404', req.url));
        }
    }

    if (isAuthenticated && requestedPath.startsWith("/app/ticket/ticket-table")) {
        const userdat = req.auth?.user as { name: string; email: string; role: string; image: string; factId: string };
        if (userdat.role !== "admin") {
            return Response.redirect(new URL('/404', req.url));
        }
    }

});
