"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, InputHTMLAttributes, SelectHTMLAttributes } from "react";

/* ---------------------------------------------------------------------- */
/*  Design tokens (reference only — actual values live in globals.css)     */
/*  bg      : slate-950 / slate-900                                        */
/*  surface : slate-900/60 with backdrop-blur (glass)                      */
/*  primary : emerald-400 → emerald-600 gradient                           */
/*  income  : emerald-400   expense : rose-400   warn/accent : amber-400   */
/* ---------------------------------------------------------------------- */

export function Card({
  children,
  className = "",
  glow = false,
  ...props
}: HTMLMotionProps<"div"> & { children: ReactNode; glow?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03]
        backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]
        ${glow ? "shadow-[0_0_40px_-12px_rgba(16,185,129,0.35)]" : ""}
        p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: HTMLMotionProps<"button"> & {
  children: ReactNode;
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-br from-emerald-400 to-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40",
    outline: "border border-white/15 text-slate-100 hover:bg-white/5",
    ghost: "text-slate-300 hover:text-white hover:bg-white/5",
    danger:
      "bg-gradient-to-br from-rose-400 to-rose-600 text-slate-950 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function Input({
  label,
  error,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5
          text-slate-50 placeholder:text-slate-500 outline-none transition-all
          focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export function Select({
  label,
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <select
        className={`w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5
          text-slate-50 outline-none transition-all focus:border-emerald-400/50
          focus:ring-2 focus:ring-emerald-400/20 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04]
        bg-[length:200%_100%] ${className}`}
      style={{ animation: "shimmer 1.6s ease-in-out infinite" }}
    />
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "income" | "expense" | "warn";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-white/5 text-slate-300 border-white/10",
    income: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    expense: "bg-rose-400/10 text-rose-300 border-rose-400/20",
    warn: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
