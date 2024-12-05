const sliderElements = document.querySelector(".slider"),
  leftArrow = document.querySelector(".hi-prev"),
  rightArrow = document.querySelector(".hi-next");

function updateActiveSlide(next = true) {
  const slides = document.querySelectorAll(".slide-container");
  const currentIndex = Array.from(slides).findIndex((slide) =>
    slide.classList.contains("active-slide-container")
  );

  slides.forEach((slide) => {
    slide.classList.remove(
      "active-slide-container",
      "near-active-slide",
      "far-near-active-slide"
    );
  });

  let newIndex;
  if (next) {
    newIndex = (currentIndex + 1) % slides.length;
  } else {
    newIndex = (currentIndex - 1 + slides.length) % slides.length;
  }

  slides[newIndex].classList.add("active-slide-container");
  slides[(newIndex + 1) % slides.length].classList.add("near-active-slide");
  slides[(newIndex + 2) % slides.length].classList.add("far-near-active-slide");
  slides[(newIndex - 1 + slides.length) % slides.length].classList.add(
    "near-active-slide"
  );
  slides[(newIndex - 2 + slides.length) % slides.length].classList.add(
    "far-near-active-slide"
  );
}

const moveSlideToRight = () => {
  sliderElements.appendChild(sliderElements.firstElementChild);
};

const moveSlideToLeft = () => {
  sliderElements.insertBefore(
    sliderElements.lastElementChild,
    sliderElements.firstElementChild
  );
};

rightArrow.addEventListener("click", () => {
  moveSlideToRight();
  updateActiveSlide(true);
  stopAutoPlay();
  startAutoPlay();
});

leftArrow.addEventListener("click", () => {
  moveSlideToLeft();
  updateActiveSlide(false);
  stopAutoPlay();
  startAutoPlay();
});

const startAutoPlay = () => {
  autoplay = setInterval(
    () => {
      updateActiveSlide(true);
      moveSlideToRight();
    },
    4000,
    true
  );
};

const stopAutoPlay = () => {
  clearInterval(autoplay);
};

startAutoPlay();

document.querySelectorAll(".slide-container").forEach((card) => {
  card.addEventListener("click", (event) => {
    const gameId = event.currentTarget.dataset.id;
    localStorage.setItem("selectedGameId", gameId);
  });
});

document.querySelectorAll(".popular-game").forEach((game) => {
  game.addEventListener("click", (event) => {
    const gameId = event.currentTarget.dataset.id;
    localStorage.setItem("selectedGameId", gameId);
  });
});
