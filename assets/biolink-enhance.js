
// == Biolink Enhancements ==
// - Add emoji image after social network names (using image URLs)
// - Cherry blossom (sakura) falling effect across the whole site
// - Random emoji image after the name "Nguyễn Duy Hưng" on each page load

(function() {
  // --- Config ---
  const SOCIAL_KEYWORDS = [
    "facebook","instagram","tiktok","youtube","zalo","telegram",
    "twitter","x","github","linkedin","snapchat"
  ];

  // Emoji image (link) to append after social names (cherry blossom to match theme)
  const SOCIAL_EMOJI_URL = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f338.png"; // 🌸

  // Random emoji set (image links) for after the name "Nguyễn Duy Hưng"
  const RANDOM_EMOJI_URLS = [
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f389.png", // 🎉
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f525.png", // 🔥
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f680.png", // 🚀
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f60a.png", // 😊
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4a1.png", // 💡
    "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f31f.png"  // 🌟
  ];

  // --- Utilities ---
  function createImg(url, sizePx) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    img.decoding = "async";
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    img.style.width = sizePx + "px";
    img.style.height = sizePx + "px";
    img.style.verticalAlign = "middle";
    img.style.marginLeft = "8px";
    img.className = "emoji-icon";
    return img;
  }

  function textIncludes(el, keywords) {
    const t = (el.textContent || "").toLowerCase();
    return keywords.some(k => t.includes(k));
  }

  // --- 1) Append emoji after social names ---
  function enhanceSocialNames() {
    const candidates = Array.from(document.querySelectorAll("a, .social a, .links a, nav a, li a"));
    const uniq = new Set();
    candidates.forEach(a => {
      if (!a || !(a instanceof HTMLElement)) return;
      if (uniq.has(a)) return;
      if (a.querySelector("img.emoji-icon")) return; // already enhanced
      if (textIncludes(a, SOCIAL_KEYWORDS)) {
        a.appendChild(createImg(SOCIAL_EMOJI_URL, 18));
        uniq.add(a);
      }
    });
  }

  // --- 2) Random emoji after "Nguyễn Duy Hưng" ---
  function enhanceOwnerName() {
    const all = Array.from(document.querySelectorAll("h1, h2, h3, .name, .title, .header, p, span"));
    const target = all.find(el => (el.textContent || "").toLowerCase().includes("nguyễn duy hưng"));
    if (target && !target.querySelector("img.emoji-icon.owner")) {
      const url = RANDOM_EMOJI_URLS[Math.floor(Math.random() * RANDOM_EMOJI_URLS.length)];
      const img = createImg(url, 20);
      img.classList.add("owner");
      target.appendChild(img);
    }
  }

  // --- 3) Cherry blossom effect ---
  function injectStyles() {
    if (document.getElementById("biolink-enhance-styles")) return;
    const style = document.createElement("style");
    style.id = "biolink-enhance-styles";
    style.textContent = `
      #sakura-container {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 9999;
      }
      .petal {
        position: absolute;
        top: -10vh;
        will-change: transform, opacity, left, top;
        opacity: 0.9;
        filter: drop-shadow(0 2px 2px rgba(0,0,0,.12));
        animation-name: fall, sway;
        animation-timing-function: linear, ease-in-out;
        animation-iteration-count: 1, infinite;
      }
      @keyframes fall {
        0%   { transform: translate3d(0, -10vh, 0) rotate(0deg);   opacity: 0.9; }
        100% { transform: translate3d(0, 110vh, 0) rotate(360deg); opacity: 0.95; }
      }
      @keyframes sway {
        0%   { margin-left: 0px; }
        50%  { margin-left: 40px; }
        100% { margin-left: 0px; }
      }
    `;
    document.head.appendChild(style);
  }

  function startSakura() {
    injectStyles();
    let container = document.getElementById("sakura-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "sakura-container";
      document.body.appendChild(container);
    }

    const PETAL_URL = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f338.png"; // 🌸
    const maxConcurrent = 20;
    let current = 0;

    function spawnPetal() {
      if (current >= maxConcurrent) return;
      current++;
      const petal = document.createElement("img");
      petal.src = PETAL_URL;
      petal.alt = "";
      petal.decoding = "async";
      petal.loading = "lazy";
      petal.className = "petal";

      const size = 16 + Math.random() * 18; // 16-34px
      petal.style.width = size + "px";
      petal.style.height = size + "px";
      petal.style.left = Math.floor(Math.random() * 100) + "vw";

      const fallDuration = 8 + Math.random() * 8; // 8-16s
      const swayDuration = 2.5 + Math.random() * 2.5; // 2.5-5s
      petal.style.animationDuration = fallDuration + "s, " + swayDuration + "s";

      container.appendChild(petal);

      // Cleanup
      setTimeout(() => {
        petal.remove();
        current--;
      }, fallDuration * 1000 + 100);
    }

    // Spawn interval
    setInterval(spawnPetal, 600);
    // burst on load
    for (let i = 0; i < 8; i++) setTimeout(spawnPetal, i * 150);
  }

  // Run after DOM ready
  function onReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 0);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  onReady(() => {
    enhanceSocialNames();
    enhanceOwnerName();
    startSakura();
  });
})();
