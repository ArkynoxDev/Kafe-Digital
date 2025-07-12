// blog.js

const container = document.querySelector('.blog-stack-container');
const cards = Array.from(document.querySelectorAll('.blog-card'));
const popup = document.querySelector('.popup-article');
const popupTitle = document.getElementById('popup-title');
const popupBody = document.getElementById('popup-body');
const popupImg = document.getElementById('popup-image');
const closeBtn = document.querySelector('.close-popup');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const backBtnTop = document.getElementById('back-to-home');

let currentIndex = 0;

// Fungsi update tampilan card sesuai currentIndex
function updateCards() {
  cards.forEach((card, i) => {
    card.classList.remove('active-center', 'visible');
    card.style.opacity = '0';
    card.style.pointerEvents = 'none';
    card.style.display = 'none';

    const distance = Math.min(
      Math.abs(i - currentIndex),
      cards.length - Math.abs(i - currentIndex)
    );

    if (distance === 0) {
      card.classList.add('active-center', 'visible');
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
      card.style.display = 'block';
    } else if (distance === 1) {
      card.classList.add('visible');
      card.style.opacity = '0.6';
      card.style.pointerEvents = 'auto';
      card.style.display = 'block';
    }
  });
}

// Event tombol navigasi kiri
leftArrow.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCards();
  scrollToCard(currentIndex);
});

// Event tombol navigasi kanan
rightArrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCards();
  scrollToCard(currentIndex);
});

// Scroll container ke posisi card tengah
function scrollToCard(index) {
  const card = cards[index];
  const containerRect = container.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const offset = cardRect.left - containerRect.left - (containerRect.width / 2 - cardRect.width / 2);
  container.scrollBy({ left: offset, behavior: 'smooth' });
}

// Inisialisasi awal
updateCards();
scrollToCard(currentIndex);

// Event klik tombol read
cards.forEach(card => {
  const readBtn = card.querySelector('.read-btn');
  if (readBtn) {
    readBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      popupTitle.textContent = card.getAttribute('data-title');
      popupImg.src = card.getAttribute('data-img');
      popupImg.alt = card.getAttribute('data-title');
      popupBody.innerHTML = card.getAttribute('data-content');

      // Reset animasi paragraf
      popupBody.querySelectorAll('p').forEach(p => {
        p.style.animation = 'none';
        p.offsetHeight;
        p.style.animation = '';
      });

      popup.classList.add('active');
      document.body.classList.add('popup-open');
    });
  }
});

// Tutup popup
closeBtn.addEventListener('click', () => {
  popup.classList.remove('active');
  document.body.classList.remove('popup-open');
});
popup.addEventListener('click', e => {
  if (e.target === popup) {
    popup.classList.remove('active');
    document.body.classList.remove('popup-open');
  }
});

// Tombol back to home
backBtnTop.addEventListener('click', () => {
  window.location.href = 'index.html';
});
document.querySelectorAll('a[href$="blog.html"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const transition = document.getElementById("page-transition");
    transition.classList.add("active");

    setTimeout(() => {
      window.location.href = this.href;
    }, 600); // waktu sesuai durasi CSS transition
  });
});
