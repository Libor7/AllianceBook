import { useContext } from "react";
import { CharacterContext } from "@/app/store/characterContext";

export function useCharacterContext() {
  const characterCtx = useContext(CharacterContext);

  if (!characterCtx) {
    throw new Error("useCharacterContext must be used within a CharacterProvider");
  }

  return characterCtx;
}
