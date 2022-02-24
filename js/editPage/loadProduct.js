import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import deleteButton from "../index/products/deleteButton.js";
import { addImage } from "../addImage.js";
import { deleteImage } from "../delete/deleteImage.js";
import displayMessage from "../common/displayMessage.js";

export async function loadProduct(id) {
	const productUrl = baseUrl + "/products/" + id;
	const form = document.querySelector("form");
	const title = document.querySelector("#title");
	const price = document.querySelector("#price");
	const description = document.querySelector("#description");
	const idInput = document.querySelector("#id");
	const message = document.querySelector(".message-container");
	const loading = document.querySelector(".loading");
	let exsistingImg = document.querySelector(".exsistingImg");
	const featured = document.querySelector(".featured");
	const featuredSlider = document.querySelector(".featured span");
	const uploadImage = document.querySelector(".uploadImage");
	const preview = document.querySelector(".preview");
	const previewImg = document.querySelector(".exsistingImg");
	const altText = document.querySelector("#altText");

	try {
		const respons = await fetch(productUrl);
		const details = await respons.json();

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
			if (details.image.alternativeText) {
				exsistingImg.alt = details.image.alternativeText;
			} else if (details.image.name) {
				exsistingImg.alt = details.image.name;
			} else {
				exsistingImg.alt = "";
			}
			uploadImage.style.display = "none";
			deleteImage(details.image.id);

			if (details.image.alternativeText) {
				altText.value = details.image.alternativeText;
			} else if (details.image.name) {
				altText.value = details.image.name;
			} else {
				altText.value = "";
			}
		} else {
			uploadImage.style.display = "block";
			const addImageContainer = document.querySelector(".add-imgContainer");
			preview.style.display = "none";
			addImageContainer.innerHTML = `<button class="addImage">Add Image</button>`;
			const fileInput = document.querySelector("#image");
			fileInput.addEventListener("change", function () {
				const file = fileInput.files[0];
				if (file) {
					const reader = new FileReader();

					preview.style.display = "block";

					reader.addEventListener("load", function () {
						exsistingImg.src = reader.result;
					});

					reader.readAsDataURL(file);
				} else {
					previewDefaultText.style.display = null;
					previewImage.style.display = null;
					previewImage.setAttribute("src", "");
				}
			});

			addImageContainer.addEventListener("click", (e) => {
				e.preventDefault();
				const file = fileInput.files[0];
				if (file) {
					addImage(file, details, altText.value);
				} else {
					return displayMessage(
						"warning",
						"No image chosen",
						".message-container"
					);
				}
			});
		}

		if (details.featured) {
			featuredSlider.classList.add("active");
		} else {
			featuredSlider.classList.remove("active");
		}

		featured.addEventListener("click", (e) => {
			e.preventDefault();
			document.querySelector(".featured span").classList.toggle("active");
		});

		deleteButton(details.id);

		const submit = document.querySelector("#update");

		submit.addEventListener("click", (e) => {
			e.preventDefault();

			const titleValue = title.value.trim();
			const priceValue = parseFloat(price.value);
			const descriptionValue = description.value.trim();
			const idValue = idInput.value;

			const featuredSlider = document.querySelector(".featured span");
			let featuredValue;

			if (featuredSlider.classList.contains("active")) {
				featuredValue = true;
			} else {
				featuredValue = false;
			}

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
		});
	} catch (error) {
		displayMessage("error", "an error ocurred", ".message-container");
	} finally {
		loading.style.display = "none";
		form.style.display = "block";
	}
}

async function updateProduct(title, price, description, id, featured) {
	const url = baseUrl + "/products/" + id;
	const token = getToken();

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
		const response = await fetch(url, options);
		const json = await response.json();

		if (json) {
			displayMessage("sucsess", "Product updated", ".message-container");
			setTimeout(function () {
				location.reload();
			}, 2000);
		}

		if (json.error) {
			displayMessage("error", json.message, ".message-container");
		}
	} catch (error) {
		displayMessage("error", error, ".message-container");
	}
}
