import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/bundle';
import FACTImage from '@/public/images/FACT_white_wbg - Copy.png';

const Coordinators: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const productImgRefs = useRef<HTMLDivElement[]>([]);

  const handleSlideChange = (swiper: any) => {
    const index = swiper.activeIndex;
    const target = productImgRefs.current[index]?.dataset.target;

    productImgRefs.current.forEach(item => item.classList.remove('active'));
    document.querySelector(`#${target}`)?.classList.add('active');

    if (prevButtonRef.current) prevButtonRef.current.classList.toggle('disabled', swiper.isBeginning);
    if (nextButtonRef.current) nextButtonRef.current.classList.toggle('disabled', swiper.isEnd);
  };

  useEffect(() => {
    const firstSlide = productImgRefs.current[0];
    const target = firstSlide?.dataset.target;
    document.querySelector(`#${target}`)?.classList.add('active');
  }, []);

  return (
    <section id="coordinators">
      <div className="wrapper">
        <div className="content">
          <div className="bg-shape" style={{ top: "97px", position: "absolute", height: "20.6em" }}>
            <Image src={FACTImage} alt="FACT Logo" />
          </div>
          <div style={{ filter: 'drop-shadow(1px 1px 20px rgb(0, 190, 211))' }} className="product-img">
            <div className="product-img__item" id="img1" ref={(el) => { if (el) productImgRefs.current[0] = el; }}>
              <img src="abhi.png" alt="coordinate 1" className="product-img__img" />
            </div>
            <div className="product-img__item" id="img2" ref={(el) => { if (el) productImgRefs.current[1] = el; }}>
              <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405217/starwars/item-2.webp" alt="coordinate 2" className="product-img__img" />
            </div>
            <div className="product-img__item" id="img3" ref={(el) => { if (el) productImgRefs.current[2] = el; }}>
              <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405218/starwars/item-3.webp" alt="coordinate 3" className="product-img__img" />
            </div>
            <div className="product-img__item" id="img4" ref={(el) => { if (el) productImgRefs.current[3] = el; }}>
              <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405215/starwars/item-4.webp" alt="coordinate 4" className="product-img__img" />
            </div>
          </div>
          <div className="product-slider">
            <button className="prev disabled" ref={prevButtonRef}>
              <span className="icon">
                <svg className="icon icon-arrow-right">
                  <use xlinkHref="#icon-arrow-left"></use>
                </svg>
              </span>
            </button>
            <button className="next" ref={nextButtonRef}>
              <span className="icon">
                <svg className="icon icon-arrow-right">
                  <use xlinkHref="#icon-arrow-right"></use>
                </svg>
              </span>
            </button>
            <Swiper
              modules={[Navigation, EffectFade]}
              spaceBetween={30}
              effect="fade"
              loop={false}
              navigation={{
                nextEl: nextButtonRef.current,
                prevEl: prevButtonRef.current
              }}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                handleSlideChange(swiper);
              }}
            >
              <SwiperSlide className="product-slider__item" data-target="img1">
                <div className="product-slider__card">
                  <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405223/starwars/item-4-bg.webp" alt="star wars" className="product-slider__cover" />
                  <div className="product-slider__content" style={{ height: "23em" }}>
                    <h2 className="product-slider__title">ABHIRAM</h2>
                    <h4 className="product-slider__price">ABHIRAM</h4>
                    <p className="product-slider__price">3RD YR CYS</p>
                    <div className="product-ctr"></div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="product-slider__item" data-target="img2">
                <div className="product-slider__card">
                  <div className="product-slider__content">
                    <h2 className="product-slider__title">GAUTAM</h2>
                    <span className="product-slider__price">3RD YR CYS</span>
                    <div className="product-ctr"></div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="product-slider__item" data-target="img3">
                <div className="product-slider__card">
                  <div className="product-slider__content">
                    <h2 className="product-slider__title">RAM</h2>
                    <h4 className="product-slider__price">ABHIRAM</h4>
                    <span className="product-slider__price">3RD YR CYS</span>
                    <div className="product-ctr"></div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="product-slider__item" data-target="img4">
                <div className="product-slider__card">
                  <div className="product-slider__content">
                    <h2 className="product-slider__title">SRINIVAS</h2>
                    <h4 className="product-slider__price">ABHIRAM</h4>
                    <span className="product-slider__price">3RD YR CYS</span>
                    <div className="product-ctr"></div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <svg className="">
        <symbol id="icon-arrow-left" viewBox="0 0 32 32">
          <path d="M0.704 17.696l9.856 9.856c0.896 0.896 2.432 0.896 3.328 0s0.896-2.432 0-3.328l-5.792-5.856h21.568c1.312 0 2.368-1.056 2.368-2.368s-1.056-2.368-2.368-2.368h-21.568l5.824-5.824c0.896-0.896 0.896-2.432 0-3.328-0.48-0.48-1.088-0.704-1.696-0.704s-1.216 0.224-1.696 0.704l-9.824 9.824c-0.448 0.448-0.704 1.056-0.704 1.696s0.224 1.248 0.704 1.696z"></path>
        </symbol>
        <symbol id="icon-arrow-right" viewBox="0 0 32 32">
          <path d="M31.296 14.336l-9.888-9.888c-0.896-0.896-2.432-0.896-3.328 0s-0.896 2.432 0 3.328l5.824 5.856h-21.536c-1.312 0-2.368 1.056-2.368 2.368s1.056 2.368 2.368 2.368h21.568l-5.856 5.824c-0.896 0.896-0.896 2.432 0 3.328 0.48 0.48 1.088 0.704 1.696 0.704s1.216-0.224 1.696-0.704l9.824-9.824c0.448-0.448 0.704-1.056 0.704-1.696s-0.224-1.248-0.704-1.664z"></path>
        </symbol>
      </svg>
    </section>
  );
};

export default Coordinators;
