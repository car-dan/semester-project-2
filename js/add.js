import createMenu from "./common/createMenu.js";
import displayMessage from "./common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

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
let newImage;

const previewContainer = document.querySelector("#displayImage");
const previewImage = document.querySelector(".image-preview__image");
const previewDefaultText = document.querySelector(
	".image-preview__defult-text"
);

fileInput.addEventListener("change", function () {
	const file = fileInput.files[0];

	if (file) {
		const reader = new FileReader();

		previewDefaultText.style.display = "none";
		previewImage.style.display = "block";

		reader.addEventListener("load", function () {
			console.log(this);
			previewImage.setAttribute("src", this.result);
			newImage = reader.result;
			console.log(newImage);
			return newImage;
		});

		reader.readAsDataURL(file);
	} else {
		previewDefaultText.style.display = null;
		previewImage.style.display = null;
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

	if (
		titleValue.lenght === 0 ||
		priceValue.length === 0 ||
		isNaN(priceValue) ||
		descriptionValue.lenght === 0
	) {
		return displayMessage("warning", "please emty", ".message-container");
	}
	console.log(titleValue);
	console.log(priceValue);
	console.log(descriptionValue);

	addProduct(titleValue, priceValue, descriptionValue);
}

async function addProduct(title, price, description) {
	const url = baseUrl + "/products";
	console.log(title);
	console.log(price);
	console.log(description);

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
			console.log(json);
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
