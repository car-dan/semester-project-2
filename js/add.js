import createMenu from "./common/createMenu.js";
import displayMessage from "./common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import { renderFile } from "./utils/renderFile.js";

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
const featured = document.querySelector(".featured-container");

fileInput.addEventListener("change", renderFile);

form.addEventListener("submit", submitForm);

featured.addEventListener("click", (e) => {
	e.preventDefault();
	document.querySelector(".featured span").classList.toggle("active");
});

function submitForm(e) {
	e.preventDefault();

	message.innerHTML = "";

	const titleValue = title.value.trim();
	const priceValue = parseFloat(price.value);
	const descriptionValue = description.value.trim();
	const altTextValue = altText.value.trim();
	const file = fileInput.files[0];
	const featuredSlider = document.querySelector(".featured span");
	let featuredValue;

	if (featuredSlider.classList.contains("active")) {
		featuredValue = true;
	} else {
		featuredValue = false;
	}

	if (
		titleValue.lenght === 0 ||
		priceValue.length === 0 ||
		isNaN(priceValue) ||
		descriptionValue.lenght === 0 ||
		altTextValue.lenght === 0 ||
		!file
	) {
		return displayMessage(
			"warning",
			"Please input valid information",
			".message-container"
		);
	}

	addProduct(
		titleValue,
		priceValue,
		descriptionValue,
		altTextValue,
		file,
		featuredValue
	);
}

async function addProduct(title, price, description, altText, file, featured) {
	const url = baseUrl + "/products";
	const formData = new FormData();
	formData.append("files.image", file, altText);

	const data = {
		title: title,
		price: price,
		description: description,
		featured: featured,
	};

	formData.append("data", JSON.stringify(data));

	const options = {
		method: "POST",
		body: formData,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const respons = await fetch(url, options);
		const json = await respons.json();

		if (json.created_at) {
			console.log(json);
			displayMessage("sucsess", "Product created", ".message-container");
			setTimeout(function () {
				location.reload();
			}, 1000);
		}

		if (json.error) {
			displayMessage("error", json.message, ".message-container");
		}
	} catch (error) {
		displayMessage("error", "an error ocurred", ".message-container");
	}
}
