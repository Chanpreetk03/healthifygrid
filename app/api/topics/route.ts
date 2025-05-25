import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const topics = await prisma.topic.findMany({
			orderBy: {
				lastActivity: 'desc', // Order by last activity date
			},
		})
		return NextResponse.json(topics)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json()

		const newTopic = await prisma.topic.create({
			data: {
				title: body.title,
				content: body.content,
				category: body.category,
				tags: body.tags, // Assuming tags is an array
				author: body.author,
				avatar: body.avatar,
				replies: 0, // Default value for new topics
				views: 0, // Default value for new topics
				lastActivity: String(new Date()), // Set to the current date
			},
		})

		return NextResponse.json(newTopic, { status: 201 })
	} catch (error) {
		console.error('Error creating topic:', error)
		return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 })
	}
}
