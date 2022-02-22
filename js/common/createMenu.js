import { getUserName } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
	const container = document.querySelector(".menu-container nav");

	const { pathname } = document.location;
	const username = getUserName();

	let authLink = ` <a href= "login.html"  class = "${
		pathname === "/login.html" ? "active" : ""
	}">Login</a>`;

	if (username) {
		authLink = `  <a href= "/add.html" class = "${
			pathname === "/add.html" ? "active" : ""
		}">Add Product</a>
        <button id= "logout">Logout ${username}</button>`;
	}

	container.innerHTML = `<ul><li><a href= "/" class = "${
		pathname === "/" || pathname === "/index.html" ? "active" : ""
	}">Home</a></li>
                            <li><a href= "products.html"  class = "${
															pathname === "/products.html?" ? "active" : ""
														}">Products</a></li>
							<li>${authLink}</li>
							</ul>
							
							
							
                            `;

	logoutButton();
}
