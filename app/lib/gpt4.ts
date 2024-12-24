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
                    content: "Pretend that you're the given philosopher and give advice:"
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
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Pretend that you're the given philosopher and analyze the tone of the journal entry"
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