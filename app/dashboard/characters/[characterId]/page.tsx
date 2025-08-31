/* eslint-disable @next/next/no-img-element */
"use client";

import { useCharacterContext } from "@/app/hooks/useCharacterContext";
import { GridLayout } from "@/app/components/layouts/gridLayout";
import LoadingSpinner from "@/app/components/loadingSpinner";

export default function CharacterDetailPage() {
  const { activeCharacter: character, activeId: id } = useCharacterContext();

  if (!character || !id) {
    return (
      <GridLayout spacing={2} alignItems="center" justifyContent="center">
        <LoadingSpinner />
      </GridLayout>
    );
  }

  return (
    <GridLayout spacing={2} alignItems="center" justifyContent="center">
      <h1>{character.name}</h1>
      <img
        src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
        alt={`Avatar of ${character.name}`}
        width={300}
      />
    </GridLayout>
  );
}
