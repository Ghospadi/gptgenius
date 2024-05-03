import TourCard from "@/components/Tours/TourCard";

const ToursList = ({tours}) => {
  if (tours.length === 0) {
    return <span className="text-lg">No tours Found...</span>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default ToursList;
