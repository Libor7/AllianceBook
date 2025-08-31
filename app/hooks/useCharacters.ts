import { useEffect, useState } from "react";
import { useCharacterContext } from "@/app/hooks/useCharacterContext";
import getAllCharacters from "@/lib/api/allCharacters";

export default function useCharacters() {
  const [status, setStatus] = useState<number>();
  const { allCharacters, setCharacterState } = useCharacterContext();

  useEffect(() => {
    if (!allCharacters) {
      (async () => {
        const { statusCode, data: allCharacters } = await getAllCharacters(
          `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_CHARACTERS_ROUTE}`
        );
        setStatus(statusCode);
        setCharacterState({
          allCharacters,
        });
      })();
    }
  }, [allCharacters, setCharacterState]);

  return {
    characters: allCharacters,
    status,
  };
}
