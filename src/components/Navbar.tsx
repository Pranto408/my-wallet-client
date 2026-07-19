// 'use client';
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
//   const { currentUser, logout } = useAuth();
//   const router = useRouter();

//   return (
//     <header className="sticky top-0 z-50 flex flex-wrap md:flex-nowrap items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 gap-2">
//       <div className="flex items-center flex-wrap gap-2 md:gap-6">
//         <h1
//           className="text-lg md:text-xl font-bold text-emerald-500 cursor-pointer mr-2"
//           onClick={() => router.push(currentUser ? '/dashboard' : '/')}
//         >
//           MyWallet
//         </h1>
//         {currentUser && (
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="text-slate-300 hover:text-emerald-400 text-xs md:text-sm font-medium transition"
//           >
//             Dashboard
//           </button>
//         )}
//         {currentUser && (
//           <button
//             onClick={() => router.push('/budgets')}
//             className="text-slate-300 hover:text-emerald-400 text-xs md:text-sm font-medium transition"
//           >
//             Budgets
//           </button>
//         )}
//         <button
//           onClick={() => router.push('/about')}
//           className="text-slate-300 hover:text-emerald-400 text-xs md:text-sm font-medium transition"
//         >
//           About
//         </button>
//         <button
//           onClick={() => router.push('/contact')}
//           className="text-slate-300 hover:text-emerald-400 text-xs md:text-sm font-medium transition"
//         >
//           Contact
//         </button>
//       </div>
//       <div className="flex items-center space-x-2 md:space-x-4">
//         {currentUser ? (
//           <>
//             <span className="text-slate-200 text-xs md:text-sm hidden sm:inline">{currentUser.name}</span>
//             <button
//               onClick={() => {
//                 logout();
//                 router.replace('/login');
//               }}
//               className="px-2 py-1 md:px-3 md:py-1 bg-emerald-500 text-slate-900 rounded hover:bg-emerald-600 transition text-xs md:text-sm"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => router.push('/login')}
//               className="px-2 py-1 bg-slate-600 text-slate-50 rounded hover:bg-slate-500 transition text-xs"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => router.push('/register')}
//               className="px-2 py-1 bg-slate-600 text-slate-50 rounded hover:bg-slate-500 transition text-xs"
//             >
//               Register
//             </button>
//           </>
//         )}
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Menu, X, LayoutDashboard, PiggyBank } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const publicLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const privateLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Budgets", href: "/budgets", icon: PiggyBank },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const links = currentUser ? privateLinks : publicLinks;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => router.push(currentUser ? "/dashboard" : "/")}
          className="flex items-center gap-2 group"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
            <Wallet size={17} className="text-slate-950" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            MyWallet
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => router.push(l.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {l.label}
              {pathname === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-emerald-400"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {currentUser ? (
            <>
              <span className="text-sm text-slate-400">
                Hi,{" "}
                <span className="text-slate-100 font-medium">
                  {currentUser.name?.split(" ")[0]}
                </span>
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  logout();
                  router.replace("/login");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => router.push("/register")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        <button
          className="text-slate-200 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => {
                    router.push(l.href);
                    setMobileOpen(false);
                  }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </button>
              ))}
              <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
                {currentUser ? (
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      logout();
                      router.replace("/login");
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button
                      className="w-full"
                      variant="ghost"
                      onClick={() => router.push("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full"
                      variant="primary"
                      onClick={() => router.push("/register")}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}