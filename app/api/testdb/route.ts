import { generateStoicAdvice, analyzeJournalingTone } from "@/app/lib/gpt4";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const prompt = "I don't know what the meaning of life is. I often find myself caring too much about material possessions that I forget about the people around me.";
        const advice = await generateStoicAdvice(prompt);

        const journalEntry = "IM IN LOVE WITH LIFE I LOVE I LOVE I LOVE LIFE";
        const toneAnalysis = await analyzeJournalingTone(journalEntry);

        return NextResponse.json({
            stoicAdvice: advice,
            toneAnalysis: toneAnalysis
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}