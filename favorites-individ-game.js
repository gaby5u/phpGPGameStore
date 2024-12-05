// -------------------------individual-game---favorites-----------------------------

import { games } from "./object.js";

document.addEventListener("DOMContentLoaded", () => {
  updateFavoriteIcons();
});

const getFavorites = () => {
  const favorites = localStorage.getItem("favourite-games");
  return favorites ? JSON.parse(favorites) : [];
};

const saveFavorites = (favorites) => {
  localStorage.setItem("favourite-games", JSON.stringify(favorites));
};

const updateFavoriteIcons = () => {
  const favorites = getFavorites();
  document.querySelectorAll(".game-container").forEach((gameContainer) => {
    const gameId = gameContainer.dataset.id;
    const heartIcon = gameContainer.querySelector(".white-circle div");

    if (favorites.some((game) => game.id == gameId)) {
      heartIcon.classList.add("toggled");
    } else {
      heartIcon.classList.remove("toggled");
    }
  });
};

document.querySelectorAll(".game-container").forEach((gameItem) => {
  gameItem.addEventListener("click", (event) => {
    const gameId = event.currentTarget.dataset.id;
    localStorage.setItem("selectedGameId", gameId);
  });
});

document.querySelectorAll(".white-circle div").forEach((heartIcon, index) => {
  heartIcon.addEventListener("click", () => {
    heartIcon.classList.toggle("toggled");

    const containersGames = document.querySelectorAll(".game-container");
    const gameId =
      parseInt(containersGames[index].getAttribute("data-id"), 10) - 1;
    const favorites = getFavorites();

    if (heartIcon.classList.contains("toggled")) {
      favorites.push(games[gameId]);
      saveFavorites(favorites);
    } else {
      const updatedFavorites = favorites.filter(
        (game) => game.id !== games[gameId].id
      );
      saveFavorites(updatedFavorites);
    }
  });
});
