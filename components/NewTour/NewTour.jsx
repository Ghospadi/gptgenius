"use client";

import TourInfo from "@/components/NewTour/TourInfo";
import {QueryClient, useMutation} from "@tanstack/react-query";
import {createNewTour, generateTourResponse, getExistedTour} from "@/utils/actions";
import toast from "react-hot-toast";

const NewTour = () => {
  const queryClient = new QueryClient();

  const {mutate, isPending, data: tour} = useMutation({
    mutationFn: async (destination) => {
      const existedTour = await getExistedTour(destination);
      if (existedTour) {
        return existedTour;
      }
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        await createNewTour(newTour);
        queryClient.invalidateQueries({queryKey: ["tours"]});
        return newTour;
      }
      toast.error("Failed to generate tour...");
      return null;
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
          <button className="btn btn-primary join-item" type="submit">
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
