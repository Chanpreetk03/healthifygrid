'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { Topic } from '@prisma/client'
import { useUser } from '@clerk/nextjs'

interface Reply {
	id: string
	content: string
	author: string
	avatar: string
	createdAt: string
}

export default function TopicDetailsPage() {
	const { id } = useParams()
	const { user } = useUser()
	const [topic, setTopic] = useState<Topic>()
	const [replies, setReplies] = useState<Reply[]>([])
	const [replyContent, setReplyContent] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [isReplying, setIsReplying] = useState(false)

	// Fetch topic
	useEffect(() => {
		if (!id) return
		const fetchTopic = async () => {
			try {
				const res = await fetch(`/api/topics/${id}`)
				if (!res.ok) throw new Error('Failed to fetch topic details')
				setTopic(await res.json())
			} catch (error) {
				console.error(error)
			} finally {
				setIsLoading(false)
			}
		}
		fetchTopic()
	}, [id])

	// Fetch replies
	useEffect(() => {
		if (!id) return
		const fetchReplies = async () => {
			try {
				const res = await fetch(`/api/topics/${id}/replies`)
				if (!res.ok) throw new Error('Failed to fetch replies')
				setReplies(await res.json())
			} catch (error) {
				console.error(error)
			}
		}
		fetchReplies()
	}, [id])

	// Handle reply submit
	const handleReply = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsReplying(true)
		// Prepare author and avatar from Clerk user
		const author =
			user?.firstName && user?.lastName
				? `${user.firstName} ${user.lastName}`
				: user?.username || user?.primaryEmailAddress?.emailAddress || 'Anonymous'
		const avatar = user?.imageUrl || '/placeholder.svg?height=40&width=40'

		try {
			const res = await fetch(`/api/topics/${id}/replies`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					content: replyContent,
					author,
					avatar,
				}),
			})
			if (!res.ok) throw new Error('Failed to post reply')
			setReplyContent('')
			// Refresh replies and topic (for reply count)
			const repliesRes = await fetch(`/api/topics/${id}/replies`)
			setReplies(await repliesRes.json())
			const topicRes = await fetch(`/api/topics/${id}`)
			setTopic(await topicRes.json())
		} catch (error) {
			console.error(error)
		} finally {
			setIsReplying(false)
		}
	}

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

			<Card className='max-w-3xl mx-auto mb-8'>
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
							<div className='mt-4'>
								<p className='text-sm text-muted-foreground'>Replies: {topic.replies}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Replies Section */}
			<Card className='max-w-3xl mx-auto mb-8'>
				<CardContent className='p-6'>
					<h2 className='text-xl font-semibold mb-4'>Replies</h2>
					{replies.length === 0 && <p className='text-muted-foreground'>No replies yet.</p>}
					<ul>
						{replies.map((reply) => (
							<li key={reply.id} className='mb-6 flex items-start gap-3'>
								<Image src={reply.avatar} alt={reply.author} width={36} height={36} className='rounded-full' />
								<div>
									<div className='font-medium'>{reply.author}</div>
									<div className='text-sm text-muted-foreground'>{new Date(reply.createdAt).toLocaleString()}</div>
									<div className='mt-1'>{reply.content}</div>
								</div>
							</li>
						))}
					</ul>
					{/* Reply Form */}
					<form onSubmit={handleReply} className='mt-6 flex flex-col gap-2'>
						<textarea
							className='border rounded p-2'
							rows={3}
							placeholder='Write your reply...'
							value={replyContent}
							onChange={(e) => setReplyContent(e.target.value)}
							required
							disabled={isReplying}
						/>
						<Button type='submit' disabled={isReplying || !replyContent.trim()}>
							{isReplying ? 'Posting...' : 'Post Reply'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
