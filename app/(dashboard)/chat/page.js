import Chat from "@/components/Chat/Chat";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";

async function ChatPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat />
    </HydrationBoundary>
  );
}

export default ChatPage;
