import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	try {
		const topic = await prisma.topic.findUnique({
			where: { id },
		})

		if (!topic) {
			return NextResponse.json({ error: 'Topic not found' }, { status: 404 })
		}

		return NextResponse.json(topic)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 })
	}
}
