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
        <span className="inline-block text-[6vw] font-bold uppercase leading-none tracking-tighter text-transparent marquee-stroke">
          {content} — {content} — {content} —&nbsp;
        </span>
      </div>
    </div>
  );
}
