import { getFromStorage, getUserName } from "../utils/storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
	const mainContainer = document.querySelector(".main-links");
	const container = document.querySelector(".nav-links");

	const { pathname } = document.location;
	const username = getUserName();
	let button = "";
	let user = "";
	let logOut = "";

	let authLink = `<a href= "login.html"  class = "${
		pathname === "/login.html" ? "active" : ""
	}"><i class="fa-solid fa-user"></i>Login</a>`;

	if (username) {
		authLink = "";
		logOut = `<button id= "logout"><i class="fa-solid fa-arrow-right-from-bracket"></i><span>Logout</span></button>`;
		user = `Hi ${username}`;
	}

	mainContainer.innerHTML = `
								<div class="user">
									${authLink}
									<p class="userName">${user}</p>
								</div>
								<div class="logOut"> ${logOut}</div>
								<div class="nav-cart">
									<a href="cart.html">
										<i class="fa-solid fa-basket-shopping"></i>
										<span class="nav-cart-count">0</span>
									</a>
								</div>
								
								
	`;

	container.innerHTML = `
							<ul>
								<li><a href= "/" class = "${
									pathname === "/" || pathname === "/index.html" ? "active" : ""
								}">Home</a></li>
                            		<li><a href= "products.html"  class = "${
																	pathname === "/products.html" ? "active" : ""
																}">Products</a></li>
							</ul>
							
                            `;
	if (username) {
		const links = document.querySelector(".nav-links ul");
		links.innerHTML += ` <li> <a href= "/add.html" class = "${
			pathname === "/add.html" ? "active " : ""
		}">Add Product</a></li>`;
	}

	logoutButton();
	navSlide();

	const cartItemContainer = document.querySelector(".nav-cart-count");

	const cartItems = getFromStorage("cart");

	if (cartItems) {
		let cartItemCount = 0;
		cartItems.forEach(function (item) {
			cartItemCount += parseInt(item.items);
		});
		cartItemContainer.innerHTML = cartItemCount;
	}
}

function navSlide() {
	const burger = document.querySelector(".hamburger");
	const nav = document.querySelector(".nav-links");
	const navLinks = document.querySelectorAll(`.nav-links li`);

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
