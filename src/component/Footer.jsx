import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    // Outer container: Dark background and white text
    <footer className="bg-gray-800 text-white py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Main Grid Layout: Columns stack on mobile, three columns on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* 1. Hotel Info Column */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Kingsukh Guest House</h3>
            <p className="text-sm text-gray-400">will give you the comfort you deserve</p>

            <div className="pt-4 space-y-2 text-sm">
              <p className="font-semibold">Address :</p>
              <p className="text-gray-300">Address: Beside Barshal Water Tank, Manpur, Barhanti, West Bengal 723156</p>

              <p className="font-semibold pt-2">Phone number :</p>
              {/* Use 'tel:' for clickable phone numbers on mobile */}
              <a href="tel:+91 9007062180" className="text-gray-300 hover:text-purple-400 transition">
                +91 9007062180
              </a>

              <p className="font-semibold pt-2">Email:</p>
              {/* Use 'mailto:' for clickable email addresses */}
              <a href="mailto:kkghosh0099@gmail.com" className="text-gray-300 hover:text-purple-400 transition">
                kkghosh0099@gmail.com
              </a>
            </div>
          </div>

          {/* 2. Quick Links Column (Visible on all screen sizes) */}
          <div className="space-y-3 pt-6 md:pt-0">
            <h4 className="text-lg font-semibold mb-4 opacity-0 hidden lg:block">_</h4> {/* Placeholder for alignment */}
            <FooterLink href="/offers">OFFERS</FooterLink>
            <FooterLink href="/contactus">CONTACT US</FooterLink>
            <FooterLink href="/rooms">ROOMS & RATES</FooterLink>
            <FooterLink href="/Facilities">FACILITIES</FooterLink>
          </div>

          {/* 3. Social Media Column (Pushed to the right on desktop) */}
          <div className="space-y-3 pt-6 md:pt-0">
            <h4 className="text-lg font-semibold mb-4 opacity-0 hidden lg:block">_</h4> {/* Placeholder for alignment */}
            <FooterLink href="/" isSocial={true}>FACEBOOK</FooterLink>
            <FooterLink href="https://www.instagram.com/kingsukhguesthouse/" isSocial={true}>INSTAGRAM</FooterLink>
            <FooterLink href="/" isSocial={true}>TWITTER</FooterLink>
            <FooterLink href="/" isSocial={true}>SNAP CHAT</FooterLink>
          </div>
        </div>

        {/* Optional: Bottom line/Copyright */}
        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Copyright © 2024 Kingsukh Guest House. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

// Helper component for repeated link styles
const FooterLink = ({ href, children, isSocial = false }) => (
  // Use Next.js Link for navigation
  <div className="text-sm tracking-widest uppercase">
    <Link
      href={href}
      className="text-gray-200 hover:text-purple-400 transition duration-200 block"
      // Open social links in a new tab
      {...(isSocial ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  </div>
);

export default Footer;