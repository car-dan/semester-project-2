import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";

export async function deleteImage(id) {
	console.log(id);

	const url = baseUrl + "/upload/files/" + id;
	const token = getToken();

	const options = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	try {
		const respons = await fetch(url, options);
		const json = await respons.json();
		location.href = "/";
		console.log(json);
	} catch (error) {
		console.log(error);
	}
}
