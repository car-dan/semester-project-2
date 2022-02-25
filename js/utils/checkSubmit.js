import { updateProduct } from "../editPage/updateProduct.js";
import displayMessage from "../common/displayMessage.js";

export function checkSubmit(e) {
	e.preventDefault();

	const price = document.querySelector("#price");
	const file = document.querySelector("#image").files[0];
	const titleValue = document.querySelector("#title").value.trim();
	const priceValue = parseFloat(price.value);
	const descriptionValue = document.querySelector("#description").value.trim();
	const idValue = document.querySelector("#id").value;
	const featuredSlider = document.querySelector(".featured span");

	const altTextValue = document.querySelector("#altText").value.trim();

	let featuredValue;
	const newFormData = new FormData();

	if (file) {
		newFormData.append("files.image", file, "testname");
	}

	if (featuredSlider.classList.contains("active")) {
		featuredValue = true;
	} else {
		featuredValue = false;
	}

	if (
		titleValue.length === 0 ||
		priceValue.length === 0 ||
		isNaN(priceValue) ||
		descriptionValue.length === 0 ||
		altTextValue.lenght === 0
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
		featuredValue,
		newFormData
	);
}
