"use client";

/** COMPONENTS */
import GridLayout from "@/app/components/layouts/gridLayout";
import LoadingSpinner from "@/app/components/loadingSpinner";

/** LIBRARIES */
import { Avatar, Box, Divider, Typography } from "@mui/material";

/** HOOKS */
import { useCharacterContext } from "@/app/hooks/useCharacterContext";

const CharacterDetailPage = () => {
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
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={4}
        p={4}
        alignItems="flex-start"
      >
        <Avatar
          src={`https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`}
          alt={`Avatar of ${character.name}`}
          sx={{
            width: 300,
            height: "auto",
            borderRadius: 0,
            "@media (max-width: 320px)": {
              width: "100%",
              height: "auto",
            },
          }}
        />
        <Box flex={1} py={2}>
          <Typography variant="h4" fontWeight={600}>
            {character.name}
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Born: {character.birth_year}
          </Typography>
          <Typography color="text.secondary">
            Gender: {character.gender}
          </Typography>
          <Typography color="text.secondary">
            Height: {character.height}
          </Typography>
          <Typography color="text.secondary">
            Eye color: {character.eye_color}
          </Typography>
          <Typography color="text.secondary">
            Hair color: {character.hair_color}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      </Box>
    </GridLayout>
  );
};

export default CharacterDetailPage;
