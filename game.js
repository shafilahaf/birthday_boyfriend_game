/* =========================================================
   TBH: TASK BAR HERO — a tiny RPG birthday quest for Tama.

   ============ WANNA EDIT THE WORDS? START HERE ============
   Everything you'd want to personalize lives in CONFIG below.
   Change the text, save, refresh the page (or redeploy) — done.
   No coding knowledge needed past this block. 💌
   ========================================================= */

const CONFIG = {
  playerName: "Tama",
  fromName: "Shafilah",

  // Shown on the very first screen.
  introSubtitle: "buat kamu yang paling jago bikin orang lain “acc” cuma dari satu draft 🎨",

  playerEmoji: "🧑‍🎨",

  // Default falling items for "catch" levels. A level can override
  // with its own goodItems / badItems array of { emoji }.
  goodItemsDefault: [
    { emoji: "🎨" }, { emoji: "💡" }, { emoji: "☕" },
    { emoji: "⭐" }, { emoji: "✅" }, { emoji: "❤️" },
  ],
  badItemsDefault: [
    { emoji: "📢" }, { emoji: "⏰" }, { emoji: "🙄" }, { emoji: "🐌" },
  ],

  goodFloaterWords: ["GASKEUN!", "MANTAP!", "SAT SET!", "ACC!", "BASED.", "SIKAT!", "CRITICAL HIT!"],
  badFloaterWords: ["YAH ANJAY 😩", "REVISI MULU!", "ELAH...", "KENA DEH", "MELESET!"],

  // The 5 boss levels of the quest. Add/remove/edit freely — the
  // engine below adapts automatically to however many you list.
  //
  // type: "catch"  → drag to catch good items, avoid bad ones, reach targetHits.
  // type: "dodge"  → survive `duration` seconds, avoid bad items (occasional shield heals).
  // type: "qte"    → tap / press Space when the marker is in the green zone, reach targetHits.
  levels: [
    {
      name: "Sang Kanvas Kosong",
      emoji: "🖼️",
      flavor: "Musuh pertama tiap designer: rasa parno liat file baru yang masih putih polos.",
      objective: "Tangkep 10 percikan ide sebelum kehabisan 3 nyawa.",
      defeatLine: "Kanvas kosongnya menang dulu. Sat set lagi, jangan overthinking!",
      type: "catch",
      targetHits: 10,
      maxMisses: 3,
      speedMul: 1,
      reward: { xp: 100, item: "🖌️ Kuas Ajaib" },
    },
    {
      name: "Revisimon, Raja Revisi",
      emoji: "👹",
      flavor: "Makin jago lo, makin sering dia muncul sambil bilang “direvisi dikit ya, gampang kok”.",
      objective: "Bertahan 18 detik dari serangan revisi. Tangkep 🛡️ buat mulihin nyawa.",
      defeatLine: "Revisinya kebanyakan. Tarik napas, terus gaskeun lagi.",
      type: "dodge",
      duration: 18,
      maxMisses: 4,
      speedMul: 1.15,
      goodItems: [{ emoji: "🛡️" }],
      badItems: [{ emoji: "📢" }, { emoji: "😤" }, { emoji: "💢" }, { emoji: "🗯️" }],
      reward: { xp: 150, item: "🛡️ Perisai Anti-Baper" },
    },
    {
      name: "Deadline Dragon",
      emoji: "🐉",
      flavor: "Muncul tiap H-1, dan makin gede tiap lo bilang “bentar lagi kelar kok”.",
      objective: "Timing serangan pas di zona hijau. Kena 8x sebelum meleset 4x.",
      defeatLine: "Dragon-nya masih berdiri. Fokusin timing, jangan buru-buru!",
      type: "qte",
      targetHits: 8,
      maxMisses: 4,
      speedMul: 1.2,
      qteZoneWidth: 0.22,
      reward: { xp: 200, item: "⌛ Jam Pasir Ajaib" },
    },
    {
      name: "Font Goblin",
      emoji: "👺",
      flavor: "Suka nyolong waktu yang harusnya buat kerja, abis itu dipake milih font doang.",
      objective: "Tangkep 14 ide — dia jatuhnya lebih cepet dari biasa.",
      defeatLine: "Goblin-nya licin banget. Fokus di gerakan kamu, jangan panik.",
      type: "catch",
      targetHits: 14,
      maxMisses: 3,
      speedMul: 1.45,
      reward: { xp: 250, item: "🔤 Font Legendaris" },
    },
    {
      name: "The Impossible Client",
      emoji: "🤡",
      flavor: "“Simple tapi mewah, modern tapi klasik, tolong logonya keliatan pas dijadiin ring HP.”",
      objective: "Final boss. Kena zona hijau 10x sebelum meleset 3x — zonanya lebih sempit & cepet.",
      defeatLine: "Client-nya belum puas. Satu lagi, kamu pasti bisa!",
      type: "qte",
      targetHits: 10,
      maxMisses: 3,
      speedMul: 1.5,
      qteZoneWidth: 0.16,
      reward: { xp: 500, item: "👑 Mahkota Designer Sejati" },
    },
  ],

  // The "Wrapped"-style cards shown after the quest, before the finale.
  messages: [
    {
      emoji: "🎉",
      title: "Woy, Tama!",
      text: "Sebelum lanjut scroll — ini bukan iklan, ini kado. Selamat ulang tahun, sayang. 🥹",
    },
    {
      emoji: "🎨",
      title: "Real talk",
      text: "Kamu itu designer yang revisinya dikit tapi hasilnya selalu di atas ekspektasi. Klien beruntung. Aku lebih beruntung.",
    },
    {
      emoji: "☕",
      title: "PSA",
      text: "Tolong minum air putih, tidur yang cukup, dan berhenti begadang cuma buat “ngulik dikit lagi”. Sekali ini aja dengerin aku. 😅",
    },
    {
      emoji: "🫶",
      title: "Btw",
      text: "Makasih udah selalu jadi tempat healing paling nyaman, paling sabar, dan paling lucu (kadang nyebelin, tapi lucu). I love you banget.",
    },
    {
      emoji: "💞",
      title: "Last one, janji",
      text: "Semoga umur baru ini bawa lebih banyak project impian, healing yang worth it, dan kita yang makin solid. Happy birthday, Tama!",
    },
  ],

  // Big closing message on the very last screen.
  finaleMessage:
    "makasih udah jadi Tama yang itu-itu aja tapi selalu ningkatin diri — semoga tahun ini makin banyak project keren, makin sehat, dan makin sayang sama aku (wajib). 🥹💖",
};

