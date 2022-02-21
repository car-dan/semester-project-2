import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

export async function addImage(file, json) {
	const token = getToken();
	const url = baseUrl + "/upload/";

	const formData = new FormData();
	formData.append("files", file);

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
	} catch (error) {
		console.log(error);
	}
}
