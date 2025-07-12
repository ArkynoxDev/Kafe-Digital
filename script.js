// Hilangkan loader saat halaman selesai load
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-wrapper");
  if (loader) loader.style.display = "none";

  // Pointer gelembung animasi (hanya untuk desktop)
  const bubble = document.querySelector(".bubble-cursor");
  if (window.innerWidth > 768 && bubble) {
    document.addEventListener("mousemove", (e) => {
      bubble.style.left = `${e.clientX}px`;
      bubble.style.top = `${e.clientY}px`;
    });
  }

  // Jalankan animasi scroll reveal pas load
  scrollReveal();
});

// Efek klik tombol (button & class btn)
document.querySelectorAll("button, .btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 200);
  });
});

// Scroll reveal animation
const revealEls = document.querySelectorAll(".reveal");
const scrollReveal = () => {
  const windowHeight = window.innerHeight;
  revealEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
};
window.addEventListener("scroll", scrollReveal);

// Smooth scroll untuk anchor link
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Review & Rating
const reviewForm = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");
const avgRatingEl = document.getElementById("avg-rating");
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function renderReviews() {
  if (!reviewList || !avgRatingEl) return;

  reviewList.innerHTML = "";
  if (reviews.length === 0) {
    reviewList.innerHTML = "<p>Belum ada ulasan, jadilah yang pertama!</p>";
    avgRatingEl.textContent = "-";
    return;
  }

  reviews.forEach(({ text, rating }) => {
    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    reviewItem.innerHTML = `
      <div class="review-stars">${stars}</div>
      <div class="review-text">${text}</div>
    `;
    reviewList.appendChild(reviewItem);
  });

  const avg = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  avgRatingEl.textContent = avg;
}

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const textInput = document.getElementById("review-text");
    const ratingInput = reviewForm.rating;

    if (!textInput || !ratingInput) return;

    const text = textInput.value.trim();
    const rating = Number(ratingInput.value);

    if (!text || !rating) return;

    reviews.push({ text, rating });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    renderReviews();
    reviewForm.reset();

    alert("Ulasan kamu sudah dikirim! Terima kasih 🙌");
  });
}

renderReviews();

// Toggle hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active");
    });
  });
}

// Splash screen animation control
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const logo = document.querySelector(".splash-logo");
  if (!splash || !logo) return;

  // Delay sebelum zoom out dan fade
  setTimeout(() => {
    logo.classList.add("zoom-out");
    splash.classList.add("fade-out");
  }, 2000);

  // Setelah animasi selesai, sembunyikan splash
  setTimeout(() => {
    splash.style.display = "none";
  }, 3500);
});

// Dynamic update hero text based on viewport width
function updateHeroText() {
  const heroTitle = document.querySelector(".hero-text h2");
  const subtext = document.querySelector(".hero-text .subtext");
  if (!heroTitle || !subtext) return;

  if (window.innerWidth <= 768) {
    heroTitle.textContent = "savior the perfect brew";
    subtext.style.display = "none";
  } else {
    heroTitle.textContent = "Savor the Perfect Brew!";
    subtext.style.display = "block";
  }
}


window.addEventListener("load", updateHeroText);
window.addEventListener("resize", updateHeroText);
