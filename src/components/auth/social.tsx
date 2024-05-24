import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInwithGoogle, SignInwithGithub } from "../../app/app/auth/login/functions";
import { Button } from "../ui/button";

export const Social = () => {

    const handleGoogleSignIn = async () => {
        await SignInwithGoogle();
    };

    const handleGithubSignIn = async () => {
        await SignInwithGithub();
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                onClick={handleGoogleSignIn}
                size="lg"
                className="w-full"
                variant="outline"
            >
                <FcGoogle className="h-5 w-5" />
            </Button>

            <Button
                onClick={handleGithubSignIn}
                size="lg"
                className="w-full"
                variant="outline"
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
};
