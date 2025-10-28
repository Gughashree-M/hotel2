// components/EventPage.js

import React from 'react';
import Image from 'next/image';
import { FaCalendarAlt, FaClock, FaTicketAlt, FaInfoCircle } from 'react-icons/fa';

// --- Sample Data ---
const upcomingEvents = [
  {
    id: 1,
    title: 'Summer Jazz Night',
    date: 'August 15, 2026',
    time: '7:00 PM - 10:00 PM',
    description: 'Enjoy a sophisticated evening of live jazz featuring the renowned "Blue Notes" ensemble. Complimentary cocktails included.',
    imageUrl: '/event4.jpeg', 
    price: '€45 per person',
  },
  {
    id: 2,
    title: 'Chef\'s Table Culinary Workshop',
    date: 'September 5, 2026',
    time: '3:00 PM - 5:00 PM',
    description: 'Learn the secrets of Mediterranean cuisine directly from our Head Chef. Hands-on cooking and tasting session.',
    imageUrl: '/images/event_culinary.jpg', // Placeholder image path
    price: '€75 per person',
  },
  {
    id: 3,
    title: 'Wine Tasting & Pairing',
    date: 'October 10, 2026',
    time: '6:30 PM - 8:00 PM',
    description: 'An exclusive tasting journey featuring local vineyards and our sommelier\'s top selections, perfectly paired with canapés.',
    imageUrl: '/images/event_wine.jpg', // Placeholder image path
    price: '€50 per person',
  },
];

const EventPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 1. Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        {/* Placeholder Image using next/image with layout="fill" for responsiveness */}
        <Image
          src="/images/event_hero.jpg" // Replace with your actual hero image
          alt="Hotel Event Hall Setup"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-wider mb-2">
              Hotel Events
            </h1>
            <p className="text-lg md:text-xl text-purple-200">
              Discover unique experiences during your stay.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Upcoming Events Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-purple-600 inline-block pb-1 mb-8">
            Upcoming Experiences
          </h2>

          <div className="space-y-12">
            {upcomingEvents.map((event) => (
              // Mobile: Stacked | Desktop: Two columns (Image + Details)
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition duration-300 border border-gray-100"
              >

                {/* Event Image (2/5 width on desktop) */}
                <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                {/* Event Details (3/5 width on desktop) */}
                <div className="p-6 md:p-8 w-full md:w-3/5 flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-purple-700 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    {/* Date */}
                    <div className="flex items-center space-x-2 text-gray-800">
                      <FaCalendarAlt className="text-purple-600" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    {/* Time */}
                    <div className="flex items-center space-x-2 text-gray-800">
                      <FaClock className="text-purple-600" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                  </div>

                  {/* Price/Booking Button */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-lg font-bold text-gray-800 mb-4 sm:mb-0">
                      <FaTicketAlt className="text-purple-600" />
                      <span>{event.price}</span>
                    </div>
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-200 shadow-lg">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="my-16 border-gray-300" />

        {/* Event Inquiry/Booking Form Section */}
        <section className="bg-white p-6 md:p-10 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
            <FaInfoCircle className="text-purple-600 mr-3" />
            Plan Your Private Event
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Interested in booking our ballroom or meeting spaces for a private function? Fill out the form below, and our dedicated events team will contact you within 24 hours.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Your Name" required className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition" />
            <input type="email" placeholder="Email Address" required className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition" />
            <input type="tel" placeholder="Phone Number" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition" />
            <select required className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition bg-white">
              <option value="">Event Type</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate Meeting</option>
              <option value="birthday">Birthday/Party</option>
              <option value="other">Other</option>
            </select>
            <textarea placeholder="Event Details and Date Preference" rows="4" className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 transition"></textarea>

            <button type="submit" className="md:col-span-2 bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition duration-300 mt-4 shadow-lg">
              Submit Inquiry
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EventPage;