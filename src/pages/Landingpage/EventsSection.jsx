// components/EventsSection.jsx
import Image from 'next/image';

const EventsSection = () => {
  const dummyText =
    "Ladies and gentlemen, history keeps repeating itself but doesn't teach us any lessons. 'Never again' has turned into 'again, and again, and again.' So today, ladies and gentlemen, take Hotel Lunar as a wake-up call and a message to be our messenger that people are the ones who can change what they want to change.";

  return (
    <section data-aos="zoom-out" className="relative py-20 overflow-hidden mt-16">
      {/* Background Image - Adjust path */}
      <div className="absolute inset-0">
        {/* Replace with your actual image path */}
        <Image
          src="/wedding.webp" // Placeholder for the third image
          alt="Events & Wedding Setup"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="filter brightness-[0.6]" // Darken the image for text contrast
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 text-white px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-wide">
          Events & Weddings
        </h2>
        <p className="text-lg leading-relaxed">
          {dummyText}
        </p>
      </div>
    </section>
  );
};

export default EventsSection;