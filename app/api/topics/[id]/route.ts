import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const resolvedParams = await params; // Resolve the Promise
    const topic = await prisma.topic.findUnique({
      where: { id: resolvedParams.id },
    });

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(topic);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}