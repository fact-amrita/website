"use client"

import React from 'react';
import FACTImage from "@/public/images/logo.png";
import Image from "next/image";
import { IoHomeOutline, IoInformationCircleOutline, IoImagesOutline, IoPersonOutline, IoCallOutline } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi";


function Header({ scrollToSection, activeSection }: { scrollToSection: Function, activeSection: string }) {
  return (
    <div >
      <div className="container" style={{ zIndex:"9999" }}>
        <div className="factlogo">
          <Image src={FACTImage} draggable="false" alt="factlogo" height={50} width={250} className='bg-black' />
        </div>
        <div className="menu" style={{ position: "absolute", right: "0" }}>
          <ul className="navigation">
            <li className={activeSection === 'heading' ? 'active' : ''}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection('heading')}>
                <span className="icon"><IoHomeOutline color={"#ffffff"} /></span><span className="text">Home</span>
              </a>
            </li>
            <li className={activeSection === 'about' ? 'active' : ''}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection('about')}>
                <span className="icon"><IoInformationCircleOutline color={'#ffffff'} /></span><span className="text">Explore</span>
              </a>
            </li>
            <li className={activeSection === 'gallery' ? 'active' : ''}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection('gallery')}>
                <span className="icon"><IoImagesOutline color={'#ffffff'} /></span><span className="text">Gallery</span>
              </a>
            </li>
            <li className={activeSection === 'coordinators' ? 'active' : ''}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection('coordinators')}>
                <span className="icon"><IoPersonOutline color={'#ffffff'} /></span><span className="text">Members</span>
              </a>
            </li>
            <li className={activeSection === 'footer' ? 'active' : ''}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection('footer')}>
                <span className="icon"><IoCallOutline color={'#ffffff'} /></span><span className="text">Contact</span>
              </a>
            </li>
            <li>
              <a style={{ cursor: "pointer" }} href="/app" title="Go to Portal" >
                <span className="icon"><HiOutlineAcademicCap color={'#ffffff'} /></span><span className="text" onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }} >Portal</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
