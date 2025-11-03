"use client"

import Image from "next/image"
import { useState } from "react"

const facilitiesData = [
  { name: "Swimming Pool", imageUrl: "/swimming_pool.jpg" },
  { name: "Gym & Wellness", imageUrl: "/gym.jpg" },
  { name: "Restaurant & Bar", imageUrl: "/restaurant_bar.jpg" },
  { name: "Spa & Jacuzzi", imageUrl: "/spa_jacuzzi.jpg" },
  { name: "Conference Room", imageUrl: "/conference_room.jpg" },
  { name: "Parking Garage", imageUrl: "/parking_garage.jpg" },
]

const alsoOfferData = [
  "Limo services",
  "Free Wi-Fi",
  "Adequate safety & security",
  "Laundry services",
  "Delicious meals",
  "Air cooling in all rooms",
  "Room services",
  "Ticket books",
  "Shuttle & Private transfers",
  "Necessities for babies and children",
]

export default function Facilities() {
  const [hoveredFacility, setHoveredFacility] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner with Visible Background */}
      <div
        className="relative h-80 md:h-96 lg:h-[480px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: "url('/facilities.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide mb-4 drop-shadow-lg">
              FACILITIES
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
              Discover Our Premium Amenities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Facility Grid */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Our Amenities</h2>
          <p className="text-muted-foreground mb-12 text-lg">
            Experience world-class facilities designed for your comfort
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilitiesData.map((facility) => (
              <div
                key={facility.name}
                onMouseEnter={() => setHoveredFacility(facility.name)}
                onMouseLeave={() => setHoveredFacility(null)}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-card hover:scale-105 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full h-72 overflow-hidden bg-muted">
                  <Image
                    src={facility.imageUrl || "/placeholder.svg"}
                    alt={facility.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Facility Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-8 pb-6 px-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-semibold text-white mb-2">{facility.name}</h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore our {facility.name.toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-16" />

        {/* We Also Offer Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">We Also Offer</h2>
          <p className="text-muted-foreground mb-12 text-lg">Additional services to enhance your stay</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {alsoOfferData.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-colors">
                    <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-foreground font-medium group-hover:text-primary transition-colors">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 pt-16 border-t border-border text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Ready to Experience Excellence?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book your stay today and enjoy all these premium amenities
          </p>
          <button className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
