'use client';

interface MarqueeProps {
  items: string[];
  className?: string;
}

export default function Marquee({ items, className = '' }: MarqueeProps) {
  const content = items.join(' — ');
  
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="animate-marquee inline-block whitespace-nowrap">
        <span className="inline-block text-[6vw] font-bold uppercase leading-none tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px rgba(250, 250, 250, 0.1)' }}>
          {content} — {content} — {content} —&nbsp;
        </span>
      </div>
    </div>
  );
}
