import displayMessage from "./common/displayMessage.js";
import { baseUrl } from "./settings/api.js";
import { saveToken, saveUser } from "./utils/storage.js";
import createMenu from "./common/createMenu.js";

createMenu();

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(e) {
	e.preventDefault();

	message.innerHTML = "";

	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();

	if (usernameValue.length === 0 || passwordValue.length === 0) {
		return displayMessage("warning", "invalid values", ".message-container");
	}

	doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
	const url = baseUrl + "/auth/local";

	const data = JSON.stringify({ identifier: username, password: password });

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const respons = await fetch(url, options);
		const json = await respons.json();

		if (json.user) {
			displayMessage("sucsess", "Logged in", ".message-container");

			saveToken(json.jwt);
			saveUser(json.user);
			setTimeout(function () {
				location.href = "/";
			}, 3000);
		}

		if (json.error) {
			displayMessage("warning", "Invalid login details", ".message-container");
		}
	} catch (error) {
		console.log(error);
	}
}
