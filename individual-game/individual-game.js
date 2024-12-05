import { games } from "./../object.js";

const cartGames = JSON.parse(localStorage.getItem("gamesToCart")) || [];
const longOrangeButton = document.querySelector("#long-orange-button");

const changeGameData = (gameId) => {
  const game = games[gameId - 1];
  if (game) {
    document.querySelector(".game-image").src = game.image;
    document.querySelector(".game-name").textContent = game.name;
    document.querySelector(
      ".initial-price"
    ).innerHTML = `&dollar;${game.initialPrice}`;
    document.querySelector(
      ".final-price"
    ).innerHTML = `&dollar;${game.finalPrice}`;
    document.querySelector(".description-1").textContent = game.description1;
    document.querySelector(".description-2").textContent = game.description2;
    document.querySelector(".release-date").textContent = game.releaseDate;
    document.querySelector(".developer").textContent = game.developer;
    document.querySelector(".genre").textContent = game.genre;
    document.querySelector(".tags").textContent = game.tags;
  }
};

const gameId = localStorage.getItem("selectedGameId");
document.addEventListener("DOMContentLoaded", () => {
  if (gameId) {
    changeGameData(gameId);
  }
  cartGames.forEach((cartGame) => {
    if (cartGame.id == gameId) {
      longOrangeButton.textContent = "Added to cart";
    }
  });
});

document.querySelectorAll(".new-game-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const newGameId = event.currentTarget.dataset.id;
    localStorage.setItem("selectedGameId", newGameId);
    changeGameData(newGameId);
  });
});

const saveCart = (cartGames) => {
  localStorage.setItem("gamesToCart", JSON.stringify(cartGames));
};

longOrangeButton.addEventListener("click", () => {
  const gameExists = cartGames.some(
    (cartGame) => Number(cartGame.id) === Number(gameId)
  );
  longOrangeButton.textContent = "Added to cart";

  if (!gameExists) {
    cartGames.push(games[gameId - 1]);
    saveCart(cartGames);
  }
});
