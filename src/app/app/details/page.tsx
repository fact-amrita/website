import { auth } from "@/auth"
import { Button } from "@/components/ui/button"

import { SignOutfromAll } from "./function";

export default async function UserAvatar() {
  const session = await auth()
  if (!session || !session.user) { 
    return <p>You need to be logged in to access your profile.</p>;
  }

  const user = session.user;
  return (<>
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <img src={user.image ?? ""} alt="Image not available" />
    </div>

    <br />
    <div>
      <form
        action={SignOutfromAll}
      >
        <Button variant="outline">
          Sign Out
        </Button>
      </form>
    </div>
  </>);
}