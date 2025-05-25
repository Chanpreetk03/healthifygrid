"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";
import {useRouter} from "next/navigation";
import { useUser } from '@clerk/nextjs'

export default function NewTopicPage() {
    const { user } = useUser()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router=useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Prepare author and avatar from Clerk user
        const author =
            user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.username || user?.primaryEmailAddress?.emailAddress || 'Anonymous'
        const avatar = user?.imageUrl || '/placeholder.svg?height=40&width=40'

        try {
            const response = await fetch('/api/topics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    tags: tags.split(',').map((tag) => tag.trim()),
                    author,
                    avatar,
                }),
            })
            if (!response.ok) throw new Error('Failed to create topic')
            router.push('/forum')
        } catch (error) {
            console.error('Error creating topic:', error);
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link
                    href="/forum"
                    className="flex items-center text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Forum
                </Link>
            </div>

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>Create New Topic</CardTitle>
                    <CardDescription>
                        Share your question, insight, or discussion with the
                        community
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Topic Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter a descriptive title for your topic"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={category}
                                onValueChange={setCategory}
                                required
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="calculations">
                                        Calculations
                                    </SelectItem>
                                    <SelectItem value="mitigation">
                                        Mitigation Techniques
                                    </SelectItem>
                                    <SelectItem value="regulations">
                                        Regulations
                                    </SelectItem>
                                    <SelectItem value="industry">
                                        Industry Specific
                                    </SelectItem>
                                    <SelectItem value="case-studies">
                                        Case Studies
                                    </SelectItem>
                                    <SelectItem value="general">
                                        General Discussion
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma separated)</Label>
                            <Input
                                id="tags"
                                placeholder="e.g. harmonics, filters, IEEE519"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                                Add relevant tags to help others find your topic
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Describe your topic in detail. You can include questions, observations, or requests for advice."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="min-h-[200px]"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center pt-4">
                            <p className="text-sm text-muted-foreground">
                                Please ensure your post follows our community
                                guidelines
                            </p>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/forum">Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        "Submitting..."
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            Post Topic
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
