# test-fe-myskill
Website portfolio page builder with Next.js

This project is a Website portfolio page builder for FE test on MySkill.

🚀 Tech Stack:
- Next.js – App Router, SSR
- React – Core frontend framework
- Tailwind CSS – Utility-first styling for fast, responsive design
- ShadCN UI – Pre-built, accessible UI components
- DexiteJs - library for IndexedDB
- Zustand – For state management (if applicable)
- TypeScript – Type safety

Dalam referensi design yang diberikan ada beberapa yang saya rubah, seperti:
- Halaman View Profile Page, saya memisahkan section Profile dan Portofolio, karena tidak terlalu berkaitan, Profile tentang data diri sedangkan Portofolio tentang pengalaman kerja.
- Halaman Edit Profile dan Edit Portofolio, karena keduanya tidak saling berkaitan,
  karena saya sebagai user pasti ada case hanya ingin mngubah data Profile saya seperti ganti background image, avatar image, nama ataupun posisi, begitu juga saat hanyan ingin mengubah portofolio, hanya data-data portofolios saja yang diubah

----------------------------------------------------------------------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
