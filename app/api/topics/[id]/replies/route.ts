import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params
		const replies = await prisma.reply.findMany({
			where: { topicId: id },
			orderBy: { createdAt: 'asc' },
		})
		return NextResponse.json(replies)
	} catch (error) {
		return NextResponse.json({ error: 'Failed to fetch replies', e: error }, { status: 500 })
	}
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params
		const body = await req.json()
		const reply = await prisma.reply.create({
			data: {
				content: body.content,
				author: body.author,
				avatar: body.avatar,
				topicId: id,
			},
		})
		// Increment reply count on topic
		await prisma.topic.update({
			where: { id },
			data: { replies: { increment: 1 }, lastActivity: String(new Date()) },
		})
		return NextResponse.json(reply, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error: 'Failed to post reply', e: error }, { status: 500 })
	}
}
