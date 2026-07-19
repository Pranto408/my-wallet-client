"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Wallet, ArrowRight, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, Button, Input } from "@/components/ui";

export default function RegisterPage() {
  const { register, currentUser, isLoading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && currentUser) router.replace("/dashboard");
  }, [isLoading, currentUser, router]);

  if (isLoading) return null;
  if (currentUser) return null;

  const validate = () => {
    if (!name || !email || !password) return "All fields are required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Invalid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);
    setSubmitting(true);
    setError("");
    try {
      await register(name, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/google`;
  };

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-slate-950 px-6 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <Wallet size={22} className="text-slate-950" strokeWidth={2.5} />
          </span>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="mt-1 text-sm text-slate-400">
            Start tracking your money in under a minute.
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-300">
                {error}
              </div>
            )}
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Creating account…" : "Register"}{" "}
              <ArrowRight size={15} />
            </Button>

            <div className="relative py-1 text-center">
              <span className="relative z-10 bg-transparent px-2 text-xs text-slate-500">
                or continue with
              </span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogle}
            >
              <Mail size={14} /> Sign up with Google
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
}
