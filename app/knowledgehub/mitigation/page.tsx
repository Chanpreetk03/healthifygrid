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
import {
    Lightbulb,
    ArrowLeft,
    Zap,
    ChevronRight,
    BarChart,
} from "lucide-react";

export default function MitigationTechniquesPage() {
    // Mock mitigation techniques data
    const techniques = [
        {
            id: 1,
            title: "Harmonic Mitigation Strategies",
            description:
                "Harmonics in electrical installations: what are they, how to measure them, and how to filter them",
            image: "/placeholder.svg?height=200&width=400",
            type: "Passive",
            costRange: "Low to Medium",
            effectiveness: "Medium",
            slug: "passive-filters",
            link: "https://www.youtube.com/watch?v=1dQH19wXRWY",
            youtubeLink:"1dQH19wXRWY?si=BWEuoESoB96gEB0I"
        },
        {
            id: 2,
            title: "THD and Per Unit Impedance Relationship",
            description: "HD and per unit Impedance Relationship....",
            image: "/placeholder.svg?height=200&width=400",
            type: "Passive",
            costRange: "Low to Medium",
            effectiveness: "Medium",
            slug: "passive-filters",
            link: "https://www.youtube.com/watch?v=hi9XrYbvExg",
            youtubeLink:""
        },
    ];

    // Filter categories
   // const types = Array.from(new Set(techniques.map((tech) => tech.type)));

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
                    <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4">
                    Mitigation Techniques
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Library of solutions including filters, power conditioners,
                    and source modifications to reduce harmonics in electrical
                    systems.
                </p>
            </div>

            {/* Filters
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                <Button variant="secondary">All Techniques</Button>
                {types.map((type) => (
                    <Button key={type} variant="outline">
                        {type}
                    </Button>
                ))}
            </div> */}

            {/* Techniques Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {techniques.map((technique) => (
                    <Card
                        key={technique.id}
                        className="flex flex-col h-full hover:shadow-md transition-shadow"
                    >
                        <div className="relative w-full aspect-video">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${technique.youtubeLink}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                            <div className="absolute top-3 right-3 bg-background px-3 py-1 rounded-full text-xs font-medium flex items-center">
                                <Zap className="h-3 w-3 mr-1" />
                                {technique.type}
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>{technique.title}</CardTitle>
                            <CardDescription className="flex items-center gap-4">
                                <span>Cost: {technique.costRange}</span>
                                <span className="flex items-center">
                                    <BarChart className="h-4 w-4 mr-1" />
                                    Effectiveness: {technique.effectiveness}
                                </span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">
                                {technique.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                asChild
                            >
                                <Link href={technique.link} target="_ ">
                                    Learn More
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {/* <div className="flex justify-center mt-12">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div> */}
        </div>
    );
}
