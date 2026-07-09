import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';

export default function OSGrid() {
  const cardData = [
    {
      num: '01',
      title: 'THRYVIX Health',
      sector: 'Private Clinics & Labs',
      desc: 'Online booking, live queue, AI doctor brief, automated notifications, billing and reviews.',
      status: 'Live Now'
    },
    {
      num: '02',
      title: 'Ecommerce OS',
      sector: 'D2C & Online Stores',
      desc: 'COD confirmation, order tracking, abandoned cart recovery and customer retention.',
      status: 'Soon'
    },
    {
      num: '03',
      title: 'Kirana OS',
      sector: 'Neighbourhood Retail',
      desc: 'Udhaar tracking, supplier orders, inventory alerts and credit account management.',
      status: 'Soon'
    },
    {
      num: '04',
      title: 'Salon OS',
      sector: 'Salons & Spas',
      desc: 'Bookings, no-show prevention, stylist scheduling and automated loyalties.',
      status: 'Soon'
    },
    {
      num: '05',
      title: 'Restaurant OS',
      sector: 'Restaurants & Kitchens',
      desc: 'Direct ordering, delivery tracking and loyalty — no third-party platform commissions.',
      status: 'Soon'
    },
    {
      num: '06',
      title: 'Compliance OS',
      sector: 'CA & Legal Firms',
      desc: 'GST deadline tracking, automated client follow-ups and statutory reminders.',
      status: 'Soon'
    }
  ];

  return (
    <section id="products" className="py-24 bg-white border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6">
        <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-3">// Product Suite</span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black leading-tight">
          One OS.<br />Every Indian industry.
        </h2>
        <p className="text-sm text-black/60 max-w-md mt-3 mb-12">
          THRYVIX Health is live. The rest are being built the same way — web-native, AI-powered, and Malayalam-first.
        </p>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((item) => (
            <TiltCard key={item.num} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Item {
  num: string;
  title: string;
  sector: string;
  desc: string;
  status: string;
}

function TiltCard({ item }: { item: Item; key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    
    // Slight 3D rotation based on mouse coordinates
    setTiltStyle({
      transform: `perspective(600px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale(1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
  };

  const isLive = item.status === 'Live Now';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={`p-6 border rounded-2xl transition-all duration-200 select-none flex flex-col justify-between min-h-[220px] shadow-[0_8px_30px_rgba(0,0,0,0.01)] relative group ${
        isLive
          ? 'border-black bg-neutral-50/50'
          : 'border-black/5 bg-white opacity-75 hover:opacity-100'
      }`}
    >
      <span className="absolute top-4 right-4 font-mono text-[9px] text-black/30 font-bold">
        {item.num}
      </span>

      <div>
        <div className="flex items-center gap-1.5 mb-4">
          <span
            className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-200'}`}
          />
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
            {item.status}
          </span>
        </div>

        <div className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest font-bold">
          {item.sector}
        </div>
        <h4 className="text-lg font-black text-black mt-1">
          {item.title}
        </h4>
      </div>

      <p className="text-xs text-black/60 mt-4 leading-relaxed flex-1">
        {item.desc}
      </p>
    </div>
  );
}
