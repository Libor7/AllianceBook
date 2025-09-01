/** LIBRARIES */
import { useEffect, useState } from "react";

/** HOOKS */
import { useCharacterContext } from "@/app/hooks/useCharacterContext";

/** MISC */
import { getAllCharacters } from "@/lib/api/allCharacters";

const useCharacters = () => {
  const [status, setStatus] = useState<number>();
  const { allCharacters, setCharacterState } = useCharacterContext();

  useEffect(() => {
    if (!allCharacters) {
      (async () => {
        const { statusCode, data: allCharacters } = await getAllCharacters(
          `${process.env.BASE_URL}${process.env.CHARACTERS_ROUTE}`
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
};

export default useCharacters;
