import { type PeopleResponse } from "@/lib/models/peopleResponse";

const { NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_CHARACTERS_ROUTE } = process.env;

export async function getCharacters(
  page: number
): Promise<Pick<PeopleResponse, "count" | "results">> {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_BASE_URL}${NEXT_PUBLIC_CHARACTERS_ROUTE}/?page=${page}`,
      {
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      // TODO throw new Error 
      return {
        count: 0,
        results: [],
      };
    }

    const { count, results } = (await response.json()) as PeopleResponse;
    return {
      count,
      results,
    };
  } catch (err) {
    // TODO throw new Error 
    return {
      count: 0,
      results: [],
    };
  }
}
