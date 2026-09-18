# REVISI RUSH 🎨🎉

Kado ulang tahun buat **Tama** — sebuah mini-game kecil yang bisa dia mainin langsung dari browser (HP atau laptop), nggak perlu install apa-apa.

Ceritanya: Tama (graphic designer) harus nangkep ide, kopi, dan love — sambil ngehindarin "REVISI LAGI!", deadline, dan drama client. Abis game over, ada pesan-pesan ulang tahun (gaya story/wrapped) dan penutup manis dari kamu.

Dibuat pakai HTML/CSS/JS biasa (tanpa framework, tanpa build step), jadi gampang banget di-deploy ke **Vercel**.

---

## 🚀 Cara deploy ke Vercel (gampang, ga perlu ngoding)

**Opsi paling gampang — lewat website Vercel:**

1. Push folder ini ke GitHub (kalau kamu baca ini dari repo GitHub, berarti udah beres ✅).
2. Buka [vercel.com](https://vercel.com) → sign up / login pakai akun GitHub kamu.
3. Klik **"Add New..." → "Project"**.
4. Pilih repo `birthday_boyfriend_game` ini dari list.
5. Vercel bakal otomatis detect ini static site (Framework Preset: **Other**). Kamu **nggak perlu ubah setting apa-apa** — langsung klik **Deploy**.
6. Tunggu ~30 detik, nanti kamu dapet link kayak `birthday-boyfriend-game.vercel.app`.
7. Kirim link itu ke Tama pas hari-H! 🎂

**Opsi lain — pakai Vercel CLI** (kalau kamu nyaman pakai terminal):

```bash
npm i -g vercel
cd birthday_boyfriend_game
vercel --prod
```

Itu aja. Nggak ada `npm install`, nggak ada database, nggak ada API key.

---

## ✏️ Cara edit pesan / nama / konten

Semua teks yang perlu di-personalisasi ada di **satu tempat**: buka file `game.js`, paling atas ada blok `CONFIG = { ... }`.

Yang bisa kamu ubah:

| Bagian | Fungsinya |
|---|---|
| `playerName` | Nama yang muncul di judul & pesan (default: `"Tama"`) |
| `fromName` | Nama kamu di penutup (default: `"Shafilah"`) |
| `introSubtitle` | Kalimat di layar pembuka |
| `messages` | Array kartu-kartu pesan (gaya "wrapped") — tambah/hapus/edit sesukanya, tiap kartu punya `emoji`, `title`, `text` |
| `finaleMessage` | Pesan panjang di layar terakhir sebelum "Main Lagi" |
| `goodItems` / `badItems` | Emoji yang jatuh di game (item bagus untuk ditangkap vs item buruk untuk dihindari) |
| `playerEmoji` | Emoji karakter yang dikontrol pemain |

Setelah edit, tinggal simpan file-nya. Kalau sudah di-deploy ke Vercel dan repo-nya kamu push ulang ke GitHub, Vercel bakal otomatis redeploy dengan perubahan terbaru.

**Contoh edit pesan:**

```js
messages: [
  {
    emoji: "🎉",
    title: "Woy, Tama!",
    text: "Ganti kalimat ini sesuka kamu...",
  },
  // tambah kartu baru di sini
],
```

---

## 🕹️ Cara main (buat kamu tes duluan)

- **Drag / geser** layar (atau tombol panah kiri-kanan / A-D di keyboard) buat gerakin karakter.
- Tangkep item bagus (🎨☕💡⭐✅❤️) buat nambah skor & combo.
- Hindarin item buruk (📢⏰🙄🐌) — kena 3x, game over.
- Abis game over → lanjut ke kartu-kartu pesan ulang tahun → penutup dengan confetti.
- Skor terbaik kesimpen otomatis di browser (localStorage), jadi Tama bisa coba ngalahin skor sendiri.

## 🧪 Cara coba di komputer sendiri sebelum deploy

Nggak perlu install apapun — buka terminal di folder ini lalu jalankan salah satu:

```bash
python3 -m http.server 8000
# atau
npx serve .
```

Terus buka `http://localhost:8000` di browser.

---

Selamat ulang tahun, Tama! 🎂
