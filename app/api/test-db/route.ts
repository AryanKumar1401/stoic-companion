import { NextResponse } from 'next/server';
import pool from '@/app/lib/db';

export async function GET() {
    try {
        const res = await pool.query('SELECT NOW()');
        return NextResponse.json({ success: true, time: res.rows[0] });
    } catch (err : any) {
        return NextResponse.json({ success: false, error: err.message });
    }
}
