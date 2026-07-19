// "use client";

// import { useEffect, use } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import { useQuery } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import {
//   ArrowLeft,
//   LayoutDashboard,
//   List,
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   ImageOff,
// } from "lucide-react";
// import { api } from "@/lib/api";
// import { Card, Button, Badge, Skeleton } from "@/components/ui";

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default function TransactionDetailsPage({ params }: PageProps) {
//   const { id } = use(params);
//   const { currentUser, isLoading: authLoading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!authLoading && !currentUser) router.replace("/login");
//   }, [authLoading, currentUser, router]);

//   const {
//     data: transaction,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["transaction", id],
//     queryFn: async () => (await api.get(`/transactions/${id}`)).data,
//     enabled: !!currentUser && !!id,
//     retry: false,
//   });

//   if (authLoading || isLoading) {
//     return (
//       <div className="mx-auto max-w-2xl px-6 py-14">
//         <Skeleton className="h-64" />
//       </div>
//     );
//   }
//   if (!currentUser) return null;

//   if (error || !transaction) {
//     return (
//       <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-950 px-6">
//         <Card className="w-full max-w-md text-center">
//           <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-400/10">
//             <AlertTriangle size={20} className="text-rose-300" />
//           </span>
//           <h2 className="text-lg font-bold text-white">
//             Transaction not found
//           </h2>
//           <p className="mt-1.5 text-sm text-slate-400">
//             It may have been deleted or you don&rsquo;t have access.
//           </p>
//           <Button
//             variant="outline"
//             className="mt-5"
//             onClick={() => router.push("/dashboard")}
//           >
//             Back to Dashboard
//           </Button>
//         </Card>
//       </div>
//     );
//   }

//   const isExpense = transaction.amount < 0;

//   return (
//     <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 px-6 py-14">
//       <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mx-auto max-w-2xl"
//       >
//         <button
//           onClick={() => router.back()}
//           className="mb-4 flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
//         >
//           <ArrowLeft size={14} /> Back
//         </button>

//         <Card>
//           {/* Hero amount */}
//           <div className="flex flex-col items-center border-b border-white/10 pb-6 text-center">
//             <span
//               className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${
//                 isExpense ? "bg-rose-400/10" : "bg-emerald-400/10"
//               }`}
//             >
//               {isExpense ? (
//                 <TrendingDown size={20} className="text-rose-300" />
//               ) : (
//                 <TrendingUp size={20} className="text-emerald-300" />
//               )}
//             </span>
//             <p className="text-sm text-slate-400">{transaction.title}</p>
//             <p
//               className={`mt-1 text-3xl font-extrabold ${isExpense ? "text-rose-400" : "text-emerald-400"}`}
//             >
//               {isExpense ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
//             </p>
//             <div className="mt-2 flex gap-2">
//               <Badge tone={isExpense ? "expense" : "income"}>
//                 {isExpense ? "Expense" : "Income"}
//               </Badge>
//               <Badge tone="neutral">{transaction.category || "Other"}</Badge>
//             </div>
//           </div>

//           {/* Info grid */}
//           <div className="grid grid-cols-2 gap-5 py-6">
//             <div>
//               <p className="text-xs uppercase tracking-wider text-slate-500">
//                 Date
//               </p>
//               <p className="mt-1 text-sm text-slate-200">
//                 {new Date(transaction.date).toLocaleDateString()}
//               </p>
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-wider text-slate-500">
//                 Category
//               </p>
//               <p className="mt-1 text-sm text-slate-200">
//                 {transaction.category || "Other"}
//               </p>
//             </div>
//           </div>

//           {transaction.shortDescription && (
//             <div className="border-t border-white/10 py-4">
//               <p className="text-xs uppercase tracking-wider text-slate-500">
//                 Short description
//               </p>
//               <p className="mt-1.5 text-sm text-slate-300">
//                 {transaction.shortDescription}
//               </p>
//             </div>
//           )}

//           {transaction.fullDescription && (
//             <div className="border-t border-white/10 py-4">
//               <p className="text-xs uppercase tracking-wider text-slate-500">
//                 Full description
//               </p>
//               <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
//                 {transaction.fullDescription}
//               </p>
//             </div>
//           )}

//           {transaction.receiptUrl && (
//             <div className="border-t border-white/10 py-4">
//               <p className="mb-2 text-xs uppercase tracking-wider text-slate-500">
//                 Receipt
//               </p>
//               <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/60">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={transaction.receiptUrl}
//                   alt="Receipt"
//                   className="max-h-80 w-full object-contain"
//                   onError={(e) =>
//                     ((e.target as HTMLElement).style.display = "none")
//                   }
//                 />
//                 <a
//                   href={transaction.receiptUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center gap-1.5 border-t border-white/10 py-2.5 text-sm font-medium text-emerald-400 hover:text-emerald-300"
//                 >
//                   <ImageOff size={13} /> View original image
//                 </a>
//               </div>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="mt-6 flex gap-3 border-t border-white/10 pt-6">
//             <Button
//               className="flex-1"
//               onClick={() => router.push("/dashboard")}
//             >
//               <LayoutDashboard size={15} /> Dashboard
//             </Button>
//             <Button
//               variant="outline"
//               className="flex-1"
//               onClick={() => router.push("/transactions/manage")}
//             >
//               <List size={15} /> All Transactions
//             </Button>
//           </div>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { Card, Button, Input, Select } from "@/components/ui";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Rent",
  "Utilities",
  "Healthcare",
  "Salary",
  "Other",
];

