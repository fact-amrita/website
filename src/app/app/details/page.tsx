import { auth } from "@/auth"

import { SignOutfromAll } from "./function";

export default async function UserAvatar() {
  const session = await auth()
  if (!session) {
    return <p>You need to be logged in to access your profile.</p>;
  }
  const user = session.user
  if (!user) {
    return <p>You need to be logged in to access your profile.</p>;
  }

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
        <button>Sign Out</button>
      </form>
    </div>
  </>);
}