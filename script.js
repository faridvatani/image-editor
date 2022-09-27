// 20: 53 min
const fileInput = document.querySelector(".file-input"),
chooseImgBtn = document.querySelector(".choose-img"),
previewImg = document.querySelector(".preview-img img"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name");

let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    // console.log(fileInput);

    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

    });
});

fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

