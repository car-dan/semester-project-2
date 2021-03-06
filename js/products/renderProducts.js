import { getUserName } from "../utils/storage.js";

export function renderProducts(products) {
	const container = document.querySelector(".products");
	const username = getUserName();

	let authLink = "detail.html?id=";

	if (username) {
		authLink = "edit.html?id=";
	}

	container.innerHTML = "";
	products.forEach(function (product) {
		let imgUrl;
		if (product.image) {
			imgUrl = product.image.formats.small.url;
		} else {
			imgUrl = "";
		}
		container.innerHTML += `
				<div class="product">
					<a href="${authLink}${product.id}">
						<div class="product-img"><img src="${imgUrl}"></img></div>
						<div class="product-info">
							<h5>${product.title}</h5>
    						<p class="product-price">${product.price},-</p>
						</div>
                    </a>    
				</div>
                     `;
	});
}
