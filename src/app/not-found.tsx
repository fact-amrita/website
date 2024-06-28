import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Magglass from '@/public/images/magnifying-glass.svg';

const CrimeScene404 = () => {
  return (
    <div className="container mx-auto px-4 py-16 bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-red-500">
        Case Status: Page Not Found
      </h1>
      <p className="text-lg text-gray-700 text-center mt-4">
        Looks like you've stumbled upon a dead end! The page you requested seems to<br/>
        have vanished without a trace. But fear not, Detective! Our forensics team<br/>
        is on the case.
      </p>
      <div className="flex justify-center mt-8">
        <div className="w-1/2 flex flex-col items-center">
          <Image
            src={Magglass}
            alt="Magnifying Glass"
            width={100}
            height={100}
          />
          <p className="text-lg text-gray-700 text-center mt-2">
            Explore other sections:
          </p>
          <Link
            href="/app"
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            Go to Homepage
          </Link>
          <Link
            href="/app/auth/logout"
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-700"
          >
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CrimeScene404;