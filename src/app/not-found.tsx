import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Magglass from '@/public/magnifying-glass.svg';

const NotFound = () => (
    <div className="crime-scene">
      <h1>Case Status: Page Not Found</h1>
      <p>
        Looks like you've stumbled upon a dead end! The page you requested seems to
        have vanished without a trace. But fear not, Detective! Our forensics team
        is on the case.
      </p>
      <div className="investigate-options">
        <div>
          <Image
            src={Magglass}
            alt='Magnifying glass'
          />
          <p>Explore other sections:</p>
          <Link href="/">Go to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
