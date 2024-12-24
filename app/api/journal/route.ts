import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { generateStoicAdvice } from "@/app/lib/gpt4";

export async function POST(request: Request) {
    try {
        const { userId, content } = await request.json();

        // Generate stoic advice for the journal entry
        const analysis = await generateStoicAdvice(content);

        // Save to database
        const query = `
            INSERT INTO journal_test (userid, content, analysis, createdat)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
            RETURNING *`;

        const values = [userId, content, analysis];
        const result = await pool.query(query, values);

        return NextResponse.json({
            success: true,
            entry: result.rows[0]
        });

    } catch (error) {
        console.error('Error creating journal entry:', error);
        return NextResponse.json(
            { error: 'Failed to create journal entry' },
            { status: 500 }
        );
    }
}