const declarations = [
  {
    text: "The blessings of God are on my life and empower me to prosper. The favor of God produces divine opportunities for me.",
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

// DATE
document.getElementById("date").textContent =
  new Date().toDateString();

// DAILY ROTATION
const todayIndex = new Date().getDate() % declarations.length;
const dailyDeclaration = declarations[todayIndex];

const speakBtn = document.getElementById("speakBtn");
const content = document.getElementById("content");
const inputArea = document.getElementById("inputArea");
const declarationEl = document.getElementById("declaration");
const referenceEl = document.getElementById("reference");
const music = document.getElementById("bgMusic");

// DECLARE
speakBtn.addEventListener("click", () => {
  const name =
    document.getElementById("nameInput").value.trim() || "I";

  declarationEl.innerHTML =
    dailyDeclaration.text.replace("my", `${name}'s`);

  referenceEl.textContent = dailyDeclaration.ref;

  inputArea.style.display = "none";
  content.classList.remove("hidden");

  music.volume = 0.3;
  music.play();
});

// DAY / NIGHT MODE
document.getElementById("themeBtn").onclick = () => {
  document.body.classList.toggle("light");
};

// EXPORT IMAGE
document.getElementById("exportBtn").onclick = () => {
  html2canvas(document.getElementById("captureArea")).then(canvas => {
    const link = document.createElement("a");
    link.download = "slap-declaration.png";
    link.href = canvas.toDataURL();
    link.click();
  });
};

// QR CODE
document.getElementById("qrBtn").onclick = () => {
  const canvas = document.getElementById("qrCanvas");
  const ctx = canvas.getContext("2d");
  const url = window.location.href;

  const img = new Image();
  img.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(url);
  img.onload = () => ctx.drawImage(img, 0, 0);
};

// SHARE
document.getElementById("shareBtn").onclick = () => {
  const shareURL =
    "https://wa.me/?text=" +
    encodeURIComponent(
      "Join me in today's declaration ✨\n" + window.location.href
    );
  window.open(shareURL, "_blank");
};
