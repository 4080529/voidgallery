const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const images = document.querySelectorAll(".thumb");
let currentIndex = 0;

function showImage(index) {
  lightboxImg.style.opacity = 0;

  setTimeout(() => {
    const img = images[index];
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.dataset.caption;
    currentIndex = index;
    lightboxImg.style.opacity = 1;
  }, 150);
}

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    showImage(index);
  });
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  let nextIndex = (currentIndex + 1) % images.length;
  showImage(nextIndex);
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  let prevIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(prevIndex);
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".gallery figure").forEach(el => {
  observer.observe(el);
});
