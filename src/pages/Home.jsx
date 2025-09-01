import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import Hero from '../components/home/Hero';
import KpiStrip from '../components/home/KpiStrip';
import LatestTransfers from '../components/home/LatestTransfers';
import UpcomingMatches from '../components/home/UpcomingMatches';
import LeagueSnapshot from '../components/home/LeagueSnapshot';
import NewsPreview from '../components/home/NewsPreview';

export default function Home() {
  const { user } = useAuth();
  const {
    getClubs,
    getPlayers,
    getOffers,
    getTournaments,
    getMatches,
    getBlogPosts,
    marketStatus
  } = useData();

  useEffect(() => {
    document.title = 'La Virtual Zone — Liga Master eSports';
  }, []);

  const clubs = getClubs();
  const players = getPlayers();
  const offers = getOffers();
  const tournaments = getTournaments();
  const matches = getMatches();
  const posts = getBlogPosts();
  const now = new Date();

  const kpis = [
    { label: 'Clubs', value: clubs.length, tip: 'Clubs totales' },
    { label: 'Jugadores', value: players.length, tip: 'Jugadores totales' },
    { label: 'Ofertas activas', value: offers.filter(o => o.status === 'pending').length, tip: 'Ofertas de fichaje pendientes' },
    { label: 'Torneos activos', value: tournaments.filter(t => t.status === 'active').length, tip: 'Torneos en curso' }
  ];
  const weekMatches = matches.filter(m => {
    const d = new Date(m.date);
    return d > now && d - now <= 7 * 24 * 60 * 60 * 1000;
  });
  if (weekMatches.length) {
    kpis.push({ label: 'Partidos esta semana', value: weekMatches.length, tip: 'Programados próximos 7 días' });
  }

  const transfers = offers
    .filter(o => o.status === 'accepted')
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8)
    .map(o => ({
      ...o,
      player: players.find(p => p.id === o.playerId) || {},
      fromClub: clubs.find(c => c.id === o.fromClubId) || {},
      toClub: clubs.find(c => c.id === o.toClubId) || {}
    }));

  const upcomingMatches = matches
    .filter(m => new Date(m.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8)
    .map(m => ({
      ...m,
      home: clubs.find(c => c.id === m.localId) || {},
      away: clubs.find(c => c.id === m.visitanteId) || {},
      tournament: tournaments.find(t => t.id === m.torneoId)
    }));

  // calcular standings si no existe
  const activeTournament = tournaments.find(t => t.status === 'active');
  let rows = [];
  if (activeTournament && activeTournament.standings && activeTournament.standings.length) {
    rows = activeTournament.standings.map((s, idx) => ({ ...s, position: idx + 1, club: clubs.find(c => c.id === s.clubId) }));
  } else {
    const played = matches.filter(m => m.result && (!activeTournament || m.torneoId === activeTournament.id));
    const table = {};
    played.forEach(m => {
      if (!table[m.localId]) table[m.localId] = { teamId: m.localId, pj: 0, gf: 0, gc: 0, pts: 0 };
      if (!table[m.visitanteId]) table[m.visitanteId] = { teamId: m.visitanteId, pj: 0, gf: 0, gc: 0, pts: 0 };
      const home = table[m.localId];
      const away = table[m.visitanteId];
      home.pj++; away.pj++;
      home.gf += m.result.local; home.gc += m.result.visitante;
      away.gf += m.result.visitante; away.gc += m.result.local;
      if (m.result.local > m.result.visitante) home.pts += 3;
      else if (m.result.local < m.result.visitante) away.pts += 3;
      else { home.pts++; away.pts++; }
    });
    rows = Object.values(table).map(r => ({ ...r, dg: r.gf - r.gc, club: clubs.find(c => c.id === r.teamId) }));
    rows.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
    rows = rows.map((r, idx) => ({ ...r, position: idx + 1 }));
  }
  rows = rows.slice(0, 5);

  const news = posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="p-4 md:p-8 text-gray-100">
      <Hero user={user} marketStatus={marketStatus} />
      <KpiStrip items={kpis} />
      <LatestTransfers transfers={transfers} />
      <UpcomingMatches matches={upcomingMatches} />
      <LeagueSnapshot rows={rows} />
      <NewsPreview posts={news} />
    </div>
  );
}
