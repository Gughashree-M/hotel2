import React from 'react';
import Image from 'next/image';

// Placeholder data for the images
const galleryImages = [
  { id: 1, src: '/recep.jpg', alt: 'Bright yellow hotel room' },
  { id: 2, src: '/room1.jpg', alt: 'Modern luxury bedroom' },
  { id: 3, src: '/service.jpg', alt: 'Dark and cozy lounge area' },
  { id: 4, src: '/small.jpg', alt: 'Scenic outdoor view' }, // Added a fourth image for scrolling demonstration
];

const GallerySection = () => {
  return (
    <section data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500" className="py-16 px-4 sm:px-8 lg:px-16 max-w-full mx-auto">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Our Galleries
      </h2>

      {/* Gallery Container: Handles position of arrows */}
      <div className="relative flex items-center justify-center">

        {/* Left Arrow (Visible only on medium screens and up) */}
        <button
          className="absolute left-0 z-10 p-3 ml-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition duration-200 hidden md:block"
          aria-label="Previous image"
        >
          {/* SVG Left Arrow Icon */}
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        {/* Images Row Wrapper: Key to responsiveness */}
        <div className="flex w-full lg:max-w-7xl overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4">

          {galleryImages.map((image) => (
            // Image Card Container
            <div
              key={image.id}
              // Mobile: Take full width, scrollable, ensures only 1 is visible 
              // Medium (md): Take half width, shows 2
              // Large (lg): Take one-third width, shows 3
              className="flex-shrink-0 w-full snap-center sm:w-1/2 md:w-1/2 lg:w-1/3 p-2"
            >
              <div className="relative aspect-[4/3] rounded-lg shadow-xl overflow-hidden group">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  quality={85}
                />
                {/* Optional: Text Overlay on Image */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-semibold">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Right Arrow (Visible only on medium screens and up) */}
        <button
          className="absolute right-0 z-10 p-3 mr-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition duration-200 hidden md:block"
          aria-label="Next image"
        >
          {/* SVG Right Arrow Icon */}
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

    </section>
  );
};

export default GallerySection;