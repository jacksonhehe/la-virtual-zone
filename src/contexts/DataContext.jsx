import { createContext, useContext, useEffect, useState } from 'react';
import baseState, { STORAGE_KEY } from '../data/seed';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(baseState));
    }
    return baseState;
  });

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const api = {
    getClubs: () => state.clubs,
    getPlayers: () => state.players,
    getOffers: () => state.offers,
    getTournaments: () => state.tournaments,
    getMatches: () => state.matches.length ? state.matches : state.tournaments.flatMap(t => t.matches || []),
    getBlogPosts: () => state.posts,
    marketStatus: state.marketOpen ? 'open' : 'closed',
  };

  return <DataContext.Provider value={api}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
