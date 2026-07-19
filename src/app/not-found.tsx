"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Home, ArrowLeft, Wallet2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">
      <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[170px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10">
          <Wallet2 className="h-10 w-10 text-emerald-400" />
        </div>

        <motion.h1
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="mt-8 text-7xl font-black text-white"
        >
          404
        </motion.h1>

        <h2 className="mt-3 text-2xl font-bold text-white">Page Not Found</h2>

        <p className="mx-auto mt-4 max-w-md text-slate-400">
          Looks like the page you're trying to visit doesn't exist, was moved,
          or has been deleted.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-medium text-black transition hover:bg-emerald-400">
              <Home size={18} />
              Dashboard
            </button>
          </Link>

          <button
            onClick={() => history.back()}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-slate-500">
          <Search size={15} />
          Error Code : 404
        </div>
      </motion.div>
    </div>
  );
}
