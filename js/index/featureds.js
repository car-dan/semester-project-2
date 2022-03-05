import { baseUrl } from "../settings/api.js";
import displayMessage from "../common/displayMessage.js";
import { getUserName } from "../utils/storage.js";

const productsUrl = baseUrl + "/" + "products";

export async function featureds() {
	const container = document.querySelector(".featureds-container");

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

		json.forEach(function (featured) {
			if (featured.featured) {
				let imgUrl;
				if (featured.image) {
					imgUrl = featured.image.formats.small.url;
				} else {
					imgUrl = "";
				}

				container.innerHTML += `
				<div class="featured-container">
					<a href="${authLink}${featured.id}" class="btn btn-primary">
						<div class="featured-inner">
							<div class="featured-front">
								<img src="${imgUrl}" class="card-img-top" alt="">
							</div>
							<div class="featured-back">
								<h5 class="card-title">${featured.title}</h5>
    							<p class="card-text">${featured.price},-</p>
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
