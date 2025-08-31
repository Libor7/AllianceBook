"use client";

/** LIBRARIES */
import isEqual from "lodash.isequal";
import { type ReactNode, useEffect } from "react";

/** HOOKS */
import { useCharacterContext } from "@/app/hooks/useCharacterContext";

type DataContextProviderProps = {
  children: ReactNode;
  property: string;
  value: unknown;
};

const DataContextProvider = ({
  children,
  property,
  value,
}: DataContextProviderProps) => {
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
};

export default DataContextProvider;
