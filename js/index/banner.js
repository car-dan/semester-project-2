import { baseUrl } from "../settings/api.js";
import displayMessage from "../common/displayMessage.js";

const bannerUrl = baseUrl + "/" + "home";

export async function banner() {
	const bannerContainer = document.querySelector(".banner-container");

	bannerContainer.innerHTML = "";

	try {
		const respons = await fetch(bannerUrl);
		const json = await respons.json();
		console.log(json.hero_banner.formats.medium.url);

		const bannerImg = json.hero_banner.formats.medium.url;
		const bannerImgUrl = bannerImg;

		bannerContainer.innerHTML = `
		 <img src ="${bannerImgUrl}" alt ="${json.hero_banner_alt_text}";><img>`;
	} catch (error) {
		displayMessage("error", error, ".product-container");
	}
}
