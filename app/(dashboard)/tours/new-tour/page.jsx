import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import NewTour from "@/components/NewTour/NewTour";

function NewTourPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTour />
    </HydrationBoundary>
  );
}

export default NewTourPage;
