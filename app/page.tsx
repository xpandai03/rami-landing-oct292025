import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"

// Dynamic imports for below-fold components
const InformativeVideos = dynamic(() => import("@/components/informative-videos").then(mod => ({ default: mod.InformativeVideos })), {
  loading: () => <div className="h-96 bg-muted/20 animate-pulse" />,
})

const FeaturedDestinations = dynamic(() => import("@/components/featured-destinations").then(mod => ({ default: mod.FeaturedDestinations })), {
  loading: () => <div className="h-96 bg-muted/20 animate-pulse" />,
})

const WhyChooseUs = dynamic(() => import("@/components/why-choose-us").then(mod => ({ default: mod.WhyChooseUs })), {
  loading: () => <div className="h-96 bg-muted/20 animate-pulse" />,
})

const PopularPackages = dynamic(() => import("@/components/popular-packages").then(mod => ({ default: mod.PopularPackages })), {
  loading: () => <div className="h-96 bg-muted/20 animate-pulse" />,
})

const TestimonialVideo = dynamic(() => import("@/components/testimonial-video").then(mod => ({ default: mod.TestimonialVideo })), {
  loading: () => <div className="h-96 bg-muted/20 animate-pulse" />,
})

const Newsletter = dynamic(() => import("@/components/newsletter").then(mod => ({ default: mod.Newsletter })), {
  loading: () => <div className="h-64 bg-muted/20 animate-pulse" />,
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-64 bg-muted/20 animate-pulse" />,
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <InformativeVideos />
      <FeaturedDestinations />
      <WhyChooseUs />
      <PopularPackages />
      <TestimonialVideo />
      <Newsletter />
      <Footer />
    </main>
  )
}
