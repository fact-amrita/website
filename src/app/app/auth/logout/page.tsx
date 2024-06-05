"use client"

import { useEffect } from 'react';
import { SignOutfromAll } from '../../signout';

export default function LogoutPage() {

  useEffect(() => {
    const signOutUser = async () => {
      await SignOutfromAll();
    };

    signOutUser();
  });

  return <p>Logging you out...</p>;
}
