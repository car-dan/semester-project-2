export function renderFile(e) {
	e.preventDefault();

	const previewContainer = document.querySelector(".preview");
	const image = document.querySelector(".exsistingImg");
	const fileInput = document.querySelector("#image");

	const file = fileInput.files[0];

	if (file) {
		const reader = new FileReader();

		previewContainer.style.display = "block";

		reader.addEventListener("load", function () {
			image.src = reader.result;
		});

		reader.readAsDataURL(file);
	} else {
		previewContainer.style.display = "none";
	}
}
