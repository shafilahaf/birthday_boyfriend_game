# TBH: THE BIRTHDAY HERO ⚔️🎉

Kado ulang tahun buat **Tama** — sebuah RPG kecil yang bisa dia mainin langsung dari browser (HP atau laptop), nggak perlu install apa-apa.

Ceritanya: Tama jadi hero yang harus ngalahin **5 boss level** — musuh-musuh receh yang relatable buat siapa aja (mager, moody, FOMO, overthinking), dari **Sang Sloth Mager** sampai **Sang Penjaga Hati**. Tiap boss punya tipe tantangan beda (tangkep, hindar, atau timing-attack), ngasih XP + item pas menang. Abis boss ke-5 kalah, ada peti harta, lalu pesan-pesan ulang tahun (gaya story/wrapped) dan penutup manis dari kamu.

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

## ✏️ Cara edit pesan / nama / level / konten

Semua yang perlu di-personalisasi ada di **satu tempat**: buka file `game.js`, paling atas ada blok `CONFIG = { ... }`.

Yang bisa kamu ubah:

| Bagian | Fungsinya |
|---|---|
| `playerName` | Nama yang muncul di judul & pesan (default: `"Tama"`) |
| `fromName` | Nama kamu di penutup (default: `"Shafilah"`) |
| `introSubtitle` | Kalimat di layar pembuka |
| `levels` | Array 5 boss level — tiap level punya `name`, `emoji`, `flavor`, `objective`, `type` (`catch`/`dodge`/`qte`), parameter kesulitan, dan `reward` (`xp` + `item`) |
| `messages` | Array kartu-kartu pesan (gaya "wrapped") setelah quest kelar — tambah/hapus/edit sesukanya |
| `finaleMessage` | Pesan panjang di layar terakhir sebelum "Main Lagi" |
| `goodItemsDefault` / `badItemsDefault` | Emoji default yang jatuh di level bertipe "catch" (bisa di-override per level) |
| `playerEmoji` | Emoji karakter yang dikontrol pemain |

Setelah edit, tinggal simpan file-nya. Kalau sudah di-deploy ke Vercel dan repo-nya kamu push ulang ke GitHub, Vercel bakal otomatis redeploy dengan perubahan terbaru.

**Contoh nambah/edit level:**

```js
levels: [
  {
    name: "Sang Sloth Mager",
    emoji: "🦥",
    flavor: "Kalimat flavor boss...",
    objective: "Deskripsi misi yang muncul di layar intro level.",
    type: "catch",       // "catch" | "dodge" | "qte"
    targetHits: 10,       // dipakai type catch & qte
    maxMisses: 3,
    speedMul: 1,
    reward: { xp: 100, item: "☀️ Semangat Pagi" },
  },
  // level lain...
],
```

**Contoh edit pesan penutup:**

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

- Ada **5 level**, tiap level lawan 1 boss dengan tipe tantangan beda:
  - **Tangkep** (catch) — drag/geser (atau `←`/`→`, `A`/`D`) buat nangkep item bagus, hindarin item buruk.
  - **Hindar** (dodge) — bertahan sampai waktu habis sambil ngehindarin serangan, sesekali ada item penyembuh.
  - **Serang** (qte) — tap layar / tekan `Space` pas indikator masuk zona hijau.
- Tiap boss kelar dapet XP & item. Kalau nyawa abis sebelum boss kalah, tinggal "Coba Lagi" — nggak balik ke level 1.
- Progress kesimpen otomatis di browser (localStorage), jadi Tama bisa lanjut kapan aja tanpa mulai dari nol.
- Abis boss ke-5 kalah → peti harta (total XP + semua item) → kartu-kartu pesan ulang tahun → penutup dengan confetti.

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
