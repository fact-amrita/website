"use client"

import React from 'react';
import FACTImage from "@/public/images/logo.png";
import Image from "next/image";
import { HomeOutline, InformationCircleOutline, ImagesOutline, PersonOutline, CallOutline } from 'react-ionicons';

function Header({ scrollToSection, activeSection }: { scrollToSection: Function, activeSection: string }) {
  return (
    <div>
      <div className="container">
        <div className="factlogo">
          <Image src={FACTImage} alt="factlogo" height={50} width={250} />
        </div>
        <div className="menu" style={{ position: "absolute", right: "0" }}>
          <ul className="navigation">
            <li className={activeSection === 'heading' ? 'active' : ''}><a style={{ cursor: "pointer" }} onClick={() => scrollToSection('heading')}><span className="icon"><HomeOutline color={'#ffffff'} /></span><span className="text">Home</span></a></li>
            <li className={activeSection === 'about' ? 'active' : ''}><a style={{ cursor: "pointer" }} onClick={() => scrollToSection('about')}><span className="icon"><InformationCircleOutline color={'#ffffff'} /></span><span className="text">Explore</span></a></li>
            <li className={activeSection === 'gallery' ? 'active' : ''}><a style={{ cursor: "pointer" }} onClick={() => scrollToSection('gallery')}><span className="icon"><ImagesOutline color={'#ffffff'} /></span><span className="text">Gallery</span></a></li>
            <li className={activeSection === 'coordinators' ? 'active' : ''}><a style={{ cursor: "pointer" }} onClick={() => scrollToSection('coordinators')}><span className="icon"><PersonOutline color={'#ffffff'} /></span><span className="text">Members</span></a></li>
            <li className={activeSection === 'footer' ? 'active' : ''}><a style={{ cursor: "pointer" }} onClick={() => scrollToSection('footer')}><span className="icon"><CallOutline color={'#ffffff'} /></span><span className="text">Contact</span></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
