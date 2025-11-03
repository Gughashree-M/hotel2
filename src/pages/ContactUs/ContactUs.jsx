"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Banner */}
      <div className="relative h-80 md:h-96 bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-32 h-32 bg-primary-foreground rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-4 tracking-tight">Get In Touch</h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <ContactCard icon={Phone} title="Phone" content="9007062180" link="tel:9007062180" />
          <ContactCard icon={Mail} title="Email" content="kkghosh0099@gmail.com" link="mailto:kkghosh0099@gmail.com" />
          <ContactCard
            icon={MapPin}
            title="Location"
            content="Beside Barshal WaterTank, Manpur, Barhanti, West Bengal 723156"
          />
        </div>

        {/* Contact Form and Map */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-foreground">Send us a Message</h2>

            {submitted ? (
              <div className="bg-accent/10 border border-accent rounded-lg p-8 text-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thanks for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows="6"
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 resize-none text-foreground placeholder:text-muted-foreground"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition duration-200 transform hover:scale-105"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Map Section */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-foreground">Find Us</h2>
            <div
              className="relative w-full rounded-lg overflow-hidden shadow-lg border border-border"
              style={{ paddingBottom: "100%" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6951.16217277079!2d86.85979!3d23.586332!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6e3fdd3ff9ebb%3A0x517a57e3f93c1807!2sKingsukh%20Guest%20House!5e1!3m2!1sen!2sin!4v1762088367695!5m2!1sen!2sin"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Contact Info Card Component
function ContactCard({ icon: Icon, title, content, link }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          {link ? (
            <a href={link} className="text-muted-foreground hover:text-primary transition">
              {content}
            </a>
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
          )}
        </div>
      </div>
    </div>
  )
}
