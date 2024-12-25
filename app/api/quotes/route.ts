import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET() {
    try {
        const query = `
        SELECT text,author FROM quotes
        ORDER BY random()
        LIMIT 1`;
        const result = await pool.query(query);

        return NextResponse.json({
            success: true,
            quote: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching quote:', error);
        return NextResponse.json(
            { error: 'Failed to fetch quote' },
            { status: 500 }
        );
    }
}