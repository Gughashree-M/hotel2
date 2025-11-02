// components/ContactUs.js

import React from 'react';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Install react-icons if you haven't: npm install react-icons

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header Section */}
      <div className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: 'url("/images/contact_header.jpg")' }}>
        {/* Replace with your actual header image path */}
        {/* Overlay to darken image and make text pop */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white tracking-widest uppercase">
            CONTACT US
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Introductory Text */}
        <p className="text-center text-lg text-gray-700 mb-10">
          We'll love to hear your feedback. Kindly send us a mail
        </p>

        {/* Contact Form */}
        <form className="bg-white p-8 rounded-lg shadow-xl border border-purple-200">
          <div className="mb-6">
            <label htmlFor="name" className="sr-only">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-3 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="sr-only">Your email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              className="w-full px-4 py-3 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="message" className="sr-only">Type your message</label>
            <textarea
              id="message"
              name="message"
              rows="7" // Increased rows for better mobile comfort
              placeholder="Type your message"
              className="w-full px-4 py-3 border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200 ease-in-out resize-y placeholder-gray-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 ease-in-out text-lg"
          >
            SEND MESSAGE
          </button>
        </form>

        {/* Contact Information Section */}
        <div className="flex flex-col md:flex-row justify-around items-center mt-16 text-center md:text-left space-y-8 md:space-y-0 md:space-x-4">
          {/* Phone */}
          <div className="flex items-center space-x-3">
            <FaPhone className="text-purple-600 text-xl" />
            <span className="text-gray-700 font-medium">9007062180</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-purple-600 text-xl" />
            <span className="text-gray-700 font-medium">kkghosh0099@gmail.com</span>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-purple-600 text-xl" />
            <span className="text-gray-700 font-medium">Beside Barshal WaterTank,
              Manpur, Barhanti,
              West Bengal 723156</span>
          </div>
        </div>
      </div>

      <div className="mt-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Find Us on Google Maps
        </h2>

        <div className="relative w-full" style={{ paddingBottom: '45%' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6951.16217277079!2d86.85979!3d23.586332!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f6e3fdd3ff9ebb%3A0x517a57e3f93c1807!2sKingsukh%20Guest%20House!5e1!3m2!1sen!2sin!4v1762088367695!5m2!1sen!2sin"
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>

  );
};

export default ContactUs;