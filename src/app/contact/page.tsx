"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Code2,
  AtSign,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Card, Button, Input } from "@/components/ui";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email is invalid";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-slate-950 px-6 py-14">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[130px]" />

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <Card>
          <h1 className="mb-1 text-2xl font-bold text-white">Contact us</h1>
          <p className="mb-5 text-sm text-slate-400">
            We usually reply within one business day.
          </p>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-center"
              >
                <CheckCircle2 size={28} className="text-emerald-300" />
                <h2 className="mt-3 font-semibold text-white">Message sent!</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Thanks for reaching out — our team will get back to you
                  shortly.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSuccess(false)}
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <Input
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  error={errors.name}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  error={errors.email}
                />
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400">{errors.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Send Message <ArrowRight size={15} />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Get in touch</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Have questions, feedback, or need assistance? We&rsquo;re here to
              help — reach out through the form or connect with us directly.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10">
                  <Mail size={15} className="text-emerald-300" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Email
                  </p>
                  <a
                    href="mailto:support@mywallet.app"
                    className="text-sm text-emerald-400 hover:text-emerald-300"
                  >
                    support@mywallet.app
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10">
                  <MapPin size={15} className="text-emerald-300" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    HQ location
                  </p>
                  <p className="text-sm text-slate-200">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-3 text-xs uppercase tracking-wider text-slate-500">
              Connect with us
            </p>
            <div className="flex gap-3">
              {[Code2, AtSign, Briefcase].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition-colors hover:border-emerald-400/40 hover:text-emerald-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
