export function populateForm(details) {
	const title = document.querySelector("#title");
	const price = document.querySelector("#price");
	const description = document.querySelector("#description");
	const idInput = document.querySelector("#id");

	let image = document.querySelector(".exsistingImg");

	const featuredSlider = document.querySelector(".featured span");
	const uploadImage = document.querySelector(".uploadImage");

	const altText = document.querySelector("#altText");

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
		const imageUrl = details.image.formats.thumbnail.url;
		image.src = imageUrl;

		if (details.image.alternativeText) {
			exsistingImg.alt = details.image.alternativeText;
		} else if (details.image.name) {
			image.alt = details.image.name;
		} else {
			image.alt = "";
		}

		if (details.image.alternativeText) {
			altText.value = details.image.alternativeText;
		} else if (details.image.name) {
			altText.value = details.image.name;
		} else {
			altText.value = "";
		}
	}

	if (details.featured) {
		featuredSlider.classList.add("active");
	} else {
		featuredSlider.classList.remove("active");
	}
}
