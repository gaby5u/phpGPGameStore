const sliderElements = document.querySelector(".slider"),
  button = document.querySelector(".green-arrow-button");

const moveSlide = () => {
  sliderElements.appendChild(sliderElements.firstElementChild);
};

button.addEventListener("click", () => {
  moveSlide();
  stopAutoPlay();
  startAutoPlay();
});

const startAutoPlay = () => {
  autoplay = setInterval(() => {
    moveSlide();
  }, 4000);
};

const stopAutoPlay = () => {
  clearInterval(autoplay);
};

startAutoPlay();
