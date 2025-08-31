/** LIBRARIES */
import { useContext } from "react";

/** MISC */
import { CharacterContext } from "@/app/store/characterContext";

export const useCharacterContext = () => {
  const characterCtx = useContext(CharacterContext);

  if (!characterCtx) {
    throw new Error(
      "useCharacterContext must be used within a CharacterProvider"
    );
  }

  return characterCtx;
};
