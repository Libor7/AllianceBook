import { type Character } from "@/lib/models/character";
import { type ApiResponse } from "@/lib/models/api";
import { type PeopleResponse } from "@/lib/models/peopleResponse";

export default async function getAllCharacters(
  url: string,
  records: Character[] = [],
  id = 1
): Promise<ApiResponse<Character[]>> {
  try {
    const response = await fetch(url, {
      cache: "force-cache",
    });

    if (!response.ok) {
      return {
        data: [],
        statusCode: response.status,
      };
    }

    const { next, results } = (await response.json()) as PeopleResponse;

    const charactersWithIds = results.map(
      (character: Character, index: number) => {
        return { ...character, id: id + index };
      }
    );

    records.push(...charactersWithIds);

    if (next) {
      return getAllCharacters(next, records, id + results.length);
    }

    return {
      data: records,
      statusCode: 200,
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      data: [],
      statusCode: 500,
    }
  }
}
