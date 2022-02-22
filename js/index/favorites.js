import { baseUrl } from "../settings/api.js";
import displayMessage from "../common/displayMessage.js";
import { getUserName } from "../utils/storage.js";

const productsUrl = baseUrl + "/" + "products";

export async function favorites() {
	const container = document.querySelector(".product-container");

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
					imgUrl = baseUrl + favorite.image.formats.thumbnail.url;
				} else {
					imgUrl = "";
				}

				container.innerHTML += `
				<div class="favorite" style="width: 18rem;">
  					<img src="${imgUrl}" class="card-img-top" alt="">
  					<div class="card-body">
    					<h5 class="card-title">${favorite.title}</h5>
    					<p class="card-text">${favorite.price}</p>
    					<a href="${authLink}${favorite.id}" class="btn btn-primary">Go somewhere</a>
  					</div>
				</div>
                     `;
			}
		});
	} catch (error) {
		displayMessage("error", error, ".product-container");
	}
}
