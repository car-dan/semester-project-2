import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import { deleteImage } from "../delete/deleteImage.js";
import deleteButton from "../index/products/deleteButton.js";

export async function loadProducts(id) {
	const productUrl = baseUrl + "/products/" + id;

	const form = document.querySelector("form");
	const loading = document.querySelector(".loading");

	//
	// const uploadImage = document.querySelector(".uploadImage");

	try {
		const respons = await fetch(productUrl);
		const details = await respons.json();
		console.log(details);

		populateForm(details);
		deleteButton(details.id);
	} catch (error) {
		console.log(error);
	} finally {
		loading.style.display = "none";
		form.style.display = "block";
	}
}

function populateForm(details) {
	const idInput = document.querySelector("#id");
	const title = document.querySelector("#title");
	const price = document.querySelector("#price");
	const description = document.querySelector("#description");
	const exsistingImg = document.querySelector(".exsistingImg");
	// const featuredSlider = document.querySelector(".featured span");

	idInput.value = details.id;
	title.value = details.title;
	price.value = details.price;
	description.value = details.description;

	if (details.image) {
		const imageUrl = baseUrl + details.image.formats.thumbnail.url;
		exsistingImg.src = imageUrl;
		deleteImage(details.image.id);
	} else {
		uploadImage.style.display = "block";
	}

	// if (details.featured) {
	// 	featuredSlider.classList.add("active");
	// }
}

// function submitForm() {
// 	console.log("button clicked");
// 	message.innerHTML = "";
// 	const titleValue = title.value.trim();
// 	const priceValue = parseFloat(price.value);
// 	const descriptionValue = description.value.trim();
// 	const idValue = idInput.value;
// 	let featuredValue;

// 	if (featuredSlider.classList.contains("active")) {
// 		featuredValue = true;
// 		console.log(featuredValue);
// 	} else {
// 		featuredValue = false;
// 		console.log(featuredValue);
// 	}
// }
