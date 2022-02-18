import displayMessage from "../common/displayMessage.js";
import { removeCartItem } from "./removeCartItem.js";
import { updateItemCount } from "./updateItemCount.js";

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
			itemsPrice.toFixed(2);

			container.innerHTML += `
                            <class="cart-item">
                                <div class="cart-image"></div>
                                <div class="cart-info">
                                    <h2>${product.name}</h2>
                                    <p class = "itemPrice"><span  data-id="${product.id}">${itemsPrice}</span>$</p>
                                </div>
                                <div class="quantity">
                                    <label for="quantity"></label>
                                    <input type="number" class="quantity" name="quantity" min="1"  max="99" value="${product.items}" data-id="${product.id}" data-price="${product.price}" data-items="${product.items}"></input>
                                        <div class="arrows">
                                            <i class="fa-solid fa-arrow-up" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-items="${product.items}"></i>
                                         <i class="fa-solid fa-arrow-down" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-items="${product.items}"></i>
                                        </div>
                                    <i class="fa-solid fa-x" data-id="${product.id}"></i>
                                </div>
                            </div>    
                `;
			totalPrice = totalPrice + itemsPrice;
			totalPrice.toFixed(2);
			return totalPrice;
		});
		totalContainer.innerHTML = `<p>Total price: </p>
                                    <span>${totalPrice}</span>
                                    <p>$</p>`;
	} else {
		displayMessage("error", "no items in cart", ".total-container");
	}
	removeCartItem(cart);
	updateItemCount(cart);
}
