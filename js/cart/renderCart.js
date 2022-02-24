import displayMessage from "../common/displayMessage.js";
import { removeCartItem } from "./removeCartItem.js";
import { updateItemCount } from "./updateItemCount.js";
import { baseUrl } from "../settings/api.js";

export function renderCart(cart) {
	const container = document.querySelector(".cart-container");
	const totalContainer = document.querySelector(".total-container");
	let totalPrice = 0;

	container.innerHTML = "";
	totalContainer.innerHTML = "";

	if (cart && cart.length) {
		cart.forEach(function (product) {
			const productlink = "detail.html?id=" + product.id;
			const imageUrl = baseUrl + `${product.image}`;
			const productsPrice = parseFloat(`${product.price}`);
			const items = parseFloat(`${product.items}`);
			const itemsPrice = productsPrice * items;
			itemsPrice.toFixed(2);

			container.innerHTML += `
                            <div class="cart-item">
								<div class="cart-info">
									<div class="cart-image">
										<a href ="${productlink}">
											<img src="${imageUrl}"/>
										</a>
									</div>
                                	<div class="cart-name">
										<a href ="${productlink}">
                                    		<h2>${product.name}</h2> 
										</a>  
                                	</div>
									<div class="quantity">
										<i class="fa-solid fa-minus" data-id="${product.id}" data-image="${product.image}" data-name="${product.name}" data-price="${product.price}" data-items="${product.items}"></i>
                                    	<label for="quantity"></label>
                                    	<input type="number" class="quantity" name="quantity" min="1"  max="99" value="${product.items}" data-id="${product.id}" data-price="${product.price}" data-items="${product.items}"></input>
										<i class="fa-solid fa-plus" data-id="${product.id}" data-image="${product.image}" data-name="${product.name}" data-price="${product.price}" data-items="${product.items}"></i>
										
                              		</div>
									<div class="remove">
										<i class="fa-solid fa-x" data-id="${product.id}"></i>
									</div>
									
								</div>
								<div class="cart-price">
										<p class = "itemPrice"><span  data-id="${product.id}">${itemsPrice}</span>-,</p>
								</div>
								
                            </div> 
							<hr>   
                `;
			totalPrice = totalPrice + itemsPrice;
			totalPrice.toFixed(2);
			return totalPrice;
		});
		totalContainer.innerHTML = `<p>Total price: </p>
                                    <span>${totalPrice},-</span>
									<hr>
                                    `;
	} else {
		displayMessage("error", "no items in cart", ".total-container");
	}
	removeCartItem(cart);
	updateItemCount(cart);
}
