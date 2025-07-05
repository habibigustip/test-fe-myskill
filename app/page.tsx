import HomePage from "@/features/home";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {

  const queryClient = getQueryClient()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage></HomePage>
    </HydrationBoundary>
  );
}
