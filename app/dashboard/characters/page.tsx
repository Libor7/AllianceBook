import { GenericList } from "@/app/components/genericList";
import { getCharacters } from "@/lib/api/characters";
import Pagination from "@/app/components/pagination";
import CharacterItem from "@/app/components/characterItem";
import { GridLayout } from "@/app/components/layouts/gridLayout";
import { Grid } from "@mui/material";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const { page } = await searchParams;

  const pageParam = parseInt(page, 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const { count, results } = await getCharacters(currentPage);

  if (count === 0) {
    return (
      <GridLayout spacing={2} alignItems="center" justifyContent="center">
        <h2>No Characters found in the whole Universe</h2>
      </GridLayout>
    );
  }

  const totalPages = Math.ceil(count / 10);

  return (
    <GridLayout spacing={2} alignItems="center" justifyContent="center">
      <Grid container justifyContent="center" size={{ xs: 12 }}>
        <GenericList
          items={results}
          renderItem={(result, index) => (
            <CharacterItem key={result.name} character={result} index={index} />
          )}
        />
      </Grid>
      <Grid container justifyContent="center" size={{ xs: 12 }}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Grid>
    </GridLayout>
  );
}
