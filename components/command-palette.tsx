"use client";

import { useEffect, useRef } from "react";

type CommandPaletteProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CommandPalette({ value, onChange }: CommandPaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isPaletteShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isPaletteShortcut || event.key === "/") {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        onChange("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onChange]);

  return (
    <div className="pointer-events-none fixed left-1/2 top-4 z-40 w-full max-w-3xl -translate-x-1/2 px-4 sm:top-6">
      <div className="pointer-events-auto relative">
        <input
          ref={inputRef}
          aria-label="Search projects"
          placeholder="Type to magnetize projects..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-full border border-sky-100 bg-white/85 px-6 py-4 text-lg font-bold tracking-wide text-primary shadow-float backdrop-blur-xl outline-none transition focus:border-brand focus:shadow-glow"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-secondary">
          Cmd/Ctrl + K
        </kbd>
      </div>
    </div>
  );
}
