import React from 'react';

function About() {
  return (
    <section id="about">
      <div className="e-card playing">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="infotop" style={{ padding: "0px 15px 15px 15px" }}>
          <br /><span style={{ fontSize: "1.3em", textTransform: "none" }}>ABOUT<br /></span>
          <div className="name" style={{ textTransform: "none" }}>
            <h1>Welcome to FACT - Forensic Analysis Club & Triage,</h1>
            <p>
              A dynamic student organization founded at ACN&apos;23
              (Amrita Cyber Nation) in the vibrant Amrita Chennai campus. Our inception was inspired by the overwhelming response and enthusiasm witnessed at the FIC (Forensic Investigation Challenge) event during Tantrostav 23.
              This positive reception fueled our drive to create a dedicated platform where students can delve into the fascinating world of forensic analysis and digital triage.
            </p>
            <p>
              FACT was established with a core belief: Forensic analysis and Crime investigation. This club is not exclusively for top performers; it is an inclusive community designed to engage, educate, and empower all students, regardless of their academic standing. Our mission is to foster a collaborative environment where knowledge is shared freely, and curiosity is nurtured.
            </p>
            <p>
              FACT is more than just a club; it&apos;s a community where passion meets purpose. Whether you&apos;re a novice eager to learn or a seasoned enthusiast ready to share your expertise, FACT welcomes you. Together, we will explore the intricate world of both digital and physical forensics, push boundaries, and grow as a collective.
            </p>
            <p>
              Dive into the world of forensic analysis with FACT and be a part of a movement that champions inclusivity, learning, and innovation.
            </p>
            <p className="call-to-action">
              Join us in uncovering the truth and shaping the future of forensic science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
