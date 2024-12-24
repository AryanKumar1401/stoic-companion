import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

async function generateStoicAdvice(prompt: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a Stoic philosopher providing advice based on Stoic principles. Quote a Stoic philosopher in your response."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
        });

        return response.choices[0].message.content || "No advice generated";
    } catch (error) {
        console.error('Error generating Stoic advice:', error);
        throw error;
    }
}

async function analyzeJournalingTone(journalEntry: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "Analyze this journal entry through a stoic lens:"
                },
                {
                    role: "user",
                    content: journalEntry
                }
            ],
            temperature: 0.7,
            max_tokens: 150
        });

        return response.choices[0].message.content || "No analysis generated";
    } catch (error) {
        console.error('Error analyzing journal tone:', error);
        throw error;
    }
}

export { generateStoicAdvice, analyzeJournalingTone };