"use client";

import { motion } from "framer-motion";
import { Wallet2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-400/20 bg-slate-900">
            <Wallet2 className="h-10 w-10 text-emerald-400" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-8 text-2xl font-bold text-white"
        >
          Loading...
        </motion.h2>

        <p className="mt-2 text-sm text-slate-400">
          Preparing your finance dashboard
        </p>

        <div className="mt-8 h-1.5 w-56 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.3,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 rounded-full bg-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}
