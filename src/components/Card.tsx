'use client';

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-slate-800 p-6 rounded-xl border border-slate-700/50 shadow ${className ?? ''}`}>
      {children}
    </div>
  );
}
