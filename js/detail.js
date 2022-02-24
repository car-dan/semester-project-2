import { baseUrl } from "./settings/api.js";
import createMenu from "./common/createMenu.js";
import { addToCart } from "./utils/addToCart.js";

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
	document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;

(async function () {
	try {
		const response = await fetch(productUrl);
		const detail = await response.json();

		document.title = detail.title;

		const container = document.querySelector(".detail-container");
		const imgUrl = baseUrl + detail.image.formats.small.url;

		container.innerHTML = `
							<div class="detail-img">
								<img src="${imgUrl}" alt = "${detail.image.alternativeText}"></img>
							</div>
							<div class="detail-info">
								<div class="detail-infoText">
									<h1>${detail.title}</h1>
                            		<p>${detail.description}</p>
								</div>
								<div class="detail-infoPrice">
									<p>${detail.price},-</p>
									<button class = "addCart" data-id="${detail.id}"
									data-image="${detail.image.formats.thumbnail.url}" data-name="${detail.title}" data-price="${detail.price}" data-number="1"><i class="fa-solid fa-cart-arrow-down"></i>Add to cart</button>
								</div>	
							</div>`;

		addToCart(detail);
	} catch (error) {
		displayMessage("error", error, ".detail-container");
	}
})();
