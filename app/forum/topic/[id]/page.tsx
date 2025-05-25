'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { Topic } from '@prisma/client'

export default function TopicDetailsPage() {
	const { id } = useParams() // Get the topic ID from the URL
	const [topic, setTopic] = useState<Topic>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!id) return

		// Fetch topic details from the API
		const fetchTopic = async () => {
			try {
				const res = await fetch(`/api/topics/${id}`)
				if (!res.ok) {
					throw new Error('Failed to fetch topic details')
				}
				const data = await res.json()
				setTopic(data)
			} catch (error) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchTopic()
	}, [id])

	if (isLoading) {
		return <div className='text-center py-12'>Loading...</div>
	}

	if (!topic) {
		return (
			<div className='text-center py-12'>
				<p className='text-lg font-medium'>Topic not found</p>
				<Link href='/forum'>
					<Button variant='outline' className='mt-4'>
						Back to Forum
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<div className='mb-8'>
				<Link href='/forum' className='flex items-center text-muted-foreground hover:text-primary'>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Back to Forum
				</Link>
			</div>

			<Card className='max-w-3xl mx-auto'>
				<CardContent className='p-6'>
					<div className='flex items-start gap-4'>
						<div>
							<Image src={topic.avatar} alt={topic.author} width={60} height={60} className='rounded-full' />
						</div>
						<div className='flex-grow'>
							<h1 className='text-2xl font-bold'>{topic.title}</h1>
							<p className='text-muted-foreground mt-2'>
								By: {topic.author} | Last Activity: {topic.lastActivity}
							</p>
							<p className='text-muted-foreground mt-1'>Category: {topic.category}</p>
							<div className='mt-4'>
								<p>{topic.content}</p>
							</div>
							<div className='mt-4'>
								<p className='text-sm text-muted-foreground'>Tags: {topic.tags.join(', ')}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
