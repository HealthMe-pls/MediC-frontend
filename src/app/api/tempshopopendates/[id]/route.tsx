import { NextRequest, NextResponse } from 'next/server';
import { setCorsHeaders } from '@/utility/corsUtils';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/tempshopopendates/${params.id}`);
    const data = await response.json();
    return NextResponse.json(data);
  }
  
  export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/tempshopopendates/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return NextResponse.json(data);
  }
  
  export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    await fetch(`${process.env.NEXT_PUBLIC_GO_API_URL}/tempshopopendates/${params.id}`, { method: 'DELETE' });
    return NextResponse.json({ message: 'Deleted successfully' });
  }
  