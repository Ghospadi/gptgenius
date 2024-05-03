import {UserProfile} from "@clerk/nextjs";

function ProfilePage() {
  return (
    <div className="flex justify-center mt-[5rem]">
      <UserProfile path="/profile"/>
    </div>
  );
}

export default ProfilePage;
