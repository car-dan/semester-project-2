import createMenu from "./common/createMenu.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./common/displayMessage.js";
import { searchProducts } from "./products/search.js";
import { renderProducts } from "./products/renderProducts.js";

import { addToCart } from "./utils/addToCart.js";

createMenu();

const productsUrl = baseUrl + "/products";

(async function products() {
	const loader = document.querySelector(".loader");

	loader.style.display = "none";
	try {
		const respons = await fetch(productsUrl);
		const json = await respons.json();

		renderProducts(json);
		searchProducts(json);
		addToCart(json);
	} catch (error) {
		displayMessage("error", error, ".products-container");
		console.log(error);
	}
})();
