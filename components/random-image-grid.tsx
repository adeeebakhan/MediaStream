"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"

interface RandomImage {
  id: string
  url: string
  alt: string
}

export default function RandomImageGrid() {
  const [images, setImages] = useState<RandomImage[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid")

  const fetchRandomImages = async () => {
    setLoading(true)
    try {
      // Using Lorem Picsum for random images 
      const imagePromises = Array.from({ length: 8 }, (_, index) => {
        const width = 400
        const height = 300
        const randomId = Math.floor(Math.random() * 1000) + index
        return {
          id: `image-${randomId}`,
          url: `https://picsum.photos/${width}/${height}?random=${randomId}`,
          alt: `Random image ${index + 1}`,
        }
      })

      setImages(imagePromises)
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomImages()
  }, [])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className="bg-black text-white hover:bg-gray-800"
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === "carousel" ? "default" : "outline"}
            onClick={() => setViewMode("carousel")}
            className="bg-black text-white hover:bg-gray-800"
          >
            Carousel View
          </Button>
        </div>
        <Button
          onClick={fetchRandomImages}
          disabled={loading}
          variant="outline"
          className="bg-white text-black border-black hover:bg-gray-100"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Images
        </Button>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Carousel View */}
      {viewMode === "carousel" && (
        <div className="relative">
          <Card className="overflow-hidden">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={images[currentIndex]?.url || ""}
                alt={images[currentIndex]?.alt || ""}
                fill
                className="object-cover"
                sizes="100vw"
              />

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
