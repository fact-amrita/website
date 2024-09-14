// MobileOverlay.js
import React from 'react';
import './MobileOverlay.css';
import Link from 'next/link';
import { GoInfo } from "react-icons/go";


const MobileOverlay = () => {
  return (
    <div className="mobile-overlay">
      <div className="mobile-overlay-content">
        <GoInfo size={75} style={{ position: "relative", left: "50%", transform: "translate(-50%, -50%)" }} />
        <h1>Website Not Supported</h1>
        <p>This website is not optimized for mobile devices. Please visit on a desktop or a larger screen.</p>

      </div>
    </div>
  );
};

export default MobileOverlay;