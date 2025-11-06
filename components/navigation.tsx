"use client"

import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">FutureProof</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
              How it works
            </a>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground">
              Portfolio
            </Link>
            <Link href="/mentorship" className="text-sm text-muted-foreground hover:text-foreground">
              Mentorship
            </Link>
          </div>
          <Link href="/assessment">
            <Button variant="outline" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
