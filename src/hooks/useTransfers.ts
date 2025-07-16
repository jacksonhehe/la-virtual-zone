import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Transfer {
  id: number;
  playerId: number;
  fromId: number;
  toId: number;
  amount: number;
  createdAt: string;
}

export const useTransfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  useEffect(() => {
    supabase
      .from("transfers")
      .select("*")
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setTransfers(data ?? []);
      });
  }, []);
  return transfers;
};

export const addTransfer = async (payload: Transfer) => {
  const { error } = await supabase.from("transfers").insert(payload);
  if (error) throw error;
};
