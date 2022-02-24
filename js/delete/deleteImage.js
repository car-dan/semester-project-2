import { baseUrl } from "../settings/api.js";
import { getToken } from "../utils/storage.js";
import displayMessage from "../common/displayMessage.js";

export function deleteImage(id) {
	const container = document.querySelector(".delete-imgContainer");

	container.innerHTML = `<button type = "button" class= "deleteImage">Delete Image</button>`;
	const button = document.querySelector("button.deleteImage");

	button.onclick = async function () {
		console.log(id);

		const doDelete = confirm("Are you sure you want to delete this?");

		if (doDelete) {
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
				if (json) {
					displayMessage("sucsess", "Image deleted", ".message-container");
					setTimeout(function () {
						location.reload();
					}, 1500);
				} else {
					displayMessage("error", "an error ocurred", ".message-container");
				}
			} catch (error) {
				displayMessage("error", "an error ocurred", ".message-container");
			}
		}
	};
}
