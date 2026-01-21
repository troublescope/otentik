# DramaBox - Streaming Drama Pendek 🎬

Aplikasi streaming drama pendek gratis dengan Progressive Web App (PWA) ready dan dukungan multi-bahasa.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmxwllalpha%2Fdramabox-web)

## ✨ Fitur Lengkap

### 🌍 Multi-Language Support
- **11 Bahasa**: Indonesia, English, Thai, Arabic, Portuguese, French, German, Japanese, Spanish, Chinese Traditional, Chinese Simplified
- **UI Adaptif**: Interface otomatis menyesuaikan dengan bahasa yang dipilih
- **Localized Content**: Konten drama sesuai dengan preferensi bahasa

### 📱 Progressive Web App (PWA)
- **Installable**: Dapat di-install ke home screen (Android/iOS)
- **Offline Ready**: Dapat diakses tanpa koneksi internet
- **Push Notifications**: Notifikasi drama baru dan update
- **App Shortcuts**: Akses cepat ke fitur favorit
- **Service Worker**: Caching otomatis untuk performa optimal

### 🎬 Fitur Utama
- **Beranda (For You)**: Rekomendasi drama yang dipersonalisasi
- **Terbaru**: Drama-drama terbaru yang baru rilis
- **Terpopuler**: Drama trending yang sedang banyak ditonton
- **Sulih Suara**: Drama dengan dubbing bahasa Indonesia
- **Pencarian**: Cari drama berdasarkan judul, pemeran, atau genre
- **Detail Drama**: Informasi lengkap, sinopsis, tag, dan pemeran
- **Video Player**: Streaming dengan navigasi episode yang mudah
- **Lanjutkan Nonton**: Lanjutkan dari episode terakhir ditonton

### 🎨 Mobile UX Experience
- **Bottom Navigation**: Navigasi mobile-friendly
- **Pull to Refresh**: Gesture pull-to-refresh untuk refresh konten
- **Responsive Images**: Loading skeleton dan optimasi gambar
- **Touch-Friendly**: Interface dioptimalkan untuk touch interaction

## 🛠️ Tech Stack

| Teknologi | Deskripsi |
|-----------|-----------|
| **[Next.js 16](https://nextjs.org/)** | React Framework dengan App Router |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe development |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework |
| **[shadcn/ui](https://ui.shadcn.com/)** | High-quality React components |
| **[TanStack Query](https://tanstack.com/query)** | Data fetching dan caching |
| **[Lucide React](https://lucide.dev/)** | Icon library |

## 🚀 Quick Start (One-Click Deploy)

### Deploy ke Vercel

1. Klik tombol **Deploy with Vercel** di atas
2. Connect GitHub account
3. Tambah environment variables:
   ```
   UPSTREAM_API=https://api.megawe.net
   DEFAULT_LANGUAGE=in
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```
4. Klik **Deploy**

Selesai! Aplikasi akan live dalam beberapa menit.

## 📦 Local Development

```bash
# Clone repository
git clone https://github.com/mxwllalpha/dramabox-web.git
cd dramabox-web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 🔧 Environment Variables

Buat file `.env.local` untuk local development:

```bash
# API Base URL
UPSTREAM_API=https://api.megawe.net

# Default Language (in, en, th, ar, pt, fr, de, ja, es, zh, zhHans)
DEFAULT_LANGUAGE=in

# Supported Languages (comma-separated)
SUPPORTED_LANGUAGES=in,en,th,ar,pt,fr,de,ja,es,zh,zhHans

# Site URL (untuk SEO dan metadata)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📁 Struktur Project

```
src/
├── app/                           # Next.js App Router
│   ├── [lang]/                   # Dynamic language routing
│   ├── api/dramabox/             # API Routes (proxy)
│   └── layout.tsx                # Root layout dengan PWA metadata
├── components/                    # React components
│   ├── ui/                       # shadcn/ui components
│   ├── BottomNavigation.tsx      # Mobile bottom nav
│   ├── MobileHeader.tsx          # Mobile-optimized header
│   └── PWAInstallPrompt.tsx      # PWA install banner
├── hooks/                        # Custom hooks
│   ├── useLanguage.ts            # Language context hook
│   ├── useDramas.ts              # Data fetching hooks
│   └── useInstallPrompt.ts       # PWA install hook
├── lib/                          # Utilities
│   ├── sw-registration.ts        # Service Worker registration
│   ├── notifications.ts          # Push notification utilities
│   └── background-sync.ts        # Background sync utilities
├── styles/                       # Global CSS
└── types/                        # TypeScript types
```

## 🔑 Credit & Attribution

**Repository ini dibuat berdasarkan [Slavecode/dramabox](https://github.com/Slavecode/dramabox) dengan perubahan drastis:**

### Perubahan Utama:
- **API Berbeda**: Menggunakan API berbeda (`https://api.megawe.net`) yang support multi-bahasa
- **Multi-Language Support**: Implementasi 11 bahasa dengan dynamic routing
- **PWA Ready**: Service Worker, manifest, offline support, push notifications
- **Mobile UX Optimization**: Bottom navigation, pull-to-refresh, touch-friendly UI
- **Architecture Redesign**: Struktur code yang lebih scalable dengan TypeScript strict mode
- **Performance**: Core Web Vitals monitoring, responsive images, caching strategy

### Original Project:
- **[Slavecode/dramabox](https://github.com/Slavecode/dramabox)** - Base project dan inspiration

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Jalankan development server dengan Turbopack |
| `npm run build` | Build untuk production (webpack) |
| `npm run start` | Jalankan production server |
| `npm run lint` | Jalankan ESLint |
| `npm run type-check` | TypeScript type checking |

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables di Vercel:

```bash
UPSTREAM_API=https://api.megawe.net
DEFAULT_LANGUAGE=in
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## 📱 PWA Installation

### Android (Chrome):
1. Buka aplikasi di Chrome
2. Tap menu (tiga titik) → "Add to Home Screen"
3. Tap "Add"

### iOS (Safari):
1. Buka aplikasi di Safari
2. Tap share button → "Add to Home Screen"
3. Tap "Add"

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Demo**: [dramabox.net](https://dramabox.net)
- **API Base**: [api.megawe.net](https://api.megawe.net)
- **Original Project**: [Slavecode/dramabox](https://github.com/Slavecode/dramabox)

---

Made with ❤️ for drama lovers
