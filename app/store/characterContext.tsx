"use client";

import { createContext, useState, type ReactNode } from "react";
import { type Character } from "@/lib/models/character";

type CharacterState = {
  activeCharacter: Character | null;
  activeId: number | null;
};

type CharacterContextType = CharacterState & {
  setCharacterState: (state: Partial<CharacterState>) => void;
};

export const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CharacterState>({
    activeCharacter: null,
    activeId: null,
  });

  const setCharacterState = (newState: Partial<CharacterState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  return (
    <CharacterContext.Provider value={{ ...state, setCharacterState }}>
      {children}
    </CharacterContext.Provider>
  );
}
