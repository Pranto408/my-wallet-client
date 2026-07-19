"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-3xl border border-red-500/10 bg-slate-900 p-10 text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="h-10 w-10 text-red-400" />
        </div>

        <h1 className="mt-8 text-3xl font-bold text-white">
          Something went wrong
        </h1>

        <p className="mt-4 text-slate-400">
          An unexpected error occurred while loading this page.
        </p>

        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-medium text-black transition hover:bg-emerald-400"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      </motion.div>
    </div>
  );
}
