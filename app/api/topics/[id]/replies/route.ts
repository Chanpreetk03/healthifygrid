import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const replies = await prisma.reply.findMany({
      where: { topicId: params.id },
      orderBy: { createdAt: 'asc' },
    })
    return NextResponse.json(replies)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch replies' }, { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const reply = await prisma.reply.create({
      data: {
        content: body.content,
        author: body.author,
        avatar: body.avatar,
        topicId: params.id,
      },
    })
    // Increment reply count on topic
    await prisma.topic.update({
      where: { id: params.id },
      data: { replies: { increment: 1 }, lastActivity: String(new Date()) },
    })
    return NextResponse.json(reply, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post reply' }, { status: 500 })
  }
}