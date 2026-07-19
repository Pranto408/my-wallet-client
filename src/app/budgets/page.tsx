"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { PiggyBank, CheckCircle2, AlertTriangle, Pencil } from "lucide-react";
import { api } from "@/lib/api";
import { Card, Button, Input, Select, Skeleton } from "@/components/ui";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Healthcare",
  "Rent",
  "Utilities",
  "Other",
];

export default function SetBudgetPage() {
  const { currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({ category: "Food", limit: "" });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!authLoading && !currentUser) router.replace("/login");
  }, [authLoading, currentUser, router]);

  const { data: budgets = [], isLoading: budgetsLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => (await api.get("/budgets")).data,
    enabled: !!currentUser,
  });

  const saveBudget = useMutation({
    mutationFn: async (payload: { category: string; limit: number }) =>
      (await api.post("/budgets", payload)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setSuccessMsg("Budget saved successfully!");
      setErrorMsg("");
      setForm((p) => ({ ...p, limit: "" }));
      setTimeout(() => setSuccessMsg(""), 3000);
    },
    onError: (err: any) => {
      setErrorMsg(err?.response?.data?.message || "Failed to save budget.");
      setSuccessMsg("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.limit || isNaN(Number(form.limit)) || Number(form.limit) < 0) {
      setErrorMsg("Please enter a valid positive number for the budget limit.");
      return;
    }
    saveBudget.mutate({ category: form.category, limit: Number(form.limit) });
  };

  if (authLoading || budgetsLoading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-14">
        <Skeleton className="h-10 w-52 mb-6" />
        <Skeleton className="h-40 mb-6" />
        <Skeleton className="h-24" />
      </div>
    );
  }
  if (!currentUser) return null;

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 px-6 py-14">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[640px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
            <PiggyBank size={20} className="text-emerald-300" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Budgets</h1>
            <p className="text-sm text-slate-400">
              Set monthly limits per category and stay on track.
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 flex items-center gap-2 overflow-hidden rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300"
            >
              <CheckCircle2 size={16} /> {successMsg}
            </motion.div>
          )}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 flex items-center gap-2 overflow-hidden rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-300"
            >
              <AlertTriangle size={16} /> {errorMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Category"
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
              <Input
                label="Limit Amount ($)"
                type="number"
                min="0"
                step="0.01"
                placeholder="e.g. 500"
                value={form.limit}
                onChange={(e) =>
                  setForm((p) => ({ ...p, limit: e.target.value }))
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={saveBudget.isPending}
            >
              {saveBudget.isPending ? "Saving…" : "Save Budget"}
            </Button>
          </form>
        </Card>

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Current budgets
        </h2>
        {budgets.length === 0 ? (
          <Card className="text-center">
            <p className="text-sm text-slate-400">
              No budgets set yet — use the form above to add one.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {budgets.map((b: any, i: number) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-semibold text-slate-100">
                      {b.category}
                    </h3>
                    <p className="text-sm text-slate-400">
                      Monthly limit: ${b.limit}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setForm({
                        category: b.category,
                        limit: b.limit.toString(),
                      });
                      setSuccessMsg("");
                      setErrorMsg("");
                    }}
                  >
                    <Pencil size={13} /> Edit
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
