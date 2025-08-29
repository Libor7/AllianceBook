"use client";

import { type Character } from "@/lib/models/character";
import { ListItem, ListItemText } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCharacterContext } from "@/app/hooks/useCharacterContext";

type CharacterItemProps = {
  character: Character;
  index: number;
};

export default function CharacterItem({
  character,
  index,
}: CharacterItemProps) {
  const router = useRouter();
  const { setCharacterState } = useCharacterContext();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const id = (+page - 1) * 10 + index + 1;

  const clickHandler = () => {
    setCharacterState({
      activeCharacter: character,
      activeId: id,
    });
    router.push(`/dashboard/characters/${id}`);
  };

  const keyDownHandler = ({ key }: React.KeyboardEvent) => {
    if (key === "Enter" || key === " ") {
      clickHandler();
    }
  };

  return (
    <ListItem
      aria-label={`Character: ${character.name}`}
      divider
      onClick={clickHandler}
      onKeyDown={keyDownHandler}
      sx={{ cursor: "pointer", minWidth: "50vw" }}
      tabIndex={0}
    >
      <ListItemText primary={character.name} />
    </ListItem>
  );
}
