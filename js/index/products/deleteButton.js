import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";
import displayMessage from "../../common/displayMessage.js";

export default function deleteButton(id) {
	const container = document.querySelector(".delete-container");

	container.innerHTML = `<button type = "button" class= "delete">Delete</button>`;

	const button = document.querySelector("button.delete");

	button.onclick = async function () {
		const doDelete = confirm("Are you sure you want to delete this product?");

		if (doDelete) {
			const url = baseUrl + "/products/" + id;

			const token = getToken();

			const options = {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const respons = await fetch(url, options);
				const json = await respons.json();

				if (json) {
					displayMessage("sucsess", "Product deleted", ".message-container");
					setTimeout(function () {
						location.href = "/";
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
