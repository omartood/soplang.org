export type PlatformId = "windows" | "macos" | "linux";

export type InstallMethod = {
  name: string;
  description: string;
  command: string;
};

export type Platform = {
  id: PlatformId;
  name: string;
  icon: string;
  requirements: string[];
  // Release assets whose file name matches are offered as manual downloads.
  assetPattern: RegExp;
  install: InstallMethod[];
};

const cargoInstall: InstallMethod = {
  name: "Cargo",
  description: "Builds the newest compiler from source. Needs the Rust toolchain from rustup.rs.",
  command: "cargo install --git https://github.com/soplang/soplang",
};

const docker: InstallMethod = {
  name: "Docker",
  description: "Runs Soplang in a container, with nothing else to install.",
  command: `docker run -it --rm soplang/soplang

# Run a file from the current folder
docker run -it --rm -v "$PWD":/scripts soplang/soplang hello.sop`,
};

export const platforms: Platform[] = [
  {
    id: "windows",
    name: "Windows",
    icon: "fa6-brands:windows",
    requirements: ["Windows 10 or 11, 64-bit"],
    assetPattern: /(\.exe|\.msi|windows|win64)/i,
    install: [
      {
        name: "winget",
        description: "Installs the stable release with the Windows Package Manager.",
        command: "winget install Soplang.Soplang",
      },
      cargoInstall,
      {
        ...docker,
        command: `docker run -it --rm soplang/soplang

# Run a file from the current folder (PowerShell)
docker run -it --rm -v "\${PWD}:/scripts" soplang/soplang hello.sop`,
      },
    ],
  },
  {
    id: "macos",
    name: "macOS",
    icon: "fa6-brands:apple",
    requirements: ["Apple silicon or Intel"],
    assetPattern: /(\.dmg|\.pkg|macos|darwin|apple)/i,
    install: [cargoInstall, docker],
  },
  {
    id: "linux",
    name: "Linux",
    icon: "fa6-brands:linux",
    requirements: ["x86_64 or arm64"],
    assetPattern: /(\.deb|\.rpm|\.appimage|linux)/i,
    install: [cargoInstall, docker],
  },
];
