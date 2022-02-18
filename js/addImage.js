import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./common/displayMessage.js";

const token = getToken();

const formElement = document.querySelector("form");

formElement.addEventListener("submit", (e) => {
	e.preventDefault();

	addProduct(formElement);
});

async function addProduct(file) {
	const url = baseUrl + "/api/upload";
	const data = JSON.stringify({ image: file });
	// const data = JSON.stringify({
	// 	image: file,
	// });
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

		// if (json.created_at) {
		// 	displayMessage("sucsess", "Product created", ".message-container");
		// 	form.reset();
		// }

		// if (json.error) {
		// 	displayMessage("error", json.message, ".message-container");
		// }
	} catch (error) {
		// displayMessage("error", "an error ocurred", ".message-container");
		console.log(error);
	}
}
