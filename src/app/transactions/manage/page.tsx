"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  ArrowUpDown,
  Receipt,
  AlertTriangle,
} from "lucide-react";
import { api } from "@/lib/api";
import { Card, Button, Select, Badge, Skeleton } from "@/components/ui";

const ITEMS_PER_PAGE = 10;

export default function ManageTransactionsPage() {
  const { currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!authLoading && !currentUser) router.replace("/login");
  }, [authLoading, currentUser, router]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortKey, setSortKey] = useState("date_desc");
  const [page, setPage] = useState(1);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => (await api.get("/transactions")).data.transactions,
    enabled: !!currentUser,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => api.delete(`/transactions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      setConfirmId(null);
    },
  });

  const categories = useMemo(() => {
    const s = new Set<string>();
    transactions.forEach((tx: any) => tx.category && s.add(tx.category));
    return Array.from(s);
  }, [transactions]);

  const filtered = useMemo(() => {
    let data = [...transactions];
    if (search)
      data = data.filter((tx: any) =>
        tx.title?.toLowerCase().includes(search.toLowerCase()),
      );
    if (categoryFilter)
      data = data.filter((tx: any) => tx.category === categoryFilter);
    if (dateFrom)
      data = data.filter((tx: any) => new Date(tx.date) >= new Date(dateFrom));
    if (dateTo)
      data = data.filter((tx: any) => new Date(tx.date) <= new Date(dateTo));
    data.sort((a: any, b: any) => {
      if (sortKey === "date_desc")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortKey === "date_asc")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortKey === "amount_desc") return b.amount - a.amount;
      if (sortKey === "amount_asc") return a.amount - b.amount;
      return 0;
    });
    return data;
  }, [transactions, search, categoryFilter, dateFrom, dateTo, sortKey]);

  useEffect(() => setPage(1), [search, categoryFilter, dateFrom, dateTo]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const hasFilters = search || categoryFilter || dateFrom || dateTo;

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 px-6 py-14">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
            <Receipt size={20} className="text-emerald-300" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Manage Transactions
            </h1>
            <p className="text-sm text-slate-400">
              Search, filter, and manage everything in one place.
            </p>
          </div>
        </motion.div>

        <Card>
          {/* Filter bar */}
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                placeholder="Search title…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2.5 pl-9 pr-3 text-sm text-slate-50 placeholder:text-slate-500 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
              />
            </div>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <div className="relative">
              <ArrowUpDown
                size={13}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2.5 pl-8 pr-3 text-sm text-slate-50 outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
              >
                <option value="date_desc">Date (newest)</option>
                <option value="date_asc">Date (oldest)</option>
                <option value="amount_desc">Amount (high–low)</option>
                <option value="amount_asc">Amount (low–high)</option>
              </select>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-300 outline-none focus:border-emerald-400/50"
            />
            <span className="text-xs text-slate-600">to</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-300 outline-none focus:border-emerald-400/50"
            />
            {hasFilters && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("");
                  setDateFrom("");
                  setDateTo("");
                }}
                className="flex items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-400 hover:text-white"
              >
                <X size={12} /> Clear filters
              </button>
            )}
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-sm text-slate-500">No transactions found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 text-left font-medium">Title</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Date</th>
                    <th className="px-4 py-3 text-right font-medium">Amount</th>
                    <th className="px-4 py-3 text-center font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((tx: any, i: number) => (
                    <motion.tr
                      key={tx._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className={`border-b border-white/5 transition-colors hover:bg-white/[0.03] ${i % 2 ? "bg-white/[0.01]" : ""}`}
                    >
                      <td className="px-4 py-3 font-medium text-slate-100">
                        {tx.title}
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone="neutral">{tx.category}</Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-400">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-semibold ${tx.amount < 0 ? "text-rose-400" : "text-emerald-400"}`}
                      >
                        {tx.amount < 0 ? "-" : "+"}$
                        {Math.abs(tx.amount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              router.push(`/transactions/${tx._id}`)
                            }
                          >
                            <Eye size={13} />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => setConfirmId(tx._id)}
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft size={14} />
              </Button>
              <span className="text-sm text-slate-400">
                Page {page} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight size={14} />
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {confirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm px-6"
            onClick={() => setConfirmId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900 p-6 text-center shadow-2xl"
            >
              <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-400/10">
                <AlertTriangle size={20} className="text-rose-300" />
              </span>
              <h3 className="font-semibold text-white">
                Delete this transaction?
              </h3>
              <p className="mt-1.5 text-sm text-slate-400">
                This action can&rsquo;t be undone.
              </p>
              <div className="mt-5 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setConfirmId(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="flex-1"
                  disabled={deleteMutation.isPending}
                  onClick={() => confirmId && deleteMutation.mutate(confirmId)}
                >
                  {deleteMutation.isPending ? "Deleting…" : "Delete"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}