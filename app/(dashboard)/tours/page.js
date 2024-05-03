import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import ToursPage from "@/components/Tours/ToursPage";
import {getAllToursBySearchTerm} from "@/utils/actions";

async function AllToursPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tours", ""],
    queryFn: getAllToursBySearchTerm(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursPage />
    </HydrationBoundary>
  );
}

export default AllToursPage;

