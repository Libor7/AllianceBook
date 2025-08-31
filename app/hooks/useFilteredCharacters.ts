/** LIBRARIES */
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

/** MODELS */
import { type Character } from "@/lib/models/character";

/** MISC */
import { VALID_GENDERS } from "@/lib/constants/common";

const useFilteredCharacters = (characters: Character[] | null) => {
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("query")?.toLowerCase() || "";
  const genderFilter = useMemo(
    () => searchParams.get("gender")?.split(",") ?? VALID_GENDERS,
    [searchParams]
  );
  const searchBy = searchParams.get("searchBy") || "name";
  const height = parseInt(searchParams.get("height") || "", 10);
  const heightCompare = searchParams.get("heightCompare") || "greater";

  return useMemo(() => {
    if (!characters) return [];

    return characters.filter((character) => {
      const gender = VALID_GENDERS.includes(character.gender.toLowerCase())
        ? character.gender.toLowerCase()
        : "male";
      const value = character[searchBy as keyof typeof character];
      const text = typeof value === "string" ? value.toLowerCase() : "";

      const characterHeightRaw = parseInt(character.height);
      const characterHeight = isNaN(characterHeightRaw)
        ? 0
        : characterHeightRaw;

      const heightMatches =
        isNaN(height) ||
        (heightCompare === "greater" && characterHeight >= height) ||
        (heightCompare === "less" && characterHeight <= height);
      const genderMatches = genderFilter.includes(gender);
      const textMatches = text.includes(queryParam);
      return textMatches && genderMatches && heightMatches;
    });
  }, [characters, genderFilter, height, heightCompare, queryParam, searchBy]);
};

export default useFilteredCharacters;
