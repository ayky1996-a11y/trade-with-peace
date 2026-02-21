import React, { useState, useEffect } from "react";
import "@/App.css";
import { Toaster } from '@/components/ui/sonner';
import MarketTicker from '@/components/MarketTicker';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CommunitySection from '@/components/CommunitySection';
import TestimonialSection from '@/components/TestimonialSection';
import BlogSection from '@/components/BlogSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import { mockData } from '@/data/mock';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App">
      <MarketTicker data={mockData.marketTicker} />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection data={mockData.hero} />
      <AboutSection data={mockData.about} />
      <ServicesSection data={mockData.services} />
      <CommunitySection data={mockData.community} />
      <TestimonialSection data={mockData.testimonials} />
      <BlogSection data={mockData.blogs} />
      <FAQSection data={mockData.faqs} />
      <Footer data={mockData.footer} />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
