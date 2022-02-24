import { getFromStorage, saveToStorage } from "../utils/storage.js";
import { renderCart } from "./renderCart.js";

export function updateItemCount(product) {
	const upButton = document.querySelectorAll(".fa-plus");
	const downButton = document.querySelectorAll(".fa-minus");

	upButton.forEach((button) => {
		button.addEventListener("click", handleChange);
	});

	downButton.forEach((button) => {
		button.addEventListener("click", handleChange);
	});
}

function handleChange() {
	const id = this.dataset.id;
	const name = this.dataset.name;
	const price = this.dataset.price;
	const items = this.dataset.items;
	const image = this.dataset.image;

	const cart = getFromStorage("cart");

	const oldProduct = cart.filter(function (cart) {
		if (cart.id === id) {
			return true;
		}
	});

	let newCount;

	if (this.className === "fa-solid fa-plus") {
		if (oldProduct[0].items < 100) {
			newCount = parseFloat(oldProduct[0].items) + 1;
		} else {
			newCount = parseFloat(oldProduct[0].items);
		}
	} else {
		if (oldProduct[0].items >= 2) {
			newCount = parseFloat(oldProduct[0].items) - 1;
		} else {
			const newCart = cart.filter((cart) => cart.id !== id);

			saveToStorage("cart", newCart);
			renderCart(newCart);
			return;
		}
	}

	const newCart = cart.filter((cart) => cart.id !== id);
	const product = {
		id: id,
		name: name,
		price: price,
		items: newCount,
		image: image,
	};

	newCart.push(product);
	saveToStorage("cart", newCart);

	const newPrice = parseFloat(price) * parseFloat(newCount);

	const priceContainer = document.querySelectorAll(".itemPrice span");
	const totalPriceContainer = document.querySelector(".total-container span");
	let totalPrice = 0;

	priceContainer.forEach((price) => {
		if (price.dataset.id === id) {
			console.log(price.innerHTML);
			price.innerHTML = newPrice.toFixed(2);
		}
		return (totalPrice = totalPrice + parseFloat(price.innerHTML));
	});

	totalPriceContainer.innerHTML = totalPrice;

	console.log(totalPrice);
	const countContainer = document.querySelectorAll(".quantity");

	countContainer.forEach((count) => {
		if (count.dataset.id === id) {
			count.value = newCount;
		}
	});
}
