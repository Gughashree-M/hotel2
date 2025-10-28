// components/OffersPage.js

import React from 'react';
import Image from 'next/image';
import { FaTag, FaHotel, FaCalendarCheck } from 'react-icons/fa'; // Install react-icons if needed

// --- Sample Data ---
const hotelOffers = [
  {
    id: 1,
    title: 'Weekend Getaway Package',
    tag: 'Popular',
    description: 'Book a minimum of two nights and get 15% off your entire stay, plus complimentary late checkout (2 PM).',
    details: 'Valid for Friday to Sunday stays. Requires 7-day advance booking.',
    imageUrl: '/images/offer_weekend.jpg', // Placeholder image path
    buttonText: 'View Details',
  },
  {
    id: 2,
    title: 'Dine & Stay Experience',
    tag: 'New',
    description: 'Includes a one-night stay in a Deluxe room and a three-course dinner for two at our signature restaurant.',
    details: 'Excludes premium drinks. Available Sunday through Thursday.',
    imageUrl: '/images/offer_dine.jpg', // Placeholder image path
    buttonText: 'Book Now',
  },
  {
    id: 3,
    title: 'Extended Stay Discount',
    tag: 'Limited Time',
    description: 'Save 25% when you stay 4 nights or more. Perfect for a longer vacation or business trip.',
    details: 'Non-refundable booking required. Subject to availability.',
    imageUrl: '/images/offer_longstay.jpg', // Placeholder image path
    buttonText: 'Check Availability',
  },
  {
    id: 4,
    title: 'Family Fun Adventure',
    tag: 'Family',
    description: 'Enjoy a connecting room setup and complimentary breakfast for two children under 12.',
    details: 'Must book a room and a connecting room. Access to kids club included.',
    imageUrl: '/images/offer_family.jpg', // Placeholder image path
    buttonText: 'Learn More',
  },
];

const OffersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      
      {/* 1. Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {/* Placeholder Image */}
        <Image
          src="/images/offer_hero.jpg" // Replace with your actual hero image
          alt="Luxury Hotel Room"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-purple-900 bg-opacity-70 flex flex-col items-center justify-center p-4">
          <FaTag className="text-4xl text-yellow-400 mb-3" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-wider mb-2 text-center">
            Exclusive Offers
          </h1>
          <p className="text-lg text-purple-200 text-center">
            Find your perfect deal and enhance your stay.
          </p>
        </div>
      </div>
      
      {/* 2. Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Offer Cards Grid */}
        <section className="mt-8">
          <h2 className="sr-only">List of Hotel Offers</h2>
          
          {/* Mobile: 1 column | Tablet: 2 columns | Desktop: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {hotelOffers.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col transition duration-300 hover:scale-[1.02] border border-gray-100"
              >
                {/* Offer Image */}
                <div className="relative w-full h-56">
                  <Image
                    src={offer.imageUrl}
                    alt={offer.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  {/* Tag */}
                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {offer.tag}
                  </span>
                </div>
                
                {/* Offer Details */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{offer.description}</p>
                  
                  {/* Fine Print */}
                  <div className="flex items-center text-sm text-purple-700 bg-purple-50 p-3 rounded-lg mb-4">
                    <FaCalendarCheck className="mr-2 flex-shrink-0" />
                    <p className="font-medium">{offer.details}</p>
                  </div>

                  {/* Call to Action Button */}
                  <button className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition duration-200 shadow-md mt-auto">
                    {offer.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* General Terms and Conditions (Optional Footer Section) */}
        <section className="mt-20 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <FaHotel className="mr-3 text-purple-600" />
            Terms & Conditions
          </h3>
          <p className="text-sm text-gray-600">
            All offers are subject to hotel availability, rate changes, and specific blackout dates. Offers cannot be combined with any other promotions or discounts. Rates are based on double occupancy unless otherwise specified. Please read the full terms before booking.
          </p>
        </section>
        
      </div>
    </div>
  );
};

export default OffersPage;