"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Shield, Wand2, ArrowRight } from "lucide-react";
import { Card, Button } from "@/components/ui";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function AboutPage() {
  const router = useRouter();

  const values = [
    {
      icon: Wand2,
      title: "Simplicity",
      desc: "A clean, intuitive interface that makes entering data and understanding spending seamless.",
    },
    {
      icon: Shield,
      title: "Security",
      desc: "Your financial data is private and encrypted. We hold ourselves to strict safety standards.",
    },
    {
      icon: Sparkles,
      title: "Smart Insights",
      desc: "AI-powered classification and advice give you recommendations built around your habits.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-white">About MyWallet</h1>
          <p className="mt-3 text-slate-400">
            Built for people who want their money to make sense.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-12"
        >
          <Card>
            <h2 className="text-lg font-semibold text-emerald-300">
              Our mission
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              We help people take complete control of their financial lives with
              tools that are simple, secure, and genuinely useful — turning
              everyday transactions into AI-powered insight, without
              spreadsheets or accounting jargon.
            </p>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-5"
        >
          <Card>
            <h2 className="text-lg font-semibold text-emerald-300">
              Why we built this
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Managing money shouldn&rsquo;t require expensive software.
              MyWallet bridges the gap between simple transaction logging and
              real intelligence — automatically categorizing purchases and
              surfacing the trends that actually matter.
            </p>
          </Card>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-14 text-center text-xl font-bold text-white"
        >
          Our core values
        </motion.h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4 + i}
            >
              <Card className="h-full text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
                  <v.icon size={19} className="text-emerald-300" />
                </div>
                <h3 className="font-semibold text-white">{v.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  {v.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={7}
          className="mt-14 flex justify-center"
        >
          <Button size="lg" onClick={() => router.push("/register")}>
            Get Started <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
