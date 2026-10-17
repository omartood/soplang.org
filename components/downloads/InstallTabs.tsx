"use client";

import CodeWindow from "@/components/SoplangCodeWindow";
import type { InstallPlatform, PlatformId } from "@/constants/installData";
import { Icon } from "@iconify/react";
import { useState, useSyncExternalStore, type KeyboardEvent } from "react";

function subscribe() { return () => {}; }
function detectPlatform(): PlatformId {
  const agent = navigator.userAgent.toLowerCase();
  if (agent.includes("win")) return "windows";
  if (agent.includes("mac")) return "macos";
  return "linux";
}
function serverPlatform(): PlatformId { return "windows"; }

export function InstallTabs({ platforms }: { platforms: InstallPlatform[] }) {
  const detected = useSyncExternalStore(subscribe, detectPlatform, serverPlatform);
  const [selected, setActive] = useState<PlatformId | null>(null);
  const active = selected ?? detected;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const index = platforms.findIndex((platform) => platform.id === active);
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = platforms[event.key === "Home" ? 0 : platforms.length - 1];
      setActive(next.id);
      document.getElementById(`install-tab-${next.id}`)?.focus();
      return;
    }
    const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (offset === 0) return;

    event.preventDefault();
    const next = platforms[(index + offset + platforms.length) % platforms.length];
    setActive(next.id);
    document.getElementById(`install-tab-${next.id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Operating system" className="flex flex-wrap gap-2">
        {platforms.map((platform) => {
          const isActive = platform.id === active;
          return (
            <button
              key={platform.id}
              id={`install-tab-${platform.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`install-panel-${platform.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(platform.id)}
              onKeyDown={handleKeyDown}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-line text-muted-foreground hover:text-ink"
              }`}
            >
              <Icon icon={platform.icon} className="h-4 w-4" />
              {platform.name}
            </button>
          );
        })}
      </div>

      {platforms.map((platform) => (
        <div
          key={platform.id}
          id={`install-panel-${platform.id}`}
          role="tabpanel"
          aria-labelledby={`install-tab-${platform.id}`}
          hidden={platform.id !== active}
          className="mt-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2"
        >
          {platform.install.map((method) => (
            <div key={method.name} className="panel-sm min-w-0 p-6">
              <h3 className="font-semibold text-ink">{method.name}</h3>
              <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                {method.description}
              </p>
              <CodeWindow code={method.command} title="Terminal" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
