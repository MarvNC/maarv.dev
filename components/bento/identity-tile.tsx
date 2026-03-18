import { motion, useReducedMotion } from "framer-motion";

export function IdentityTile() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mb-3 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-sky-100/95 bg-[linear-gradient(155deg,rgba(255,255,255,0.99),rgba(242,249,255,0.95))] px-6 py-7 shadow-[0_20px_46px_-24px_rgba(58,176,255,0.34)] ring-1 ring-white/90 sm:px-8 sm:py-9"
    >
      <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8 sm:text-left">
        <img
          src="https://github.com/MarvNC.png?size=400"
          alt="MarvNC GitHub profile"
          loading="eager"
          className="shrink-0 h-24 w-24 rounded-full ring-4 ring-white/80 shadow-lg sm:h-28 sm:w-28"
        />
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-xs font-semibold uppercase tracking-wider text-secondary/80">MarvNC</p>
          <h1 className="mt-1.5 font-display text-3xl font-black tracking-tight text-primary sm:text-4xl">
            I like making stuff.
          </h1>
          <p className="mt-3 max-w-lg font-body text-base font-medium leading-relaxed text-secondary/90">
            Building open-source tools for language learning, gaming, and productivity. Passionate about well-crafted
            interfaces and resilient systems.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-secondary sm:justify-start">
            <a
              href="https://github.com/MarvNC"
              target="_blank"
              rel="noreferrer"
              className="rounded transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
            >
              ↗ GitHub
            </a>
            <span className="text-secondary/30">·</span>
            <a
              href="mailto:contact@maarv.dev"
              className="rounded transition-colors hover:text-primary hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
            >
              ✉ Email
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
