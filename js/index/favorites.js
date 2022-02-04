import { baseUrl } from "../settings/api.js";
import displayMessage from "../common/displayMessage.js";

const productsUrl = baseUrl + "/" + "products";

export async function favorites() {
	const container = document.querySelector(".product-container");

	try {
		const respons = await fetch(productsUrl);
		const json = await respons.json();
		container.innerHTML = "";

		console.log(json);
		json.forEach(function (favorite) {
			if (favorite.featured) {
				const imgUrl = baseUrl + favorite.image.formats.thumbnail.url;

				container.innerHTML += `
				<div class="favorite" style="width: 18rem;">
  					<img src="${imgUrl}" class="card-img-top" alt="${favorite.image.alternativeText}">
  					<div class="card-body">
    					<h5 class="card-title">${favorite.title}</h5>
    					<p class="card-text">${favorite.price}</p>
    					<a href="detail.html?id=${favorite.id}" class="btn btn-primary">Go somewhere</a>
  					</div>
				</div>
                     `;
			}
		});
	} catch (error) {
		displayMessage("error", error, ".product-container");
	}
}
