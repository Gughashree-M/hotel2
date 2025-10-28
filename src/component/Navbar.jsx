"use client"
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Using Lucide icons for clean UI elements

// Define the navigation links
const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Rooms & Suites', href: '/rooms' },
  { name: 'Facilities', href: '/Facilities' },
  { name: 'Contacts', href: '/contactus' },
  { name: 'Offers', href: '/offers' },
  { name: 'Events', href: '/event' },
];

/**
 * A responsive navigation bar component for the Hotel Lunar website.
 * Uses Tailwind CSS for styling and includes a mobile menu toggle.
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo / Brand Name (Left Side) */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-bold tracking-tight text-purple-700 hover:text-purple-900 transition duration-150 ease-in-out">
              Hotel Lunar
            </a>
          </div>

          {/* Desktop Navigation (Center/Right) */}
          <nav className="hidden md:flex md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-gray-700 hover:text-purple-700 transition duration-150 ease-in-out"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button (Right Side - only visible on small screens) */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (Appears below the header on toggle) */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)} // Close menu after clicking a link
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition duration-150 ease-in-out"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
