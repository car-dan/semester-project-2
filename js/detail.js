import { baseUrl } from "./settings/api.js";
import createMenu from "./common/createMenu.js";

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
		const imgUrl = baseUrl + detail.image.formats.thumbnail.url;

		container.innerHTML = `
                            <h1>${detail.title}</h1>
                            <p>${detail.description}</p>
                            <img src="${imgUrl}" alt = "${detail.image.alternativeText}"></img>
                            <p>${detail.price}kr</p>
                            <button>Add to cart</button>
                            `;
	} catch (error) {
		displayMessage("error", error, ".detail-container");
	}
})();
