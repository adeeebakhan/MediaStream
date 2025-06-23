import RandomImageGrid from "@/components/random-image-grid"
import VideoPlayer from "@/components/video-player"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">MediaStream</h1>
          <p className="text-gray-600 mt-2">Discover random images and videos</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Random Images Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Random Image Gallery</h2>
              <p className="text-gray-600">Fresh images loaded every time you visit</p>
            </div>
            <RandomImageGrid />
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Video</h2>
              <p className="text-gray-600">Watch our latest content</p>
            </div>
            <VideoPlayer />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
