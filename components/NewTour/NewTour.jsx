"use client";

import TourInfo from "@/components/NewTour/TourInfo";
import {QueryClient, useMutation} from "@tanstack/react-query";
import {
  createNewTour,
  fetchUserTokensById,
  generateTourResponse,
  getExistedTour,
  subtractTokens,
} from "@/utils/actions";
import toast from "react-hot-toast";
import {auth} from "@clerk/nextjs/server";

const NewTour = () => {
  const queryClient = new QueryClient();

  const {userId} = auth();

  const {mutate, isPending, data: tour} = useMutation({
    mutationFn: async (destination) => {
      const existedTour = await getExistedTour(destination);
      if (existedTour) {
        return existedTour;
      }

      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 250) {
        toast.error("You don't have enough tokens to generate a tour...");
        return null;
      }

      const newTour = await generateTourResponse(destination);
      if (!newTour) {
        toast.error("No tour found for this destination...");
        return null;
      }

      await createNewTour(newTour.tour);
      queryClient.invalidateQueries({queryKey: ["tours"]});
      const newTokens = await subtractTokens(userId, newTour.tokens);
      toast.success(`Tour generated successfully! You have ${newTokens} tokens left...`);

      return newTour.tour;
    },
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination);
  };

  if (isPending) {
    return <span className="loading loading-lg loading-ring"/>;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter city"
            className="input input-bordered join-item w-full"
          />
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter country"
            className="input input-bordered join-item w-full"
          />
          <button className="btn btn-primary join-item max-sm:w-28" type="submit">
                Generate Tour
          </button>
        </div>
      </form>
      <div className="mt-16">
        {tour ? <TourInfo tour={tour}/> : null}
      </div>
    </>
  );
};

export default NewTour;
