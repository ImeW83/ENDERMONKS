const items = [
  'Web Development', 'Mobile Applications', 'Data Science & AI',
  'IoT & Embedded Systems', 'DevOps & Cloud Infrastructure', 'Custom Software Solutions',
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-grey-3 py-[1.1rem] bg-grey-1">
      <div className="ticker-track flex w-max">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-bebas text-[0.85rem] tracking-[0.25em] text-grey-5 whitespace-nowrap px-12 flex items-center gap-12 after:content-['✦'] after:text-grey-4 after:text-[0.5rem]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
