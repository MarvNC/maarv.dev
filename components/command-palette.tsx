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
      <div className="pointer-events-auto relative">
        <input
          ref={inputRef}
          aria-label="Search projects"
          placeholder="Search projects or tags..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-2xl border border-white/75 bg-white/80 px-4 py-3 text-base font-bold tracking-wide text-primary shadow-float backdrop-blur-xl outline-none transition placeholder:text-secondary/65 focus:border-brand focus:shadow-glow sm:px-5 sm:py-3.5 sm:text-lg"
        />
      </div>
    </div>
  );
}
