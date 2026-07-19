"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Wallet, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, Button, Input } from "@/components/ui";

export default function LoginPage() {
  const { login, demoLogin, currentUser, isLoading } = useAuth();
  const router = useRouter();
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
    if (!email || !password) return "All fields are required.";
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
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemo = async () => {
    setSubmitting(true);
    setError("");
    try {
      await demoLogin();
      router.push("/dashboard");
    } catch {
      setError("Demo login failed");
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
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
            <Wallet size={22} className="text-slate-950" strokeWidth={2.5} />
          </span>
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-400">
            Log in to keep tracking your money.
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
              placeholder="••••••••"
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in…" : "Login"} <ArrowRight size={15} />
            </Button>

            <div className="relative py-1 text-center">
              <span className="relative z-10 bg-transparent px-2 text-xs text-slate-500">
                or continue with
              </span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleDemo}
                disabled={submitting}
              >
                <Sparkles size={14} /> Demo
              </Button>
              <Button type="button" variant="outline" onClick={handleGoogle}>
                <Mail size={14} /> Google
              </Button>
            </div>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&rsquo;t have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="font-medium text-emerald-400 hover:text-emerald-300"
          >
            Register
          </button>
        </p>
      </motion.div>
    </div>
  );
}
