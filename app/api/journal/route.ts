import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { generateStoicAdvice } from "@/app/lib/gpt4";

export async function POST(request: Request) {
    try {
        const { userId, content, philosopher } = await request.json();

        // Generate stoic advice for the journal entry
        const analysis = await generateStoicAdvice(`As ${philosopher}, provide philosophical advice for: ${content}. Use very simple language.`);

        // Save to database
        const query = `
            INSERT INTO journalentries (userid, content, analysis, createdat)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
            RETURNING *`;
        var values;
        if (userId) {
            values = [userId, content, analysis];
        }
        else {
            values = [1, content, analysis];
        }
        const result = await pool.query(query, values);

        return NextResponse.json({
            success: true,
            entry: result.rows[0],
            philosopher: philosopher
        });

    } catch (error) {
        console.error('Error creating journal entry:', error);
        return NextResponse.json(
            { error: 'Failed to create journal entry' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            );
        }

        const query = `
            SELECT * FROM journalentries
            WHERE userid = $1 
            ORDER BY createdat DESC`;

        const result = await pool.query(query, [userId]);

        return NextResponse.json({
            success: true,
            entries: result.rows
        });

    } catch (error) {
        console.error('Error fetching journal entries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch journal entries' },
            { status: 500 }
        );
    }
}