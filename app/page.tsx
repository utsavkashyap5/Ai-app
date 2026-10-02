
"use client";

import { generateTextAction } from "@/app/actions/aiActions";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
export default function Home() {
    const [prompt, setPrompt] = useState<string>("");
    const [output, setOutput] = useState<string>("");

    const handleSendPrompt = async () => {
        if (!prompt.trim()) return;

        const response = await generateTextAction(prompt);

        setOutput(response);
        setPrompt("");
    };

    return (
        <div>
            <main className="flex flex-col items-center h-screen w-screen px-12 py-5">

                {output && (
                    <div className="w-full h-[80%] border rounded-md p-4 overflow-y-auto">
                        <h1>AI Response</h1>
                        <ReactMarkdown>{output}</ReactMarkdown>
                    </div>
                )}

                <div className="bottom-6 fixed flex w-full items-center justify-between px-24 py-2">
                    <input
                        className="border p-2 rounded-md w-[80%] outline-none"
                        placeholder="Type your message here..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendPrompt();
                            }
                        }}
                    />

                    <button
                        onClick={handleSendPrompt}
                        className="bg-neutral-700 text-white p-2 cursor-pointer rounded-md ml-4 w-[18%]"
                    >
                        Send
                    </button>
                </div>

            </main>
        </div>
    );
}
