"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Sparkles, Wand2, AlertTriangle } from "lucide-react";
import { api } from "@/lib/api";
import { Card, Button } from "@/components/ui";

export default function AIAnalyzerPage() {
  const { currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) router.replace("/login");
  }, [authLoading, currentUser, router]);

  const [analysis, setAnalysis] = useState("");

  const {
    mutate: analyze,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => (await api.post("/ai/analyze")).data,
    onSuccess: (data) => setAnalysis(data.analysis),
  });

  if (!authLoading && !currentUser) return null;

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 px-6 py-14">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <Sparkles size={22} className="text-slate-950" />
          </span>
          <h1 className="mt-4 text-3xl font-bold text-white">
            AI Spending Analyzer
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            Gemini reviews your recent transactions and surfaces trends, risks,
            and savings opportunities — instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 flex justify-center"
        >
          <Button size="lg" onClick={() => analyze()} disabled={isPending}>
            {isPending ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block"
                >
                  <Wand2 size={16} />
                </motion.span>
                Analyzing your spending…
              </>
            ) : (
              <>
                <Sparkles size={16} /> Analyze My Spending
              </>
            )}
          </Button>
        </motion.div>

        {isError && (
          <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
            <AlertTriangle size={15} />
            {(error as any)?.message ||
              "Failed to get analysis. Please try again."}
          </div>
        )}

        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              <Card glow>
                <div className="space-y-3">
                  <ReactMarkdown
                    components={{
                      h1: ({ ...p }) => (
                        <h2
                          className="mb-1 mt-6 text-lg font-bold text-emerald-300 first:mt-0"
                          {...p}
                        />
                      ),
                      h2: ({ ...p }) => (
                        <h2
                          className="mb-1 mt-6 text-lg font-bold text-emerald-300 first:mt-0"
                          {...p}
                        />
                      ),
                      h3: ({ ...p }) => (
                        <h3
                          className="mb-1 mt-5 text-base font-semibold text-emerald-300"
                          {...p}
                        />
                      ),
                      p: ({ ...p }) => (
                        <p
                          className="text-sm leading-relaxed text-slate-300"
                          {...p}
                        />
                      ),
                      strong: ({ ...p }) => (
                        <strong className="font-semibold text-white" {...p} />
                      ),
                      ul: ({ ...p }) => (
                        <ul className="mt-2 space-y-2" {...p} />
                      ),
                      ol: ({ ...p }) => (
                        <ol
                          className="mt-2 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-emerald-400"
                          {...p}
                        />
                      ),
                      li: ({ ordered, children, ...rest }: any) =>
                        ordered ? (
                          <li
                            className="pl-1 text-sm leading-relaxed text-slate-300"
                            {...rest}
                          >
                            {children}
                          </li>
                        ) : (
                          <li
                            className="flex items-start gap-2 text-sm leading-relaxed text-slate-300"
                            {...rest}
                          >
                            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400/70" />
                            <span>{children}</span>
                          </li>
                        ),
                      hr: () => <hr className="my-4 border-white/10" />,
                    }}
                  >
                    {analysis}
                  </ReactMarkdown>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
