export function TestimonialVideo() {
  return (
    <section className="py-32 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-balance">
              Client <span className="font-semibold">Testimonial</span>
            </h2>
            <p className="text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
              Hear from our satisfied clients about their home buying experience
            </p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src="/TESTIMONIAL-rami.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}
