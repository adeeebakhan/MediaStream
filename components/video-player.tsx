"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoType, setVideoType] = useState<"html5" | "youtube">("html5")

  const togglePlay = () => {
    const video = document.getElementById("main-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = document.getElementById("main-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    const video = document.getElementById("main-video") as HTMLVideoElement
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen()
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Video Type Toggle */}
      <div className="flex justify-center gap-2">
        <Button
          variant={videoType === "html5" ? "default" : "outline"}
          onClick={() => setVideoType("html5")}
          className="bg-black text-white hover:bg-gray-800"
        >
          HTML Video
        </Button>
        <Button
          variant={videoType === "youtube" ? "default" : "outline"}
          onClick={() => setVideoType("youtube")}
          className="bg-black text-white hover:bg-gray-800"
        >
          YouTube Video
        </Button>
      </div>

      {/* HTML5 Video Player */}
      {videoType === "html5" && (
        <Card className="overflow-hidden">
          <div className="relative">
            <video
              id="main-video"
              className="w-full aspect-video"
              poster="https://dummyimage.com/800x450/cccccc/000000.png&text=▶+Play+Video"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Custom Controls Overlay */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="bg-black/50 text-white border-white/20 hover:bg-black/70"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="bg-black/50 text-white border-white/20 hover:bg-black/70"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="bg-black/50 text-white border-white/20 hover:bg-black/70"
                onClick={toggleFullscreen}
              >
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* YouTube Embedded Video */}
      {videoType === "youtube" && (
        <Card className="overflow-hidden">
          <div className="relative aspect-video">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
              title="YouTube video player"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Card>
      )}

      {/* Video Information */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">
          {videoType === "html5" ? "HTML Sample Video" : "YouTube Sample Video"}
        </h3>
        <p className="text-gray-600">
          {videoType === "html5"
            ? "A sample HTML video with custom controls and responsive design"
            : "A YouTube video with responsive iframe"}
        </p>
      </div>
    </div>
  )
}
