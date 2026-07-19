"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Wallet, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, Button } from "@/components/ui";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { loginWithToken } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      loginWithToken(token)
        .then(() => router.replace("/dashboard"))
        .catch((err) => {
          console.error("Callback login failed:", err);
          setError("Failed to authenticate with Google.");
        });
    } else {
      setError("No authentication token found.");
    }
  }, [loginWithToken, router]);

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-slate-950 px-6">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Card className="text-center">
          {error ? (
            <>
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-400/10">
                <AlertTriangle size={22} className="text-rose-300" />
              </span>
              <h2 className="text-lg font-bold text-white">
                Authentication error
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">{error}</p>
              <Button
                variant="outline"
                className="mt-6 w-full"
                onClick={() => router.push("/login")}
              >
                Back to Login
              </Button>
            </>
          ) : (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30"
              >
                <Wallet
                  size={20}
                  className="text-slate-950"
                  strokeWidth={2.5}
                />
              </motion.span>
              <h2 className="text-lg font-bold text-white">Signing you in</h2>
              <p className="mt-1.5 text-sm text-slate-400">
                Completing Google authentication…
              </p>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
