import { baseUrl } from "../settings/api.js";
import deleteButton from "../index/products/deleteButton.js";
import displayMessage from "../common/displayMessage.js";
import { populateForm } from "./populateForm.js";
import { renderFile } from "../utils/renderFile.js";
import { checkSubmit } from "../utils/checkSubmit.js";

export async function loadProduct(id) {
	const productUrl = baseUrl + "/products/" + id;
	const form = document.querySelector("form");
	const loading = document.querySelector(".loading");
	const featured = document.querySelector(".featured");
	const fileInput = document.querySelector("#image");
	const submit = document.querySelector("#update");

	fileInput.addEventListener("change", renderFile);

	try {
		const respons = await fetch(productUrl);
		const details = await respons.json();

		populateForm(details);

		featured.addEventListener("click", (e) => {
			e.preventDefault();
			document.querySelector(".featured span").classList.toggle("active");
		});

		deleteButton(details.id);
		submit.addEventListener("click", checkSubmit);
	} catch (error) {
		displayMessage("error", "an error ocurred", ".message-container");
	} finally {
		loading.style.display = "none";
		form.style.display = "block";
	}
}
