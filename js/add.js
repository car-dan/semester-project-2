import createMenu from "./common/createMenu.js";
import displayMessage from "./common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

const token = getToken();

if (!token) {
	location.href = "/ ";
}

createMenu();

//image loading move to anoter file

const fileInput = document.querySelector(`input[type="file"]`);
const preview = document.querySelector(`img.preview`);
const reader = new FileReader();

function handleEvent(e) {
	if (e.type === "load") {
		preview.src = reader.result;
	}
}

function addListeners(reader) {
	reader.addEventListener("loadstart", handleEvent);
	reader.addEventListener("load", handleEvent);
	reader.addEventListener("loadendt", handleEvent);
	reader.addEventListener("progress", handleEvent);
	reader.addEventListener("error", handleEvent);
	reader.addEventListener("abort", handleEvent);
}

function handleSelected(e) {
	const selectedFile = fileInput.files[0];
	console.log(selectedFile);
	if (selectedFile) {
		addListeners(reader);
		reader.readAsDataURL(selectedFile);
	}
}

console.log(fileInput);

fileInput.addEventListener("change", handleSelected);

//image load end

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

console.log(reader);

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
