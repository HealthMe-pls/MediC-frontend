import { NextRequest, NextResponse } from 'next/server';
import { setCorsHeaders } from '@/utility/corsUtils';

export async function GET() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/tempshopopendates`);
    const data = await response.json();
    return NextResponse.json(data);
  }
  
  export async function POST(req: NextRequest) {
    const body = await req.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/tempshopopendates`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return NextResponse.json(data);
  }
  