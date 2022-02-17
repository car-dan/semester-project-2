import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";

export default function deleteButton(id) {
	const container = document.querySelector(".delete-container");

	container.innerHTML = `<button type = "button" class= "delete">Delete</button>`;

	const button = document.querySelector("button.delete");

	button.onclick = async function () {
		console.log(id);

		const doDelete = confirm("Are you sure you want to delete this?");

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
				location.href = "/";
				console.log(json);
			} catch (error) {
				console.log(error);
			}
		}
	};
}
