import test from "node:test";
import assert from "node:assert/strict";
import { currentRelease, mapRelease, stableRelease, type ApiRelease } from "../lib/releases";
import { createPlatforms } from "../constants/installData";

const apiRelease: ApiRelease = {
  tag_name: "v3.1.0", name: "Soplang v3.1.0", html_url: "https://github.com/soplang/soplang/releases/tag/v3.1.0",
  published_at: "2026-11-01T00:00:00Z", draft: false, prerelease: false,
  assets: [{ name: "SHA256SUMS", browser_download_url: "https://github.com/soplang/soplang/releases/download/v3.1.0/SHA256SUMS", size: 471, download_count: 7 }],
};

test("stable selection rejects drafts and prereleases and retains working downloads on API failure", () => {
  assert.deepEqual(stableRelease(apiRelease), mapRelease(apiRelease));
  for (const unavailable of [null, { ...apiRelease, draft: true }, { ...apiRelease, prerelease: true }]) {
    const fallback = stableRelease(unavailable);
    assert.equal(fallback.tag, "v3.0.0");
    assert.equal(fallback.assets.length, 6);
    assert.ok(fallback.assets.every((asset) => asset.url.startsWith("https://github.com/soplang/soplang/releases/download/v3.0.0/")));
  }
});

test("every published native package belongs to exactly one platform and checksums are separate", () => {
  const platforms = createPlatforms(currentRelease);
  assert.deepEqual(platforms.map((p) => currentRelease.assets.filter((a) => p.assetPattern.test(a.name)).length), [2, 1, 2]);
  for (const asset of currentRelease.assets) {
    assert.equal(platforms.filter((p) => p.assetPattern.test(asset.name)).length, asset.name === "SHA256SUMS" ? 0 : 1);
  }
  assert.ok(platforms.find((p) => p.id === "linux")?.requirements.includes("glibc 2.39+"));
  assert.ok(platforms.find((p) => p.id === "macos")?.requirements.includes("Apple Silicon (ARM64)"));
});

test("install commands use the displayed release and real package layouts", () => {
  const platforms = createPlatforms(currentRelease);
  const windows = platforms.find((p) => p.id === "windows")!;
  assert.ok(windows.install.some((m) => m.command.includes("\\soplang\\soplang.exe --version")));
  assert.ok(platforms.find((p) => p.id === "linux")!.install.some((m) => m.command.includes("./soplang/soplang --version")));
  assert.ok(platforms.find((p) => p.id === "macos")!.install.some((m) => m.command.includes("./Soplang.app/Contents/MacOS/soplang --version")));
  for (const platform of platforms) {
    const docker = platform.install.find((method) => method.name === "Docker")!;
    assert.ok(docker.command.includes("--platform linux/amd64"));
    assert.ok(docker.command.includes("soplang/soplang:3.0.0"));
    assert.ok(docker.command.includes("/scripts:ro"));
    assert.ok(!platform.install.some((method) => method.name === "winget"));
  }
});
