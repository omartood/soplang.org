"use client";

import { features } from "@/constants/FeaturesData";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import CodeWindow from "../SoplangCodeWindow";
import { TerminalWindow } from "./TerminalWindow";

const AUTO_ADVANCE_MS = 7000;

export const Features = () => {
  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Only auto-advance while the section is on screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "-25% 0px -25% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const select = (index: number, focus = false) => {
    const next = (index + features.length) % features.length;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: features.length - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  const isRunning = isInView && !isPaused;

  return (
    <section ref={sectionRef} className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Why Soplang</p>
          <h2 className="type-section mt-3">A language that speaks Somali</h2>
        </div>

        <div
          className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div
            role="tablist"
            aria-label="Soplang features"
            aria-orientation="vertical"
            className="flex flex-wrap gap-2 lg:col-span-4 lg:flex-col lg:gap-1"
          >
            {features.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.title}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`feature-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`feature-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={handleKeyDown}
                  className={`relative overflow-hidden rounded-full border px-4 py-2 text-left text-sm font-semibold transition-colors lg:rounded-2xl lg:border-0 lg:px-5 lg:py-4 ${
                    isActive
                      ? "border-primary bg-primary-soft text-primary lg:bg-surface2"
                      : "border-line text-muted-foreground hover:text-ink lg:hover:bg-surface2/60"
                  }`}
                >
                  <span className="block lg:text-[13px] lg:uppercase lg:tracking-[0.04em]">
                    {item.eyebrow}
                  </span>
                  <span
                    className={`hidden text-[17px] font-semibold tracking-tight lg:mt-1 lg:block ${
                      isActive ? "text-ink" : "text-ink/60"
                    }`}
                  >
                    {item.title}
                  </span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="feature-progress absolute bottom-0 left-0 hidden h-0.5 bg-primary lg:block"
                      style={{
                        animationDuration: `${AUTO_ADVANCE_MS}ms`,
                        animationPlayState: isRunning ? "running" : "paused",
                      }}
                      onAnimationEnd={() => select(active + 1)}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Panels share one grid cell, so the tallest sets the height and a
              switch only crossfades without moving the rest of the page. */}
          <div className="grid min-w-0 lg:col-span-8">
            {features.map((item, index) => {
              const isActive = index === active;
              return (
                <div
                  key={item.title}
                  id={`feature-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`feature-tab-${index}`}
                  inert={!isActive}
                  className={`col-start-1 row-start-1 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0 max-lg:hidden"
                  }`}
                >
                  <h3 className="text-xl font-semibold tracking-tight text-ink lg:hidden">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-ink/70 lg:mt-0">
                    {item.description}
                  </p>
                  {item.terminal ? (
                    <div className="my-4">
                      <TerminalWindow lines={item.terminal} />
                    </div>
                  ) : (
                    <CodeWindow code={item.code ?? ""} title={item.file} />
                  )}
                  <ul className="flex flex-wrap gap-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink/75"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
