"use client";

interface LoginButtonProps {
    children: React.ReactNode;
    mode: "modal" | "redirect",
    asChild?: boolean;
};

export const LoginButton =({
    children,
    mode ="redirect",
    asChild

}: LoginButtonProps) => {
    const onCLick = () => {
        console.log("Login Button Clicked");
    }

    return (
        <span onClick = {onCLick} className="cursor-pointer">
            {children}
        </span>
    )
}