import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
	return (
		<footer className='bg-muted py-12'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div className='space-y-4'>
						<div className='flex items-center'>
							<Zap className='h-6 w-6 text-primary' />
							<span className='ml-2 text-lg font-bold'>HealthifyGrid</span>
						</div>
						<p className='text-sm text-muted-foreground'>
							Empowering industries with power quality solutions and harmonics management.
						</p>
					</div>

					<div>
						<h3 className='font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='/' className='hover:text-primary'>
									Home
								</Link>
							</li>
							<li>
								<Link href='/knowledgehub' className='hover:text-primary'>
									Knowledge Hub
								</Link>
							</li>
							<li>
								<Link href='/forum' className='hover:text-primary'>
									Forum
								</Link>
							</li>
							<li>
								<Link href='/calculator' className='hover:text-primary'>
									Cost Calculator
								</Link>
							</li>
							<li>
								<Link href='/advisory' className='hover:text-primary'>
									Isc/Il Advisory
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold mb-4'>Resources</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link href='/knowledgehub/tutorials' className='hover:text-primary'>
									Tutorials
								</Link>
							</li>
							<li>
								<Link href='/knowledgehub/case-studies' className='hover:text-primary'>
									Case Studies
								</Link>
							</li>
							<li>
								<Link href='/knowledgehub/regulations' className='hover:text-primary'>
									Regulations
								</Link>
							</li>
							<li>
								<Link href='/knowledgehub/mitigation' className='hover:text-primary'>
									Mitigation Techniques
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className='font-semibold mb-4'>Contact</h3>
						<ul className='space-y-2 text-sm'>
							<li>Electrical Engineering Department</li>
							<li>Punjab Engineering College, Chandigarh</li>
							<li>
								<Link target='_blank' href='https://pec.ac.in/ee' className='text-blue-600'>
									https://pec.ac.in/ee
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className='border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center'>
					<p className='text-sm text-muted-foreground'>
						© {new Date().getFullYear()} HealthifyGrid. All rights reserved.
					</p>
					<div className='flex space-x-4 mt-4 md:mt-0'>
						<Link href='/terms' className='text-sm text-muted-foreground hover:text-primary'>
							Terms of Service
						</Link>
						<Link href='/privacy' className='text-sm text-muted-foreground hover:text-primary'>
							Privacy Policy
						</Link>
						<Link href='/contact' className='text-sm text-muted-foreground hover:text-primary'>
							Contact Us
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
