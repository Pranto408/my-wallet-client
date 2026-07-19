"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Plus,
  PiggyBank,
  ArrowUpRight,
  Sparkles,
  Wallet2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";
import { api } from "@/lib/api";
import { Card, Button, Skeleton, Badge } from "@/components/ui";

const CHART_COLORS = [
  "#34d399",
  "#fbbf24",
  "#60a5fa",
  "#f472b6",
  "#a78bfa",
  "#fb923c",
  "#4ade80",
  "#f87171",
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};

export default function DashboardPage() {
  const { currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) router.replace("/login");
  }, [authLoading, currentUser, router]);

  const { data: budgets = [], isLoading: budgetsLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => (await api.get("/budgets")).data,
    enabled: !!currentUser,
  });

  const { data: transactions = [], isLoading: txLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => (await api.get("/transactions")).data.transactions,
    enabled: !!currentUser,
  });

  const isLoading = authLoading || budgetsLoading || txLoading;

  const spentByCategory = useMemo(() => {
    const map = {} as Record<string, number>;
    transactions.forEach((tx: any) => {
      if (tx.amount < 0) {
        const cat = tx.category || "Uncategorized";
        map[cat] = (map[cat] || 0) + Math.abs(tx.amount);
      }
    });
    return map;
  }, [transactions]);

  const { income, expense } = useMemo(() => {
    let income = 0,
      expense = 0;
    transactions.forEach((tx: any) => {
      if (tx.amount >= 0) income += tx.amount;
      else expense += Math.abs(tx.amount);
    });
    return { income, expense };
  }, [transactions]);

  const chartData = useMemo(
    () =>
      Object.entries(spentByCategory).map(([name, value]) => ({ name, value })),
    [spentByCategory],
  );

  const recentTx = useMemo(
    () =>
      [...transactions]
        .sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        .slice(0, 5),
    [transactions],
  );

  if (!authLoading && !currentUser) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back
              {currentUser ? `, ${currentUser.name?.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Here&rsquo;s where your money stands today.
            </p>
          </div>
          <Button onClick={() => router.push("/transactions/add")}>
            <Plus size={16} /> Add Transaction
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="col-span-3 h-72" />
          </div>
        ) : (
          <>
            {/* Summary strip */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <motion.div
                variants={fadeUp}
                custom={0}
                initial="hidden"
                animate="show"
              >
                <Card className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
                    <TrendingUp size={19} className="text-emerald-300" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Income
                    </p>
                    <p className="text-xl font-bold text-emerald-400">
                      ${income.toFixed(2)}
                    </p>
                  </div>
                </Card>
              </motion.div>
              <motion.div
                variants={fadeUp}
                custom={1}
                initial="hidden"
                animate="show"
              >
                <Card className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-400/10">
                    <TrendingDown size={19} className="text-rose-300" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Expenses
                    </p>
                    <p className="text-xl font-bold text-rose-400">
                      ${expense.toFixed(2)}
                    </p>
                  </div>
                </Card>
              </motion.div>
              <motion.div
                variants={fadeUp}
                custom={2}
                initial="hidden"
                animate="show"
              >
                <Card className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10">
                    <Wallet2 size={19} className="text-amber-300" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Net
                    </p>
                    <p
                      className={`text-xl font-bold ${income - expense >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      ${(income - expense).toFixed(2)}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>

            <div className="mb-6 grid gap-4 lg:grid-cols-5">
              {/* Budgets */}
              <Card className="lg:col-span-3">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                    <PiggyBank size={16} className="text-emerald-300" /> Budgets
                  </h2>
                  <button
                    onClick={() => router.push("/budgets")}
                    className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    Manage <ArrowRight size={11} className="inline" />
                  </button>
                </div>

                {budgets.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-slate-400">
                      No budgets set yet.
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3"
                      onClick={() => router.push("/budgets")}
                    >
                      Set your first budget
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {budgets.map((b: any, i: number) => {
                      const spent = spentByCategory[b.category] || 0;
                      const pct = Math.min(100, (spent / b.limit) * 100);
                      const over = spent > b.limit;
                      return (
                        <div key={b._id}>
                          <div className="mb-1.5 flex items-baseline justify-between text-sm">
                            <span className="font-medium text-slate-200">
                              {b.category}
                            </span>
                            <span
                              className={
                                over ? "text-rose-400" : "text-slate-400"
                              }
                            >
                              ${spent.toFixed(2)}{" "}
                              <span className="text-slate-600">
                                / ${b.limit}
                              </span>
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{
                                duration: 0.8,
                                delay: i * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className={`h-full rounded-full ${over ? "bg-rose-400" : "bg-gradient-to-r from-emerald-400 to-emerald-500"}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              {/* Category chart */}
              <Card className="lg:col-span-2">
                <h2 className="mb-4 text-sm font-semibold text-white">
                  Spending by category
                </h2>
                {chartData.length === 0 ? (
                  <div className="flex h-48 items-center justify-center text-sm text-slate-500">
                    No expenses yet
                  </div>
                ) : (
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={48}
                          outerRadius={72}
                          paddingAngle={3}
                          strokeWidth={0}
                        >
                          {chartData.map((_, i) => (
                            <Cell
                              key={i}
                              fill={CHART_COLORS[i % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "#0f172a",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 10,
                            fontSize: 12,
                          }}
                          formatter={(v) => `$${Number(v ?? 0).toFixed(2)}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {chartData.map((d, i) => (
                    <div
                      key={d.name}
                      className="flex items-center gap-1.5 text-xs text-slate-400"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: CHART_COLORS[i % CHART_COLORS.length],
                        }}
                      />
                      {d.name}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick actions */}
            <div className="mb-6 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => router.push("/budgets")}>
                <PiggyBank size={15} /> Set Budget
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/transactions/manage")}
              >
                View All Transactions
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/ai-analyzer")}
              >
                <Sparkles size={15} /> AI Analyzer
              </Button>
            </div>

            {/* Recent transactions */}
            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">
                  Recent Transactions
                </h2>
                <button
                  onClick={() => router.push("/transactions/manage")}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
                >
                  View all <ArrowRight size={11} className="inline" />
                </button>
              </div>

              {recentTx.length === 0 ? (
                <p className="py-6 text-center text-sm text-slate-500">
                  No transactions yet — add your first one.
                </p>
              ) : (
                <div className="divide-y divide-white/5">
                  {recentTx.map((tx: any, i: number) => (
                    <motion.div
                      key={tx._id}
                      variants={fadeUp}
                      custom={i}
                      initial="hidden"
                      animate="show"
                      onClick={() => router.push(`/transactions/${tx._id}`)}
                      className="flex cursor-pointer items-center justify-between py-3 transition-colors hover:bg-white/[0.02] px-2 -mx-2 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-9 w-9 items-center justify-center rounded-full ${
                            tx.amount < 0
                              ? "bg-rose-400/10"
                              : "bg-emerald-400/10"
                          }`}
                        >
                          <ArrowUpRight
                            size={15}
                            className={
                              tx.amount < 0
                                ? "rotate-90 text-rose-300"
                                : "text-emerald-300"
                            }
                          />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-100">
                            {tx.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(tx.date).toLocaleDateString()} ·{" "}
                            <Badge tone="neutral">{tx.category}</Badge>
                          </p>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-semibold ${tx.amount < 0 ? "text-rose-400" : "text-emerald-400"}`}
                      >
                        {tx.amount < 0 ? "-" : "+"}$
                        {Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
