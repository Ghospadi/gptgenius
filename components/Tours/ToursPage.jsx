"use client";

import ToursList from "@/components/Tours/ToursList";
import {useQuery} from "@tanstack/react-query";
import {getAllToursBySearchTerm} from "@/utils/actions";
import {useState} from "react";


const ToursPage = () => {
  const [searchValue, setSearchValue] = useState("");

  const {data, isPending} = useQuery({
    queryKey: ["tours", searchValue],
    queryFn: () => getAllToursBySearchTerm(searchValue),
  });

  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Enter city or country here..."
            className="input input-bordered join-item w-full"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button className="btn btn-primary join-item"
            disabled={isPending}
            onClick={() => setSearchValue("")}>
            {isPending ? <span className="loading loading-sm loading-bars"/> : "Reset"}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className="loading loading-lg loading-ring"/>
      ) : (
        <ToursList tours={data}/>
      )}
    </>
  );
};

export default ToursPage;
