const fileInput = document.querySelector(".file-input"),
chooseImgBtn = document.querySelector(".choose-img");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

chooseImgBtn.addEventListener("click", () => fileInput.click());