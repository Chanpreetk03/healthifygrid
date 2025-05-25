'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageSquare, Search, Filter, PlusCircle, X } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import userIcon from '@/assests/userLogo.webp'
import { Topic } from '@prisma/client'

// Fetch topics from the database
async function fetchTopics() {
	const res = await fetch('/api/topics')
	if (!res.ok) {
		throw new Error('Failed to fetch topics')
	}
	return res.json()
}

interface TopicsListProps {
	filteredTopics: Topic[]
	searchQuery: string
	selectedCategories: string[]
	clearFilters: () => void
	toggleCategory: (category: string) => void
}

function TopicsList({
	filteredTopics,
	searchQuery,
	selectedCategories,
	clearFilters,
	toggleCategory,
}: TopicsListProps) {
	return (
		<>
			{/* Active Filters */}
			{selectedCategories.length > 0 && (
				<div className='flex flex-wrap gap-2 mb-4'>
					{selectedCategories.map((category: string) => (
						<div key={category} className='bg-muted rounded-full px-3 py-1 text-sm flex items-center'>
							{category}
							<Button variant='ghost' size='icon' className='h-5 w-5 ml-1' onClick={() => toggleCategory(category)}>
								<X className='h-3 w-3' />
							</Button>
						</div>
					))}
					<Button variant='ghost' size='sm' className='text-muted-foreground' onClick={() => clearFilters()}>
						Clear All
					</Button>
				</div>
			)}
			{/* Topics List */}
			<div className='space-y-4'>
				{filteredTopics.map((topic: Topic) => (
					<Card key={topic.id} className='hover:shadow-md transition-shadow'>
						<CardContent className='p-6'>
							<div className='flex items-start gap-4'>
								<div className='hidden md:block'>
									<Image
										src={topic.avatar && topic.avatar.startsWith('http') ? topic.avatar : userIcon}
										alt={topic.author}
										width={40}
										height={40}
										className='rounded-full'
									/>
								</div>
								<div className='flex-grow'>
									<Link href={`/forum/topic/${topic.id}`} className='text-lg font-semibold hover:text-primary'>
										{topic.title}
									</Link>
									<div className='flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-muted-foreground'>
										<div>By: {topic.author}</div>
										<div className='flex items-center'>
											<MessageSquare className='mr-1 h-4 w-4' />
											{topic.replies} replies
										</div>
										<div>Category: {topic.category}</div>
										<div>Last activity: {topic.lastActivity}</div>
									</div>
								</div>
								<div className='hidden md:flex flex-col items-center justify-center bg-muted px-4 py-2 rounded-md'>
									<div className='text-2xl font-bold'>{topic.replies}</div>
									<div className='text-xs text-muted-foreground'>Replies</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}

				{/* No results message */}
				{(searchQuery || selectedCategories.length > 0) && filteredTopics.length === 0 && (
					<div className='text-center py-12'>
						<p className='text-lg font-medium'>No topics found</p>
						<p className='text-muted-foreground mt-1'>Try adjusting your search or filters</p>
						<Button variant='outline' className='mt-4' onClick={clearFilters}>
							Clear All Filters
						</Button>
					</div>
				)}
			</div>
			{filteredTopics.length > 0 && (
				<div className='flex justify-center mt-8'>
					<div className='flex gap-2'>
						<Button variant='outline' size='sm' disabled>
							Previous
						</Button>
						<Button variant='outline' size='sm' className='bg-primary text-primary-foreground'>
							1
						</Button>
						<Button variant='outline' size='sm'>
							2
						</Button>
						<Button variant='outline' size='sm'>
							3
						</Button>
						<Button variant='outline' size='sm'>
							Next
						</Button>
					</div>
				</div>
			)}
		</>
	)
}

export default function ForumPage() {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCategories, setSelectedCategories] = useState<string[]>([])
	const [topics, setTopics] = useState<Topic[]>([]) // Full list of topics
	const [filteredTopics, setFilteredTopics] = useState<Topic[]>([]) // Filtered list of topics
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		fetchTopics()
			.then((data) => {
				setTopics(data)
				setFilteredTopics(data)
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false))
	}, [])

	useEffect(() => {
		let filtered = [...topics]
		if (searchQuery) {
			const query = searchQuery.toLowerCase()
			filtered = filtered.filter(
				(topic) =>
					topic.title.toLowerCase().includes(query) ||
					topic.author.toLowerCase().includes(query) ||
					topic.category.toLowerCase().includes(query)
			)
		}
		if (selectedCategories.length > 0) {
			filtered = filtered.filter((topic) => selectedCategories.includes(topic.category))
		}
		setFilteredTopics(filtered)
	}, [searchQuery, selectedCategories, topics])

	const toggleCategory = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
		)
	}

	const clearFilters = () => {
		setSearchQuery('')
		setSelectedCategories([])
	}

	const categories = Array.from(new Set(topics.map((topic) => topic.category)))

	return (
		<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
				<div>
					<h1 className='text-4xl font-bold mb-2'>Community Forum</h1>
					<p className='text-muted-foreground'>Connect with experts, ask questions, and share solutions</p>
				</div>
				<Button asChild>
					<Link href='/forum/new-topic'>
						<PlusCircle className='mr-2 h-4 w-4' />
						New Topic
					</Link>
				</Button>
			</div>
			{/* Search and Filter */}
			<div className='flex flex-col md:flex-row gap-4 mb-8'>
				<div className='relative flex-grow'>
					<Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
					<Input
						placeholder='Search topics...'
						className='pl-10'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					{searchQuery && (
						<Button
							variant='ghost'
							size='icon'
							className='absolute right-2 top-2 h-6 w-6'
							onClick={() => setSearchQuery('')}>
							<X className='h-4 w-4' />
						</Button>
					)}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline'>
							<Filter className='mr-2 h-4 w-4' />
							Filter
							{selectedCategories.length > 0 && (
								<span className='ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs'>
									{selectedCategories.length}
								</span>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-56'>
						{categories.map((category) => (
							<DropdownMenuCheckboxItem
								key={category}
								checked={selectedCategories.includes(category)}
								onCheckedChange={() => toggleCategory(category)}>
								{category}
							</DropdownMenuCheckboxItem>
						))}
						{(searchQuery || selectedCategories.length > 0) && (
							<Button variant='ghost' size='sm' className='w-full mt-2' onClick={clearFilters}>
								Clear All Filters
							</Button>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{/* Loader */}
			{loading ? (
				<div className='space-y-4'>
					{Array.from({ length: 3 }).map((_, i) => (
						<Card key={i} className='hover:shadow-md transition-shadow'>
							<CardContent className='p-6'>
								<div className='flex items-start gap-4'>
									<div className='hidden md:block'>
										<Skeleton className='w-10 h-10 rounded-full' />
									</div>
									<div className='flex-grow space-y-2'>
										<Skeleton className='h-6 w-2/3' />
										<Skeleton className='h-4 w-1/2' />
										<Skeleton className='h-4 w-1/3' />
									</div>
									<div className='hidden md:flex flex-col items-center justify-center bg-muted px-4 py-2 rounded-md'>
										<Skeleton className='h-6 w-8 mb-1' />
										<Skeleton className='h-3 w-10' />
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<TopicsList
					filteredTopics={filteredTopics}
					searchQuery={searchQuery}
					selectedCategories={selectedCategories}
					clearFilters={clearFilters}
					toggleCategory={toggleCategory}
				/>
			)}
		</div>
	)
}
