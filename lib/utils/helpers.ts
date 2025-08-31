import { type Character } from "@/lib/models/character";
import { CHARACTERS_PER_PAGE } from "@/lib/constants/common";

export function getCharactersPerPage(characters: Character[], page: number) {
  const currentPage = isNaN(page) || page < 1 ? 1 : page;
  const startIndex = (currentPage - 1) * CHARACTERS_PER_PAGE;
  const currentData = characters!.slice(startIndex, startIndex + CHARACTERS_PER_PAGE);
  return {
    currentData,
    currentPage,
  };
}
