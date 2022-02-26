import { renderProducts } from "./renderProducts.js";

export function searchProducts(products) {
	const search = document.querySelector(".search");
	const container = document.querySelector(".products");

	search.onkeyup = function (e) {
		const searchValue = e.target.value.trim().toLowerCase();

		const filterProducts = products.filter(function (product) {
			if (product.title.toLowerCase().includes(searchValue)) {
				return true;
			}
		});

		console.log(filterProducts);

		renderProducts(filterProducts);
	};
}
