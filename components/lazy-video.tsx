"use client"

import { useEffect, useRef, useState } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'

interface LazyVideoProps {
  src: string
  poster?: string
  alt?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  playsInline?: boolean
  containerClassName?: string
  showLoadingState?: boolean
}

export function LazyVideo({
  src,
  poster,
  alt = 'Video',
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  controls = false,
  playsInline = true,
  containerClassName = '',
  showLoadingState = true,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.25,
    rootMargin: '100px',
    freezeOnceVisible: false,
  })

  // Handle video playback based on visibility
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isVisible) {
      // Play video when visible
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented, video will play when user interacts
          console.log('Auto-play prevented:', error)
        })
      }
    } else {
      // Pause video when not visible to save resources
      video.pause()
    }
  }, [isVisible, autoPlay])

  // Handle video loaded state
  const handleLoadedData = () => {
    setIsLoaded(true)
  }

  return (
    <div ref={elementRef} className={`relative ${containerClassName}`}>
      {/* Video element - only load when visible */}
      {isVisible && (
        <video
          ref={videoRef}
          poster={poster}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          controls={controls}
          className={className}
          onLoadedData={handleLoadedData}
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          {alt}
        </video>
      )}

      {/* Poster image fallback - show before video loads */}
      {!isVisible && poster && (
        <Image
          src={poster}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {/* Loading skeleton */}
      {isVisible && !isLoaded && showLoadingState && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse" />
      )}

      {/* Placeholder for when video hasn't entered viewport yet */}
      {!isVisible && !poster && (
        <div className="absolute inset-0 bg-muted/30" />
      )}
    </div>
  )
}
