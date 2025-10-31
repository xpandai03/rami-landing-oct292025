"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-semibold tracking-tight">Rami Rafeh</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <span className="text-sm font-medium text-foreground/70">DRE #2022092</span>
            <a
              href="#destinations"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Listings
            </a>
            <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
            >
              <a
                href="https://calendly.com/real_estate_rami/homeconsult?month=2025-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultation
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-4">
            <a href="#destinations" className="block text-base font-medium text-foreground/70 hover:text-foreground">
              Listings
            </a>
            <a href="#about" className="block text-base font-medium text-foreground/70 hover:text-foreground">
              About
            </a>
            <a href="#contact" className="block text-base font-medium text-foreground/70 hover:text-foreground">
              Contact
            </a>
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              <a
                href="https://calendly.com/real_estate_rami/homeconsult?month=2025-10"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultation
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
