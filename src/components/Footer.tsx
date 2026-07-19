"use client";

import { useRouter } from "next/navigation";
import { Wallet, Code2, AtSign, Briefcase, Mail } from "lucide-react";

export default function Footer() {
  const router = useRouter();

  const columns = [
    {
      title: "Product",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Budgets", href: "/budgets" },
        { label: "AI Insights", href: "/ai-analyzer" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
                <Wallet
                  size={17}
                  className="text-slate-950"
                  strokeWidth={2.5}
                />
              </span>
              <span className="text-lg font-bold text-white">MyWallet</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Simple budgeting and AI-driven insight, built for people who want
              their money to make sense.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[Code2, AtSign, Briefcase, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <button
                      onClick={() => router.push(l.href)}
                      className="text-sm text-slate-400 transition-colors hover:text-emerald-300"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 MyWallet. All rights reserved.</p>
          <p>support@mywallet.app</p>
        </div>
      </div>
    </footer>
  );
}
