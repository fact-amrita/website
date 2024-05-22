import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInwithGoogle, SignInwithGithub } from "../../app/app/auth/login/functions";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export const Social = () => {
    const { toast } = useToast();

    const handleGoogleSignIn = async () => {
        try {
            await SignInwithGoogle();
            toast({ title: "Signed in with Google successfully!" });
        } catch (error: any) {
            toast({ title: "Failed to sign in with Google", description: error.message, variant: "destructive" });
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await SignInwithGithub();
            toast({ title: "Signed in with Github successfully!" });
        } catch (error: any) {
            toast({ title: "Failed to sign in with Github", description: error.message, variant: "destructive" });
        }
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
