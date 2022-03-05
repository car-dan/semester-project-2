import createMenu from "./common/createMenu.js";
import { getFromStorage } from "./utils/storage.js";
import { renderCart } from "./cart/renderCart.js";
import { removeCartItem } from "./cart/removeCartItem.js";



createMenu();

const cart = getFromStorage("cart");

renderCart(cart);

