import { getFromStorage, saveToStorage } from "../utils/storage.js";
import { renderCart } from "./renderCart.js";

export function removeCartItem(cart) {
	const removeProduct = document.querySelectorAll(".fa-x");

	removeProduct.forEach((button) => {
		button.addEventListener("click", handleClick);
	});
}

function handleClick() {
	const id = this.dataset.id;

	console.log(id);
	const cart = getFromStorage("cart");
	console.log(cart);
	const newCart = cart.filter((cart) => cart.id !== id);

	saveToStorage("cart", newCart);
	renderCart(newCart);
}
