import Navbar from "@/component/Navbar"
import AboutSection from "@/pages/Landingpage/AboutSection"
import EventsSection from "@/pages/Landingpage/EventsSection"
import GallerySection from "@/pages/Landingpage/GallerySection"
import HeroSection from "@/pages/Landingpage/HeroSection"
import ContactUs from "@/pages/ContactUs/ContactUs"

function page() {
  return (
    <div>
      
      <HeroSection />
      <AboutSection/>
      <EventsSection/>
      <GallerySection/>
      {/* <ContactUs/> */}
      
    </div>

  )
}

export default page