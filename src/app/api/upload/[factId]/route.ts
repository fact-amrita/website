import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest, { params }: { params: { factId: string } }) {
    const { factId } = params;

    return NextResponse.json({ "your ID": factId });

}