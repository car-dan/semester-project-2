import displayMessage from "../common/displayMessage.js";
import { removeCartItem } from "./removeCartItem.js";

export function renderCart(cart) {
	const container = document.querySelector(".cart-container");
	const totalContainer = document.querySelector(".total-container");
	let totalPrice = 0;

	container.innerHTML = "";
	totalContainer.innerHTML = "";

	if (cart && cart.length) {
		cart.forEach(function (product) {
			const productsPrice = parseFloat(`${product.price}`);
			const items = parseFloat(`${product.items}`);
			const itemsPrice = productsPrice * items;

			container.innerHTML += `
                            <class="cart-item">
                                <div class="cart-image"></div>
                                <div class="cart-info">
                                    <h2>${product.name}</h2>
                                    <p>${itemsPrice}</p>
                                </div>
                                <div class="quantity">
                                    <label for="quantity"></label>
                                    <input type="number" id="quantity" name="quantity" min="1"  max="99" value="${product.items}"></input>
                                        <div class="arrows">
                                            <i class="fa-solid fa-arrow-up"></i>
                                         <i class="fa-solid fa-arrow-down"></i>
                                        </div>
                                    <i class="fa-solid fa-x" data-id="${product.id}"></i>
                                </div>
                            </div>    
                `;
			totalPrice = totalPrice + itemsPrice;
			return totalPrice;
		});
		totalContainer.innerHTML = `<p>Total price: ${totalPrice}$</p>`;
	} else {
		displayMessage("error", "no items in cart", ".total-container");
	}
	removeCartItem(cart);
}
