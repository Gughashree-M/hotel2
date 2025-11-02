'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
      easing: 'ease-in-out', // animation timing
    });
  }, []);
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />

      </body>
    </html>
  );
}
