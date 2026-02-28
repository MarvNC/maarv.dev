import { motion, useReducedMotion } from "framer-motion";

export function IdentityTile() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mb-3 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/72 px-6 py-7 text-center shadow-[0_24px_60px_-28px_rgba(15,23,42,0.4)] backdrop-blur-xl sm:px-8 sm:py-9"
    >
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand/12 to-transparent" aria-hidden="true" />
      <img
        src="https://github.com/MarvNC.png?size=400"
        alt="MarvNC GitHub profile"
        loading="eager"
        className="relative mx-auto h-20 w-20 rounded-2xl ring-4 ring-white/80 shadow-lg sm:h-24 sm:w-24"
      />
      <p className="relative mt-3 text-xs font-extrabold uppercase tracking-[0.2em] text-secondary/90">MarvNC</p>
      <h1 className="relative mt-3 font-display text-3xl font-black tracking-tight text-primary sm:text-4xl">
        I like making stuff.
      </h1>
      <a
        href="https://github.com/MarvNC"
        target="_blank"
        rel="noreferrer"
        className="relative mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
      >
        GitHub
      </a>
    </motion.header>
  );
}
