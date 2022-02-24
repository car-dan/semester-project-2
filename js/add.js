import createMenu from "./common/createMenu.js";
import displayMessage from "./common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import { addImage } from "./addImage.js";

const token = getToken();

if (!token) {
	location.href = "/ ";
}

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");
const fileInput = document.querySelector("#image");
const altText = document.querySelector("#altText");
let newImage;

const previewContainer = document.querySelector("#displayImage");
console.log(previewContainer);
const previewImage = document.querySelector(".image-preview__image");
const previewDefaultText = document.querySelector(
	".image-preview__defult-text"
);

fileInput.addEventListener("change", function () {
	const file = fileInput.files[0];

	if (file) {
		const reader = new FileReader();

		previewDefaultText.style.display = "none";
		previewContainer.style.display = "block";

		reader.addEventListener("load", function () {
			previewImage.setAttribute("src", this.result);
			newImage = reader.result;
			return newImage;
		});

		reader.readAsDataURL(file);
	} else {
		previewDefaultText.style.display = null;
		previewContainer.style.display = null;
		previewImage.setAttribute("src", "");
	}
});

form.addEventListener("submit", submitForm);

function submitForm(e) {
	e.preventDefault();

	message.innerHTML = "";

	const titleValue = title.value.trim();
	const priceValue = parseFloat(price.value);
	const descriptionValue = description.value.trim();
	const altTextValue = altText.value.trim();

	if (
		titleValue.lenght === 0 ||
		priceValue.length === 0 ||
		isNaN(priceValue) ||
		descriptionValue.lenght === 0 ||
		altTextValue.lenght === 0
	) {
		return displayMessage(
			"warning",
			"Please input valid information",
			".message-container"
		);
	}

	addProduct(titleValue, priceValue, descriptionValue, altTextValue);
}

async function addProduct(title, price, description, altText) {
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

		const file = fileInput.files[0];

		if (json.created_at) {
			console.log(json);
			displayMessage("sucsess", "Product created", ".message-container");

			if (file) {
				addImage(file, json, altText);
			}
			form.reset();
		}

		if (json.error) {
			displayMessage("error", json.message, ".message-container");
		}
	} catch (error) {
		displayMessage("error", "an error ocurred", ".message-container");
	}
}
