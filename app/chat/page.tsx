'use client'

import { useRef, useEffect, ChangeEvent } from 'react'
import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/scroll-area'
import { Send, Bot, User, Loader2 } from 'lucide-react'

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
	const scrollAreaRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	// Auto-scroll to bottom when new messages are added
	useEffect(() => {
		if (scrollAreaRef.current) {
			const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
			if (scrollContainer) {
				scrollContainer.scrollTop = scrollContainer.scrollHeight
			}
		}
	}, [messages])

	// Focus input on mount
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	// Helper to format time if available
	const formatTime = (date?: Date | string) => {
		if (!date) return ''
		const d = typeof date === 'string' ? new Date(date) : date
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
	}

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<div className='max-w-4xl mx-auto'>
				<div className='text-center mb-8'>
					<h1 className='text-4xl font-bold mb-4'>HealthifyGrid AI Assistant</h1>
					<p className='text-xl text-muted-foreground'>
						Get instant help with harmonics, power quality, and regulatory compliance
					</p>
				</div>

				<Card className='h-[600px] flex flex-col'>
					<CardHeader className='border-b'>
						<CardTitle className='flex items-center'>
							<Bot className='mr-2 h-5 w-5 text-primary' />
							Chat with AI Assistant
						</CardTitle>
					</CardHeader>

					{/* Add min-h-0 and overflow-hidden to ensure scroll containment */}
					<CardContent className='flex-1 p-0 flex flex-col min-h-0 overflow-hidden'>
						{/* Add h-full and min-h-0 to ScrollArea */}
						<ScrollArea className='h-full min-h-0 p-4' ref={scrollAreaRef}>
							<div className='space-y-4'>
								{messages.map((message) => (
									<div
										key={message.id}
										className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
										{message.role !== 'user' && (
											<div className='flex-shrink-0'>
												<div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
													<Bot className='w-4 h-4 text-primary' />
												</div>
											</div>
										)}

										<div
											className={`max-w-[80%] rounded-lg px-4 py-2 ${
												message.role === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted'
											}`}>
											<div className='whitespace-pre-wrap'>
												{message.parts
													? message.parts.map((part, i) =>
															part.type === 'text' ? <div key={`${message.id}-${i}`}>{part.text}</div> : null
													  )
													: null}
											</div>
											<div
												className={`text-xs mt-1 ${
													message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
												}`}>
												{formatTime(message.createdAt)}
											</div>
										</div>

										{message.role === 'user' && (
											<div className='flex-shrink-0'>
												<div className='w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center'>
													<User className='w-4 h-4 text-secondary' />
												</div>
											</div>
										)}
									</div>
								))}

								{isLoading && (
									<div className='flex gap-3 justify-start'>
										<div className='flex-shrink-0'>
											<div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
												<Bot className='w-4 h-4 text-primary' />
											</div>
										</div>
										<div className='bg-muted rounded-lg px-4 py-2'>
											<div className='flex items-center gap-2'>
												<Loader2 className='w-4 h-4 animate-spin' />
												<span>Thinking...</span>
											</div>
										</div>
									</div>
								)}
							</div>
						</ScrollArea>
					</CardContent>

					<div className='border-t p-4'>
						<form onSubmit={handleSubmit} className='flex gap-2'>
							<Input
								ref={inputRef}
								value={input}
								onChange={handleInputChange}
								placeholder='Ask about harmonics, TDD/THD, regulations, or power quality...'
								disabled={isLoading}
								className='flex-1'
							/>
							<Button type='submit' disabled={isLoading || !input.trim()}>
								<Send className='w-4 h-4' />
							</Button>
						</form>
						<p className='text-xs text-muted-foreground mt-2'>
							This AI assistant can help with power quality topics. For complex technical issues, consider consulting
							with our experts.
						</p>
					</div>
				</Card>

				{/* Quick Actions */}
				<div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
					<Card
						className='p-4 hover:shadow-md transition-shadow cursor-pointer'
						onClick={() => {
							if (!isLoading) {
								const event = { target: { value: 'How do I calculate TDD for my system?' } }
								handleInputChange(event as ChangeEvent<HTMLInputElement>)
							}
						}}>
						<h3 className='font-medium mb-2'>Calculate TDD</h3>
						<p className='text-sm text-muted-foreground'>Learn how to calculate Total Demand Distortion</p>
					</Card>

					<Card
						className='p-4 hover:shadow-md transition-shadow cursor-pointer'
						onClick={() => {
							if (!isLoading) {
								const event = { target: { value: 'What are the best harmonic mitigation techniques?' } }
								handleInputChange(event as ChangeEvent<HTMLInputElement>)
							}
						}}>
						<h3 className='font-medium mb-2'>Mitigation Techniques</h3>
						<p className='text-sm text-muted-foreground'>Explore harmonic filtering solutions</p>
					</Card>

					<Card
						className='p-4 hover:shadow-md transition-shadow cursor-pointer'
						onClick={() => {
							if (!isLoading) {
								const event = { target: { value: 'What are PSERC penalty regulations?' } }
								handleInputChange(event as ChangeEvent<HTMLInputElement>)
							}
						}}>
						<h3 className='font-medium mb-2'>PSERC Regulations</h3>
						<p className='text-sm text-muted-foreground'>Understand compliance requirements</p>
					</Card>
				</div>
			</div>
		</div>
	)
}
