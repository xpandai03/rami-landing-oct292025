"use client"

import { useEffect } from 'react'
import { onCLS, onLCP, onFCP, onTTFB, onINP, type Metric } from 'web-vitals'

export function useWebVitals() {
  useEffect(() => {
    // Function to handle metrics
    const handleMetric = (metric: Metric) => {
      const { name, value, rating } = metric

      // Log to console for development
      console.log(`[Web Vitals] ${name}:`, {
        value: Math.round(value),
        rating,
      })

      // Send to analytics (you can uncomment and configure this for production)
      // if (typeof window !== 'undefined' && (window as any).gtag) {
      //   (window as any).gtag('event', name, {
      //     value: Math.round(value),
      //     event_category: 'Web Vitals',
      //     event_label: rating,
      //     non_interaction: true,
      //   })
      // }
    }

    // Measure all Core Web Vitals
    onCLS(handleMetric) // Cumulative Layout Shift
    onFCP(handleMetric) // First Contentful Paint
    onLCP(handleMetric) // Largest Contentful Paint
    onTTFB(handleMetric) // Time to First Byte
    onINP(handleMetric) // Interaction to Next Paint (replaces FID)
  }, [])
}
