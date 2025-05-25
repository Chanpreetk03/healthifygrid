import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileText, BookMarked, Lightbulb } from "lucide-react"
import regulation from "@/assests/regulations.webp"
import casestudy from "@/assests/SteelPlant.webp"
import harmonics from "@/assests/harmonics.webp"



export default function KnowledgeHub() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Knowledge Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Educational resources on harmonics, TDD/THD, short circuit calculations, and power quality management.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <Link href="/knowledgehub/tutorials" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle>Tutorials</CardTitle>
              <CardDescription>Learn about harmonics, TDD/THD, and short circuit calculations</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/knowledgehub/case-studies" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle>Case Studies</CardTitle>
              <CardDescription>Real-world examples of industries penalized for excessive harmonics</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/knowledgehub/mitigation" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Lightbulb className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle>Mitigation Techniques</CardTitle>
              <CardDescription>Library of solutions including filters and power conditioners</CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/knowledgehub/regulations" className="block">
          <Card className="h-full hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <BookMarked className="w-12 h-12 mx-auto text-primary mb-4" />
              <CardTitle>Regulatory Repository</CardTitle>
              <CardDescription>All PSERC circulars and amendments in one place</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Featured Content */}
      <h2 className="text-3xl font-bold mb-8">Featured Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Understanding Harmonics in Power Systems</CardTitle>
            <CardDescription>Tutorial</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={harmonics}
              alt="Harmonics Waveform"
              width={400}
              height={200}
              className="rounded-md mb-4"
            />
            <p className="text-muted-foreground">
              Learn the fundamentals of harmonics, their causes, effects, and how to measure them in electrical systems.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/knowledgehub/tutorials/harmonics">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Study: Steel Plant Harmonics Mitigation</CardTitle>
            <CardDescription>Case Study</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={casestudy}
              alt="Steel Plant"
              width={400}
              height={200}
              className="rounded-md mb-4"
            />
            <p className="text-muted-foreground">
              How a major steel plant reduced harmonics, avoided penalties, and improved equipment lifespan.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/knowledgehub/case-studies/steel-plant">Read More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>PSERC Harmonics Regulations 2023</CardTitle>
            <CardDescription>Regulation</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={regulation}
              alt="Regulations Document"
              width={400}
              height={200}
              className="rounded-md mb-4"
            />
            <p className="text-muted-foreground">
              Latest updates to the PSERC regulations on harmonics limits and penalties for non-compliance.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/knowledgehub/regulations/pserc-2023">Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Additions */}
      <h2 className="text-3xl font-bold mb-8">Recent Additions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item}>
            <CardHeader>
              <CardTitle className="text-lg">Active Harmonic Filters: A Comprehensive Guide</CardTitle>
              <CardDescription>Added 2 days ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore the latest technologies in active harmonic filtering for industrial applications.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/knowledgehub/mitigation/active-filters">View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

