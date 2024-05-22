import { CardWrapper } from "./card-wrapper"

export const LoginForm = ()  => {
    return (
    <div>
        <CardWrapper
            headerLabel="Welcome Back"
            backButtonLabel="Home"
            backButtonHref="/"
            showSocial children={undefined}        >
        </CardWrapper>
    </div>
    )
}