import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Player {
  id: number;
  name: string;
  clubId?: number;
  userId?: number;
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  useEffect(() => {
    supabase
      .from("players")
      .select("*")
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setPlayers(data ?? []);
      });
  }, []);
  return players;
};
