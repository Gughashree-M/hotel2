import React from 'react';
import Image from 'next/image';

// Dummy data for the rooms
const roomsData = [
  {
    id: 1,
    name: 'Standard Double Room',
    price: '100,000 per night',
    features: ['1 bathroom', '2 beds', '2 people'],
    imageSrc: '/images/room-standard-double.jpg', // Placeholder
    imageAlt: 'Standard Double Room',
  },
  {
    id: 2,
    name: 'Classic Standard Room',
    price: '50,000 per night',
    features: ['1 bathroom', '2 beds', '2 people'],
    imageSrc: '/images/room-classic-standard.jpg', // Placeholder
    imageAlt: 'Classic Standard Room',
  },
  {
    id: 3,
    name: 'Classic Double Room',
    price: '150,000 per night',
    features: ['1 bathroom', '2 beds', '2 people'],
    imageSrc: '/images/room-classic-double.jpg', // Placeholder
    imageAlt: 'Classic Double Room',
  },
  {
    id: 4,
    name: 'Deluxe Suite with balcony view',
    price: '50,000 per night',
    features: ['1 bathroom', '2 beds', '2 people'],
    imageSrc: '/images/room-deluxe-suite.jpg', // Placeholder
    imageAlt: 'Deluxe Suite',
  },
  {
    id: 5,
    name: 'Family suite with balcony view',
    price: '150,000 per night',
    features: ['1 bathroom', '2 beds', '2 people'],
    imageSrc: '/images/room-family-suite.jpg', // Placeholder
    imageAlt: 'Family suite',
  },
  {
    id: 6,
    name: 'Penthouse suite with balcony view',
    price: '50,000 per night',
    features: ['1 bathroom', '2 beds', '2 people'],
    imageSrc: '/images/room-penthouse.jpg', // Placeholder
    imageAlt: 'Penthouse suite',
  },
];

// Component for a single room card
const RoomCard = ({ room }) => (
  <div className="flex flex-col">
    
    {/* Image Container */}
    <div className="relative aspect-[4/3] w-full rounded-md overflow-hidden shadow-lg">
      <Image
        src={room.imageSrc}
        alt={room.imageAlt}
        layout="fill"
        objectFit="cover"
        quality={80}
      />
    </div>
    
    {/* Content Area */}
    <div className="pt-4 pb-2">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h3>
      
      {/* Features List */}
      <ul className="list-disc ml-4 space-y-1 text-gray-600 text-sm">
        {room.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mr-2"></span>
            {feature}
          </li>
        ))}
      </ul>
      
      {/* Price and Button */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xl font-bold text-purple-700">
          {room.price}
        </p>
        <button className="bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-6 rounded transition duration-200 text-xs tracking-wider uppercase">
          BOOK NOW
        </button>
      </div>
    </div>
  </div>
);

const RoomsGrid = () => {
  return (
    // Rooms Grid Container
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Responsive Grid: 1 column on mobile, 2 columns on medium/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {roomsData.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomsGrid;