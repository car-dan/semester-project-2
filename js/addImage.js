import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./common/displayMessage.js";

export async function addImage(file, json, altText) {
	const token = getToken();
	const url = baseUrl + "/upload/";

	const formData = new FormData();
	formData.append("files", file, altText);

	formData.append("ref", "products");
	formData.append("refId", json.id);
	formData.append("field", "image");

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

		if (json) {
			displayMessage("sucsess", "Image uploaded", ".message-container");
			setTimeout(function () {
				location.reload();
			}, 1000);
		} else {
			displayMessage("error", "an error ocurred", ".message-container");
		}
	} catch (error) {
		displayMessage("error", "an error ocurred", ".message-container");
	}
}
