const declarations = [
  {
    text: "The blessings of God are on my life and empower me to prosper. The favor of God produces divine opportunities to make it happen. Because the Holy Spirit that is in me guides my steps, I am always at the right place at the right time.",
    ref: "Deuteronomy 28:8, Psalm 5:12"
  },
  {
    text: "The steps of my life are ordered by the Lord. I am always at the right place at the right time.",
    ref: "Psalm 37:23, Romans 8:14"
  },
  {
    text: "I walk in faith, hope, and love. I am guided by light and understanding.",
    ref: "1 Corinthians 13:13, Psalm 119:105"
  }
];

/* DATE */
document.getElementById("date").textContent =
  new Date().toDateString();

/* DAILY ROTATION */
const todayIndex = new Date().getDate() % declarations.length;
const dailyDeclaration = declarations[todayIndex];

/* ELEMENTS */
const speakBtn = document.getElementById("speakBtn");
const content = document.getElementById("content");
const inputArea = document.getElementById("inputArea");
const declarationEl = document.getElementById("declaration");
const referenceEl = document.getElementById("reference");
const music = document.getElementById("bgMusic");

/* DECLARE */
speakBtn.addEventListener("click", () => {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();

  if (!name) {
    input.focus();
    return;
  }

  const text = dailyDeclaration.text
    .replace(/my life/g, `${name}'s life`)
    .replace(/\bmy\b/g, `${name}'s`)
    .replace(/\bI am\b/g, `${name} is`);

  declarationEl.textContent = text;
  referenceEl.textContent = dailyDeclaration.ref;

  inputArea.style.display = "none";
  content.classList.remove("hidden");

  music.volume = 0;
  music.play();

  const fade = setInterval(() => {
    if (music.volume < 0.3) music.volume += 0.02;
    else clearInterval(fade);
  }, 120);
});

/* DAY / NIGHT TOGGLE */
const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = () => {
  document.body.classList.toggle("light");
  themeBtn.textContent =
    document.body.classList.contains("light")
      ? "☀️ Day"
      : "🌙 Night";
};

/* EXPORT IMAGE */
document.getElementById("exportBtn").onclick = () => {
  html2canvas(document.getElementById("captureArea"), { scale: 2 })
    .then(canvas => {
      const link = document.createElement("a");
      link.download = "slap-declaration.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
};

/* QR CODE */
document.getElementById("qrBtn").onclick = () => {
  const canvas = document.getElementById("qrCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 150;
  canvas.height = 150;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    encodeURIComponent(window.location.href);

  img.onload = () => ctx.drawImage(img, 0, 0);
};
