// Hilangkan loader saat halaman selesai load
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader-wrapper");
  if (loader) {
    loader.style.display = "none";
  }

  // Pointer gelembung animasi (hanya untuk desktop)
  const bubble = document.querySelector(".bubble-cursor");
  if (window.innerWidth > 768 && bubble) {
    document.addEventListener("mousemove", (e) => {
      bubble.style.left = `${e.clientX}px`;
      bubble.style.top = `${e.clientY}px`;
    });
  }

  // Scroll reveal aktif saat load pertama
  scrollReveal();
});

// Efek animasi klik tombol
document.querySelectorAll("button, .btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.add("clicked");
    setTimeout(() => btn.classList.remove("clicked"), 200);
  });
});

// Scroll reveal animation (aktif juga pas scroll ke atas)
const revealEls = document.querySelectorAll(".reveal");
const scrollReveal = () => {
  revealEls.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const bottom = el.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100 && bottom > 100) {
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
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Review & Rating
const reviewForm = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");
const avgRatingEl = document.getElementById("avg-rating");

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function renderReviews() {
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

  const avg = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  ).toFixed(1);
  avgRatingEl.textContent = avg;
}

if (reviewForm) {
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = document.getElementById("review-text").value.trim();
    const rating = Number(reviewForm.rating.value);

    if (!text || !rating) return;

    reviews.push({ text, rating });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    renderReviews();
    reviewForm.reset();

    // Notifikasi submit sukses (sementara pake alert)
    alert("Ulasan kamu sudah dikirim! Terima kasih 🙌");
  });
}

renderReviews();

// Toggle hamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");  // <<< ini buat animasi bar berubah jadi X
    navLinks.classList.toggle("show");
  });

  // Tutup menu saat klik salah satu nav link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      hamburger.classList.remove("active"); // <<< ini balikin animasi bar jadi normal
    });
  });
}
