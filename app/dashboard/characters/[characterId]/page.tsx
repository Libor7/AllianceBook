/* eslint-disable @next/next/no-img-element */
"use client";

// import Image from "next/image";
// import { useParams } from "next/navigation";
import { useCharacterContext } from "@/app/hooks/useCharacterContext";
// import { useState } from "react";
import { GridLayout } from "@/app/components/layouts/gridLayout";

export default function CharacterDetailPage() {
  const { activeCharacter: character, activeId: id } = useCharacterContext();
  //   const [isImageLoading, setIsImageLoading] = useState(true);
  //   const { id } = useParams();
  //   if (!id) return <p>Loading...</p>;

  //   const imageLoadHandler = () => {
  //     setIsImageLoading(false);
  //   };

  if (!character || !id) {
    return (
      <GridLayout spacing={2} alignItems="center" justifyContent="center">
        <h2>Loading character...</h2>
      </GridLayout>
    );
  }

  return (
    <GridLayout spacing={2} alignItems="center" justifyContent="center">
      <h1>{character.name}</h1>
      {/* {isImageLoading && <p>Loading image...</p>} */}
      {/* <Image
        src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
        alt="Avatar"
        width={300}
        height={0}
        onLoad={imageLoadHandler}
        style={{ height: "auto", display: isImageLoading ? "none" : "block" }}
      /> */}
      <img
        src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
        alt="Avatar"
        width={300}
      />
    </GridLayout>
  );
}
