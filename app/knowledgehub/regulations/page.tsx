import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookMarked, ArrowLeft, ChevronRight } from "lucide-react"

export default function RegulationsPage() {
  // Mock regulations data
  const regulations = [
    {
      id: 1,
      title: "Total Harmonic Distortion and Effects in Electrical Power Systems",
      description: "Total Harmonic Distortion and Effects in Electrical Power Systems - Associated Power Technologies...",
      image: "/placeholder.svg?height=200&width=400",
      authority: "PSERC",
      publishedDate: "January 15, 2023",
      status: "Current",
      slug: "pserc-2023",
      link:"https://www.aptsources.com/resources/total-harmonic-distortion-and-effects-in-electrical-power-systems/",
      youtubeLink:"kcNehq3hu6A?si=WJf6w3J5vhQ9UeJp"
    },
    {
      id: 2,
      title: "IEEE Standards on Harmonic Control",
      description: " Power quality harmonic control standard Changes in IEEE-Std 519...",
      image: "/placeholder.svg?height=200&width=400",
      authority: "PSERC",
      publishedDate: "January 15, 2023",
      status: "Current",
      slug: "pserc-2023",
      link:"https://www.youtube.com/watch?v=kDaIvGK08Mw",
      youtubeLink:"kDaIvGK08Mw?si=6OhVJZZqy-cPHCLX"
    },
  ]

  // Authority categories for filtering

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link href="/knowledgehub" className="flex items-center text-muted-foreground hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Knowledge Hub
        </Link>
      </div>

      <div className="text-center mb-16">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
          <BookMarked className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Regulatory Repository</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          All PSERC circulars, amendments, and related regulations in one place for easy reference and compliance.
        </p>
      </div>

      {/* Filters */}
      {/* <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <Button variant="secondary">All Regulations</Button>
        {authorities.map((authority) => (
          <Button key={authority} variant="outline">
            {authority}
          </Button>
        ))}
      </div> */}

      {/* Regulations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regulations.map((regulation) => (
          <Card key={regulation.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
               <div className="relative w-full aspect-video">
                          {regulation.youtubeLink&&  <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${regulation.youtubeLink}`}


                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                          }
                            
                        </div>
            <CardHeader>
              <CardTitle>{regulation.title}</CardTitle>
              
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{regulation.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link href={regulation.link} target="_ ">
                  View Regulation
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
  )
}

