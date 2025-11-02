"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const galleryImages = [
  { id: 1, src: "/recep.jpg", alt: "Bright yellow hotel room", category: "Rooms" },
  { id: 2, src: "/room1.jpg", alt: "Modern luxury bedroom", category: "Rooms" },
  { id: 3, src: "/service.jpg", alt: "Dark and cozy lounge area", category: "Lounge" },
  { id: 4, src: "/small.jpg", alt: "Scenic outdoor view", category: "Outdoor" },
]

const GallerySection = () => {
  const [hoveredId, setHoveredId] = useState(null)
  const [visibleItems, setVisibleItems] = useState(new Set())
  const itemRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="py-20 px-4 sm:px-8 lg:px-16 max-w-full mx-auto bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Heading with animation */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-4">
          Our Gallery
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Discover the beauty and comfort of our spaces</p>
      </div>

      {/* Gallery Grid - Modern masonry-like layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => {
                if (el) itemRefs.current[image.id] = el
              }}
              id={`gallery-item-${image.id}`}
              className={`group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 transform ${
                visibleItems.has(`gallery-item-${image.id}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${index % 2 === 0 && index !== 0 ? "md:col-span-1" : ""} ${
                hoveredId === image.id ? "shadow-2xl scale-105" : ""
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  quality={85}
                  className={`transition-transform duration-500 ${hoveredId === image.id ? "scale-110" : "scale-100"}`}
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredId === image.id ? "opacity-80" : "opacity-40"
                }`}
              ></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div
                  className={`transform transition-all duration-300 ${
                    hoveredId === image.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <p className="text-purple-300 text-sm font-semibold mb-2 uppercase tracking-wide">{image.category}</p>
                  <h3 className="text-white text-xl font-bold mb-2">{image.alt}</h3>
                  <p className="text-gray-200 text-sm line-clamp-2">Experience the luxury and comfort</p>
                </div>

                {/* Hover Button */}
                <div
                  className={`mt-4 transform transition-all duration-300 ${
                    hoveredId === image.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition duration-200 text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>

              {/* Shine Effect */}
              <div
                className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 via-white/10 to-transparent transform -skew-x-12 transition-all duration-500 ${
                  hoveredId === image.id ? "translate-x-full" : "-translate-x-full"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105 uppercase tracking-wider">
          Explore More
        </button>
      </div>
    </section>
  )
}

export default GallerySection
