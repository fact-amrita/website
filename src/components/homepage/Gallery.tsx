import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import Image from "next/image";
import ForensicImg4 from "@/public/images/forensicimages/forensic_4.jpg";
import "./Gallery.css";

function Gallery() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
  const wrapText = () => {
    const items = document.querySelectorAll(".galaryslider .item");
    
    items.forEach((item) => {
      const textWrapper = item.querySelector(".wrap");
      
      if (textWrapper && textWrapper.textContent) {
        // Split the text by words first
        textWrapper.innerHTML = textWrapper.textContent
          .split(" ")
          .map((word) => {
            // For each word, split the word into letters and wrap each letter with the 'letter' class
            const letters = word
              .split("")
              .map((letter) => `<span class='letter'>${letter}</span>`)
              .join(""); // Join the letters back into a word format
            // Wrap the entire word with the 'word' class
            return `<span class='word'>${letters}</span>`;
          })
          .join(" "); // Join all the words back together
      }
    });
  };

  wrapText();
}, []);

  

  const anim = (currentItem: any, newItem: any, callback: any) => {
    const currentImgs = currentItem.querySelectorAll(".img");
    const currentText = currentItem.querySelectorAll(".matter .letter");
    const nextImgs = newItem.querySelectorAll(".img");
    const nextText = newItem.querySelectorAll(".matter .letter");

    const t = 400;
    const offset = "-=" + t * 0.4;
    const imgOffset = t * 0.8;

    const tl = anime.timeline({
      easing: "easeInOutQuint",
      duration: t,
      complete: callback,
    });

    tl.add({
      targets: currentText,
      translateY: [0, '-.75em'],
      opacity: [1, 0],
      easing: "easeInQuint",
      duration: t,
      delay: (el, i) => 10 * (i + 1),
    })
      .add(
        {
          targets: currentImgs[0],
          translateY: -600,
          translateZ: 0,
          rotate: [0, '-15deg'],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        offset
      )
      .add(
        {
          targets: currentImgs[1],
          translateY: -600,
          translateZ: 0,
          rotate: [0, '15deg'],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: currentImgs[2],
          translateY: -600,
          translateZ: 0,
          rotate: [0, '-15deg'],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: currentImgs[3],
          translateY: -600,
          translateZ: 0,
          rotate: [0, '15deg'],
          opacity: [1, 0],
          easing: "easeInCubic",
        },
        "-=" + imgOffset
      )
      .add({
        targets: currentItem,
        opacity: 0,
        visibility: 'hidden',
        duration: 10,
        easing: "easeInCubic",
      })
      .add(
        {
          targets: newItem,
          opacity: 1,
          visibility: 'visible',
          duration: 10,
        },
        offset
      )
      .add(
        {
          targets: nextImgs[0],
          translateY: [600, 0],
          translateZ: 0,
          rotate: ['15deg', 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
        },
        offset
      )
      .add(
        {
          targets: nextImgs[1],
          translateY: [600, 0],
          translateZ: 0,
          rotate: ['-15deg', 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: nextImgs[2],
          translateY: [600, 0],
          translateZ: 0,
          rotate: ['15deg', 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: nextImgs[3],
          translateY: [600, 0],
          translateZ: 0,
          rotate: ['-15deg', 0],
          opacity: [0, 1],
          easing: "easeOutCubic",
        },
        "-=" + imgOffset
      )
      .add(
        {
          targets: nextText,
          translateY: ['.75em', 0],
          translateZ: 0,
          opacity: [0, 1],
          easing: "easeOutQuint",
          duration: t * 1.5,
          delay: (el, i) => 10 * (i + 1),
        },
        offset
      );
  };

  const updateSlider = (newIndex: any) => {
    const items = document.querySelectorAll(".galaryslider .item");
    const currentItem = items[current];
    const newItem = items[newIndex];

    function callback() {
      currentItem.classList.remove("is-active");
      newItem.classList.add("is-active");
      setCurrent(newIndex);
      setIsPlaying(false);
    }

    anim(currentItem, newItem, callback);
  };

  const next = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const newIndex = current === document.querySelectorAll(".galaryslider .item").length - 1 ? 0 : current + 1;
    updateSlider(newIndex);
  };

  const prev = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const newIndex = current === 0 ? document.querySelectorAll(".galaryslider .item").length - 1 : current - 1;
    updateSlider(newIndex);
  };

  const galleryItems = [
    {
      isActive: true,
      title: "Club Launch",
      images: [
        { src: "https://ik.imagekit.io/factamrita/gallery/Inauguration/_DSC5394.JPG?updatedAt=1725458235816", alt: "Inauguration 1", width: 700, height: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/Inauguration/_DSC5350.JPG?updatedAt=1725458235840", alt: "Inauguration 3", width: 700, height: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/Inauguration/_DSC5539.JPG?updatedAt=1725907745920", alt: "Inauguration 2", width: 700, height: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/Inauguration/_DSC5208%20(1).JPG?updatedAt=1725458236351", alt: "Inauguration 4", width: 700, height: 700 },
      ],
    },
    {
      title: "Mystery Unveiled",
      images: [
        { src: "https://ik.imagekit.io/factamrita/gallery/Mystery%20Unveiled/2Z2A2091.JPG?updatedAt=1725458608672", alt: "Mystery 1", width: 700, height: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/Mystery%20Unveiled/2Z2A2116.JPG?updatedAt=1725458608591", alt: "Mystery 2", width: 700, height: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/Mystery%20Unveiled/2Z2A2117.JPG?updatedAt=1725458608586", alt: "Mystery 3", width: 700, height: 700 },
        { src: ForensicImg4, alt: "Mystery 4", width: 700, height: 700 },
      ],
    },
    {
      title: "SOS",
      images: [
        { src: "https://ik.imagekit.io/factamrita/gallery/SOS/sos_1.jpg?updatedAt=1725907324866", alt: "Image 1",  height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/SOS/SOS1.jpeg?updatedAt=1725907321476", alt: "Image 2", height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/SOS/SOS2.jpeg?updatedAt=1725907455081", alt: "Image 3", height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/SOS/sos_2.jpg?updatedAt=1725907325218", alt: "Image 4",  height: 700, width: 700 },
      ],
    },
    {
      title: "Evil unDead",
      images: [
        { src: "https://ik.imagekit.io/factamrita/gallery/Evil%20unDead/IMG-20240306-WA0031.jpg?updatedAt=1725902973555", alt: "Image 1", height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/Evil%20unDead/1.png?updatedAt=1725902977602", alt: "Image 2", height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/Evil%20unDead/IMG-20240306-WA0027.jpg?updatedAt=1725902973988", alt: "Image 3", height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/Evil%20unDead/IMG-20240306-WA0000.jpg?updatedAt=1725902974923", alt: "Image 4", height: 700, width: 700 },
      ],
    },
    {
      title: "Riddle Realm & L.A.W",
      images: [
        { src: "https://ik.imagekit.io/factamrita/gallery/RR_LAW/LAW2.jpeg?updatedAt=1725902649990", alt: "Image 1", height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/RR_LAW/LAW1.jpeg?updatedAt=1725902649520", alt: "Image 2", height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/RR_LAW/RR1.jpg?updatedAt=1725902885141", alt: "Image 3", height: 700, width: 700 },
        { src: "https://ik.imagekit.io/factamrita/gallery/RR_LAW/RR2.jpg?updatedAt=1725902793064", alt: "Image 4", height: 700, width: 700 },
      ],
    }
  ];

  return (
    <section id="pics">
      <div className="galaryslider mobile:w-[80vw] w-[100vw]">
        <div className="nav">
          <div className="next" onClick={next} style={{ backgroundColor: 'white' }}></div>
          <div className="prev" onClick={prev} style={{ backgroundColor: 'white' }}></div>
        </div>
        {galleryItems.map((item, index) => (
          <div key={index} className={`item ${item.isActive ? 'is-active' : ''}`}>
            <div className="matter">
              <div className="wrap">
                {item.title}
              </div>
            </div>
            <div className="imgs">
              <div className="grid">
                {item.images.map((image, imgIndex) => (
                  <div key={imgIndex} className={`img img-${imgIndex + 1}`}>
                    <Image {...image} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;