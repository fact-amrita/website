"use client";

import React, { useState } from "react";
import FACTImage from "@/public/images/logo.png";
import Image from "next/image";
import {
  IoHomeOutline,
  IoInformationCircleOutline,
  IoImagesOutline,
  IoPersonOutline,
  IoCallOutline,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi";

function Header({ scrollToSection, activeSection }: { scrollToSection: Function; activeSection: string }) {
  // State for mobile menu toggling
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  // Desktop header (existing code) – visible only on screens >=728px
  const DesktopHeader = (
    <div className="hidden mobile:block">
      <div className="container flex justify-center mobile:justify-between">
        <div className="factlogo mobile:block hidden">
          <Image
            src={FACTImage}
            draggable="false"
            alt="factlogo"
            height={50}
            width={250}
            className=" sm:hidden hidden"
          />
        </div>
        <div className="menu mobile:w-fit w-full">
          <ul className="navigation w-full flex gap-4">
            <li className={activeSection === "heading" ? "active" : ""}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection("heading")}>
                <span className="icon">
                  <IoHomeOutline color={"#ffffff"} />
                </span>
                <span className="text">Home</span>
              </a>
            </li>
            <li className={activeSection === "about" ? "active" : ""}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection("about")}>
                <span className="icon">
                  <IoInformationCircleOutline color={"#ffffff"} />
                </span>
                <span className="text">Explore</span>
              </a>
            </li>
            <li className={activeSection === "gallery" ? "active" : ""}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection("gallery")}>
                <span className="icon">
                  <IoImagesOutline color={"#ffffff"} />
                </span>
                <span className="text">Gallery</span>
              </a>
            </li>
            <li className={activeSection === "coordinators" ? "active" : ""}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection("coordinators")}>
                <span className="icon">
                  <IoPersonOutline color={"#ffffff"} />
                </span>
                <span className="text">Members</span>
              </a>
            </li>
            <li className={activeSection === "footer" ? "active" : ""}>
              <a style={{ cursor: "pointer" }} onClick={() => scrollToSection("footer")}>
                <span className="icon">
                  <IoCallOutline color={"#ffffff"} />
                </span>
                <span className="text">Contact</span>
              </a>
            </li>
            <li>
              <a style={{ cursor: "pointer" }} href="/app" title="Go to Portal">
                <span className="icon">
                  <HiOutlineAcademicCap color={"#ffffff"} />
                </span>
                <span
                  className="text"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                >
                  Portal
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  // Mobile header with hamburger – visible only on screens below 728px
  const MobileHeader = (
    <div className="block mobile:hidden bg-gray-950 text-white w-11/12 mx-auto mt-3 rounded-lg">
      <div className="flex justify-between items-center p-4">
        {/* Mobile Logo */}
        <div className="logo">
          <Image src={FACTImage} draggable="false" alt="factlogo" height={40} width={120} />
        </div>
        {/* Hamburger Icon */}
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          {mobileMenuOpen ? <IoCloseOutline size={28} /> : <IoMenuOutline size={28} />}
        </button>
      </div>
      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <ul className="flex flex-col gap-2 p-4 border-t border-gray-600">
          <li
            className={
              activeSection === "heading"
                ? "font-bold w-full text-center"
                : "w-full text-center font-normal"
            }
          >
            <a
              className="w-full text-center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                scrollToSection("heading");
                setMobileMenuOpen(false);
              }}
            >
              <span className="text-2xl">Home</span>
            </a>
          </li>
          <li
            className={
              activeSection === "about"
                ? "font-bold w-full text-center"
                : "w-full text-center font-normal"
            }
          >
            <a
              className="w-full text-center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                scrollToSection("about");
                setMobileMenuOpen(false);
              }}
            >
              <span className="text-2xl">Explore</span>
            </a>
          </li>
          <li
            className={
              activeSection === "gallery"
                ? "font-bold w-full text-center"
                : "w-full text-center font-normal"
            }
          >
            <a
              className="w-full text-center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                scrollToSection("gallery");
                setMobileMenuOpen(false);
              }}
            >
              <span className="text-2xl">Gallery</span>
            </a>
          </li>
          <li
            className={
              activeSection === "coordinators"
                ? "font-bold w-full text-center"
                : "w-full text-center font-normal"
            }
          >
            <a
              className="w-full text-center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                scrollToSection("coordinators");
                setMobileMenuOpen(false);
              }}
            >
              <span className="text-2xl">Members</span>
            </a>
          </li>
          <li
            className={
              activeSection === "footer"
                ? "font-bold w-full text-center"
                : "w-full text-center font-normal"
            }
          >
            <a
              className="w-full text-center"
              style={{ cursor: "pointer" }}
              onClick={() => {
                scrollToSection("footer");
                setMobileMenuOpen(false);
              }}
            >
              <span className="text-2xl">Contact</span>
            </a>
          </li>
          <li
            className={
              activeSection === "portal"
                ? "font-bold w-full text-center"
                : "w-full text-center font-normal"
            }
          >
            <a
              className="w-full text-center"
              style={{ cursor: "pointer" }}
              href="/app"
              title="Go to Portal"
            >
              <span className="text-2xl">Portal</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );

  return (
    <div className="fixed w-full top-0 z-[1000]">
      {MobileHeader}
      {DesktopHeader}
    </div>
  );
}

export default Header;
