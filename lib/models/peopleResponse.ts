/** MODELS */
import { type Character } from "./character";

export interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
