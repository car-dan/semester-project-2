import { getFromStorage, saveToStorage } from "./storage.js";

export function addToCart(product) {
	const addButton = document.querySelectorAll(".addCart");

	addButton.forEach((button) => {
		button.addEventListener("click", handleClick);
	});
}

function handleClick() {
	const id = this.dataset.id;
	const name = this.dataset.name;
	const price = this.dataset.price;
	const items = this.dataset.number;
	const image = this.dataset.image;

	const cart = getFromStorage("cart");

	const productExsist = cart.find(function (cart) {
		return cart.id === id;
	});

	if (productExsist === undefined) {
		const product = {
			id: id,
			name: name,
			price: price,
			items: items,
			image: image,
		};
		cart.push(product);
		saveToStorage("cart", cart);
	} else {
		const oldProduct = cart.filter(function (cart) {
			if (cart.id === id) {
				return true;
			}
		});
		const oldItemCount = parseFloat(oldProduct[0].items);
		const newItemCount = oldItemCount + parseFloat(items);
		const newItems = JSON.stringify(newItemCount);

		const newCart = cart.filter((cart) => cart.id !== id);

		const product = {
			id: id,
			name: name,
			price: price,
			items: newItems,
			image: image,
		};

		newCart.push(product);
		saveToStorage("cart", newCart);
	}
}
