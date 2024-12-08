import { fetchGames } from "../fetchGames.js";

const gameContainer = document.querySelectorAll(".game-container");
const gameNames = document.querySelectorAll(".text-description h1");
const gameDescription = document.querySelectorAll(".game-description");
const gameImage = document.querySelectorAll(".game-image");
const gameInitialPrice = document.querySelectorAll(".price p:first-child");
const gameFinalPrice = document.querySelectorAll(".price p:last-child");

const setGameData = (games) => {
  gameContainer.forEach((container, index) => {
    const gameId = container.getAttribute("data-id");
    games.forEach((game) => {
      if (gameId == game.id) {
        gameNames[index].textContent = game.name;
        gameDescription[index].textContent = game.description1;
        gameInitialPrice[index].textContent = game.initialPrice;
        gameFinalPrice[index].textContent = game.finalPrice;
        gameImage[index].setAttribute("src", game.image1);
      }
    });
  });
};

const initializaGameData = async () => {
  try {
    const games = await fetchGames();
    setGameData(games);
  } catch (error) {
    console.error("Failed to fetch or display data:", error);
  }
};

initializaGameData();

gameContainer.forEach((container) => {
  container.addEventListener("click", (event) => {
    const gameId = event.currentTarget.dataset.id;
    localStorage.setItem("selectedGameId", gameId);
  });
});
