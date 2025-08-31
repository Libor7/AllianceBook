"use client";

import isEqual from "lodash.isequal";
import { type ReactNode, useEffect } from "react";
import { useCharacterContext } from "@/app/hooks/useCharacterContext";

type DataContextProviderProps = {
  children: ReactNode;
  property: string;
  value: unknown;
};

export default function DataContextProvider({
  children,
  property,
  value,
}: DataContextProviderProps) {
  const { getCharacterStateByName, setCharacterState } = useCharacterContext();

  const valueChanged = !isEqual(getCharacterStateByName(property), value);

  useEffect(() => {
    if (valueChanged) {
      setCharacterState({
        [property]: value,
      });
    }
  }, [property, setCharacterState, value, valueChanged]);

  return <>{children}</>;
}
