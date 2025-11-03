"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, MapPin, Clock, TrendingUp } from "lucide-react"

const hotelOffers = [
  {
    id: 1,
    title: "Weekend Getaway Package",
    tag: "Popular",
    tagColor: "from-amber-400 to-amber-600",
    description: "Book a minimum of two nights and get 15% off your entire stay.",
    discount: "15%",
    details: "Valid Friday to Sunday. Advance booking: 7 days.",
    imageUrl: "/offer_weekend.jpg",
    buttonText: "View Details",
  },
  {
    id: 2,
    title: "Dine & Stay Experience",
    tag: "New",
    tagColor: "from-rose-400 to-rose-600",
    description: "One-night stay + three-course dinner for two at our signature restaurant.",
    discount: "Included",
    details: "Available Sunday through Thursday. Premium drinks excluded.",
    imageUrl: "/offer_dine.jpg",
    buttonText: "Book Now",
  },
  {
    id: 3,
    title: "Extended Stay Discount",
    tag: "Best Value",
    tagColor: "from-blue-400 to-blue-600",
    description: "Save 25% when you stay 4 nights or more. Perfect for longer vacations.",
    discount: "25%",
    details: "Non-refundable booking. Subject to availability.",
    imageUrl: "/offer_longstay.jpg",
    buttonText: "Check Availability",
  },
  {
    id: 4,
    title: "Family Fun Adventure",
    tag: "Family",
    tagColor: "from-emerald-400 to-emerald-600",
    description: "Connecting room setup + complimentary breakfast for two children under 12.",
    discount: "Kids Free",
    details: "Requires connecting room booking. Kids club access included.",
    imageUrl: "/offer_family.jpg",
    buttonText: "Learn More",
  },
]

export default function OffersPage() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner with Visible Background Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden group">
        <Image
          src="/luxury-hotel.jpg"
          alt="Luxury Hotel Offers"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
              <span className="text-amber-300 text-sm font-semibold tracking-widest uppercase">Exclusive Offers</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">Elevate Your Stay</h1>
            <p className="text-xl text-white/90 max-w-xl">
              Discover unbeatable deals and premium experiences designed just for you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Special Packages</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Handpicked offers to enhance your luxury hotel experience with exceptional value and unforgettable memories.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {hotelOffers.map((offer) => (
            <div
              key={offer.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredCard(offer.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border flex flex-col h-full">
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  <Image
                    src={offer.imageUrl || "/placeholder.svg"}
                    alt={offer.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Tag Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${offer.tagColor} text-white text-xs font-bold shadow-lg`}
                  >
                    {offer.tag}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                    <p className="text-sm text-muted-foreground">Save</p>
                    <p className="text-2xl font-bold text-foreground">{offer.discount}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-foreground mb-2">{offer.title}</h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{offer.description}</p>

                  {/* Details Highlight */}
                  <div
                    className={`flex items-start gap-2 p-3 rounded-lg bg-secondary/50 mb-4 transition-all duration-300 ${
                      hoveredCard === offer.id ? "bg-secondary" : ""
                    }`}
                  >
                    <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground font-medium leading-snug">{offer.details}</p>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full mt-auto bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                    {offer.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-secondary via-background to-secondary rounded-2xl p-8 md:p-12 border border-border">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Why Choose Our Offers?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Our carefully curated packages deliver maximum value without compromising luxury.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-accent-foreground">
                  <Star className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Only the finest amenities and services included in every package.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-accent-foreground">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Best Value</h3>
                <p className="text-sm text-muted-foreground">
                  Maximum savings on luxury experiences you'll absolutely love.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-accent-foreground">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Flexible Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Book with confidence with our flexible cancellation policies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="text-xl font-bold text-foreground mb-4">Terms & Conditions</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All offers are subject to hotel availability, rate changes, and specific blackout dates. Offers cannot be
            combined with other promotions or discounts. Rates are based on double occupancy unless otherwise specified.
            Certain blackout dates may apply during peak seasons. Please review the full terms before booking.
            Additional fees may apply for early check-in, late checkout, or extra services.
          </p>
        </div>
      </div>
    </div>
  )
}
