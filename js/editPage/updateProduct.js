import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "../common/displayMessage.js";



export async function updateProduct(
	title,
	price,
	description,
	id,
	featured,
	newFormData
) {
	const url = baseUrl + "/products/" + id;
	const token = getToken();
	const formData = newFormData;

	const data = {
		title: title,
		price: price,
		description: description,
		featured: featured,
	};

	formData.append("data", JSON.stringify(data));

	const options = {
		method: "PUT",
		body: formData,
		headers: {
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
