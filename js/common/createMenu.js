import { getUserName } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
	const container = document.querySelector(".links");

	const { pathname } = document.location;
	const username = getUserName();
	let button = "";

	let authLink = `<a href= "login.html"  class = "${
		pathname === "/login.html" ? "active" : ""
	}">Login</a>`;

	if (username) {
		authLink = `<button id= "logout">Logout ${username}</button>`;
	}

	container.innerHTML = `<div class="nav-links">
								<ul class="hamburgerLinks">
									<li><a href= "/" class = "${
										pathname === "/" || pathname === "/index.html"
											? "active"
											: ""
									}">Home</a></li>
                            		<li><a href= "products.html"  class = "${
																	pathname === "/products.html?" ? "active" : ""
																}">Products</a></li>
								</ul>
								<ul class="links">
									<li>${authLink}</li>
									<li><a href="cart.html" class="${
										pathname === "/cart.html" ? "active" : ""
									}"><i class="fa-solid fa-cart-shopping"></i></a></li>
									
								</ul>

							</div>
							
							
							
                            `;
	if (username) {
		const links = document.querySelector(".hamburgerLinks");
		links.innerHTML += ` <li> <a href= "/add.html" class = "${
			pathname === "/add.html" ? "active " : ""
		}">Add Product</a></li>`;
	}

	logoutButton();
	navSlide();
}

function navSlide() {
	const burger = document.querySelector(".hamburger");
	const nav = document.querySelector(".hamburgerLinks");
	const navLinks = document.querySelectorAll(`.hamburgerLinks li`);

	burger.addEventListener("click", () => {
		nav.classList.toggle("nav-active");

		navLinks.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = "";
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${
					index / 7 + 0.5
				}s`;
			}
		});

		burger.classList.toggle(`toggle`);
	});
}
