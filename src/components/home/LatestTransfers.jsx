import React from 'react';

function formatAmount(value) {
  if (value >= 1_000_000) return `${(value/1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (value >= 1_000) return `${(value/1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return value.toString();
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-ES', { day:'2-digit', month:'short' });
}

export default function LatestTransfers({ transfers }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Últimas transferencias</h2>
      {(!transfers || !transfers.length) && (
        <p className="text-gray-400">Aún no hay transferencias</p>
      )}
      {transfers && transfers.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2">
          {transfers.map(t => (
            <li key={t.id}>
              <a href={`/club/${t.toClubId}`} aria-label={`Ver club ${t.toClub.name}`} className="flex items-center justify-between bg-gray-800 rounded-2xl p-4 hover:bg-gray-700 focus:outline-none focus:ring">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs" aria-hidden="true">{t.fromClub.name.charAt(0)}</span>
                  <span>{t.fromClub.name}</span>
                  <span className="text-gray-500">→</span>
                  <span className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs" aria-hidden="true">{t.toClub.name.charAt(0)}</span>
                  <span>{t.toClub.name}</span>
                </div>
                <div className="text-right text-sm text-gray-300">
                  <div className="font-semibold text-white">{t.player.name}</div>
                  <div className="text-xs">{formatAmount(t.amount)} • {formatDate(t.date)}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
