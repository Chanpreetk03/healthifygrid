import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FileText, ArrowLeft, ChevronRight } from "lucide-react";

export default function CaseStudiesPage() {
    // Mock case studies data
    const caseStudies = [
        {
            id: 1,
            title: "Harmonics Data Interpretation",
            description:
                "Power system harmonics are commonly created by Variable Frequency Drives (VFD’s), Uninterruptible Power Supplies (UPS)....",
            image: "/placeholder.svg?height=200&width=400",
            link: "https://www.hallam-ics.com/blog/how-to-interpret-harmonics-data-a-case-study",
            youtubeLink: "u9-_y-e3K_M?si=uaeEpfFNCk6EhCrK",
        },
        {
            id: 2,
            title: "TDD Implementation in Software Development",
            description:
                "An approach for applying Test-Driven Development (TDD) in the development of randomized algorithms...",
            image: "/placeholder.svg?height=200&width=400",
            link: "https://jserd.springeropen.com/articles/10.1186/s40411-018-0053-5",
            youtubeLink: "nDRdjZsK8g4?si=nLrgmhCouzCswIoZ",
        },
    ];

    // Industry categories for filtering
    //const industries = Array.from(new Set(caseStudies.map((study) => study.industry)))

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
                    <FileText className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Real-world examples of industries penalized for excessive
                    harmonics and how they implemented successful mitigation
                    strategies.
                </p>
            </div>

            {/* Filters
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <Button variant="secondary">All Industries</Button>
        {industries.map((industry) => (
          <Button key={industry} variant="outline">
            {industry}
          </Button>
        ))}
      </div> */}

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((study) => (
                    <Card
                        key={study.id}
                        className="flex flex-col h-full hover:shadow-md transition-shadow"
                    >
                        <div className="relative w-full aspect-video">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${study.youtubeLink}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <CardHeader>
                            <CardTitle>{study?.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">
                                {study.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                asChild
                            >
                                <Link href={study.link} target="_ ">
                                    Read Case Study
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
