"use client";

import { type Character } from "@/lib/models/character";
import { ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCharacterContext } from "@/app/hooks/useCharacterContext";

type CharacterItemProps = {
  character: Character;
};

export default function CharacterItem({
  character,
}: CharacterItemProps) {
  const router = useRouter();
  const { setCharacterState } = useCharacterContext();

  const id = character.id;

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
      sx={{ cursor: "pointer" }}
      tabIndex={0}
    >
      <ListItemText primary={character.name} />
    </ListItem>
  );
}
