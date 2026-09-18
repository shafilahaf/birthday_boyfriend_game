/* =========================================================
   REVISI RUSH — a tiny birthday game made for Tama.

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

  // The "Wrapped"-style cards shown after the game, before the finale.
  // Add, remove, or edit as many as you want.
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

  // Good things to catch (score + combo).
  goodItems: [
    { emoji: "🎨", points: 10 },
    { emoji: "💡", points: 10 },
    { emoji: "☕", points: 10 },
    { emoji: "⭐", points: 15 },
    { emoji: "✅", points: 20 },
    { emoji: "❤️", points: 25 },
  ],

  // Bad things to dodge (lose a life on contact).
  badItems: [
    { emoji: "📢" },
    { emoji: "⏰" },
    { emoji: "🙄" },
    { emoji: "🐌" },
  ],

  playerEmoji: "🧑‍🎨",
  startLives: 3,

  goodFloaterWords: ["GASKEUN!", "MANTAP!", "SAT SET!", "ACC!", "BASED.", "SIKAT!"],
  badFloaterWords: ["YAH ANJAY 😩", "REVISI MULU!", "ELAH...", "KENA DEH"],
};

/* ========================================================= */
/* From here down is game engine code. */
/* ========================================================= */

(() => {
  "use strict";

  const STORAGE_BEST = "revisirush_bestscore";
  const STORAGE_MUTE = "revisirush_muted";

  const el = (id) => document.getElementById(id);

  const screens = {
    start: el("screen-start"),
    howto: el("screen-howto"),
    game: el("screen-game"),
    gameover: el("screen-gameover"),
    messages: el("screen-messages"),
    finale: el("screen-finale"),
  };

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
  }

  function getBest() {
    return parseInt(localStorage.getItem(STORAGE_BEST) || "0", 10);
  }
  function setBest(v) {
    localStorage.setItem(STORAGE_BEST, String(v));
  }
  function isMuted() {
    return localStorage.getItem(STORAGE_MUTE) === "1";
  }
  function setMuted(v) {
    localStorage.setItem(STORAGE_MUTE, v ? "1" : "0");
  }

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

  function sfxCatchGood(comboLevel) {
    beep(520 + Math.min(comboLevel, 8) * 40, 0.14, "triangle", 0.12);
  }
  function sfxCatchBad() {
    beep(140, 0.28, "sawtooth", 0.14);
  }
  function sfxWhoosh() {
    beep(300, 0.08, "sine", 0.05);
  }

  /* ---------------- mute button ---------------- */

  const btnMute = el("btn-mute");
  function refreshMuteBtn() {
    btnMute.textContent = isMuted() ? "🔇" : "🔊";
  }
  btnMute.addEventListener("click", () => {
    setMuted(!isMuted());
    refreshMuteBtn();
  });
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

  /* ================= GAME ENGINE ================= */

  const canvas = el("game-canvas");
  const ctx = canvas.getContext("2d");

  let cssW = 0, cssH = 0;

  function groundY() {
    return cssH - 74;
  }

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

  const player = { x: 0, y: 0, r: 26, targetX: 0 };

  let items = [];
  let particles = [];
  let score = 0;
  let combo = 0;
  let comboTimer = 0;
  let lives = CONFIG.startLives;
  let elapsed = 0;
  let spawnTimer = 0;
  let running = false;
  let shakeTime = 0;
  let flashTime = 0;
  let rafId = null;
  let lastT = 0;

  const livesEls = () => Array.from(el("hud-lives").querySelectorAll(".life"));

  function resetGameState() {
    items = [];
    particles = [];
    score = 0;
    combo = 0;
    comboTimer = 0;
    lives = CONFIG.startLives;
    elapsed = 0;
    spawnTimer = 0;
    shakeTime = 0;
    flashTime = 0;
    player.x = cssW / 2;
    player.targetX = cssW / 2;
    el("hud-score").textContent = "0";
    el("hud-combo").hidden = true;
    livesEls().forEach((l) => l.classList.remove("lost"));
  }

  function updateHud() {
    el("hud-score").textContent = String(score);
    const lifeSpans = livesEls();
    lifeSpans.forEach((span, i) => {
      span.classList.toggle("lost", i >= lives);
    });
  }

  function updateCombo(good) {
    if (good) {
      combo += 1;
      comboTimer = 2.2;
      if (combo >= 2) {
        const hc = el("hud-combo");
        hc.hidden = false;
        el("hud-combo-value").textContent = "x" + Math.min(combo, 9);
        hc.style.animation = "none";
        void hc.offsetWidth;
        hc.style.animation = "";
      }
    } else {
      combo = 0;
      comboTimer = 0;
      el("hud-combo").hidden = true;
    }
  }

  function spawnItem() {
    const isGood = Math.random() < 0.68;
    const pool = isGood ? CONFIG.goodItems : CONFIG.badItems;
    const data = pool[(Math.random() * pool.length) | 0];
    const r = 20;
    const x = r + Math.random() * (cssW - r * 2);
    const speedBase = 130 + Math.min(elapsed * 4.2, 170);
    items.push({
      x,
      y: -r,
      r,
      vy: speedBase + Math.random() * 40,
      emoji: data.emoji,
      good: isGood,
      points: data.points || 10,
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

  function catchGood(item) {
    const bonus = Math.min(combo, 8) * 2;
    score += item.points + bonus;
    updateCombo(true);
    updateHud();
    sfxCatchGood(combo);
    spawnParticles(item.x, item.y, "#ff5fa2", 14);
    const p = canvasToPage(item.x, item.y - 10);
    const word = CONFIG.goodFloaterWords[(Math.random() * CONFIG.goodFloaterWords.length) | 0];
    spawnFloater(p.x, p.y, "+" + (item.points + bonus) + " " + word, false);
  }

  function catchBad(item) {
    lives = Math.max(0, lives - 1);
    updateCombo(false);
    updateHud();
    sfxCatchBad();
    spawnParticles(item.x, item.y, "#4a3a55", 10);
    shakeTime = 0.28;
    flashTime = 0.22;
    const p = canvasToPage(item.x, item.y - 10);
    const word = CONFIG.badFloaterWords[(Math.random() * CONFIG.badFloaterWords.length) | 0];
    spawnFloater(p.x, p.y, word, true);
    if (navigator.vibrate) navigator.vibrate(60);
    if (lives <= 0) {
      setTimeout(() => endGame(), 260);
    }
  }

  function drawPlayfieldBg() {
    ctx.clearRect(0, 0, cssW, cssH);
    const r = 22;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(cssW, 0, cssW, cssH, r);
    ctx.arcTo(cssW, cssH, 0, cssH, r);
    ctx.arcTo(0, cssH, 0, 0, r);
    ctx.arcTo(0, 0, cssW, 0, r);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 248, 251, 0.94)";
    ctx.fill();
    ctx.restore();

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

  function loop(t) {
    if (!running) return;
    if (!lastT) lastT = t;
    let dt = (t - lastT) / 1000;
    dt = Math.min(dt, 0.05);
    lastT = t;
    elapsed += dt;

    if (comboTimer > 0) {
      comboTimer -= dt;
      if (comboTimer <= 0) updateCombo(false);
    }

    player.x += (player.targetX - player.x) * Math.min(1, dt * 14);
    player.x = Math.max(player.r, Math.min(cssW - player.r, player.x));

    spawnTimer -= dt;
    const spawnInterval = Math.max(0.42, 0.95 - elapsed * 0.012);
    if (spawnTimer <= 0) {
      spawnItem();
      spawnTimer = spawnInterval;
    }

    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.y += it.vy * dt;
      it.rot += it.vrot * dt;
      const dx = it.x - player.x;
      const dy = it.y - player.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < it.r + player.r * 0.72) {
        items.splice(i, 1);
        if (it.good) catchGood(it); else catchBad(it);
        continue;
      }
      if (it.y - it.r > cssH) {
        items.splice(i, 1);
      }
    }

    ctx.save();
    if (shakeTime > 0) {
      shakeTime -= dt;
      const mag = 6 * (shakeTime / 0.28);
      ctx.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
    }

    drawPlayfieldBg();
    items.forEach(drawItem);
    drawParticles(dt);
    drawPlayer();

    if (flashTime > 0) {
      flashTime -= dt;
      ctx.fillStyle = "rgba(255,45,135," + Math.max(0, flashTime / 0.22 * 0.35) + ")";
      ctx.fillRect(0, 0, cssW, cssH);
    }
    ctx.restore();

    rafId = requestAnimationFrame(loop);
  }

  function startGameLoop() {
    resizeCanvas();
    resetGameState();
    player.x = cssW / 2;
    player.targetX = cssW / 2;
    updateHud();
    running = true;
    lastT = 0;
    rafId = requestAnimationFrame(loop);
  }

  function stopGameLoop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  function endGame() {
    stopGameLoop();
    const best = getBest();
    const isNew = score > best;
    if (isNew) setBest(score);

    el("final-score").textContent = String(score);
    const captions = [
      [0, "santai, ini baru pemanasan 😌"],
      [80, "lumayan buat first draft 🙂"],
      [180, "wih, klien pasti langsung ACC nih 🔥"],
      [320, "GILA. udah kayak senior designer 😱"],
      [500, "OKE INI MAH PORTFOLIO PIECE 👑"],
    ];
    let caption = captions[0][1];
    for (const [threshold, text] of captions) {
      if (score >= threshold) caption = text;
    }
    el("score-caption").textContent = caption;
    el("gameover-eyebrow").textContent = lives <= 0 ? "client review selesai!" : "waktu habis!";

    const bestLine = el("best-score-line-2");
    if (getBest() > 0) {
      bestLine.hidden = false;
      el("best-score-value-2").textContent = String(getBest());
      el("new-best-badge").hidden = !isNew;
    } else {
      bestLine.hidden = true;
    }

    showScreen("gameover");
  }

  /* ---------------- input ---------------- */

  function pointerXToPlayer(clientX) {
    const rect = canvas.getBoundingClientRect();
    player.targetX = clientX - rect.left;
  }

  canvas.addEventListener("pointerdown", (e) => {
    ensureAudio();
    pointerXToPlayer(e.clientX);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (e.pressure === 0 && e.pointerType === "mouse") return;
    pointerXToPlayer(e.clientX);
  });
  canvas.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches[0]) pointerXToPlayer(e.touches[0].clientX);
      e.preventDefault();
    },
    { passive: false }
  );

  const keys = { left: false, right: false };
  window.addEventListener("keydown", (e) => {
    if (["ArrowLeft", "KeyA"].includes(e.code)) keys.left = true;
    if (["ArrowRight", "KeyD"].includes(e.code)) keys.right = true;
  });
  window.addEventListener("keyup", (e) => {
    if (["ArrowLeft", "KeyA"].includes(e.code)) keys.left = false;
    if (["ArrowRight", "KeyD"].includes(e.code)) keys.right = false;
  });
  setInterval(() => {
    if (!running) return;
    const speed = 26;
    if (keys.left) player.targetX = Math.max(0, player.targetX - speed);
    if (keys.right) player.targetX = Math.min(cssW, player.targetX + speed);
  }, 16);

  /* ---------------- countdown then play ---------------- */

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

  function beginGame() {
    showScreen("game");
    requestAnimationFrame(() => {
      runCountdown(() => {
        ensureAudio();
        startGameLoop();
      });
    });
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

  el("btn-start").addEventListener("click", () => { ensureAudio(); beginGame(); });
  el("btn-howto").addEventListener("click", () => showScreen("howto"));
  el("btn-howto-back").addEventListener("click", () => showScreen("start"));
  el("btn-howto-start").addEventListener("click", () => { ensureAudio(); beginGame(); });
  el("btn-retry").addEventListener("click", () => { ensureAudio(); beginGame(); });
  el("btn-continue").addEventListener("click", startMessages);
  el("btn-replay").addEventListener("click", () => { stopConfetti(); ensureAudio(); beginGame(); });

  el("btn-share").addEventListener("click", async () => {
    const text =
      "Aku baru main REVISI RUSH, kado ulang tahun dari " + CONFIG.fromName +
      "! Skor aku: " + score + ". Happy birthday " + CONFIG.playerName + "! 🎉";
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

  const best = getBest();
  if (best > 0) {
    el("best-score-line").hidden = false;
    el("best-score-value").textContent = String(best);
  }

  showScreen("start");
})();
