import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FACTImage from '@/public/images/factlogo_incord.png';
import dataJSON from '@/components/homepage/data.json';

type DataType = {
  [key: string]: {
    name: string;
    title: string;
    year: string;
    imgURL: string;
  }[];
};
const data: DataType = dataJSON;

export default function Cord() {
  const [details, setDetails] = useState(data['2025-2026'][0]);
  const [year, setYear] = useState('2025-2026');
  const [index, setIndex] = useState(0);

  function nextPerson() {
    const idx = (index + 1) % data[year].length;
    setIndex(idx);
    setDetails(data[year][idx]);
  }

  function prevPerson() {
    const idx = (index - 1 + data[year].length) % data[year].length;
    setIndex(idx);
    setDetails(data[year][idx]);
  }

  function setPerson(clickedYear: string) {
    setIndex(0);
    setDetails(data[clickedYear][0]);
  }

  return (
    <motion.section
      className="bg-white/0 flex flex-col items-center justify-center my-44"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-center gap-4 mb-4">
        {['2023-2024', '2024-2025', '2025-2026'].map((y) => (
          <button
            key={y}
            className={`${
              year === y
                ? 'bg-white text-black'
                : 'bg-black text-white'
            } p-2 rounded-lg font-extrabold cursor-pointer hover:bg-white hover:text-black duration-300 transition-all focus:bg-white focus:text-black`}
            onClick={() => {
              setYear(y);
              setPerson(y);
            }}
          >
            {y}
          </button>
        ))}
      </div>

      <div className="w-full justify-center flex gap-4 items-center">
        <button
          className="bg-white rounded-full p-1 text-black font-extrabold cursor-pointer hover:p-2 duration-300 h-fit text-3xl transition-all focus:p-2"
          onClick={prevPerson}
        >
          {'<'}
        </button>

        <div className="relative mobile:w-[45%] w-4/5 bg-[url(https://ik.imagekit.io/factamrita/Coordinators_bg.jpg?updatedAt=1747245026985)] flex items-center rounded-3xl">
          <div className="absolute top-0 left-0 w-full h-full flex z-10 bg-black/20 rounded-3xl ">
            <AnimatePresence mode="wait">
              <motion.div
                key={details.imgURL}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.35 }}
                className="bg-blue-500/0 w-[45%] flex justify-end items-end drop-shadow-[0_0_25px_rgb(200,190,211)]"
              >
                <img src={details.imgURL} className="w-72" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={details.name}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.35 }}
                className="bg-red-500/0 text-white w-[55%] flex justify-start items-center"
              >
                <div>
                  <h2 className="text-3xl font-extrabold">{details.name}</h2>
                  <h4 className="font-semibold">{details.title}</h4>
                  <p className="font-medium">{details.year}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-[#db2222] w-[30%] rounded-3xl rounded-r-none">
            <Image
              src={FACTImage}
              alt="FACT Logo"
              draggable="false"
              className="w-32 mx-auto"
            />
          </div>
        </div>

        <button
          className="bg-white rounded-full p-1 text-black font-extrabold cursor-pointer hover:p-2 text-3xl h-fit duration-300 transition-all focus:p-2"
          onClick={nextPerson}
        >
          {'>'}
        </button>
      </div>
    </motion.section>
  );
}
