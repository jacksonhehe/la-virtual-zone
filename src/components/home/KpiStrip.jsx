export default function KpiStrip({ items }) {
  if (!items || !items.length) return null;
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
      {items.map(item => (
        <div key={item.label} className="bg-gray-800 rounded-2xl p-6 text-center shadow hover:bg-gray-700 transition" title={item.tip}>
          <div className="text-3xl font-bold text-white">{item.value}</div>
          <div className="text-sm text-gray-300 mt-1">{item.label}</div>
        </div>
      ))}
    </section>
  );
}
