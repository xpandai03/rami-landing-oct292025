import type React from "react"
import type { Metadata } from "next"
import { Prompt } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { WebVitalsTracker } from "@/components/web-vitals-tracker"
import "./globals.css"

const prompt = Prompt({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-prompt",
  display: 'swap',
})

export const metadata: Metadata = {
  title: "KeyTurn Realty",
  description: "Your trusted real estate partner for finding the perfect home in San Antonio",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${prompt.variable} antialiased`}>
        <WebVitalsTracker />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
