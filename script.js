const photos = [
  "images/photo1.jpg",
  "images/photo2.jpg",
  "images/photo3.jpg",
  "images/photo4.jpg",
  "images/photo5.jpg",
];

const slideshowImage = document.getElementById("slideshow-image");
const slideCounter = document.getElementById("slide-counter");
let slideIndex = 0;

function setSlide(index) {
  slideshowImage.src = photos[index];
  slideCounter.textContent = `${index + 1} / ${photos.length}`;
}

setInterval(() => {
  slideIndex = (slideIndex + 1) % photos.length;
  setSlide(slideIndex);
}, 2500);

slideshowImage.addEventListener("error", () => {
  slideshowImage.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23ff4f87'/%3E%3Cstop offset='1' stop-color='%236f6eff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1280' height='720' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='54' text-anchor='middle' dominant-baseline='middle'%3EAdd your photos in /images%3C/text%3E%3C/svg%3E";
});

const giftButton = document.getElementById("gift-button");
const giftMessage = document.getElementById("gift-message");
giftButton.addEventListener("click", () => {
  const hidden = giftMessage.hasAttribute("hidden");
  if (hidden) giftMessage.removeAttribute("hidden");
  else giftMessage.setAttribute("hidden", "");
  giftButton.setAttribute("aria-expanded", String(hidden));
  giftButton.textContent = hidden ? "Hide Surprise" : "Open Surprise";
});

const secretButton = document.getElementById("secret-button");
const secretText = document.getElementById("secret-text");
secretButton.addEventListener("click", () => {
  secretText.toggleAttribute("hidden");
});

const typingText = document.getElementById("typing-text");
const letter =
  "Dear Madam Ji, every day with you feels like a festival of light. Thank you for your smile, your care, and your endless love. Happy Birthday, meri jaan. ❤️";
let char = 0;
(function typeLetter() {
  if (char <= letter.length) {
    typingText.textContent = letter.slice(0, char++);
    setTimeout(typeLetter, 35);
  }
})();

const countdownTarget = new Date("2027-03-16T00:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

setInterval(() => {
  const now = Date.now();
  const distance = Math.max(countdownTarget - now, 0);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = String(days);
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}, 1000);

const heartsContainer = document.getElementById("hearts-container");
setInterval(() => {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.fontSize = `${16 + Math.random() * 18}px`;
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}, 350);

const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
let playing = false;
musicToggle.addEventListener("click", async () => {
  if (!playing) {
    try {
      await music.play();
      playing = true;
      musicToggle.textContent = "⏸ Music";
    } catch {
      musicToggle.textContent = "Tap again for music";
    }
  } else {
    music.pause();
    playing = false;
    musicToggle.textContent = "▶ Music";
  }
});

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const sparks = [];
setInterval(() => {
  sparks.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.6,
    life: 40,
    hue: Math.random() * 360,
  });
}, 700);

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparks.forEach((spark, i) => {
    spark.life -= 1;
    for (let p = 0; p < 18; p++) {
      const angle = (Math.PI * 2 * p) / 18;
      const radius = (40 - spark.life) * 0.9;
      const x = spark.x + Math.cos(angle) * radius;
      const y = spark.y + Math.sin(angle) * radius;
      ctx.fillStyle = `hsla(${spark.hue}, 100%, 65%, ${spark.life / 40})`;
      ctx.fillRect(x, y, 2, 2);
    }
    if (spark.life <= 0) sparks.splice(i, 1);
  });
  requestAnimationFrame(animate);
})();