/* ========================================================= */
/* From here down is game engine code. */
/* ========================================================= */

(() => {
  "use strict";

  const STORAGE_PROGRESS = "tbh_progress";
  const STORAGE_MUTE = "tbh_muted";

  const el = (id) => document.getElementById(id);

  const screens = {
    start: el("screen-start"),
    howto: el("screen-howto"),
    map: el("screen-map"),
    levelIntro: el("screen-level-intro"),
    game: el("screen-game"),
    levelResult: el("screen-level-result"),
    questComplete: el("screen-quest-complete"),
    messages: el("screen-messages"),
    finale: el("screen-finale"),
  };

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  /* ---------------- progress persistence ---------------- */

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.completedCount === "number") return parsed;
      }
    } catch (e) { /* corrupt/unavailable storage, start fresh */ }
    return { completedCount: 0, totalXP: 0, inventory: [] };
  }
  function saveProgress() {
    try { localStorage.setItem(STORAGE_PROGRESS, JSON.stringify(progress)); } catch (e) { /* ignore */ }
  }
  function resetProgress() {
    progress = { completedCount: 0, totalXP: 0, inventory: [] };
    saveProgress();
  }

  let progress = loadProgress();

  function isMuted() { return localStorage.getItem(STORAGE_MUTE) === "1"; }
  function setMuted(v) { localStorage.setItem(STORAGE_MUTE, v ? "1" : "0"); }

  /* ---------------- audio (tiny WebAudio blips, no assets) ---------------- */

  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  }

  function beep(freq, duration, type, gainPeak) {
    if (isMuted() || !audioCtx) return;
    const t0 = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(gainPeak || 0.15, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  function sfxCatchGood(comboLevel) { beep(520 + Math.min(comboLevel, 8) * 40, 0.14, "triangle", 0.12); }
  function sfxCatchBad() { beep(140, 0.28, "sawtooth", 0.14); }
  function sfxWhoosh() { beep(300, 0.08, "sine", 0.05); }
  function sfxVictory() { beep(660, 0.35, "triangle", 0.14); }

  /* ---------------- mute button ---------------- */

  const btnMute = el("btn-mute");
  function refreshMuteBtn() { btnMute.textContent = isMuted() ? "🔇" : "🔊"; }
  btnMute.addEventListener("click", () => { setMuted(!isMuted()); refreshMuteBtn(); });
  refreshMuteBtn();

  /* ---------------- floaters (score popups) ---------------- */

  const floatersEl = el("floaters");
  function spawnFloater(x, y, text, bad) {
    const span = document.createElement("span");
    span.className = "floater" + (bad ? " bad" : "");
    span.textContent = text;
    span.style.left = x + "px";
    span.style.top = y + "px";
    floatersEl.appendChild(span);
    setTimeout(() => span.remove(), 950);
  }

  /* ================= CANVAS ENGINE ================= */

  const canvas = el("game-canvas");
  const ctx = canvas.getContext("2d");

  let cssW = 0, cssH = 0;

  function groundY() { return cssH - 74; }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    cssW = Math.max(1, rect.width);
    cssH = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    player.y = groundY();
  }
  window.addEventListener("resize", () => {
    if (screens.game.classList.contains("active")) resizeCanvas();
  });

  function roundRectPath(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  const player = { x: 0, y: 0, r: 26, targetX: 0 };

  let items = [];
  let particles = [];
  let running = false;
  let shakeTime = 0;
  let flashTime = 0;
  let rafId = null;
  let lastT = 0;
  let spawnTimer = 0;
  let currentLevel = null;
  let selectedLevelIndex = 0;
  let currentIsReplay = false;

  let chal = {
    type: "catch", hitsLanded: 0, misses: 0, elapsed: 0,
    targetHits: 1, maxMisses: 3, duration: 0, speedMul: 1,
    zoneStart: 0.4, zoneWidth: 0.22, cooldown: 0, markerPhase: 0, goodRatio: 0.68,
  };

  function updateHud() {
    let ratio, label;
    if (chal.type === "dodge") {
      ratio = chal.duration ? chal.elapsed / chal.duration : 0;
      label = Math.max(0, Math.ceil(chal.duration - chal.elapsed)) + "s";
    } else {
      ratio = chal.targetHits ? chal.hitsLanded / chal.targetHits : 0;
      label = chal.hitsLanded + "/" + chal.targetHits;
    }
    ratio = Math.max(0, Math.min(1, ratio));
    el("boss-hp-fill").style.width = (ratio * 100) + "%";
    el("boss-hp-label").textContent = label;
    renderLivesHud();
  }

  function renderLivesHud() {
    const container = el("hud-lives");
    const max = chal.maxMisses;
    if (container.childElementCount !== max) {
      container.innerHTML = "";
      for (let i = 0; i < max; i++) {
        const span = document.createElement("span");
        span.className = "life";
        span.textContent = "❤️";
        container.appendChild(span);
      }
    }
    Array.from(container.children).forEach((s, i) => s.classList.toggle("lost", i < chal.misses));
  }

  function spawnItem() {
    const isGood = Math.random() < chal.goodRatio;
    const pool = isGood
      ? (currentLevel.goodItems || CONFIG.goodItemsDefault)
      : (currentLevel.badItems || CONFIG.badItemsDefault);
    const data = pool[(Math.random() * pool.length) | 0];
    const r = 20;
    const x = r + Math.random() * (cssW - r * 2);
    const speedBase = (130 + Math.min(chal.elapsed * 4.2, 170)) * chal.speedMul;
    items.push({
      x, y: -r, r,
      vy: speedBase + Math.random() * 40,
      emoji: data.emoji,
      good: isGood,
      rot: (Math.random() - 0.5) * 0.4,
      vrot: (Math.random() - 0.5) * 1.2,
    });
  }

  function spawnParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 120;
      particles.push({
        x, y,
        vx: Math.cos(a) * speed,
        vy: Math.sin(a) * speed,
        life: 0.5 + Math.random() * 0.3,
        age: 0,
        color,
        size: 3 + Math.random() * 3,
      });
    }
  }

  function canvasToPage(x, y) {
    const rect = canvas.getBoundingClientRect();
    return { x: rect.left + x, y: rect.top + y };
  }

  function onItemCaught(item) {
    if (item.good) {
      spawnParticles(item.x, item.y, "#ff5fa2", 14);
      const p = canvasToPage(item.x, item.y - 10);
      if (chal.type === "dodge") {
        chal.misses = Math.max(0, chal.misses - 1);
        sfxCatchGood(1);
        spawnFloater(p.x, p.y, "HEAL! 💚", false);
      } else {
        chal.hitsLanded++;
        sfxCatchGood(chal.hitsLanded);
        const word = CONFIG.goodFloaterWords[(Math.random() * CONFIG.goodFloaterWords.length) | 0];
        spawnFloater(p.x, p.y, word, false);
      }
      updateHud();
      if (chal.type !== "dodge" && chal.hitsLanded >= chal.targetHits) {
        setTimeout(() => onLevelVictory(), 150);
      }
    } else {
      chal.misses++;
      sfxCatchBad();
      spawnParticles(item.x, item.y, "#4a3a55", 10);
      shakeTime = 0.28;
      flashTime = 0.22;
      const p = canvasToPage(item.x, item.y - 10);
      const word = CONFIG.badFloaterWords[(Math.random() * CONFIG.badFloaterWords.length) | 0];
      spawnFloater(p.x, p.y, word, true);
      if (navigator.vibrate) navigator.vibrate(60);
      updateHud();
      if (chal.misses >= chal.maxMisses) {
        setTimeout(() => onLevelDefeat(), 260);
      }
    }
  }

  function drawPlayfieldBg() {
    ctx.clearRect(0, 0, cssW, cssH);
    ctx.save();
    roundRectPath(ctx, 0, 0, cssW, cssH, 22);
    ctx.fillStyle = "rgba(255, 248, 251, 0.94)";
    ctx.fill();
    ctx.restore();
  }

  function drawGroundLine() {
    ctx.save();
    ctx.strokeStyle = "rgba(26,16,37,0.08)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 10]);
    ctx.beginPath();
    ctx.moveTo(16, cssH - 70);
    ctx.lineTo(cssW - 16, cssH - 70);
    ctx.stroke();
    ctx.restore();
  }

  function drawPlayer() {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.font = "40px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.18)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    ctx.fillText(CONFIG.playerEmoji, 0, 0);
    ctx.restore();
  }

  function drawItem(it) {
    ctx.save();
    ctx.translate(it.x, it.y);
    ctx.rotate(it.rot);
    ctx.beginPath();
    ctx.arc(0, 0, it.r, 0, Math.PI * 2);
    ctx.fillStyle = it.good ? "rgba(255,217,61,0.85)" : "rgba(74,58,85,0.12)";
    ctx.fill();
    if (it.good) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(26,16,37,0.55)";
      ctx.stroke();
    }
    ctx.font = (it.r * 1.5) + "px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(it.emoji, 0, 1);
    ctx.restore();
  }

  function drawParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age += dt;
      if (p.age >= p.life) { particles.splice(i, 1); continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 220 * dt;
      const alpha = 1 - p.age / p.life;
      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function updateCatchDodge(dt) {
    player.x += (player.targetX - player.x) * Math.min(1, dt * 14);
    player.x = Math.max(player.r, Math.min(cssW - player.r, player.x));

    spawnTimer -= dt;
    const base = chal.type === "dodge" ? 0.55 : 0.95;
    const spawnInterval = Math.max(0.32, base - chal.elapsed * 0.012) / chal.speedMul;
    if (spawnTimer <= 0) { spawnItem(); spawnTimer = spawnInterval; }

    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.vy * dt;
      it.rot += it.vrot * dt;
      const dx = it.x - player.x;
      const dy = it.y - player.y;
      if (Math.sqrt(dx * dx + dy * dy) < it.r + player.r * 0.72) {
        items.splice(i, 1);
        onItemCaught(it);
        continue;
      }
      if (it.y - it.r > cssH) items.splice(i, 1);
    }

    if (chal.type === "dodge" && chal.elapsed >= chal.duration) {
      onLevelVictory();
    }
  }

  function drawCatchDodge() {
    drawGroundLine();
    items.forEach(drawItem);
    drawPlayer();
  }

  function randomizeQteZone() {
    const maxStart = 1 - chal.zoneWidth;
    chal.zoneStart = 0.03 + Math.random() * Math.max(0.001, maxStart - 0.06);
  }

  function attemptAttack() {
    if (!running || chal.type !== "qte") return;
    if (chal.cooldown > 0) return;
    chal.cooldown = 0.28;
    const markerPos = (Math.sin(chal.markerPhase) + 1) / 2;
    const inZone = markerPos >= chal.zoneStart && markerPos <= chal.zoneStart + chal.zoneWidth;
    const p = canvasToPage(cssW / 2, cssH * 0.6 - 30);
    if (inZone) {
      chal.hitsLanded++;
      sfxCatchGood(chal.hitsLanded);
      spawnParticles(cssW / 2, cssH * 0.6, "#ff5fa2", 16);
      const word = CONFIG.goodFloaterWords[(Math.random() * CONFIG.goodFloaterWords.length) | 0];
      spawnFloater(p.x, p.y, word, false);
      randomizeQteZone();
      updateHud();
      if (chal.hitsLanded >= chal.targetHits) { onLevelVictory(); return; }
    } else {
      chal.misses++;
      sfxCatchBad();
      shakeTime = 0.2;
      flashTime = 0.16;
      spawnParticles(cssW / 2, cssH * 0.6, "#4a3a55", 8);
      const word = CONFIG.badFloaterWords[(Math.random() * CONFIG.badFloaterWords.length) | 0];
      spawnFloater(p.x, p.y, word, true);
      if (navigator.vibrate) navigator.vibrate(40);
      updateHud();
      if (chal.misses >= chal.maxMisses) { onLevelDefeat(); return; }
    }
  }

  function updateQTE(dt) {
    if (chal.cooldown > 0) chal.cooldown -= dt;
    chal.markerPhase += dt * (1.15 * chal.speedMul);
  }

  function drawQTE() {
    ctx.save();
    ctx.font = "64px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentLevel.emoji, cssW / 2, cssH * 0.3);
    ctx.restore();

    const trackW = Math.min(cssW - 60, 320);
    const trackX = cssW / 2 - trackW / 2;
    const trackY = cssH * 0.6;
    const trackH = 26;

    ctx.save();
    roundRectPath(ctx, trackX, trackY, trackW, trackH, 13);
    ctx.fillStyle = "rgba(26,16,37,0.12)";
    ctx.fill();

    const zoneX = trackX + chal.zoneStart * trackW;
    const zoneW = chal.zoneWidth * trackW;
    roundRectPath(ctx, zoneX, trackY, zoneW, trackH, 13);
    ctx.fillStyle = "rgba(74,222,128,0.85)";
    ctx.fill();

    const markerPos = (Math.sin(chal.markerPhase) + 1) / 2;
    const markerX = trackX + markerPos * trackW;
    ctx.beginPath();
    ctx.moveTo(markerX, trackY - 8);
    ctx.lineTo(markerX - 9, trackY - 24);
    ctx.lineTo(markerX + 9, trackY - 24);
    ctx.closePath();
    ctx.fillStyle = "#1a1025";
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.font = "13px sans-serif";
    ctx.fillStyle = "rgba(26,16,37,0.55)";
    ctx.textAlign = "center";
    ctx.fillText("TAP LAYAR ATAU SPACE PAS DI ZONA HIJAU", cssW / 2, trackY + 48);
    ctx.restore();
  }

  function loop(t) {
    if (!running) return;
    if (!lastT) lastT = t;
    let dt = (t - lastT) / 1000;
    dt = Math.min(dt, 0.05);
    lastT = t;
    chal.elapsed += dt;

    if (chal.type === "qte") updateQTE(dt); else updateCatchDodge(dt);

    if (!running) return;

    updateHud();

    ctx.save();
    if (shakeTime > 0) {
      shakeTime -= dt;
      const mag = 6 * (shakeTime / 0.28);
      ctx.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
    }

    drawPlayfieldBg();
    if (chal.type === "qte") drawQTE(); else drawCatchDodge();
    drawParticles(dt);

    if (flashTime > 0) {
      flashTime -= dt;
      ctx.fillStyle = "rgba(255,45,135," + Math.max(0, flashTime / 0.22 * 0.35) + ")";
      ctx.fillRect(0, 0, cssW, cssH);
    }
    ctx.restore();

    rafId = requestAnimationFrame(loop);
  }

  function beginChallenge(level) {
    resizeCanvas();
    currentLevel = level;
    items = [];
    particles = [];
    shakeTime = 0;
    flashTime = 0;
    spawnTimer = 0;
    player.x = cssW / 2;
    player.targetX = cssW / 2;
    chal = {
      type: level.type,
      hitsLanded: 0,
      misses: 0,
      elapsed: 0,
      targetHits: level.targetHits || 0,
      maxMisses: level.maxMisses,
      duration: level.duration || 0,
      speedMul: level.speedMul || 1,
      zoneStart: 0.4,
      zoneWidth: level.qteZoneWidth || 0.22,
      cooldown: 0,
      markerPhase: 0,
      goodRatio: level.type === "dodge" ? 0.16 : 0.68,
    };
    updateHud();
    running = true;
    lastT = 0;
    rafId = requestAnimationFrame(loop);
  }

  function stopGameLoop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  /* ---------------- input ---------------- */

  function pointerXToPlayer(clientX) {
    const rect = canvas.getBoundingClientRect();
    player.targetX = clientX - rect.left;
  }

  canvas.addEventListener("pointerdown", (e) => {
    ensureAudio();
    if (chal.type === "qte") attemptAttack(); else pointerXToPlayer(e.clientX);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (chal.type === "qte") return;
    if (e.pressure === 0 && e.pointerType === "mouse") return;
    pointerXToPlayer(e.clientX);
  });
  canvas.addEventListener(
    "touchmove",
    (e) => {
      if (chal.type !== "qte" && e.touches[0]) pointerXToPlayer(e.touches[0].clientX);
      e.preventDefault();
    },
    { passive: false }
  );

  const keys = { left: false, right: false };
  window.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "KeyA"].includes(e.code)) keys.left = true;
    if (["ArrowRight", "KeyD"].includes(e.code)) keys.right = true;
    if (e.code === "Space" && screens.game.classList.contains("active")) {
      e.preventDefault();
      ensureAudio();
      attemptAttack();
    }
  });
  window.addEventListener("keyup", (e) => {
    if (["ArrowLeft", "KeyA"].includes(e.code)) keys.left = false;
    if (["ArrowRight", "KeyD"].includes(e.code)) keys.right = false;
  });
  setInterval(() => {
    if (!running || chal.type === "qte") return;
    const speed = 26;
    if (keys.left) player.targetX = Math.max(0, player.targetX - speed);
    if (keys.right) player.targetX = Math.min(cssW, player.targetX + speed);
  }, 16);

  /* ---------------- countdown ---------------- */

  function runCountdown(cb) {
    const overlay = el("countdown-overlay");
    const numEl = el("countdown-number");
    overlay.hidden = false;
    let n = 3;
    numEl.textContent = String(n);
    sfxWhoosh();
    const iv = setInterval(() => {
      n -= 1;
      if (n <= 0) {
        clearInterval(iv);
        overlay.hidden = true;
        cb();
        return;
      }
      numEl.textContent = String(n);
      numEl.style.animation = "none";
      void numEl.offsetWidth;
      numEl.style.animation = "";
      sfxWhoosh();
    }, 700);
  }

  /* ---------------- level flow ---------------- */

  function buildLevelMap() {
    const wrap = el("level-path");
    wrap.innerHTML = "";
    CONFIG.levels.forEach((level, i) => {
      let state = "locked";
      if (i < progress.completedCount) state = "done";
      else if (i === progress.completedCount) state = "current";

      const node = document.createElement("button");
      node.type = "button";
      node.className = "level-node " + state;
      const statusIcon = state === "done" ? "✅" : state === "locked" ? "🔒" : "▶️";
      node.innerHTML =
        '<span class="ln-emoji">' + level.emoji + "</span>" +
        '<span class="ln-info"><span class="ln-num">LEVEL ' + (i + 1) + '</span>' +
        '<span class="ln-name">' + level.name + "</span></span>" +
        '<span class="ln-status">' + statusIcon + "</span>";
      if (state !== "locked") {
        node.addEventListener("click", () => showLevelIntro(i, state === "done"));
      }
      wrap.appendChild(node);
    });
  }

  function showLevelIntro(index, isReplay) {
    selectedLevelIndex = index;
    currentIsReplay = isReplay;
    const level = CONFIG.levels[index];
    el("li-level-label").textContent = "LEVEL " + (index + 1) + " / " + CONFIG.levels.length;
    el("li-boss-emoji").textContent = level.emoji;
    el("li-boss-name").textContent = level.name;
    el("li-flavor").textContent = level.flavor;
    el("li-objective").textContent = level.objective;
    showScreen("levelIntro");
  }

  function startSelectedLevel() {
    const level = CONFIG.levels[selectedLevelIndex];
    el("hud-boss-emoji").textContent = level.emoji;
    el("hud-boss-name").textContent = level.name;
    showScreen("game");
    requestAnimationFrame(() => {
      runCountdown(() => { ensureAudio(); beginChallenge(level); });
    });
  }

  function onLevelVictory() {
    stopGameLoop();
    sfxVictory();
    const level = CONFIG.levels[selectedLevelIndex];
    const isLastLevel = selectedLevelIndex === CONFIG.levels.length - 1;
    let awarded = false;
    if (!currentIsReplay && selectedLevelIndex === progress.completedCount) {
      progress.completedCount += 1;
      progress.totalXP += level.reward.xp;
      progress.inventory.push(level.reward.item);
      saveProgress();
      awarded = true;
    }
    if (isLastLevel && progress.completedCount >= CONFIG.levels.length) {
      showQuestComplete();
    } else {
      showLevelResult(true, level, awarded);
    }
  }

  function onLevelDefeat() {
    stopGameLoop();
    const level = CONFIG.levels[selectedLevelIndex];
    showLevelResult(false, level, false);
  }

  function showLevelResult(victory, level, awarded) {
    el("lr-emoji").textContent = victory ? "🎉" : level.emoji;
    el("lr-eyebrow").textContent = victory ? "VICTORY!" : "BELUM BERHASIL...";
    el("lr-title").textContent = victory ? (level.name + " Kalah!") : ("Ditahan " + level.name);
    el("lr-text").textContent = victory
      ? (awarded ? "Kerja bagus! Kamu dapet loot baru." : "Boss ini emang gampang buat hero kayak kamu. 😎")
      : (level.defeatLine || "Boss ini emang rese. Coba lagi, hero!");
    el("lr-reward").hidden = !awarded;
    if (awarded) {
      el("lr-xp").textContent = "+" + level.reward.xp + " XP";
      el("lr-item").textContent = level.reward.item;
    }
    const isLastLevel = selectedLevelIndex === CONFIG.levels.length - 1;
    el("btn-level-next").hidden = !(victory && !isLastLevel);
    el("btn-level-retry").hidden = victory;
    showScreen("levelResult");
  }

  function showQuestComplete() {
    el("qc-total-xp").textContent = String(progress.totalXP);
    const inv = el("qc-inventory");
    inv.innerHTML = "";
    progress.inventory.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "reward-chip";
      chip.textContent = item;
      inv.appendChild(chip);
    });
    showScreen("questComplete");
  }

  function refreshContinueLine() {
    const line = el("continue-line");
    if (progress.completedCount >= CONFIG.levels.length) {
      line.hidden = false;
      el("continue-value").textContent = "Quest selesai! 🏆";
    } else if (progress.completedCount > 0) {
      line.hidden = false;
      el("continue-value").textContent = "Level " + (progress.completedCount + 1);
    } else {
      line.hidden = true;
    }
  }

  function enterMap() {
    buildLevelMap();
    showScreen("map");
  }

  /* ---------------- wrapped message cards ---------------- */

  const cardWrap = el("wrapped-card-wrap");
  const progressWrap = el("wrapped-progress");
  let msgIndex = 0;
  const AUTO_ADVANCE_MS = 5200;
  let msgTimer = null;

  function buildMessageCards() {
    cardWrap.innerHTML = "";
    progressWrap.innerHTML = "";
    CONFIG.messages.forEach((m, i) => {
      const card = document.createElement("div");
      card.className = "wrapped-card";
      card.innerHTML =
        '<div class="wc-emoji">' + m.emoji + "</div>" +
        '<h3 class="wc-title">' + m.title + "</h3>" +
        '<p class="wc-text">' + m.text + "</p>" +
        '<div class="wc-hint">' + (i + 1) + " / " + CONFIG.messages.length + "</div>";
      cardWrap.appendChild(card);

      const seg = document.createElement("div");
      seg.className = "seg";
      seg.innerHTML = '<div class="seg-fill"></div>';
      progressWrap.appendChild(seg);
    });
  }

  function renderMessageIndex() {
    const cards = cardWrap.querySelectorAll(".wrapped-card");
    const segs = progressWrap.querySelectorAll(".seg");
    cards.forEach((c, i) => c.classList.toggle("active", i === msgIndex));
    segs.forEach((s, i) => {
      s.classList.toggle("done", i < msgIndex);
      const fill = s.querySelector(".seg-fill");
      if (i < msgIndex) {
        fill.style.transition = "none";
        fill.style.width = "100%";
      } else if (i === msgIndex) {
        fill.style.transition = "none";
        fill.style.width = "0%";
        void fill.offsetWidth;
        fill.style.transition = "width " + AUTO_ADVANCE_MS + "ms linear";
        fill.style.width = "100%";
      } else {
        fill.style.transition = "none";
        fill.style.width = "0%";
      }
    });
  }

  function clearMsgTimer() {
    if (msgTimer) clearTimeout(msgTimer);
    msgTimer = null;
  }

  function scheduleAutoAdvance() {
    clearMsgTimer();
    msgTimer = setTimeout(() => nextMessage(), AUTO_ADVANCE_MS);
  }

  function goToMessage(i) {
    if (i < 0) i = 0;
    if (i >= CONFIG.messages.length) {
      clearMsgTimer();
      showFinale();
      return;
    }
    msgIndex = i;
    renderMessageIndex();
    scheduleAutoAdvance();
  }

  function nextMessage() { goToMessage(msgIndex + 1); }
  function prevMessage() { goToMessage(msgIndex - 1); }

  function startMessages() {
    buildMessageCards();
    msgIndex = 0;
    showScreen("messages");
    renderMessageIndex();
    scheduleAutoAdvance();
  }

  el("tap-next").addEventListener("click", nextMessage);
  el("tap-prev").addEventListener("click", prevMessage);

  /* ---------------- confetti finale ---------------- */

  const confettiCanvas = el("confetti-canvas");
  const cctx = confettiCanvas.getContext("2d");
  let confettiPieces = [];
  let confettiRunning = false;
  let confettiRaf = null;
  const CONFETTI_COLORS = ["#ff5fa2", "#9b5cff", "#4fd6ff", "#ffd93d", "#4ade80", "#ff2d87"];

  function resizeConfetti() {
    const rect = confettiCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    confettiCanvas.width = Math.round(rect.width * dpr);
    confettiCanvas.height = Math.round(rect.height * dpr);
    cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    confettiCanvas._w = rect.width;
    confettiCanvas._h = rect.height;
  }
  window.addEventListener("resize", () => {
    if (screens.finale.classList.contains("active")) resizeConfetti();
  });

  function makeConfettiBurst(count) {
    const w = confettiCanvas._w || window.innerWidth;
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: Math.random() * w,
        y: -20 - Math.random() * 200,
        vx: (Math.random() - 0.5) * 60,
        vy: 80 + Math.random() * 120,
        size: 5 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 6,
        color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
        life: 4 + Math.random() * 2,
        age: 0,
      });
    }
  }

  function confettiLoop(t) {
    if (!confettiRunning) return;
    if (!confettiLoop._last) confettiLoop._last = t;
    let dt = (t - confettiLoop._last) / 1000;
    dt = Math.min(dt, 0.05);
    confettiLoop._last = t;

    const w = confettiCanvas._w || 0;
    const h = confettiCanvas._h || 0;
    cctx.clearRect(0, 0, w, h);

    if (Math.random() < 0.06) makeConfettiBurst(3);

    for (let i = confettiPieces.length - 1; i >= 0; i--) {
      const p = confettiPieces[i];
      p.age += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      if (p.age > p.life || p.y > h + 30) { confettiPieces.splice(i, 1); continue; }
      cctx.save();
      cctx.translate(p.x, p.y);
      cctx.rotate(p.rot);
      cctx.fillStyle = p.color;
      cctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      cctx.restore();
    }
    confettiRaf = requestAnimationFrame(confettiLoop);
  }

  function startConfetti() {
    resizeConfetti();
    confettiPieces = [];
    makeConfettiBurst(50);
    confettiRunning = true;
    confettiLoop._last = 0;
    confettiRaf = requestAnimationFrame(confettiLoop);
  }
  function stopConfetti() {
    confettiRunning = false;
    if (confettiRaf) cancelAnimationFrame(confettiRaf);
  }

  function showFinale() {
    showScreen("finale");
    startConfetti();
  }

  /* ---------------- static text injection from CONFIG ---------------- */

  document.querySelectorAll(".title-hero").forEach((h) => {
    h.innerHTML = h.innerHTML.replace(/TAMA/g, CONFIG.playerName.toUpperCase());
  });
  el("finale-message").textContent = CONFIG.finaleMessage;
  el("finale-from").textContent = CONFIG.fromName;
  document.querySelector("#screen-start .subtitle").textContent = CONFIG.introSubtitle;

  /* ---------------- wire up buttons ---------------- */

  el("btn-start").addEventListener("click", () => { ensureAudio(); enterMap(); });
  el("btn-howto").addEventListener("click", () => showScreen("howto"));
  el("btn-howto-back").addEventListener("click", () => showScreen("start"));
  el("btn-howto-start").addEventListener("click", () => { ensureAudio(); enterMap(); });

  el("btn-map-back").addEventListener("click", () => showScreen("start"));
  el("btn-level-intro-back").addEventListener("click", enterMap);
  el("btn-level-start").addEventListener("click", () => { ensureAudio(); startSelectedLevel(); });

  el("btn-level-next").addEventListener("click", () => showLevelIntro(selectedLevelIndex + 1, false));
  el("btn-level-retry").addEventListener("click", () => showLevelIntro(selectedLevelIndex, currentIsReplay));
  el("btn-level-result-map").addEventListener("click", enterMap);

  el("btn-quest-continue").addEventListener("click", startMessages);

  el("btn-replay").addEventListener("click", () => {
    stopConfetti();
    resetProgress();
    refreshContinueLine();
    ensureAudio();
    showScreen("start");
  });

  el("btn-share").addEventListener("click", async () => {
    const text =
      "Aku baru menang quest TBH: Task Bar Hero, kado ulang tahun dari " + CONFIG.fromName +
      "! Total XP: " + progress.totalXP + ". Happy birthday " + CONFIG.playerName + "! 🎉";
    if (navigator.share) {
      try { await navigator.share({ text }); return; } catch (e) { /* user cancelled, fall through */ }
    }
    try {
      await navigator.clipboard.writeText(text);
      const btn = el("btn-share");
      const old = btn.textContent;
      btn.textContent = "kesalin! tempel di mana aja ✨";
      setTimeout(() => (btn.textContent = old), 1800);
    } catch (e) { /* clipboard unavailable, ignore */ }
  });

  /* ---------------- init ---------------- */

  refreshContinueLine();
  showScreen("start");
})();
