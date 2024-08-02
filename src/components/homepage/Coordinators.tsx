import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/bundle';
import FACTImage from '@/public/images/FACT_white_wbg - Copy.png';

const Coordinators: React.FC = () => {
  const handleSlideChange = (swiper: any) => {
    const index = swiper.activeIndex;
    const target = (document.querySelectorAll('.product-slider__item')[index] as HTMLElement).dataset.target;

    document.querySelectorAll('.product-img__item').forEach(item => item.classList.remove('active'));
    document.querySelector(`#${target}`)?.classList.add('active');

    // document.querySelector('.prev')?.classList.toggle('disabled', swiper.isBeginning);
    // document.querySelector('.next')?.classList.toggle('disabled', swiper.isEnd);
  };

  const handleFavClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.currentTarget.querySelector('.heart')?.classList.toggle('is-active');
  };

  useEffect(() => {
    const firstSlide = document.querySelector('.product-slider__item') as HTMLElement;
    const target = firstSlide?.dataset.target;
    document.querySelector(`#${target}`)?.classList.add('active');
  }, []);

  const members = [{
    "name": "Navaneeth P",
    "title": "President",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Navaneeth_President.png"
  }, {
    "name": "Abhiram Kotnur",
    "title": "Secretary",
    "year": "4th Year CSE",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Abhiram%20(Secretary).png"
  }, {
    "name": "Mokshagna Bhuvan",
    "title": "Vice President",
    "year": "3rd Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Moksha(VP).png",
    "customStyles": {
      width: "55%"
    }
  }, {
    "name": "Fiyan Mehfil Ayoob",
    "title": `Physical Forensics Co-Ordinator`,
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Fiyan%20(Physical%20Forensic%20Coordinator).png",
    "customStyles": {
      width: "54%"
    }
  }, {
    "name": "Melvina Jose",
    "title": "Digital Forensics Co-Ordinator",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Melvina%20Jose%20(Digital%20Forensics%20Coordinator).png",
    "customStyles": {
      width: "50%"
    }
  }, {
    "name": "Siddhant Kundargi",
    "title": "Technical Lead",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Siddhant%20(Technical%20Lead).png",
    "customStyles": {
      width: "70%",
      marginBottom: "-5%"
    }
  }, {
    "name": "Krishna Koushik",
    "title": "Treasurer",
    "year": "4th Year CCE",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Krishna%20Kaushik%20(Treasurer).png",
    "customStyles": {
      width: "70%",
      marginBottom: "-2%"
    }
  }, {
    "name": "Mazhar Masood",
    "title": "Marketing and Content Creation",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/mazar(marketing%20and%20content%20creation).png?updatedAt=1722397506058",
    "customStyles": {
      width: "76%",
      marginLeft: "-70%"
    }
  }, {
    "name": "Keerthan Reddy",
    "title": "Event Co-Ordinator ",
    "year": "4th Year AIE",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Keerthan(event%20coordinator).png",
    "customStyles": {
      width: "54%",
    }
  }, {
    "name": "Aravind Mohan",
    "title": "Skill Enhancement Co-Ordinator",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Aravind%20(Skill%20Enhancement%20Coordinator).png",
    "customStyles": {
      width: "80%",
      marginLeft: "-5%",
      marginBottom: "7%"
    }
  }, {
    "name": "Satwika Matangi",
    "title": "Public Relations",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Satwika_marketing.png",
    "customStyles": {
      width: "50%",
      marginLeft: "6%",
      marginBottom: "8%"
    }
  }]

  return (
    <section id="coordinators">
      <div className="wrapper">
        <div className="content">
          <div className="bg-shape" style={{ top: "97px", position: "absolute", height: "20.6em" }}>
            <Image src={FACTImage} alt="FACT Logo" />
          </div>
          <div style={{ filter: 'drop-shadow(1px 1px 20px rgb(0, 190, 211))' }} className="product-img">
            {members.map((member, index) => {
              return (
                <div className="product-img__item" key={index} id={`img${index + 1}`}>
                  <Image src={member.imgURL} alt={member.name} style={member.customStyles} layout="fill" objectFit="cover" />
                </div>
              )
            })}
          </div>
          <div className="product-slider">
            <button className="prev" style={{ backgroundColor: "white" }}>
              <span className="icon">
                <svg className="icon icon-arrow-right">
                  <use xlinkHref="#icon-arrow-left"></use>
                </svg>
              </span>
            </button>
            <button className="next" style={{ backgroundColor: "white" }}>
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
              loop={true}
              navigation={{
                nextEl: '.next',
                prevEl: '.prev'
              }}
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => {
                const index = swiper.activeIndex;
                const target = (document.querySelectorAll('.product-slider__item')[index] as HTMLElement).dataset.target;
                document.querySelectorAll('.product-img__item').forEach(item => item.classList.remove('active'));
                document.querySelector(`#${target}`)?.classList.add('active');
              }}
            >
              {
                members.map((member, index) => {
                  return (
                    <SwiperSlide key={index} className="product-slider__item" data-target={`img${index + 1}`}>
                      <div className="product-slider__card">
                        <Image style={{ filter: "brightness(0.5)" }} src="https://ik.imagekit.io/factamrita/AdobeStock-JZM6gWcb8m.jpg?updatedAt=1722405189234" alt="star wars" layout="fill" objectFit="cover" className="product-slider__cover" />
                        <div className="product-slider__content" style={{ height: "23em" }}>
                          <h2 className="product-slider__title">{member.name}</h2>
                          <h4 className="product-slider__price">{member.title}</h4>
                          <p className="product-slider__price">{member.year}</p>
                          <div className="product-ctr"></div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })
              }
            </Swiper>
          </div>
        </div>
      </div>
      <svg className="">
        <symbol id="icon-arrow-left" viewBox="0 0 32 32">
          <path d="M0.704 17.696l9.856 9.856 2.944-2.944-7.488-7.488 7.488-7.488-2.944-2.944-9.856 9.856c-0.576 0.576-0.704 1.408-0.352 2.048 0.048 0.048 0.048 0.096 0.096 0.144s0.096 0.048 0.144 0.096c0.64 0.352 1.472 0.224 2.048-0.352z"></path>
        </symbol>
        <symbol id="icon-arrow-right" viewBox="0 0 32 32">
          <path d="M31.296 15.936l-9.856-9.856-2.944 2.944 7.488 7.488-7.488 7.488 2.944 2.944 9.856-9.856c0.576-0.576 0.704-1.408 0.352-2.048-0.048-0.048-0.048-0.096-0.096-0.144s-0.096-0.048-0.144-0.096c-0.64-0.352-1.472-0.224-2.048 0.352z"></path>
        </symbol>
      </svg>
    </section>
  );
};

export default Coordinators;
