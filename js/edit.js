import createMenu from "./common/createMenu.js";
import { baseUrl } from "./settings/api.js";
import displayMessage from "./common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import deleteButton from "./index/products/deleteButton.js";
import { addImage } from "./addImage.js";
import { deleteImage } from "./delete/deleteImage.js";
import { loadProduct } from "./editPage/loadProduct.js";

const token = getToken();

// if (!token) {
// 	location.href = "/ ";
// }

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

// if (!id) {
// 	document.location.href = "/";
// }

loadProduct(id);


// // const addImageButton = document.querySelector(".addImage");
// // if (addImageButton) {
// // 	const file = document.querySelector("#image").files[0];
// // 	const id = document.querySelector(".");
// // 	addImageImageButton.addEventListener("click", addImage(file));
// // }

