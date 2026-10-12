# ZeroEgress Portal

> **Air-Gapped File Utilities. Running Locally on Your Machine.**  
> Convert, merge, sanitize, and process gigabyte files with zero server uploads and zero subscriptions.

Official marketing and fast binary download portal for **ZeroEgress** desktop and mobile native distributions.

🌐 **Live Web App**: [https://zero-egress.vercel.app/](https://zero-egress.vercel.app/)

---

## ⚡ Core Philosophy & Architecture

- **Clean, Utilitarian Developer Design**: High-contrast dark mode (`#09090b`), zinc borders, and Geist typography inspired by Linear, Raycast, and Cursor.
- **Dynamic OS Detection**: Automatically identifies user OS (Windows, macOS Apple Silicon / Intel, Linux, Android) and presents the optimal native distribution binary.
- **Air-Gapped Telemetry Verification**: Zero sockets opened, zero analytics SDKs, zero cloud retention risk.
- **Release & Checksums Matrix**: Tabbed, searchable distribution catalog with one-click SHA-256 hash copying and verification snippets for PowerShell, `shasum`, and GPG.
- **Future License Store**: Integrated checkout hook and local Ed25519 asymmetric cryptographic license key verification.

---

## 🛠 Tech Stack

- **Framework**: [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v20+` or `v24+`
- npm `v10+`

### Installation

```bash
# Clone the repository
git clone https://github.com/Arka-124/ZeroEgress-Portal.git
cd ZeroEgress-Portal

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Typecheck and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

### Linting

```bash
npm run lint
```

---

## 📦 Supported Distribution Targets

| Platform | Architecture | Package Format | Approximate Size |
| :--- | :--- | :--- | :--- |
| **Windows** | x86_64 | `.exe` (Setup) & `.msi` (Enterprise) | ~14.2 MB |
| **macOS** | Apple Silicon (M1–M4) | `.dmg` | ~13.6 MB |
| **macOS** | Intel x86_64 | `.dmg` | ~15.1 MB |
| **Linux** | x86_64 | `.AppImage` (Universal) & `.deb` | ~12.9–16.4 MB |
| **Android** | Universal ARM64/x86 | `.apk` | ~11.8 MB |

---

## 📄 License

Apache 2.0 / Commercial EULA. See portal footer for licensing terms.
