// TeamCarousel.tsx
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./TeamCarousel.css";

// TeamMember type
interface TeamMember {
  name: string;
  role: string;
  img: string;
}

// Team data grouped by year
const teamsByYear: Record<string, TeamMember[]> = {
  "2025-2026": [  
    {
      name: "MOKSHAGNA BHUVAN",
      role: "President",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Moksha.png?updatedAt=1737869804527",
    },
    {
      name: "ADITHI SURESH",
      role: "President",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/IMG_3572.PNG?updatedAt=1740403219160",
    },
    {
      name: "DHIVIJIT K",
      role: "Technical Lead",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Dhivijit.png?updatedAt=1740502496178",
    },
    {
      name: "ABHISHEK CH",
      role: "Secretary",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/abhishik.png?updatedAt=1740491827637",
    },
    {
      name: "LALITH M",
      role: "Physical Forensics Co-ordinator",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/lalith.png?updatedAt=1740500497616",
    },
    {
      name: "DHIVYASREE",
      role: "DIGITAL FORENSICS CO-ORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Dhivyasree.png?updatedAt=1740502538378",
    },
    {
      name: "KAPIL CH",
      role: "MARKETING AND MEDIA COORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Kapil.png?updatedAt=1740491883397",
    },
    {
      name: "KEERTHAN REDDY P",
      role: "MEMBERSHIP COORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2025-2026/Keerthan1.png?updatedAt=1740491637312",
    },
  ],
  "2024-2025": [
    {
      name: "NAVANEETH P",
      role: "President",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Navaneeth_President.png?updatedAt=1722366280750",
    },
    {
      name: "MOKSHAGNA BHUVAN",
      role: "Vice President",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Moksha.png?updatedAt=1737869804527",    
    },
    {
      name: "SIDDHANT KUNDARGI",
      role: "Technical Lead",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Siddhant%20(Technical%20Lead).png?updatedAt=1722366296411",
    },
    {
      name: "ABHIRAM KOTNUR",
      role: "Secretary",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Abhiram%20(Secretary).png?updatedAt=1722366296421",
    },
    {
      name: "FIYAN MEHFIL AYOOB",
      role: "Physical Forensics Co-ordinator",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Fiyan%20(Physical%20Forensic%20Coordinator).png?updatedAt=1722366290419",
    },
    {
      name: "MALVINA JOSE",
      role: "DIGITAL FORENSICS CO-ORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Melvina%20Jose%20(Digital%20Forensics%20Coordinator).png?updatedAt=1722368609092",
    },
    {
      name: "MAZHAR MASHOOD",
      role: "MARKETING AND MEDIA COORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/mazar(marketing%20and%20content%20creation).png?updatedAt=1722397506058",
    },
    {
      name: "ARAVIND MOHAN",
      role: "MEMBERSHIP COORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Aravind%20(Skill%20Enhancement%20Coordinator).png?updatedAt=1722366282827",
    },
  ],
  "2023-2024": [
    {
      name: "ABHISHEK G",
      role: "President",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Abhishek(President).png?updatedAt=1725454402624",
    },
    {
      name: "NAVANEETH P",
      role: "Vice President",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Navaneeth_President.png?updatedAt=1722366280750",
    },
    {
      name: "DATTA SAI MANIKANTA",
      role: "Technical Lead",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Datta%20Sai(Technical%20Lead).png?updatedAt=1725454483882",
    },
    {
      name: "KARUN KUMAR",
      role: "SECRETARY",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Karun(Secretary).png?updatedAt=1725456805402",
    },
    {
      name: "PADMASINI A",
      role: "PUBLIC RELATIONS & MARKETING",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Padmasini(PR&Marketing).png?updatedAt=1725454347894",
    },
    {
      name: "BHARADWAJ N",
      role: "TREASURER",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Bharadwaj(Treasurer).png?updatedAt=1725456279636",
    },
    {
      name: "KUMOULICA A",
      role: "EVENT CO-ORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/2023-2024/Kumoulica(Event%20Coordinator).png?updatedAt=1725297925774",
    },
    {
      name: "FIYAN MEHFIL AYOOB",
      role: "Physical Forensics Co-ordinator",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Fiyan%20(Physical%20Forensic%20Coordinator).png?updatedAt=1722366290419",
    },
    {
      name: "MALVINA JOSE",
      role: "DIGITAL FORENSICS CO-ORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Melvina%20Jose%20(Digital%20Forensics%20Coordinator).png?updatedAt=1722368609092",
    },
    {
      name: "MAZHAR MASHOOD",
      role: "MARKETING AND MEDIA COORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/mazar(marketing%20and%20content%20creation).png?updatedAt=1722397506058",
    },
    {
      name: "ARAVIND MOHAN",
      role: "MEMBERSHIP COORDINATOR",
      img: "https://ik.imagekit.io/factamrita/co-ordinators/Aravind%20(Skill%20Enhancement%20Coordinator).png?updatedAt=1722366282827",
    },
  ],
  
  // "2026-2027": [
  //   {
  //     name: "Future Lead",
  //     role: "President",
  //     img: "https://ik.imagekit.io/factamrita/co-ordinators/2026-2027/example1.png",
  //   },
  //   {
  //     name: "New Member",
  //     role: "Tech Head",
  //     img: "https://ik.imagekit.io/factamrita/co-ordinators/2026-2027/example2.png",
  //   },
  // ],
};

