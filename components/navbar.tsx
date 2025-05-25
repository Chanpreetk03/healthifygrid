"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, MessageSquare } from "lucide-react"
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Zap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">HealthifyGrid</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/knowledgehub" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
              Knowledge Hub
            </Link>
            <Link href="/forum" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
              Forum
            </Link>
            <Link href="/calculator" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
              Cost Calculator
            </Link>
            <Link href="/advisory" className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium">
              Isc/Il Advisory
            </Link>
            <Link href="/chat" className="ml-4">
              <Button variant="outline" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </Link>

            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <Button variant="outline" size="sm">
                  Login / Register
                </Button>
              </SignInButton>
            </SignedOut>
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            <Link href="/" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md">
              Home
            </Link>
            <Link href="/knowledgehub" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md">
              Knowledge Hub
            </Link>
            <Link href="/forum" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md">
              Forum
            </Link>
            <Link href="/calculator" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md">
              Cost Calculator
            </Link>
            <Link href="/advisory" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md">
              Isc/Il Advisory
            </Link>
            <Link href="/chat" className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md">
              Chat
            </Link>
            <div className="flex space-x-2 mt-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Login / Register
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
