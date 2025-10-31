import React from 'react';
import Image from 'next/image';

const RoomsHeader = () => {
  return (
    // Hero Banner with Title
    <div className="relative h-64 flex items-center justify-center overflow-hidden mb-12">
      <Image
        src="/palash.webp" // Placeholder for the background image
        alt="Hotel Room Background"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="filter brightness-[0.4]" // Darken image for text readability
      />
      <h2 className="relative z-10 text-4xl sm:text-5xl font-bold text-white tracking-widest uppercase text-center px-4">
        OUR ROOMS AND RATE
      </h2>
    </div>
  );
};

export default RoomsHeader;