import {useAuth, UserProfile} from "@clerk/nextjs";
import {fetchUserTokensById} from "@/utils/actions";

async function ProfilePage() {
  const {userId} = useAuth();
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
