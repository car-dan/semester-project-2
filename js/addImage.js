import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./common/displayMessage.js";

const token = getToken();

const formElement = document.querySelector("form");
const inpFile = document.querySelector(".image");

inpFile.addEventListener("change", loadFile);

function loadFile(e) {
	const files = e.target.files;
	console.log(files);
}

formElement.addEventListener("submit", (e) => {
	e.preventDefault();
	const files = e.target.files;
	console.log(files);
	const formData = new FormData();

	formData.append(`files`, files[0]);
});

async function addProduct(data) {
	const url = baseUrl + "/upload";
	const newData = data;
	// const data = JSON.stringify({
	// 	"files.image": {
	// 		file: file,
	// 		content_type: "image/jpeg",
	// 	},
	// });
	// const data = JSON.stringify({
	// 	image: file,
	// });
	const options = {
		method: "POST",
		body: files.newData,
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
