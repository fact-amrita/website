"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import Header from '@/components/homepage/Header';
import Heading from '@/components/homepage/Heading';
import About from '@/components/homepage/About';
import Gallery from '@/components/homepage/Gallery';
import Coordinators from '@/components/homepage/Coordinators';
import Footer from '@/components/homepage/Footer';
import './homepage.css';

function App() {
  const headingRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const coordinatorsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<string>('heading');

  const refs = useMemo<Record<string, React.RefObject<HTMLDivElement>>>(
    () => ({
      heading: headingRef,
      about: aboutRef,
      gallery: galleryRef,
      coordinators: coordinatorsRef,
      footer: footerRef,
    }),
    []
  );

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.5, // Adjust this value as needed
    });

    Object.values(refs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(refs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [handleScroll, refs]);

  return (
    <div style={{ fontFamily: '"Uni Sans", sans-serif', userSelect:"none", cursor:"default" }}>
      <Header scrollToSection={scrollToSection} activeSection={activeSection} />
      <div ref={headingRef} id="heading" style={{ paddingTop: '50px' }}>
        <Heading />
      </div>
      <div ref={aboutRef} id="about" style={{ paddingTop: '50px' }}>
        <About />
      </div>
      <div ref={galleryRef} id="gallery" style={{ paddingTop: '50px' }}>
        <Gallery />
      </div>
      <div ref={coordinatorsRef} id="coordinators" style={{ paddingTop: '50px' }}>
        <Coordinators />
      </div>
      <div ref={footerRef} id="footer" style={{ paddingTop: '50px' }}>
        <Footer scrollToSection={scrollToSection} />
      </div>
    </div>
  );
}

export default App;
