import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ClerkProvider} from "@clerk/nextjs";
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'HealthifyGrid - Power Quality Management Platform',
	description: 'Educational platform for harmonics, TDD/THD, and power quality management',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
    <ClerkProvider>
		<html lang='en'>
			<body className={inter.className}>
				<div className='flex flex-col min-h-screen'>
					<Navbar />
					<main className='flex-1'>{children}</main>
					<Footer />
				</div>
			</body>
		</html>
    </ClerkProvider>
	)
}
