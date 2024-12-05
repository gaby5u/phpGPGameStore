import { games } from "../object.js";

const listGames = document.querySelectorAll(".game-carousel"),
  activeImage = document.querySelector(".active-img img"),
  nameActiveImage = document.querySelector(".info-game h2"),
  ratingActiveImage = document.querySelector(".rating-latest-games p"),
  priceActiveImage = document.querySelector(".active-img-price");

listGames.forEach((game) => {
  game.addEventListener("click", (event) => {
    const gameId = event.currentTarget.dataset.id;
    listGames.forEach((game) => game.classList.remove("active-little-img"));
    game.classList.add("active-little-img");

    games.forEach((genGame) => {
      if (gameId == genGame.id) {
        activeImage.setAttribute(
          "src",
          `homepage/img/list-carousel/${genGame.alt}.png`
        );
        activeImage.setAttribute("alt", `${genGame.alt}`);
        nameActiveImage.textContent = genGame.name;
        ratingActiveImage.textContent = genGame.rating;
        priceActiveImage.innerHTML = `&dollar;${genGame.finalPrice}`;
      }
    });
  });
});
