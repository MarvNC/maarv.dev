"use client";

import { useEffect, useRef } from "react";

type CommandPaletteProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CommandPalette({ value, onChange }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        return false;
      }

      const tag = target.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || target.isContentEditable;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        onChange("");
        inputRef.current?.blur();
        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      if (event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
        return;
      }

      if (event.key === "Backspace" && value.length > 0) {
        event.preventDefault();
        onChange(value.slice(0, -1));
        inputRef.current?.focus();
        return;
      }

      if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        onChange(value + event.key);
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onChange, value]);

  return (
    <div className="pointer-events-none fixed left-1/2 top-[max(0.75rem,env(safe-area-inset-top))] z-40 w-full max-w-3xl -translate-x-1/2 px-3 sm:top-5 sm:px-4">
      <div className="pointer-events-auto relative flex items-center">
        <input
          ref={inputRef}
          aria-label="Filter projects"
          placeholder="Filter by name, tech, or tag…"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-white/75 bg-white/80 py-3 pl-4 pr-16 text-base font-medium tracking-wide text-primary shadow-float backdrop-blur-xl outline-none transition placeholder:text-secondary/65 focus:border-brand focus:shadow-glow sm:py-3.5 sm:pl-5 sm:pr-20 sm:text-lg"
        />
        <div className="absolute right-3 flex items-center gap-1.5 sm:right-4">
          {value.length > 0 && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                onChange("");
                inputRef.current?.focus();
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100/80 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          {value.length === 0 && (
            <kbd className="hidden h-6 items-center justify-center rounded border border-slate-200 bg-slate-50 px-2 font-sans text-xs font-semibold text-slate-400 sm:flex">
              /
            </kbd>
          )}
        </div>
      </div>
    </div>
  );
}
