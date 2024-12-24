import { generateStoicAdvice, analyzeJournalingTone } from "@/app/lib/gpt4";
import { NextResponse } from "next/server";

export async function test_gpt() {
    const prompt = "I don't know what the meaning of life is. I often find myself caring too much about material possessions that I forget about the people around me.";
    const advice = await generateStoicAdvice(prompt);
    console.log('Stoic advice:', advice);


    const journalEntry = "IM IN LOVE WITH LIFE I LOVE I LOVE I LOVE LIFE";
    const toneAnalysis = await analyzeJournalingTone(journalEntry);
    console.log("Tone Analysis:", toneAnalysis);
}

test_gpt();
