"use client"

import { useEffect, useState } from 'react';
import { Form, useFieldAnswer } from "@quillforms/renderer-core";
import '@quillforms/renderer-core/build-style/style.css';
import { registerCoreBlocks } from '@quillforms/react-renderer-utils';
import DataSave from './saveData'; // Ensure correct import
import { SessionProvider, useSession } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

registerCoreBlocks();

function FormApp() {
    const { toast } = useToast();
    const { data: session, status } = useSession();
    const [error, setError] = useState("");

    useEffect(() => {
        if (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Error Detected',
                description: `${error}`,
                duration: Infinity,
                position: 'center'
            });
            const newUrl = window.location.pathname;
            window.history.replaceState(null, '', newUrl);
        }
    }, [error, toast]);

    const skills: string[] = useFieldAnswer("skills") as string[];
    if (status === 'loading') {
        return <p></p>; // Suspense content can be added here
    }

    if (!session || !session.user) {
        return <div className="flex justify-center items-center h-screen">
            <div className="text-red-500 text-2xl">You need to be logged in to access your profile.</div>
        </div>;
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
                                    { label: "CSE", value: "CSE" },
                                    { label: "AIE", value: "AIE" },
                                    { label: "CYS", value: "CYS" },
                                    { label: "ECE", value: "ECE" },
                                    { label: "CCE", value: "CCE" },
                                    { label: "MEE", value: "MEE" },
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
                            name: "short-text",
                            id: "about",
                            attributes: {
                                label: "Tell us a bit about yourself",
                                required: true,
                            }
                        },
                        {
                            name: "multiple-choice",
                            id: "domain",
                            attributes: {
                                classnames: "first-block",
                                required: true,
                                label: "Which domain would you like to go with ?",
                                choices: [
                                    { label: "Physical Forensics", value: "Physical" },
                                    { label: "Digital Forensics", value: "Digital" },
                                ],
                            },
                        },
                        {
                            name: "multiple-choice",
                            id: "skills",
                            attributes: {
                                classnames: "first-block",
                                required: true,
                                label: "Which skills do you know ?",
                                choices: [
                                    { label: "React", value: "React" },
                                    { label: "JavaScript", value: "JavaScript" },
                                    { label: "Python", value: "Python" },
                                    { label: "Node.js", value: "Node.js" },
                                    { label: "HTML/CSS", value: "HTML/CSS" },
                                    { label: "None", value: "None" }
                                ],
                                "multiple": true,
                            },
                        },
                        ...(skills?.includes("React") ? [
                            {
                                name: "dropdown",
                                id: "reactexp",
                                attributes: {
                                    label: "How good are you in React ?",
                                    required: true,
                                    choices: [
                                        { label: "Beginner", value: "Beginner" },
                                        { label: "Intermediate", value: "Intermediate" },
                                        { label: "Expert", value: "Expert" },
                                    ],
                                }
                            }
                        ] : []),
                        ...(skills?.includes("JavaScript") ? [
                            {
                                name: "dropdown",
                                id: "jsexp",
                                attributes: {
                                    label: "How good are you in JavaScript ?",
                                    required: true,
                                    choices: [
                                        { label: "Beginner", value: "Beginner" },
                                        { label: "Intermediate", value: "Intermediate" },
                                        { label: "Expert", value: "Expert" },
                                    ],
                                }
                            }
                        ] : []),
                        ...(skills?.includes("Python") ? [
                            {
                                name: "dropdown",
                                id: "pyexp",
                                attributes: {
                                    label: "How good are you in Python ?",
                                    required: true,
                                    choices: [
                                        { label: "Beginner", value: "Beginner" },
                                        { label: "Intermediate", value: "Intermediate" },
                                        { label: "Expert", value: "Expert" },
                                    ],
                                }
                            }
                        ] : []),
                        ...(skills?.includes("Node.js") ? [
                            {
                                name: "dropdown",
                                id: "njsexp",
                                attributes: {
                                    label: "How good are you in Node.js ?",
                                    required: true,
                                    choices: [
                                        { label: "Beginner", value: "Beginner" },
                                        { label: "Intermediate", value: "Intermediate" },
                                        { label: "Expert", value: "Expert" },
                                    ],
                                }
                            }
                        ] : []),
                        ...(skills?.includes("HTML/CSS") ? [
                            {
                                name: "dropdown",
                                id: "htmlcssexp",
                                attributes: {
                                    label: "How good are you in HTML/CSS ?",
                                    required: true,
                                    choices: [
                                        { label: "Beginner", value: "Beginner" },
                                        { label: "Intermediate", value: "Intermediate" },
                                        { label: "Expert", value: "Expert" },
                                    ],
                                }
                            }
                        ] : []),
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
                            name: "short-text",
                            id: "linkedIn",
                            attributes: {
                                label: "What is your LinkedIn profile url ?",
                            },
                        },
                        {
                            name: "short-text",
                            id: "github",
                            attributes: {
                                label: "What is your GitHub profile url ?",
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
                onSubmit={async (
                    formData: any,
                    { completeForm, setIsSubmitting, goToBlock, setSubmissionErr }: any
                ) => {
                    setIsSubmitting(true);
                    try {
                        const updatedData = {
                            ...formData,
                            Name: userdat.name,
                            Email: userdat.email,
                            Role: userdat.role,
                            image: userdat.image
                        };

                        console.log(formData)

                        const saveSuccess = await DataSave(updatedData);

                        if (saveSuccess) {
                            completeForm();
                            window.location.href = "/app/auth/logout";
                        } else {
                            setError("This ID already exists. Please contact the club admin by submitting a ticket for further assistance");
                        }
                    } catch (error) {
                        setError("An unexpected error occurred. Please try again.");
                    } finally {
                        setIsSubmitting(false);
                    }
                }}
                applyLogic={false}
            />
            <Toaster />
        </div>
    );
}

export default function OnboardingPage() {
    return (
        <SessionProvider>
            <FormApp />
        </SessionProvider>
    );
}
