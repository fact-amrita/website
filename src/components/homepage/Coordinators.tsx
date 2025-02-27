import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/bundle';
import FACTImage from '@/public/images/FACT_white_wbg - Copy.png';

interface MemberDetails {
  name: string;
  title: string;
  year: string;
  imgURL: string;
  customStyles?: {
    width: string;
    marginLeft?: string;
    marginBottom?: string;
  }
}

const Coordinators: React.FC = () => {
  const handleSlideChange = (swiper: any) => {
    const index = swiper.activeIndex;
    const targetElement = document.querySelectorAll('.product-slider__item')[index] as HTMLElement;
    if (targetElement) {
      const target = targetElement.dataset.target;
      if (target) {
        document.querySelectorAll('.product-img__item').forEach(item => item.classList.remove('active'));
        document.querySelector(`#${target}`)?.classList.add('active');
      }
    }
  };

  useEffect(() => {
    const firstSlide = document.querySelector('.product-slider__item') as HTMLElement;
    if (firstSlide) {
      const target = firstSlide.dataset.target;
      if (target) {
        document.querySelector(`#${target}`)?.classList.add('active');
      }
    }
  }, []);

  const members23_24 = [{
    "name": "Abhishek G",
    "title": "Founder & President",
    "year": "Batch '20 CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Abhishek(President).png?updatedAt=1725454402624",
    "customStyles": {
      marginLeft: "-10%",
      marginBottom: "-11%"
    }
  }, {
    "name": "Karun Kumar",
    "title": "Secretary",
    "year": "Batch '20 CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Karun(Secretary).png?updatedAt=1725456805402",
    "customStyles": {
      marginBotom: "11%",
      marginLeft: "3%",
      width: "46%"
    }
  }, {
    "name": "Navaneeth P",
    "title": "Vice President",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Navaneeth_President.png",
    "customStyles": {
      width: "63%"
    }
  }, {
    "name": "Padmasini A",
    "title": "Public Relations & Marketing",
    "year": "Batch '20 CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Padmasini(PR&Marketing).png?updatedAt=1725454347894",
    "customStyles": {
      width: "60%",
      marginLeft: "0%",
      marginBottom: "-7.5%"
    }
  }, {
    "name": "Datta Sai Manikanta",
    "title": "Technical Lead",
    "year": "Batch '20 CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Datta%20Sai(Technical%20Lead).png?updatedAt=1725454483882",
    "customStyles": {
      width: "55%",
      marginBottom: "-2%"
    }
  }, {
    "name": "Bharadwaj N",
    "title": "Treasurer",
    "year": "Batch '20 CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Bharadwaj(Treasurer).png?updatedAt=1725456279636",
    "customStyles": {
      width: "55%",
      marginBottom: "3.4%"
    }
  }, {
    "name": "Kumoulica A",
    "title": "Event Co-Ordinator ",
    "year": "Batch '20 CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Kumoulica(Event%20Coordinator).png?updatedAt=1725297925774",
    "customStyles": {
      width: "80%",
      marginBottom: "5%",
      marginLeft: "-38%"
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
    "name": "Aravind Mohan",
    "title": "Membership Co-Ordinator",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Aravind%20(Skill%20Enhancement%20Coordinator).png",
    "customStyles": {
      width: "80%",
      marginLeft: "-5%",
      marginBottom: "7%"
    }
  }, {
    "name": "Prithi G",
    "title": "Skill Enhancement Co-Ordinator",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Prithi(Skill%20enhancement%20Coordinator).png?updatedAt=1725297926999",
    "customStyles": {
      width: "45%",
      marginLeft: "7%",
      marginBottom: "0%"
    }
  }
  ]

  const members24_25 = [{
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
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Moksha.png?updatedAt=1737869804527",
    "customStyles": {
      width: "60%"
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
    "name": "Mazhar Mashood",
    "title": "Marketing and Content Creation",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Mazhar(marketing%20and%20content%20creation).png?updatedAt=1722762131958",
    "customStyles": {
      width: "59%",
      marginLeft: "-2%",
      marginBottom: "1%"
    }
  }, {
    "name": "Gaurav Kheitan",
    "title": "Event Co-Ordinator ",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Gaurav%20Keitan%20(event%20co-ordinator).png?updatedAt=1722923209259",
    "customStyles": {
      width: "57%",
      marginBottom: "-4%"
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
    "title": "Public Relations & Marketing",
    "year": "4th Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Satwika_marketing.png?updatedAt=1726580305401",
    "customStyles": {
      width: "55%",
      marginLeft: "4%",
      marginBottom: "0%"
    }
  }
  ]

  const members25_26 = [{
    "name": "Mokshagna Bhuvan",
    "title": "President",
    "year": "3rd Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Moksha.png?updatedAt=1737869804527",
    "customStyles": {
      width: "60%"
      }
    }, 
      {
    "name": "Abhishik CH ",
    "title": "Secretary",
    "year": "3rd year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/abhishik.png?updatedAt=1740491827637",
    "customStyles": {
      marginTop : "10%",

    }
  }, {
    "name": "Adithi Suresh",
    "title": "Vice President",
    "year": "2nd year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/IMG_3572.PNG?updatedAt=1740403219160",
    "customStyles": {
    width: "50%",
    marginBottom: "28px"
    }
  }, {
    "name": "Lalith M",
    "title": `Physical Forensics Co-Ordinator`,
    "year": "3rd Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Lalith1.png?updatedAt=1740506801700",
    "customStyles": {
      width: "65%",
      marginBottom: "-11%",
    }
  }, {
    "name": "Dhivyasree",
    "title": "Digital Forensics Co-Ordinator",
    "year": "3rd year CSE",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Dhivyasree.png?updatedAt=1740502538378",
    "customStyles": {
      width: "50%",
      marginBottom:"-1%"
    }
  }, {
    "name": "Dhivijit K",
    "title": "Technical Lead",
    "year": "3rd Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Dhivijit.png?updatedAt=1740502496178",
    "customStyles": {
      width: "65%",
      marginBottom: "-5%"
    }
  }, {
    "name": "Kapil Ch",
    "title": "MARKETING AND MEDIA COORDINATOR",
    "year": "3rd Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Kapil.png?updatedAt=1740491883397",
    "customStyles": {
      width: "70%",
     
    }
  }, {
    "name": "Keerthan Reddy P",
    "title": "Membership coordinator",
    "year": "3rd Year CYS",
    "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Keerthan1.png?updatedAt=1740491637312",
    "customStyles": {
      width: "45%",
      marginLeft: "-2%",
      marginBottom: "1%"
    }
  }
  // , {
  //   "name": "Mounika V ",
  //   "title": "Skill Enhancement Co-Ordinator",
  //   "year": "3rd Year AIE",
  //   "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Aravind%20(Skill%20Enhancement%20Coordinator).png",
  //   "customStyles": {
  //     width: "80%",
  //     marginLeft: "-5%",
  //     marginBottom: "7%"
  //   }
  // }
  // }, {
  //   "name": "yet to be decided",
  //   "title": "Public Relations & Marketing",
  //   "year": "4th Year CYS",
  //   "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Satwika_marketing.png?updatedAt=1726580305401",
  //   "customStyles": {
  //     width: "55%",
  //     marginLeft: "4%",
  //     marginBottom: "0%"
  //   }
  // }
  ]

  const [ActiveMemberDetails, setActiveMemberDetails] = useState<MemberDetails[]>(members25_26 as MemberDetails[]);


  return (<>
    <section id="coordinators" style={{ marginTop: "-5%" }}>
      <div style={{ position: "relative", left: "36%", top: "120px", width: "30%", zIndex: "100" }} className="flex">
        <button className='bg-slate-900 text-white' onClick={() => { setActiveMemberDetails(members23_24 as MemberDetails[]) }} style={{ borderWidth: "2px", borderColor: "black", fontWeight: "600", padding: "8px", margin: "8px", borderRadius: "10px" }} >2023-2024</button>
        <button className='bg-slate-900 text-white' onClick={() => { setActiveMemberDetails(members24_25 as MemberDetails[]) }} style={{ borderWidth: "2px", borderColor: "black", fontWeight: "600", padding: "8px", margin: "8px", borderRadius: "10px" }} >2024-2025</button>
        <button className='bg-slate-900 text-white' onClick={() => { setActiveMemberDetails(members25_26 as MemberDetails[]) }} style={{ borderWidth: "2px", borderColor: "black", fontWeight: "600", padding: "8px", margin: "8px", borderRadius: "10px" }} >2025-2026</button>
      </div>
      <div className="wrapper">
        <div className="content">
          <div className="bg-shape" style={{ top: "97px", position: "absolute", height: "20.6em" }}>
            <Image src={FACTImage} alt="FACT Logo" draggable="false" />
          </div>
          <div style={{ filter: 'drop-shadow(1px 1px 20px rgb(0, 190, 211))' }} className="product-img">
            {ActiveMemberDetails.map((member, index) => (
              <div className="product-img__item" key={index} id={`img${index + 1}`}>
                <img src={member.imgURL} alt={member.name} className="product-img__img" style={member.customStyles} />
              </div>
            ))}
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
              {ActiveMemberDetails.map((member, index) => (
                <SwiperSlide key={index} className="product-slider__item" data-target={`img${index + 1}`}>
                  <div className="product-slider__card">
                    <img style={{ filter: "brightness(0.4)" }} src="https://ik.imagekit.io/factamrita/AdobeStock-JZM6gWcb8m.jpg?updatedAt=1722405189234" alt="background" className="product-slider__cover" />
                    <div className="product-slider__content" style={{ height: "23em" }}>
                      <h2 className="product-slider__title">{member.name}</h2>
                      <h4 className="product-slider__price">{member.title}</h4>
                      <p className="product-slider__price">{member.year}</p>
                      <div className="product-ctr"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
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
  </>);
};

export default Coordinators;
