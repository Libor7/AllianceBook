"use client";

import { createContext, useState, type ReactNode } from "react";
import { type Character } from "@/lib/models/character";

type CharacterState = {
  activeCharacter: Character | null;
  activeId: number | null;
  allCharacters: Character[] | null;
};

type CharacterContextType = CharacterState & {
  getCharacterStateByName: (name: string) => unknown;
  setCharacterState: (state: Partial<CharacterState>) => void;
};

export const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CharacterState>({
    activeCharacter: null,
    activeId: null,
    allCharacters: null,
  });

  const setCharacterState = (newState: Partial<CharacterState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  const getCharacterStateByName = (name: string) =>
    state[name as keyof CharacterState];

  return (
    <CharacterContext.Provider value={{ ...state, getCharacterStateByName, setCharacterState }}>
      {children}
    </CharacterContext.Provider>
  );
}
