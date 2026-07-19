"use client";

import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  LayoutDashboard,
  List,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ImageOff,
} from "lucide-react";
import { api } from "@/lib/api";
import { Card, Button, Badge, Skeleton } from "@/components/ui";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function TransactionDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const { currentUser, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !currentUser) router.replace("/login");
  }, [authLoading, currentUser, router]);

  const {
    data: transaction,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => (await api.get(`/transactions/${id}`)).data,
    enabled: !!currentUser && !!id,
    retry: false,
  });

  if (authLoading || isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-14">
        <Skeleton className="h-64" />
      </div>
    );
  }
  if (!currentUser) return null;

  if (error || !transaction) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-950 px-6">
        <Card className="w-full max-w-md text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-400/10">
            <AlertTriangle size={20} className="text-rose-300" />
          </span>
          <h2 className="text-lg font-bold text-white">
            Transaction not found
          </h2>
          <p className="mt-1.5 text-sm text-slate-400">
            It may have been deleted or you don&rsquo;t have access.
          </p>
          <Button
            variant="outline"
            className="mt-5"
            onClick={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const isExpense = transaction.amount < 0;

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 px-6 py-14">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <Card>
          {/* Hero amount */}
          <div className="flex flex-col items-center border-b border-white/10 pb-6 text-center">
            <span
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${
                isExpense ? "bg-rose-400/10" : "bg-emerald-400/10"
              }`}
            >
              {isExpense ? (
                <TrendingDown size={20} className="text-rose-300" />
              ) : (
                <TrendingUp size={20} className="text-emerald-300" />
              )}
            </span>
            <p className="text-sm text-slate-400">{transaction.title}</p>
            <p
              className={`mt-1 text-3xl font-extrabold ${isExpense ? "text-rose-400" : "text-emerald-400"}`}
            >
              {isExpense ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
            </p>
            <div className="mt-2 flex gap-2">
              <Badge tone={isExpense ? "expense" : "income"}>
                {isExpense ? "Expense" : "Income"}
              </Badge>
              <Badge tone="neutral">{transaction.category || "Other"}</Badge>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-5 py-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Date
              </p>
              <p className="mt-1 text-sm text-slate-200">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Category
              </p>
              <p className="mt-1 text-sm text-slate-200">
                {transaction.category || "Other"}
              </p>
            </div>
          </div>

          {transaction.shortDescription && (
            <div className="border-t border-white/10 py-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Short description
              </p>
              <p className="mt-1.5 text-sm text-slate-300">
                {transaction.shortDescription}
              </p>
            </div>
          )}

          {transaction.fullDescription && (
            <div className="border-t border-white/10 py-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Full description
              </p>
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {transaction.fullDescription}
              </p>
            </div>
          )}

          {transaction.receiptUrl && (
            <div className="border-t border-white/10 py-4">
              <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
                Receipt
              </p>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={transaction.receiptUrl}
                  alt="Receipt"
                  className="max-h-80 w-full object-contain"
                  onError={(e) =>
                    ((e.target as HTMLElement).style.display = "none")
                  }
                />
                <a
                  href={transaction.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border-t border-white/10 py-2.5 text-sm font-medium text-emerald-400 hover:text-emerald-300"
                >
                  <ImageOff size={13} /> View original image
                </a>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-3 border-t border-white/10 pt-6">
            <Button
              className="flex-1"
              onClick={() => router.push("/dashboard")}
            >
              <LayoutDashboard size={15} /> Dashboard
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/transactions/manage")}
            >
              <List size={15} /> All Transactions
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
