import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Club {
  id: number;
  name: string;
  manager?: string;
  managerId?: number;
}

export const useClubs = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  useEffect(() => {
    supabase
      .from("clubs")
      .select("*")
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setClubs(data ?? []);
      });
  }, []);
  return clubs;
};
