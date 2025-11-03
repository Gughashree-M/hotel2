"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, Ticket, Mail, Phone, ArrowRight } from "lucide-react"

// --- Sample Data ---
const upcomingEvents = [
  {
    id: 1,
    title: "Summer Jazz Night",
    date: "August 15, 2026",
    time: "7:00 PM - 10:00 PM",
    description:
      'Enjoy a sophisticated evening of live jazz featuring the renowned "Blue Notes" ensemble. Complimentary cocktails included.',
    imageUrl: "/event4.jpeg",
    price: "€45 per person",
    category: "Entertainment",
  },
  {
    id: 2,
    title: "Chef's Table Culinary Workshop",
    date: "September 5, 2026",
    time: "3:00 PM - 5:00 PM",
    description:
      "Learn the secrets of Mediterranean cuisine directly from our Head Chef. Hands-on cooking and tasting session.",
    imageUrl: "/event_culinary.jpg",
    price: "€75 per person",
    category: "Culinary",
  },
  {
    id: 3,
    title: "Wine Tasting & Pairing",
    date: "October 10, 2026",
    time: "6:30 PM - 8:00 PM",
    description:
      "An exclusive tasting journey featuring local vineyards and our sommelier's top selections, perfectly paired with canapés.",
    imageUrl: "/event_wine.jpg",
    price: "€50 per person",
    category: "Wine",
  },
]

const EventPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [hoveredEvent, setHoveredEvent] = useState(null)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] md:h-[65vh] overflow-hidden group">
        <Image src="/luxury-hotel-ballroom.jpg" alt="Hotel Event Hall Setup" fill className="object-cover" priority />
        {/* Subtle gradient overlay instead of heavy dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">Hotel Events</h1>
            <p className="text-lg md:text-2xl text-white/90 font-light">Discover unique experiences during your stay</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-accent rounded-full" />
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">Experiences</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Upcoming Experiences</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Join us for unforgettable moments and exclusive gatherings crafted for our valued guests.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* Event Image Container */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <Image
                  src={event.imageUrl || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  {event.category}
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{event.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>

                {/* Date and Time */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">{event.time}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-accent font-bold text-lg">
                    <Ticket className="w-5 h-5" />
                    {event.price}
                  </div>
                  <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2 group/btn">
                    Book
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-border mb-20" />

        {/* Private Events Form Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-accent rounded-full" />
            <span className="text-accent font-semibold uppercase tracking-widest text-sm">Planning</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Plan Your Private Event</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Text */}
            <div>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Interested in hosting a private function at our hotel? Whether it's a wedding, corporate event, or
                special celebration, our dedicated events team is ready to create an unforgettable experience tailored
                to your vision.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                    <p className="text-muted-foreground">events@hotelname.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <form onSubmit={handleFormSubmit} className="bg-card p-8 rounded-xl border border-border">
              {formSubmitted && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent text-accent rounded-lg text-sm font-medium">
                  Thank you! We'll contact you within 24 hours.
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Event Type</label>
                  <select
                    required
                    defaultValue=""
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition"
                  >
                    <option value="">Select event type...</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Meeting</option>
                    <option value="birthday">Birthday/Party</option>
                    <option value="conference">Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Event Details</label>
                  <textarea
                    placeholder="Tell us about your event, guest count, and date preferences..."
                    rows="4"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-accent-foreground font-bold py-3 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 group/submit"
                >
                  Send Inquiry
                  <ArrowRight className="w-5 h-5 group-hover/submit:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPage
