import { Card } from "@/components/ui/card"

const videos = [
  {
    title: "Informative Video 1",
    video: "/informative-vid-1.mp4",
  },
  {
    title: "Informative Video 2",
    video: "/informative-vid-2.mp4",
  },
  {
    title: "Informative Video 3",
    video: "/informative-vid-3.mp4",
  },
]

export function InformativeVideos() {
  return (
    <section className="py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-balance">
            Informative <span className="font-semibold">Videos</span>
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Watch and learn about the home buying process with Rami
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 bg-card hover:shadow-2xl transition-all duration-500"
            >
              {/* Video */}
              <div className="relative h-[600px] overflow-hidden">
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 pointer-events-none" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
