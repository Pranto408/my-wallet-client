"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  PiggyBank,
  BrainCircuit,
  ShieldCheck,
  Receipt,
  ChevronDown,
  Play,
} from "lucide-react";
import { Card, Button, Badge } from "@/components/ui";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Stat({
  value,
  label,
  i,
}: {
  value: string;
  label: string;
  i: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="bg-gradient-to-br from-emerald-300 to-emerald-500 bg-clip-text text-4xl font-extrabold text-transparent">
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left"
      >
        <span className="font-medium text-slate-100">{q}</span>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="overflow-hidden px-5 pb-4 pt-2 text-sm leading-relaxed text-slate-400"
        >
          {a}
        </motion.p>
      )}
    </motion.div>
  );
}

export default function LandingPage() {
  const router = useRouter();

  const features = [
    {
      icon: PiggyBank,
      title: "Budget Tracking",
      desc: "Set limits per category and watch remaining budget update in real time.",
    },
    {
      icon: BrainCircuit,
      title: "AI Insights",
      desc: "Gemini-powered analysis surfaces trends, risks, and savings opportunities.",
    },
    {
      icon: Receipt,
      title: "Transaction Management",
      desc: "Add, search, filter, and categorize every expense in seconds.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      desc: "JWT-secured sessions and encrypted storage — your data stays yours.",
    },
  ];

  const steps = [
    {
      n: "01",
      title: "Sign up",
      desc: "Create a free account or jump in instantly with demo mode.",
    },
    {
      n: "02",
      title: "Add transactions",
      desc: "Log income and expenses — AI suggests the category for you.",
    },
    {
      n: "03",
      title: "Get AI insights",
      desc: "See where your money goes and what to change, in plain language.",
    },
  ];

  const testimonials = [
    {
      name: "Alex P.",
      role: "Freelance Designer",
      quote:
        "MyWallet transformed how I handle finances — budgeting finally feels effortless.",
    },
    {
      name: "Sofia R.",
      role: "Product Manager",
      quote:
        "The AI insights caught overspending I hadn\u2019t noticed. Saved me real money.",
    },
    {
      name: "Liam K.",
      role: "Grad Student",
      quote:
        "Clean, fast, and it never feels like a chore to open. That matters most.",
    },
  ];

  const faqs = [
    {
      q: "Is MyWallet free to use?",
      a: "Yes — the core features are free forever. Pro unlocks advanced AI depth and priority support.",
    },
    {
      q: "How is my data protected?",
      a: "All data is encrypted in transit and at rest. We never sell or share your information.",
    },
    {
      q: "Can I import existing bank statements?",
      a: "CSV import is on our roadmap. For now, transactions are added manually or via quick entry.",
    },
    {
      q: "Do you offer a mobile app?",
      a: "MyWallet is fully responsive today — a native app is planned for a future release.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950">
      {/* ambient gradient mesh */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] overflow-hidden">
        <div className="absolute left-1/2 top-[-180px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute right-[-120px] top-[80px] h-[320px] w-[320px] rounded-full bg-amber-400/10 blur-[100px]" />
      </div>

      {/* HERO */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-24 text-center">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
        >
          <Badge tone="income">
            <Sparkles size={12} className="mr-1" /> AI-powered financial clarity
          </Badge>
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="mt-6 text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl"
        >
          Take control of your money
          <br />
          <span className="bg-gradient-to-br from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
            with MyWallet
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={2}
          className="mt-5 max-w-xl text-lg text-slate-400"
        >
          Simple budgeting, AI-driven insights, and secure transaction
          management — all in one calm, focused place.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={3}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" onClick={() => router.push("/register")}>
            Get Started <ArrowRight size={16} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/login")}
          >
            <Play size={15} /> Try Demo
          </Button>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-white/5 bg-white/[0.015] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-white"
          >
            Everything you need, nothing you don&rsquo;t
          </motion.h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Card key={f.title} className="text-left">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
                  <f.icon size={20} className="text-emerald-300" />
                </div>
                <h3 className="font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {f.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-white"
          >
            How it works
          </motion.h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative"
              >
                <span className="text-5xl font-extrabold text-white/[0.06]">
                  {s.n}
                </span>
                <h3 className="-mt-6 text-lg font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/5 bg-white/[0.015] py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          <Stat value="10K+" label="Active users" i={0} />
          <Stat value="$2M+" label="Tracked monthly" i={1} />
          <Stat value="99.9%" label="Uptime" i={2} />
          <Stat value="24/7" label="AI availability" i={3} />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-white"
          >
            What people are saying
          </motion.h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name}>
                <p className="text-sm italic leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-xs font-bold text-slate-950">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-t border-white/5 bg-white/[0.015] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-white"
          >
            Simple pricing
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card>
              <p className="text-sm font-medium text-slate-400">Free</p>
              <p className="mt-2 text-4xl font-extrabold text-white">
                $0
                <span className="text-base font-medium text-slate-500">
                  /mo
                </span>
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-400">
                <li>Unlimited budgets</li>
                <li>Basic AI insights</li>
                <li>Transaction management</li>
              </ul>
              <Button
                variant="outline"
                className="mt-8 w-full"
                onClick={() => router.push("/register")}
              >
                Choose Free
              </Button>
            </Card>
            <Card glow className="border-emerald-400/30">
              <Badge tone="income">Most popular</Badge>
              <p className="mt-3 text-sm font-medium text-slate-400">Pro</p>
              <p className="mt-2 text-4xl font-extrabold text-white">
                $9.99
                <span className="text-base font-medium text-slate-500">
                  /mo
                </span>
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-slate-400">
                <li>Everything in Free</li>
                <li>Advanced AI depth &amp; forecasts</li>
                <li>Priority support</li>
                <li>Data export</li>
              </ul>
              <Button
                className="mt-8 w-full"
                onClick={() => router.push("/register")}
              >
                Upgrade to Pro
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center text-3xl font-bold text-white"
          >
            Frequently asked questions
          </motion.h2>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/5 py-24 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-2xl px-6"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start tracking your finances today
          </h2>
          <p className="mt-3 text-slate-400">
            No credit card required. Takes under a minute.
          </p>
          <Button
            size="lg"
            className="mt-8"
            onClick={() => router.push("/register")}
          >
            Register Now <ArrowRight size={16} />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}
