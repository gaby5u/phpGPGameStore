import { games } from "./../object.js";

let cartGames = JSON.parse(localStorage.getItem("gamesToCart")) || [];

const checkIfCartIsEmpty = () => {
  if (cartGames.length == 0) {
    const container = document.querySelector(".container");
    const emptyCartErrorText = document.createElement("h1");
    emptyCartErrorText.classList.add("empty-cart-text");
    emptyCartErrorText.textContent = "Cart is empty";

    container.appendChild(emptyCartErrorText);
    document.querySelector(".cart-products").style.display = "none";
    document.querySelector(".summary-payment-container").style.display = "none";
  }
};
checkIfCartIsEmpty();

const createCard = (gameId) => {
  const productContanier = document.createElement("div");
  productContanier.classList.add("product-container");

  const productContent = document.createElement("div");
  productContent.classList.add("product-content");
  productContanier.setAttribute("data-id", gameId);

  const selectContainer = document.createElement("div");
  selectContainer.classList.add("select-container");
  productContent.appendChild(selectContainer);

  const image = document.createElement("img");
  image.setAttribute("src", games[gameId - 1].image);
  image.setAttribute("alt", games[gameId - 1].alt);
  image.classList.add("game-image");
  productContent.appendChild(image);

  const descriptionProduct = document.createElement("div");
  descriptionProduct.classList.add("description-product");

  const div = document.createElement("div");

  const gameName = document.createElement("h1");
  gameName.textContent = games[gameId - 1].name;

  div.appendChild(gameName);

  const gameDescription = document.createElement("p");
  gameDescription.textContent = games[gameId - 1].description1;

  div.appendChild(gameDescription);

  const priceTrash = document.createElement("div");
  priceTrash.classList.add("price-trash");

  const price = document.createElement("div");
  price.classList.add("price");

  const initialPrice = document.createElement("p");
  initialPrice.innerHTML = `&dollar; ${games[gameId - 1].initialPrice}`;
  price.appendChild(initialPrice);

  const finalPrice = document.createElement("p");
  finalPrice.innerHTML = `&dollar; ${games[gameId - 1].finalPrice}`;
  price.appendChild(finalPrice);

  priceTrash.appendChild(price);

  const trashImage = document.createElement("img");
  trashImage.setAttribute("src", "img/gray-trash.png");
  trashImage.setAttribute("alt", "gray-trash");
  priceTrash.appendChild(trashImage);

  div.appendChild(priceTrash);
  descriptionProduct.appendChild(div);
  productContent.appendChild(descriptionProduct);
  productContanier.appendChild(productContent);

  const cartProducts = document.querySelector(".cart-products");
  cartProducts.appendChild(productContanier);
};

cartGames.forEach((cartGame) => {
  const gameId = cartGame.id;
  createCard(gameId);
});

const updateTotalNumberElements = () => {
  let numberElements = document.querySelector(".remove-container p span");
  numberElements.textContent = `(${cartGames.length})`;
};

const saveCartGames = () => {
  localStorage.setItem("gamesToCart", JSON.stringify(cartGames));
};

const deleteCartGame = () => {
  const trashButtons = document.querySelectorAll(".price-trash img");
  trashButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productContanier = event.target.closest(".product-container");

      const gameId = parseInt(productContanier.dataset.id, 10);
      productContanier.remove();

      const gameIndex = cartGames.findIndex((game) => game.id === gameId);
      if (gameIndex > -1) cartGames.splice(gameIndex, 1);
      saveCartGames();
      updateTotalNumberElements();
      updateTotalPrice();
    });
  });
};

deleteCartGame();
updateTotalNumberElements();

const deleteAllCartGames = () => {
  const deleteAllTrashButton = document.querySelector(".remove-container img");
  deleteAllTrashButton.addEventListener("click", () => {
    const productContainers = document.querySelectorAll(".product-container");
    productContainers.forEach((productContanier) => {
      productContanier.remove();
    });
    cartGames = [];
    saveCartGames();
    updateTotalNumberElements();
    updateTotalPrice();
  });
};

deleteAllCartGames();

const updateTotalPrice = () => {
  const totalPriceText = document.querySelector(".sum-container p:last-child");
  const buttonText = document.getElementById("long-orange-button");
  let summary = 0;
  cartGames.forEach((cartGame) => {
    summary += cartGame.finalPrice;
  });
  totalPriceText.innerHTML = `&dollar;${summary.toFixed(2)}`;
  buttonText.innerHTML = `Buy for &dollar;${summary.toFixed(2)}`;
};

updateTotalPrice();

const promoTextIcon = document.querySelector(".promo-text img");
const promoCodeContainer = document.querySelector(".promo-code-container");

promoTextIcon.addEventListener("click", () => {
  if (getComputedStyle(promoCodeContainer).display === "none") {
    promoCodeContainer.style.display = "flex";
    promoTextIcon.style.transition = "all 0.4s";
    promoTextIcon.style.transform = "rotate(180deg)";
  } else {
    promoCodeContainer.style.display = "none";
    promoTextIcon.style.transition = "all 0.4s";
    promoTextIcon.style.transform = "rotate(0deg)";
  }
});
