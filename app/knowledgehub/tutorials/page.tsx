import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BookOpen, ArrowLeft, Clock, ChevronRight } from "lucide-react";

export default function TutorialsPage() {
    // Mock tutorials data
    const tutorials = [
        {
            id: 1,
            title: "Understanding THD and TDD",
            description:
                "The main difference between THD and TDD is simply the denominator in this equation. If you take a look at total harmonic distortion...",
            image: "/placeholder.svg?height=200&width=400",
            duration: "5 min read",
            level: "Beginner",
            slug: "harmonics-fundamentals",
            link: "https://www.youtube.com/watch?v=1NCv3aD-14g",
            youtubeLink:"1NCv3aD-14g?si=M1gFFiuIsGYoCz0u"
        },
        {
            id: 2,
            title: "Total Harmonic Distortion (THD) Explained",
            description:
                "The total harmonic distortion (THD or THDi) is a measurement of the harmonic distortion present in a signal and is defined as the ratio of the sum of the powers of all...",
            image: "/placeholder.svg?height=200&width=400",
            duration: "13 min read",
            level: "Beginner",
            slug: "harmonics-fundamentals",
            link: "https://www.youtube.com/watch?v=LU8pOYLmtxo",
            youtubeLink:"LU8pOYLmtxo?si=8PtqlBpfDtyJjCKN"
        },
        {
            id: 3,
            title: "Short Circuit Calculations",
            description: "Short Circuit Calculations....",
            image: "/placeholder.svg?height=200&width=400",
            duration: "50 min read",
            level: "Beginner",
            slug: "harmonics-fundamentals",
            link: "https://www.youtube.com/playlist?list=PLKKuXxbKd2PfHZrlzSLv0Fr6H9bahsMfb",
            youtubeLink:"5ZWdf61fU38?si=RuGRHp17At2TIKK4"
        },
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link
                    href="/knowledgehub"
                    className="flex items-center text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Knowledge Hub
                </Link>
            </div>

            <div className="text-center mb-16">
                <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Tutorials</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Learn about harmonics, TDD/THD, short circuit calculations,
                    and power quality management through our comprehensive
                    tutorials.
                </p>
            </div>

            {/* Filters
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <Button variant="secondary">All Tutorials</Button>
        <Button variant="outline">Beginner</Button>
        <Button variant="outline">Intermediate</Button>
        <Button variant="outline">Advanced</Button>
      </div> */}

            {/* Tutorials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tutorials.map((tutorial) => (
                    <Card
                        key={tutorial.id}
                        className="flex flex-col h-full hover:shadow-md transition-shadow"
                    >
                        <div className="relative w-full aspect-video">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${tutorial.youtubeLink}`}


                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                            <div className="absolute top-3 right-3 bg-background px-3 py-1 rounded-full text-xs font-medium">
                                {tutorial.level}
                            </div>
                        </div>

                        <CardHeader>
                            <CardTitle>{tutorial.title}</CardTitle>
                            <CardDescription className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {tutorial.duration}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">
                                {tutorial.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                asChild
                            >
                                <Link href={tutorial.link} target="_ ">
                                    Read Tutorial
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-primary text-primary-foreground"
                    >
                        1
                    </Button>
                    <Button variant="outline" size="sm">
                        2
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
