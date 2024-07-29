import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import Image from "next/image";
import ForensicImg1 from "@/public/images/forensicimages/forensic_1.jpg";
import ForensicImg2 from "@/public/images/forensicimages/forensic_2.jpg";
import ForensicImg3 from "@/public/images/forensicimages/forensic_3.jpg";
import ForensicImg4 from "@/public/images/forensicimages/forensic_4.jpg";
import SOSImg1 from "@/public/images/sos/sos_1.jpg";
import SOSImg2 from "@/public/images/sos/sos_2.jpg";


function Gallery() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const items = document.querySelectorAll(".galaryslider .item");
    items.forEach((item) => {
      const textWrapper = item.querySelector(".wrap");
      if (textWrapper) {
        if (textWrapper.textContent) {
          textWrapper.innerHTML = textWrapper.textContent.replace(
            /\S/g,
            "<span class='letter'>$&</span>"
          );
        }
      }
    });
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

  return (
    <section id="pics">
      <div className="galaryslider">
        <div className="nav">
          <div className="next" onClick={next} style={{ backgroundColor: 'white' }}></div>
          <div className="prev" onClick={prev} style={{ backgroundColor: 'white' }}></div>
        </div>
        <div className="item is-active">
          <div className="matter">
            <div className="wrap">FORENSIC</div>
          </div>
          <div className="imgs">
            <div className="grid">
              <div className="img img-1"><Image src={ForensicImg1} alt="Forensic 1" /></div>
              <div className="img img-2"><Image src={ForensicImg2} alt="Forensic 1" /></div>
              <div className="img img-3"><Image src={ForensicImg3} alt="Forensic 1" /></div>
              <div className="img img-4"><Image src={ForensicImg4} alt="Forensic 1" /></div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="matter">
            <div className="wrap">SOS</div>
          </div>
          <div className="imgs">
            <div className="grid">
              <div className="img img-1"><Image src={SOSImg1} alt="Image 1" /></div>
              <div className="img img-2"><Image src="https://picsum.photos/seed/f/700/700" alt="Image 2" height={700} width={700} /></div>
              <div className="img img-3"><Image src="https://picsum.photos/seed/g/700/700" alt="Image 3" height={700} width={700} /></div>
              <div className="img img-4"><Image src={SOSImg2} alt="Image 4" /></div>
            </div>
          </div>
        </div>
        {/* Repeat the above div for other items */}
      </div>
    </section>
  );
}

export default Gallery;
