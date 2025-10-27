// components/Facilities.js

import Image from 'next/image';

const facilitiesData = [
  { name: 'Swimming Pool', imageUrl: '/images/swimming_pool.jpg' }, // Replace with actual image paths
  { name: 'Gym', imageUrl: '/images/gym.jpg' },
  { name: 'Restaurants & Bar', imageUrl: '/images/restaurant_bar.jpg' },
  { name: 'Spa & Jacuzzi', imageUrl: '/images/spa_jacuzzi.jpg' },
  { name: 'Conference Room', imageUrl: '/images/conference_room.jpg' },
  { name: 'Parking Garage', imageUrl: '/images/parking_garage.jpg' },
];

const alsoOfferData = [
  'Limo services',
  'Free Wi-Fi',
  'Adequate safety/ security',
  'Laundry services',
  'Delicious meals',
  'Air cooling in all rooms',
  'Room services',
  'Ticket books',
  'Shuttle/ Private transfers',
  'Necessities for babies and children',
];

const Facilities = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header Section (Based on the top of the image) */}
      <div className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: 'url("/images/facilities_header.jpg")' }}>
        {/* Placeholder for the main header image, use your own image path */}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white tracking-widest uppercase">
            FACILITIES
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Facility Grid */}
        {/* Mobile View: 1 column (grid-cols-1) for a comfortable vertical scroll */}
        {/* Tablet View: 2 columns (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilitiesData.map((facility) => (
            <div key={facility.name} className="flex flex-col items-center bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Image Container (Use next/image for optimization) */}
              {/* Ensure image dimensions are set or use a fixed aspect ratio class */}
              <div className="w-full h-64 relative">
                {/* NOTE: In a real Next.js app, the 'Image' component requires 'width' and 'height' 
                  or the 'layout="fill"' property and a defined parent container size. 
                  Since we are aiming for responsiveness, 'layout="fill"' is best here. 
                */}
                <Image
                  src={facility.imageUrl}
                  alt={facility.name}
                  layout="fill" 
                  objectFit="cover" // Ensures the image covers the area nicely
                  className="transition duration-300 hover:scale-105"
                />
              </div>
              
              {/* Facility Name */}
              <p className="text-lg font-medium text-gray-700 py-4">
                {facility.name}
              </p>
            </div>
          ))}
        </div>

        {/* Separator Line */}
        <hr className="my-16 border-gray-300" />

        {/* "We also offer:" Section */}
        <div className="text-gray-900">
          <h2 className="text-xl font-semibold mb-6">We also offer:</h2>
          
          {/* Offer List */}
          {/* Mobile View: 1 column list (grid-cols-1) */}
          {/* Larger Views: 3 columns (lg:grid-cols-3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-8 text-sm text-gray-600">
            {alsoOfferData.map((item, index) => (
              <p key={index} className="flex items-center text-purple-600 font-medium">
                <span className="text-gray-700 font-normal">{item}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;