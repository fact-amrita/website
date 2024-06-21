import Image from 'next/image';

const RanksTable = () => {
  const leaders = [
    { name: 'Bryan Wolf', points: 43, position: 1, image: '/path/to/image1.png' },
    { name: 'Meghan Jessica', points: 40, position: 2, image: '/path/to/image2.png' },
    { name: 'Alex Turner', points: 38, position: 3, image: '/path/to/image3.png' },
    { name: 'Marsha Fisher', points: 36, position: 4, image: '/path/to/image4.png' },
    { name: 'Juanita Cormier', points: 35, position: 5, image: '/path/to/image5.png' },
    { name: 'You', points: 34, position: 6, image: '/path/to/image6.png' },
    { name: 'Tamara Schmidt', points: 33, position: 7, image: '/path/to/image7.png' },
    { name: 'Ricardo Veum', points: 32, position: 8, image: '/path/to/image8.png' },
    { name: 'Gary Sanford', points: 31, position: 9, image: '/path/to/image9.png' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg max-w-md mx-auto">
      <h2 className="text-center text-white text-xl mb-4">RanksTable</h2>
      <div className="bg-gray-900 p-4 rounded-lg">
        <div className="flex justify-around mb-4">
          {leaders.slice(0, 3).map((leader, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                {leader.position === 1 && (
                  <span className="absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-green-500 text-white p-1 rounded-full">
                    👑
                  </span>
                )}
              </div>
              <span className="text-white mt-2">{leader.name}</span>
              <span className="text-white">{leader.points} pts</span>
            </div>
          ))}
        </div>
        {leaders.slice(3).map((leader, index) => (
          <div
            key={index}
            className={`flex items-center justify-between py-2 px-4 ${leader.position === 6 ? 'bg-green-500' : 'bg-gray-700'} rounded-lg mb-2 hover:bg-green-500`}
          >
            <div className="flex items-center">
              <Image
                src={leader.image}
                alt={leader.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-4 text-white">{leader.name}</span>
            </div>
            <span className="text-white">{leader.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RanksTable;
