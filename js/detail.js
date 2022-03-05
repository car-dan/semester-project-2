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
		const imgUrl = detail.image.formats.small.url;

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
										data-image="${detail.image.formats.thumbnail.url}" data-name="${detail.title}" data-price="${detail.price}" data-number="1">
											<span class="addToCart">Add to cart</span>
											<span class="added"></span>
											<i class="fa-solid fa-cart-arrow-down"></i>
									</button>
								</div>	
							</div>`;
		animateAddButton();
		addToCart(detail);
	} catch (error) {
		displayMessage("error", error, ".detail-container");
	}
})();

function animateAddButton() {
	const cartButton = document.querySelector(".addCart");
	const added = document.querySelector(".added");

	cartButton.addEventListener(`click`, cartClick);

	function cartClick() {
		let button = this;
		button.classList.add(`clicked`);
		added.innerHTML = `Added to cart`;
		setTimeout(function () {
			button.classList.remove(`clicked`);
		}, 3000);

		const cartItemContainer = document.querySelector(".nav-cart-count");
		let cartCount = parseFloat(cartItemContainer.innerHTML) + 1;
		cartItemContainer.innerHTML = cartCount;
	}
}
