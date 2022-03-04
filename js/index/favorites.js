import { baseUrl } from "../settings/api.js";
import displayMessage from "../common/displayMessage.js";
import { getUserName } from "../utils/storage.js";

const productsUrl = baseUrl + "/" + "products";

export async function favorites() {
	const container = document.querySelector(".favorites-container");

	const loader = document.querySelector(".loader");

	loader.style.display = "none";

	try {
		const respons = await fetch(productsUrl);
		const json = await respons.json();
		container.innerHTML = "";

		const username = getUserName();
		let authLink = "detail.html?id=";

		if (username) {
			authLink = "edit.html?id=";
		}

		json.forEach(function (favorite) {
			if (favorite.featured) {
				let imgUrl;
				if (favorite.image) {
					imgUrl = favorite.image.formats.small.url;
				} else {
					imgUrl = "";
				}

				container.innerHTML += `
				<div class="favorite">
					<a href="${authLink}${favorite.id}" class="btn btn-primary">
						<div class="favorite-inner">
							<div class="favorite-front">
								<img src="${imgUrl}" class="card-img-top" alt="">
							</div>
							<div class="favorite-back">
								<h5 class="card-title">${favorite.title}</h5>
    							<p class="card-text">${favorite.price},-</p>
							</div>
						</div>
					</a>
  					
				</div>
                     `;
			}
		});
	} catch (error) {
		displayMessage("error", error, ".product-container");
	}
}
