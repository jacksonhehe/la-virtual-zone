import React from 'react';

export default function LeagueSnapshot({ rows }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Snapshot de la Liga</h2>
      {(!rows || !rows.length) && (
        <p className="text-gray-400">Sin datos disponibles</p>
      )}
      {rows && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-300">
            <thead>
              <tr className="bg-gray-800 text-gray-200">
                <th className="px-4 py-2 text-left">Equipo</th>
                <th className="px-4 py-2 text-center">PJ</th>
                <th className="px-4 py-2 text-center">Pts</th>
                <th className="px-4 py-2 text-center">DG</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.teamId} className="odd:bg-gray-900 even:bg-gray-800">
                  <td className="px-4 py-2">{r.position}. {r.club.name}</td>
                  <td className="px-4 py-2 text-center">{r.pj}</td>
                  <td className="px-4 py-2 text-center">{r.pts}</td>
                  <td className="px-4 py-2 text-center">{r.dg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {rows && rows.length > 0 && (
        <div className="mt-4 text-right">
          <a href="/rankings" className="text-indigo-400 hover:underline focus:outline-none focus:ring" aria-label="Ver tabla completa">Ver tabla completa</a>
        </div>
      )}
    </section>
  );
}
