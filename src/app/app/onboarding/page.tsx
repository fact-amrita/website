"use client"

import { Form } from "@quillforms/renderer-core";
import "@quillforms/renderer-core/build-style/style.css";
import { registerCoreBlocks } from "@quillforms/react-renderer-utils";
import DataSave from "./saveData";
import { SessionProvider, useSession } from 'next-auth/react';

import { SignOutfromAll } from "@/lib/signout";

registerCoreBlocks();
function FormApp() {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p></p>; // Suspense content can be added here
    }

    if (!session || !session.user) {
        return <p>You need to be logged in to access this page.</p>;
    }

    const userdat = session.user as { name: string; email: string; role: string; image: string; };

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <Form
                formId={1}
                formObj={{
                    messages: {
                        "block.defaultThankYouScreen.label": "Now that you've been onboarded, you are officially a member of the club.\n\nPlease proceed to your " + '<a href="/app" style={{text-decoration:"underline"}}>dashboard</a>',
                        "label.errorAlert.range": "Please enter a correct number",
                        "label.submitBtn": "Let's Go !!!",
                    },
                    blocks: [
                        {
                            name: "welcome-screen",
                            id: "jg1401r",
                            attributes: {
                                label: "Let's get you onboarded into the club!",
                                description: "Congratulations, you're very close to becoming a member of the FACT club. \n\nPlease provide your details to get you started",
                            },
                        },
                        {
                            name: "multiple-choice",
                            id: "branchcode",
                            attributes: {
                                classnames: "first-block",
                                required: true,
                                label: "Let's start with your course branch",
                                choices: [
                                    {
                                        label: "CSE",
                                        value: "CSE",
                                    },
                                    {
                                        label: "AIE",
                                        value: "AIE",
                                    },
                                    {
                                        label: "CYS",
                                        value: "CYS",
                                    },
                                    {
                                        label: "ECE",
                                        value: "ECE",
                                    },
                                    {
                                        label: "CCE",
                                        value: "CCE",
                                    },
                                    {
                                        label: "MEE",
                                        value: "MEE",
                                    },
                                ],
                            },
                        },
                        {
                            name: "number",
                            id: "rollnum",
                            attributes: {
                                required: true,
                                multiple: true,
                                setMin: true,
                                min: 19000,
                                verticalAlign: false,
                                setMax: true,
                                max: 30000,
                                label: "What is your roll number?",
                            },
                        },
                        {
                            name: "multiple-choice",
                            id: "domain",
                            attributes: {
                                classnames: "first-block",
                                required: true,
                                label: "Which domain would you like to go with ?",
                                choices: [
                                    {
                                        label: "Physical Forensics",
                                        value: "Physical",
                                    },
                                    {
                                        label: "Digital Forensics",
                                        value: "Digital",
                                    },
                                ],
                            },
                        },
                        {
                            name: "date",
                            id: "birthdate",
                            attributes: {
                                format: "DDMMYYYY",
                                separator: "/",
                                label: "When is your birthday ?",
                            },
                        },
                        {
                            name: "number",
                            id: "phonenum",
                            attributes: {
                                min: 1000000000,
                                max: 9999999999,
                                label: "Where can we contact you ?",
                            },
                        },
                        {
                            name: "statement",
                            id: "CompletionStatement",
                            attributes: {
                                label: "Complete onboarding ?\n\nYou will be logged out to complete the process on our servers.",
                                buttonText: "Complete",
                                quotationMarks: true,
                            },
                        },
                    ],
                    settings: {
                        disableProgressBar: false,
                        disableNavigationArrows: false,
                    },
                }}
                onSubmit={(
                    formData,
                    { completeForm, setIsSubmitting, goToBlock, setSubmissionErr }
                ) => {
                    const updatedData = { ...formData, "Name": userdat.name, "Email": userdat.email, "Role": userdat.role, "image": userdat.image }
                    DataSave(updatedData);
                    setTimeout(() => {
                        setIsSubmitting(false);
                        completeForm();
                        SignOutfromAll();
                    }, 500);
                }} applyLogic={false} />
        </div>
    );
};


export default function OnboardingPage() {
    return (
        <SessionProvider>
            <FormApp />
        </SessionProvider>
    );
}