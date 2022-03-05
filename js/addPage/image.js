// export function addImage() {
// 	const fileInput = document.querySelector(`input[type="file"]`);
// 	const preview = document.querySelector(`img.preview`);
// 	const reader = new FileReader();

// 	fileInput.addEventListener("change", handleSelected);

// 	function handleEvent(e) {
// 		if (e.type === "load") {
// 			preview.src = reader.result;
// 		}
// 	}

// 	function addListeners(reader) {
// 		reader.addEventListener("loadstart", handleEvent);
// 		reader.addEventListener("load", handleEvent);
// 		reader.addEventListener("loadendt", handleEvent);
// 		reader.addEventListener("progress", handleEvent);
// 		reader.addEventListener("error", handleEvent);
// 		reader.addEventListener("abort", handleEvent);
// 	}

// 	function handleSelected(e) {
// 		const selectedFile = fileInput.files[0];
// 		if (selectedFile) {
// 			addListeners(reader);
// 			reader.readAsDataURL(selectedFile);
// 		}
// 	}
// }