export default function AddTransactionPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { currentUser, isLoading } = useAuth();

  const [form, setForm] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    amount: "",
    type: "Expense",
    category: "Food",
    date: "",
    receiptUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [suggestedCategory, setSuggestedCategory] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);

  useEffect(() => {
    if (!isLoading && !currentUser) router.replace("/login");
  }, [isLoading, currentUser, router]);

  useEffect(() => {
    if (!form.title.trim()) {
      setSuggestedCategory("");
      return;
    }
    const t = setTimeout(async () => {
      setIsClassifying(true);
      try {
        const res = await api.post("/ai/classify", { description: form.title });
        if (res.data.category) {
          setSuggestedCategory(res.data.category);
          setForm((p) => ({ ...p, category: res.data.category }));
        }
      } catch {
        // silent
      } finally {
        setIsClassifying(false);
      }
    }, 800);
    return () => clearTimeout(t);
  }, [form.title]);

  if (isLoading) return null;
  if (!currentUser) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title) e.title = "Title is required";
    if (!form.shortDescription)
      e.shortDescription = "Short description is required";
    if (!form.amount) e.amount = "Amount is required";
    else if (isNaN(Number(form.amount))) e.amount = "Amount must be a number";
    if (!form.date) e.date = "Date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const signedAmount =
      form.type === "Expense"
        ? -Math.abs(Number(form.amount))
        : Math.abs(Number(form.amount));
    try {
      await api.post("/transactions", {
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        amount: signedAmount,
        type: form.type,
        category: form.category,
        date: form.date,
        receiptUrl: form.receiptUrl || undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      router.replace("/dashboard");
    } catch (err) {
      console.error("Failed to create transaction", err);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 px-6 py-14">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[380px] w-[640px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
            <Plus size={20} className="text-emerald-300" />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">Add Transaction</h1>
            <p className="text-sm text-slate-400">
              Log an expense or income — AI helps pick the category.
            </p>
          </div>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Segmented type toggle */}
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-900/60 p-1">
              {(["Expense", "Income"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: t }))}
                  className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-all ${
                    form.type === t
                      ? t === "Expense"
                        ? "bg-rose-400/15 text-rose-300"
                        : "bg-emerald-400/15 text-emerald-300"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {t === "Expense" ? (
                    <TrendingDown size={14} />
                  ) : (
                    <TrendingUp size={14} />
                  )}
                  {t}
                </button>
              ))}
            </div>

            <Input
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Grocery shopping"
              error={errors.title}
            />
            <Input
              label="Short description"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="A quick summary"
              error={errors.shortDescription}
            />
            <div className="space-y-1.5">
              <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Full description{" "}
                <span className="normal-case text-slate-600">(optional)</span>
              </label>
              <textarea
                name="fullDescription"
                rows={3}
                value={form.fullDescription}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Amount ($)"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                error={errors.amount}
              />
              <Input
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                error={errors.date}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Category
                </label>
                <AnimatePresence mode="wait">
                  {isClassifying ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1 text-xs text-slate-400"
                    >
                      <Wand2 size={11} className="animate-pulse" /> AI
                      classifying…
                    </motion.span>
                  ) : suggestedCategory ? (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1 text-xs text-emerald-400"
                    >
                      <Sparkles size={11} /> AI suggested: {suggestedCategory}
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
              <Select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>

            <Input
              label="Receipt image URL"
              name="receiptUrl"
              type="url"
              value={form.receiptUrl}
              onChange={handleChange}
              placeholder="https://… (optional)"
            />

            <Button type="submit" className="w-full">
              <Plus size={15} /> Add Transaction
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}