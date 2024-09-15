import React from 'react';
import Link from 'next/link';
import { GoInfo } from "react-icons/go";
import styled, { keyframes } from 'styled-components';

// Define the keyframes for the background animation
const movingGradient = keyframes`
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

// Styled component for the mobile overlay
const Overlay = styled.div`
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(270deg, #002136, #800200, #002136, #800200);
  background-size: 200% 200%;
  animation: ${movingGradient} 8s ease infinite;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// Styled component for the overlay content
const OverlayContent = styled.div`
  text-align: center;

  h1 {
    font-size: 8vw;
    white-space: nowrap;
  }

  p {
    text-align: center;
    font-size: 5vw;
  }

  a {
    text-decoration: underline;
  }
`;

// This ensures the icon is properly centered
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px; /* Space between the icon and the heading */
`;

const MobileOverlay = () => {
  return (
    <Overlay>
      <OverlayContent>
        <IconWrapper>
          <GoInfo size={75} />
        </IconWrapper>
        <h1>Website Not Supported</h1>
        <p>This website is not optimized for mobile devices. Please visit on a desktop or a larger screen.</p>
        <p>If you would like to help us develop for mobile, feel free to contact {' '}
          <Link href="mailto:technicalteam@factamrita.in?subject=Help Incoming !!!&body=Hi ,I would like to help you in making your website mobile friendly.">
            our technical team
          </Link>
        </p>
      </OverlayContent>
    </Overlay>
  );
};

export default MobileOverlay;
