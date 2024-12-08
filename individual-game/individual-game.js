import { fetchGames } from "../fetchGames.js";

const cartGames = JSON.parse(localStorage.getItem("gamesToCart")) || [];
const longOrangeButton = document.querySelector("#long-orange-button");

const changeGameData = (gameId, games) => {
  const game = games.find((game) => Number(game.id) === Number(gameId));
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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const games = await fetchGames();
    const gameId = localStorage.getItem("selectedGameId");
    console.log(games);

    if (gameId) {
      changeGameData(gameId, games);
    }

    cartGames.forEach((cartGame) => {
      if (cartGame.id == gameId) {
        longOrangeButton.textContent = "Added to cart";
      }
    });

    document.querySelectorAll(".new-game-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const newGameId = event.currentTarget.dataset.id;
        localStorage.setItem("selectedGameId", newGameId);
        changeGameData(newGameId, games);
      });
    });

    longOrangeButton.addEventListener("click", () => {
      const gameExists = cartGames.some(
        (cartGame) => Number(cartGame.id) === Number(gameId)
      );
      longOrangeButton.textContent = "Added to cart";

      if (!gameExists) {
        const game = games.find((game) => game.id === Number(gameId));
        if (game) {
          cartGames.push(game);
          saveCart(cartGames);
        }
      }
    });
  } catch (error) {
    console.error("Error fetching games:", error);
  }
});

const saveCart = (cartGames) => {
  localStorage.setItem("gamesToCart", JSON.stringify(cartGames));
};
