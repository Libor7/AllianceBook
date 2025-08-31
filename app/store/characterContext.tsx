"use client";

/** LIBRARIES */
import { createContext, useState, type ReactNode } from "react";

/** MODELS */
import { type Character } from "@/lib/models/character";
import { type AppData } from "@/lib/models/app";

type CharacterState = {
  activeApp: AppData | null;
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

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CharacterState>({
    activeApp: null,
    activeCharacter: null,
    activeId: null,
    allCharacters: null,
  });

  const setCharacterState = (newState: Partial<CharacterState>) =>
    setState((prev) => ({ ...prev, ...newState }));

  const getCharacterStateByName = (name: string) =>
    state[name as keyof CharacterState];

  return (
    <CharacterContext.Provider
      value={{ ...state, getCharacterStateByName, setCharacterState }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