export default function TeamCarousel() {
  const [selectedYear, setSelectedYear] = useState<keyof typeof teamsByYear>("2025-2026");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const memberNameRef = useRef<HTMLHeadingElement>(null);
  const memberRoleRef = useRef<HTMLParagraphElement>(null);

  const teamMembers = teamsByYear[selectedYear];
  const total = teamMembers.length;

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const normalizedIndex = (newIndex + total) % total;

    if (memberNameRef.current && memberRoleRef.current) {
      memberNameRef.current.style.opacity = "0";
      memberRoleRef.current.style.opacity = "0";

      setTimeout(() => {
        setCurrentIndex(normalizedIndex);
        memberNameRef.current!.textContent = teamMembers[normalizedIndex].name;
        memberRoleRef.current!.textContent = teamMembers[normalizedIndex].role;
        memberNameRef.current!.style.opacity = "1";
        memberRoleRef.current!.style.opacity = "1";
      }, 300);
    } else {
      setCurrentIndex(normalizedIndex);
    }

    setTimeout(() => setIsAnimating(false), 800);
  };

  // Reset index when year changes
  useEffect(() => {
    setCurrentIndex(0);
    if (memberNameRef.current && memberRoleRef.current) {
      memberNameRef.current.textContent = teamMembers[0].name;
      memberRoleRef.current.textContent = teamMembers[0].role;
      memberNameRef.current.style.opacity = "1";
      memberRoleRef.current.style.opacity = "1";
    }
  }, [selectedYear]);

  const getClassName = (i: number) => {
    const offset = (i - currentIndex + total) % total;
    if (offset === 0) return "card center";
    if (offset === 1) return "card right-1";
    if (offset === 2) return "card right-2";
    if (offset === total - 1) return "card left-1";
    if (offset === total - 2) return "card left-2";
    return "card hidden";
  };

  return (
    <div className="team-section">
      <h1 className="about-title">OUR TEAM</h1>
      
      {/* Year Tabs */}
      <div className="year-tabs">
        {Object.keys(teamsByYear).map((year) => (
          <button
            key={year}
            className={`year-tab ${selectedYear === year ? "active" : ""}`}
            onClick={() => setSelectedYear(year as keyof typeof teamsByYear)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="carousel-container">
        <button className="nav-arrow left" onClick={() => updateCarousel(currentIndex - 1)}>
          ‹
        </button>

        <div className="carousel-track">
          {teamMembers.map((member, i) => (
            <div key={i} className={getClassName(i)} onClick={() => updateCarousel(i)}>
              <Image
                src={member.img}
                alt={member.name}
                width={280}
                height={380}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        <button className="nav-arrow right" onClick={() => updateCarousel(currentIndex + 1)}>
          ›
        </button>
      </div>

      {/* Info */}
      <div className="member-info">
        <h2 className="member-name" ref={memberNameRef}></h2>
        <p className="member-role" ref={memberRoleRef}></p>
      </div>

      {/* Dots */}
      <div className="dots">
        {teamMembers.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => updateCarousel(i)}
          />
        ))}
      </div>
    </div>
  );
}
