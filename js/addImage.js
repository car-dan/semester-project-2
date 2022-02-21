import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./common/displayMessage.js";

const token = getToken();

const inpFile = document.querySelector("#image");
const formData = new FormData();

const title = document.querySelector("#title");

inpFile.addEventListener("change", loadFile);

function loadFile(e) {
	console.log(inpFile.files[0]);
	console.log(title.value.trim());
	formData.append("files", inpFile.files[0]);
	formData.append("alternativeText", "test, test");
	formData.append("alternativeText", "test, test");

	formData.append(`data`, JSON.stringify(title.value));
	formData.append("ref", "products");
	formData.append("refId", 53);
	formData.append("field", "image");
	addProduct(formData);
}

async function addProduct(formData) {
	const url = baseUrl + "/upload/";

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
