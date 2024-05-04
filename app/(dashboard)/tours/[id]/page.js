import {redirect} from "next/navigation";
import {getSingleTourById} from "@/utils/actions";
import Link from "next/link";
import TourInfo from "@/components/NewTour/TourInfo";
import Image from "next/image";
import axios from "axios";

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=`;

const SingleTourPage = async ({params}) => {
  const tour = await getSingleTourById(params.id);

  if (!tour) {
    redirect("/tours");
  }

  const {data} = await axios(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  return (
    <div>
      <Link href={"/tours"} className="btn btn-primary ml-8 mb-12">
        Go back to Tours
      </Link>
      {tourImage ? (
        <Image
          src={tourImage}
          alt={tour.title}
          width={800}
          height={400}
          className="mx-auto rounded-lg shadow-xl mb-8 h-96 w-[35rem] object-cover"/>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};

export default SingleTourPage;
