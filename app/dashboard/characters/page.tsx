/** COMPONENTS */
import LoadingSpinner from "@/app/components/loadingSpinner";
import CharactersPageClient from "@/app/components/CharactersPageClient";

/** LIBRARIES */
import { Suspense } from "react";

const CharactersPage = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <CharactersPageClient />
  </Suspense>
);
export default CharactersPage;
