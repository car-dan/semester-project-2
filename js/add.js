import createMenu from "./common/createMenu.js";
import displayMessage from "./common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import { addImage } from "./addPage/image.js";

const token = getToken();

if (!token) {
	location.href = "/ ";
}

createMenu();
addImage();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(e) {
	e.preventDefault();

	message.innerHTML = "";

	const titleValue = title.value.trim();
	const priceValue = parseFloat(price.value);
	const descriptionValue = description.value.trim();
	// const image = new FormData();

	// FormData.append("image", fileInput.files[0]);

	if (
		titleValue.lenght === 0 ||
		priceValue.length === 0 ||
		isNaN(priceValue) ||
		descriptionValue.lenght === 0
	) {
		return displayMessage("warning", "please emty", ".message-container");
	}

	addProduct(titleValue, priceValue, descriptionValue);
}

async function addProduct(title, price, description) {
	const url = baseUrl + "/products";

	const data = JSON.stringify({
		title: title,
		price: price,
		description: description,
	});

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const respons = await fetch(url, options);
		const json = await respons.json();

		if (json.created_at) {
			displayMessage("sucsess", "Product created", ".message-container");
			form.reset();
		}

		if (json.error) {
			displayMessage("error", json.message, ".message-container");
		}
	} catch (error) {
		displayMessage("error", "an error ocurred", ".message-container");
	}
}
