import React,{useState} from 'react'
import Image from 'next/image';
import FACTImage from '@/public/images/factlogo_incord.png';
import dataJSON from '@/components/homepage/data.json'
import { set } from 'lodash';
type DataType = {
  [key: string]: {
    name: string;
    title: string;
    year: string;
    imgURL: string;
  }[];
};
const data:DataType = dataJSON; // explicit type assertion

export default function Cord() {
    const member = {
        "name": "Mokshagna Bhuvan",
        "title": "President",
        "year": "3rd Year CYS",
        "imgURL": "https://ik.imagekit.io/factamrita/co-ordinators/Moksha.png?updatedAt=1737869804527",
        }

        
        const [details, setDetails] = useState(data['2025-2026'][0])
        const [year , setYear] = useState('2025-2026')
        const [index , setIndex] = useState(0)

        function nextPerson() {
          const idx = (index + 1)% data[year].length 
          setIndex(idx)
          setDetails(data[year][idx])
        
        }
        function prevPerson() {
          const idx = (index - 1 + data[year].length) % data[year].length
          setIndex(idx)
          setDetails(data[year][idx])
        }
        function setPerson(clickedYear:string) {
          setIndex(0)
          setDetails(data[clickedYear][0])
        }
  
  return (
    <section className="bg-white/0 flex flex-col items-center justify-center my-44">
    <div className='flex justify-center gap-4 mb-4'>
    <button className={`${year === '2023-2024' ?'bg-white text-black':'bg-black text-white'} p-2 rounded-lg font-extrabold cursor-pointer hover:bg-white hover:text-black duration-300 transition-all focus:bg-white focus:text-black`}
    onClick={() => {
      setYear('2023-2024')
      setPerson('2023-2024')
    }}>
    2023-2024  
    </button>
    <button className={`${year === '2024-2025' ?'bg-white text-black':'bg-black text-white'} p-2 rounded-lg font-extrabold cursor-pointer hover:bg-white hover:text-black duration-300 transition-all focus:bg-white focus:text-black`}
    onClick = {() => {
      setYear('2024-2025')
      setPerson('2024-2025') 
    }}>
    2024-2025  
    </button>
    <button className={`${year === '2025-2026' ?'bg-white text-black':'bg-black text-white'} p-2 rounded-lg font-extrabold cursor-pointer hover:bg-white hover:text-black duration-300 transition-all focus:bg-white focus:text-black`}
     onClick={() => {
      setYear('2025-2026')
      setPerson('2025-2026')
     }}>
    2024-2025  
    </button>

    </div>
    <div className='w-full justify-center flex gap-4 items-center'>
    <button className={`bg-white rounded-full p-1 text-black font-extrabold cursor-pointer hover:p-2 duration-300 h-fit text-3xl transition-all focus:p-2`} onClick={prevPerson}>
        {"<"}
      </button>
  <div className="relative mobile:w-[45%] w-4/5 bg-[url(https://ik.imagekit.io/factamrita/AdobeStock-JZM6gWcb8m.jpg?updatedAt=1722405189234)] flex  items-center rounded-3xl ">
    {/* Overlay div */}
    <div className="absolute top-0 left-0 w-full h-full flex z-10 bg-black/20 rounded-3xl">
        <div className='bg-blue-500/0 w-[45%] flex justify-end items-end drop-shadow(1px 1px 20px rgb(0, 190, 211))'>
     <img src={details.imgURL} className='w-72 '/>

        </div>
        <div className='bg-red-500/0 text-white w-[55%] flex justify-start items-center'>
            <div>
            <h2 className='text-3xl font-extrabold '>{details.name}</h2>
            <h4 className='font-semibold'>{details.title}</h4>
            <p className='font-medium '>{details.year}</p>
            </div>
        </div>
    </div>
  


    {/* Original content */}
    <div className="bg-[#cb1e40] w-[30%] rounded-3xl rounded-r-none">
      <Image
        src={FACTImage}
        alt="FACT Logo"
        draggable="false"
        className="w-32 mx-auto"
      />
    </div>
  </div>
  <button className='bg-white rounded-full p-1 text-black font-extrabold cursor-pointer hover:p-2 text-3xl h-fit duration-300 transition-all focus:p-2' onClick={nextPerson}>
        {">"}
      </button>
    </div>
    
</section>


  )
}
