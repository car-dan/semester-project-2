import { getUserName } from "./storage.js";

export function renderProducts(products) {
	const container = document.querySelector(".products-container");
	const username = getUserName();

	let authLink = "detail.html?id=";

	if (username) {
		authLink = "edit.html?id=";
	}

	container.innerHTML = "";
	products.forEach(function (product) {
		container.innerHTML += `
				<div class="product">
    					<h5 class="productTitle">${product.title}</h5>
    					<p class="card-text">${product.price}</p>
    					<a href="${authLink}${product.id}" class="btn btn-primary">Go somewhere</a>
                        <button class = "addCart" data-id="${product.id}" data-name="${product.title}" data-price="${product.price}" data-number="1"><i class="fa-solid fa-cart-arrow-down"></i>Add to cart</button>
				</div>
                     `;
	});
}
