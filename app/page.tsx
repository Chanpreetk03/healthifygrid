import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Calculator, MessageSquare, Zap, AlertTriangle, BookMarked, Users } from 'lucide-react'
import powerImg from '@/assests/PowerQuality.webp'
import { SignInButton } from '@clerk/nextjs'
export default function Home() {
	return (
		<div>
			{/* Hero Section */}
			<section className='bg-gradient-to-b from-background to-muted py-20'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex flex-col md:flex-row items-center'>
						<div className='md:w-1/2 mb-10 md:mb-0'>
							<h1 className='text-4xl md:text-5xl font-bold mb-6'>Optimize Your Power Quality with HealthifyGrid</h1>
							<p className='text-xl mb-8 text-muted-foreground'>
								Comprehensive solutions for harmonics management, power quality improvement, and regulatory compliance.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<SignInButton>
									<Button size='lg' asChild>
										<Link href='#'>Get Started</Link>
									</Button>
								</SignInButton>
								<Button variant='outline' size='lg' asChild>
									<Link href='/knowledgehub'>Learn More</Link>
								</Button>
							</div>
						</div>
						<div className='md:w-1/2 flex justify-center'>
							<Image
								src={powerImg}
								alt='Power Quality Management'
								width={500}
								height={400}
								className='rounded-lg shadow-lg'
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='py-20'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold mb-4'>Comprehensive Power Quality Solutions</h2>
						<p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
							HealthifyGrid provides all the tools you need to manage harmonics, ensure compliance, and optimize your
							electrical systems.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<Card>
							<CardHeader className='text-center'>
								<BookOpen className='w-12 h-12 mx-auto text-primary mb-4' />
								<CardTitle>Knowledge Hub</CardTitle>
								<CardDescription>Educational resources on harmonics, TDD/THD, and power quality</CardDescription>
							</CardHeader>
							<CardFooter className='pt-0 justify-center'>
								<Button variant='outline' asChild>
									<Link href='/knowledgehub'>Explore</Link>
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader className='text-center'>
								<MessageSquare className='w-12 h-12 mx-auto text-primary mb-4' />
								<CardTitle>Community Forum</CardTitle>
								<CardDescription>Connect with experts, ask questions, and share solutions</CardDescription>
							</CardHeader>
							<CardFooter className='pt-0 justify-center'>
								<Button variant='outline' asChild>
									<Link href='/forum'>Join Discussion</Link>
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader className='text-center'>
								<Calculator className='w-12 h-12 mx-auto text-primary mb-4' />
								<CardTitle>Cost Calculator</CardTitle>
								<CardDescription>Calculate the financial impact of harmonics on your systems</CardDescription>
							</CardHeader>
							<CardFooter className='pt-0 justify-center'>
								<Button variant='outline' asChild>
									<Link href='/calculator'>Calculate</Link>
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader className='text-center'>
								<AlertTriangle className='w-12 h-12 mx-auto text-primary mb-4' />
								<CardTitle>Isc/Il Advisory</CardTitle>
								<CardDescription>Get recommendations on permissible TDD limits and compliance</CardDescription>
							</CardHeader>
							<CardFooter className='pt-0 justify-center'>
								<Button variant='outline' asChild>
									<Link href='/advisory'>Get Advice</Link>
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className='py-20 bg-muted'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-16'>
						<h2 className='text-3xl font-bold mb-4'>Why Choose HealthifyGrid?</h2>
						<p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
							Our platform offers unique advantages for industries, consultants, and students in the power quality
							domain.
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='bg-card p-8 rounded-lg shadow-sm'>
							<Zap className='w-12 h-12 text-primary mb-4' />
							<h3 className='text-xl font-bold mb-2'>Cost Optimization</h3>
							<p className='text-muted-foreground'>
								Identify hidden costs of harmonics and calculate ROI on mitigation investments to make informed
								decisions.
							</p>
						</div>

						<div className='bg-card p-8 rounded-lg shadow-sm'>
							<BookMarked className='w-12 h-12 text-primary mb-4' />
							<h3 className='text-xl font-bold mb-2'>Regulatory Compliance</h3>
							<p className='text-muted-foreground'>
								Stay updated with the latest regulations and ensure your systems meet all compliance requirements.
							</p>
						</div>

						<div className='bg-card p-8 rounded-lg shadow-sm'>
							<Users className='w-12 h-12 text-primary mb-4' />
							<h3 className='text-xl font-bold mb-2'>Expert Community</h3>
							<p className='text-muted-foreground'>
								Connect with industry experts, consultants, and peers to solve complex power quality challenges.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='bg-primary rounded-lg p-8 md:p-12 text-center'>
						<h2 className='text-3xl font-bold mb-4 text-primary-foreground'>Ready to Optimize Your Power Quality?</h2>
						<p className='text-xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto'>
							Join HealthifyGrid today and get access to all our tools and resources for harmonics management and power
							quality improvement.
						</p>
						<SignInButton>
							<Button size='lg' variant='secondary' asChild>
								<Link href='#'>Create Free Account</Link>
							</Button>
						</SignInButton>
					</div>
				</div>
			</section>
		</div>
	)
}
