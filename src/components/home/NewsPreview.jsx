import React from 'react';

export default function NewsPreview({ posts }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Noticias</h2>
      {(!posts || !posts.length) && (
        <p className="text-gray-400">No hay noticias disponibles</p>
      )}
      {posts && posts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map(p => (
            <article key={p.id} className="bg-gray-800 rounded-2xl overflow-hidden shadow hover:bg-gray-700 transition">
              <a href={`/blog/${p.slug}`} aria-label={`Leer ${p.title}`} className="block focus:outline-none focus:ring">
                <div className="h-40 bg-gradient-to-br from-indigo-600 to-purple-700">
                  {p.cover && <img src={p.cover} alt={p.title} loading="lazy" className="object-cover w-full h-full" />}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                  <p className="text-sm text-gray-300">{p.excerpt}</p>
                  {p.tags && p.tags[0] && <span className="text-xs text-indigo-300">#{p.tags[0]}</span>}
                </div>
              </a>
            </article>
          ))}
        </div>
      )}
      {posts && posts.length > 0 && (
        <div className="mt-4 text-right">
          <a href="/blog" className="text-indigo-400 hover:underline focus:outline-none focus:ring" aria-label="Ver todas las noticias">Ver todas las noticias</a>
        </div>
      )}
    </section>
  );
}
