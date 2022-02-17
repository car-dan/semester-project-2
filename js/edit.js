import createMenu from "./common/createMenu.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./index/products/deleteButton.js";

const token = getToken();

if (!token) {
	location.href = "/ ";
}

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
	document.location.href = "/";
}

const productUrl = baseUrl + "/products/" + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUrl = document.querySelector("#imageUrl");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function () {
	try {
		const respons = await fetch(productUrl);
		const details = await respons.json();

		title.value = details.title;
		price.value = details.price;
		description.value = details.description;
		imageUrl.value = details.url;
		idInput.value = details.id;

		deleteButton(details.id);

		console.log(details);
	} catch (error) {
		console.log(error);
	} finally {
		loading.style.display = "none";
		form.style.display = "block";
	}
})();

form.addEventListener("submit", submitForm);

function submitForm(e) {
	e.preventDefault();

	message.innerHTML = "";

	const titleValue = title.value.trim();
	const priceValue = parseFloat(price.value);
	const descriptionValue = description.value.trim();
	const idValue = idInput.value;

	console.log("priceValue", priceValue);

	if (
		titleValue.length === 0 ||
		priceValue.length === 0 ||
		isNaN(priceValue) ||
		descriptionValue.length === 0
	) {
		return displayMessage(
			"warning",
			"Please supply proper values",
			".message-container"
		);
	}
	updateProduct(titleValue, priceValue, descriptionValue, idValue);
}

async function updateProduct(title, price, description, id) {
	const url = baseUrl + "/products/" + id;
	const data = JSON.stringify({
		title: title,
		price: price,
		description: description,
	});

	const options = {
		method: "PUT",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const respons = await fetch(url, options);
		const json = await respons.json();
		console.log(json);

		if (json.updatet_at) {
			displayMessage("sucsess", "Product updated", ".message-container");
		}

		if (json.error) {
			displayMessage("error", json.message, ".message-container");
		}
	} catch (error) {
		displayMessage("error", "an error ocurred", ".message-container");
	}
}
