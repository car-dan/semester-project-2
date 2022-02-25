import createMenu from "./common/createMenu.js";
import { getToken } from "./utils/storage.js";
import { loadProduct } from "./editPage/loadProduct.js";

const token = getToken();

if (!token) {
	location.href = "/ ";
}

createMenu();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

if (!id) {
	document.location.href = "/";
}

loadProduct(id);
