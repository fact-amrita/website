import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInwithGoogle, SignInwithGithub } from "../../app/app/auth/login/functions";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export const Social = () => {
    const { toast } = useToast();

    const handleGoogleSignIn = async () => {
        try {
            await SignInwithGoogle();
            toast({ title: "Successfully signed in with Google!" });
        } catch (error: any) {
            toast({ title: "Failed to sign in with Google", description: error.message });
        }
    };

    const handleGithubSignIn = async () => {
        try {
            await SignInwithGithub();
            toast({ title: "Successfully signed in with GitHub!" });
        } catch (error:any) {
            toast({ title: "Failed to sign in with GitHub", description: error.message });
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

            <Toaster />
        </div>
    );
};
