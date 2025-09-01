export default function Hero({ user, marketStatus }) {
  const isOpen = marketStatus === 'open';
  return (
    <section className="text-center py-12 bg-gray-900 rounded-2xl mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">La Virtual Zone — Liga Master de eSports</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-6">Crea tu club, gestiona tu plantilla y compite</p>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {!user && (
          <>
            <a href="/register" className="px-5 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:ring">Regístrate</a>
            <a href="/login" className="px-5 py-3 rounded-2xl bg-gray-700 text-white font-semibold hover:bg-gray-600 focus:outline-none focus:ring">Iniciar sesión</a>
          </>
        )}
        {user && user.role === 'DT' && (
          <>
            <a href="/dt" className="px-5 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:ring">Ir a mi club</a>
            <a href="/mercado" className="px-5 py-3 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-500 focus:outline-none focus:ring">Mercado de fichajes</a>
          </>
        )}
        {user && user.role === 'ADMIN' && (
          <a href="/admin" className="px-5 py-3 rounded-2xl bg-red-600 text-white font-semibold hover:bg-red-500 focus:outline-none focus:ring">Panel Admin</a>
        )}
        {user && user.role === 'USER' && (
          <a href="/torneos" className="px-5 py-3 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:ring">Explorar Torneos</a>
        )}
      </div>
      <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${isOpen ? 'bg-green-600 text-green-100' : 'bg-gray-700 text-gray-300'}`}>
        Mercado {isOpen ? 'Abierto' : 'Cerrado'}
      </span>
    </section>
  );
}
