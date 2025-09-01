import React from 'react';

function formatDateTime(date) {
  return new Date(date).toLocaleString('es-ES', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
}

export default function UpcomingMatches({ matches }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Próximos partidos</h2>
      {(!matches || !matches.length) && (
        <p className="text-gray-400">No hay partidos programados</p>
      )}
      {matches && matches.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2">
          {matches.map(m => (
            <li key={m.id}>
              <a href={m.torneoId ? `/torneos/${m.torneoId}` : '#'} className="block bg-gray-800 rounded-2xl p-4 hover:bg-gray-700 focus:outline-none focus:ring" aria-label="Ver partido">
                <div className="text-sm text-gray-300">{formatDateTime(m.date)}</div>
                <div className="text-white font-semibold">{m.home.name} vs {m.away.name}</div>
                {m.tournament && <div className="text-xs text-gray-400">{m.tournament.name}</div>}
              </a>
            </li>
          ))}
        </ul>
      )}
      {matches && matches.length > 0 && (
        <div className="mt-4 text-right">
          <a href="/calendar" className="text-indigo-400 hover:underline focus:outline-none focus:ring" aria-label="Ver calendario completo">Ver calendario</a>
        </div>
      )}
    </section>
  );
}
