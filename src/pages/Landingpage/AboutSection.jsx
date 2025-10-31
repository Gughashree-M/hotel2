// components/AboutSection.jsx
import Image from 'next/image';

const AboutSection = () => {
  const dummyText =
    "Ladies and gentlemen, history keeps repeating itself but doesn't teach us any lessons. 'Never again' has turned into 'again, and again, and again.' So today, ladies and gentlemen, take Hotel Lunar as a wake-up call and a message to be our messenger that people are the ones who can change what they want to change.";

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        About <span className="text-purple-700">Hotel Lunar</span>
      </h2>

      {/* Flex container that switches to a column on small screens */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Text Column (Takes full width on mobile, 60% on desktop) */}
        <div className="lg:w-3/5 space-y-4 text-gray-600 leading-relaxed">
          <p>{dummyText}</p>
          <p className="hidden md:block">{dummyText}</p> {/* Hiding one paragraph on mobile for brevity */}
          
          <button className="mt-4 bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-6 rounded transition duration-300 text-sm">
            Read More
          </button>
        </div>

        {/* Image Column (Takes full width on mobile, 40% on desktop) */}
        <div className="w-full lg:w-2/5 mt-8 lg:mt-0 relative aspect-video lg:aspect-square">
          {/* Using aspect ratio classes for responsive image sizing */}
          <Image
            src="/out.jpg" // Placeholder for the second image
            alt="Modern Hotel Bedroom"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
        
    </section>
  );
};

export default AboutSection;