// components/HeroSection.jsx
import Image from 'next/image';

const HeroSection = () => {
  return (
    <div data-aos="zoom-in" className="relative h-screen sm:h-[80vh] overflow-hidden">
      {/* Background Image - Adjust path and dimensions */}
      <div className="absolute inset-0">
        {/* Replace with your actual image path (e.g., from /public) */}
        <Image
          src="/1.jpg" // Placeholder for the first image
          alt="Lounge Area"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="filter brightness-[0.9]" // Darken the image for text contrast
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <h1 className="text-4xl sm:text-6xl font-serif mb-8 tracking-wider">
          A Memorable Experience.
        </h1>
        <a href='https://api.whatsapp.com/send?phone=919007062180' target="_blank"><button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 uppercase text-sm tracking-widest">
          Reserve Now
        </button></a>
      </div>
    </div>
  );
};

export default HeroSection;