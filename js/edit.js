import createMenu from "./common/createMenu.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./index/products/deleteButton.js";
import { addImage } from "./addImage.js";
import { deleteImage } from "./delete/deleteImage.js";

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

const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");
const exsistingImg = document.querySelector(".exsistingImg");
const featured = document.querySelector(".featured");
const featuredSlider = document.querySelector(".featured span");
const uploadImage = document.querySelector(".uploadImage");

featured.addEventListener("click", toggleFeatured);

function toggleFeatured(e) {
	featuredSlider.classList.toggle("active");
}

(async function () {
	try {
		const respons = await fetch(productUrl);
		const details = await respons.json();
		console.log(details);

		idInput.value = details.id;

		if (details.title) {
			title.value = details.title;
		} else {
			title.value = "";
		}
		if (details.price) {
			price.value = details.price;
		} else {
			price.value = 0;
		}
		if (details.description) {
			description.value = details.description;
		} else {
			description.value = "";
		}
		if (details.image) {
			const imageUrl = baseUrl + details.image.formats.thumbnail.url;
			exsistingImg.src = imageUrl;
			uploadImage.style.display = "none";
			deleteImage(details.image.id);
		} else {
			uploadImage.style.display = "block";
			const addImage = document.querySelector(".add-imgContainer");
			addImage.innerHTML = `<button class="addImage">Add Image</button>`;
		}

		if (details.featured || details.featured === "null") {
			featuredSlider.classList.add("active");
		}

		deleteButton(details.id);
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
	let featuredValue;

	if (featuredSlider.classList.contains("active")) {
		featuredValue = true;
	} else {
		featuredValue = false;
	}

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
	updateProduct(
		titleValue,
		priceValue,
		descriptionValue,
		idValue,
		featuredValue
	);
}

const addImageButton = document.querySelector(".addImage");
if (addImageButton) {
	const file = document.querySelector("#image").files[0];
	const id = document.querySelector(".")
	addImageImageButton.addEventListener("click", addImage(file, ));
}



async function updateProduct(title, price, description, id, featured) {
	const url = baseUrl + "/products/" + id;
	console.log(featured);
	const data = JSON.stringify({
		title: title,
		price: price,
		description: description,
		featured: featured,
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

		const fileInput = document.querySelector("#image");
		const file = fileInput.files[0];
		console.log(json.image.id);

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
