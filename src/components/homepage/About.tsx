import React, { useState, useEffect } from 'react';

function About() {
  // State to detect if the viewport is mobile
  const [isMobile, setIsMobile] = useState(false);
  // State to toggle full content visibility
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Check on component mount
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle handler for "Read More" / "Read Less" button
  const toggleContent = () => {
    setShowFullContent((prev) => !prev);
  };

  return (
    <section id="about">
      <div className="e-card playing">
        {/* Background Animation */}
        <div className="wave-container">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        {/* Content Section */}
        <div className="infotop">
          <div className="name">
            <h1>Welcome to FACT</h1>
            <h2>(Forensic Analysis Club &amp; Triage)</h2>
            <br />
            {(!isMobile || showFullContent) ? (
              // Full content for desktops or when "Read More" is clicked on mobile
              <>
                <p>
                  A dynamic student organization founded at ACN&apos;23 (Amrita Cyber Nation) in the vibrant Amrita Chennai campus. 
                  Our inception was inspired by the overwhelming response and enthusiasm witnessed at the FIC (Forensic Investigation Challenge) 
                  event during Tantrostav 23. This positive reception fueled our drive to create a dedicated platform where students can delve into the fascinating world of forensic analysis and digital triage.
                </p>
                <br />
                <p>
                  FACT was established with a core belief: Forensic analysis and Crime investigation. 
                  This club is not exclusively for top performers; it is an inclusive community designed to engage, educate, and empower all students, regardless of their academic standing. 
                  Our mission is to foster a collaborative environment where knowledge is shared freely, and curiosity is nurtured.
                </p>
                <br />
                <p>
                  FACT is more than just a club; it&apos;s a community where passion meets purpose. 
                  Whether you&apos;re a novice eager to learn or a seasoned enthusiast ready to share your expertise, FACT welcomes you. 
                  Together, we will explore the intricate world of both digital and physical forensics, push boundaries, and grow as a collective.
                </p>
                <br />
                <p>
                  Dive into the world of forensic analysis with FACT and be a part of a movement that champions inclusivity, learning, and innovation.
                </p>
                <br />
                <p className="call-to-action">
                  Join us in uncovering the truth and shaping the future of forensic science.
                </p>
              </>
            ) : (
              // Truncated content for mobile devices by default
              <>
               <p className='text-center'>
                  A dynamic student organization founded at ACN&apos;23 (Amrita Cyber Nation) in the vibrant Amrita Chennai campus. 
                  Our inception was inspired by the overwhelming response and enthusiasm witnessed at the FIC (Forensic Investigation Challenge) 
                  event during Tantrostav 23. This positive reception fueled our drive to create a dedicated platform where students can delve into the fascinating world of forensic analysis and digital triage....
                </p>
              </>
            )}

            {/* Show toggle button only on mobile */}
            {isMobile && (
              <button onClick={toggleContent} style={{ marginTop: '10px' }}>
                {showFullContent ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
