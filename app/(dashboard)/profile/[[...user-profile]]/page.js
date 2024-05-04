import {UserProfile} from "@clerk/nextjs";
import {fetchUserTokensById} from "@/utils/actions";
import {auth} from "@clerk/nextjs/server";

async function ProfilePage() {
  const {userId} = auth();
  const currentTokens = await fetchUserTokensById(userId);
  return (
    <div className="flex flex-col items-center justify-center mt-[5rem]">
      <h2 className='mb-8 ml-8 text-xl font-extrabold'>
        Token Amount : {currentTokens}
      </h2>
      <UserProfile path="/profile"/>
    </div>
  );
}

export default ProfilePage;
