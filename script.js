const fileInput = document.querySelector(".file-input"),
chooseImgBtn = document.querySelector(".choose-img"),
previewImg = document.querySelector(".preview-img img"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterSlider = document.querySelector(".slider input"),
filterValue = document.querySelector(".filter-info .value"),
rotateOptions = document.querySelectorAll(".rotate button"),
resetFilterBtn = document.querySelector(".reset-filter"),
saveImgBtn = document.querySelector(".save-img");

let brightness = "100",
    saturation = "100",
    inversion = "0",
    grayscale = "0",
    blurry = "0",
    sepia = "0",
    transparent = "100",
    coloration = "0",
    rotate = 0,
    flipHorizontal = 1,
    flipVertical = 1;

const loadImage = () => {
    let file = fileInput.files[0]; // getting user selected file
    if(!file) return; // return if user hasn't selected file

    previewImg.src = URL.createObjectURL(file); // passing file url as preview img src
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click(); // clicking reset btn, so the filter calue reset if the user selected new img
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => { // adding click event listener to all filter buttons
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else if(option.id === "grayscale") {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        } else if(option.id === "blur") {
            filterSlider.max = "50";
            filterSlider.value = blurry;
            filterValue.innerText = `${blurry}%`;
        } else if(option.id === "sepia") {
            filterSlider.max = "100";
            filterSlider.value = sepia;
            filterValue.innerText = `${sepia}%`;
        } else if(option.id === "transparent") {
            filterSlider.max = "100";
            filterSlider.value = transparent;
            filterValue.innerText = `${transparent}%`;
        } else if(option.id === "coloration") {
            filterSlider.max = "100";
            filterSlider.value = coloration;
            filterValue.innerText = `${coloration}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); // getting selected filter button

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else if(selectedFilter.id === "grayscale") {
        grayscale = filterSlider.value;
    } else if(selectedFilter.id === "blur") {
        blurry = filterSlider.value;
    } else if(selectedFilter.id === "sepia") {
        sepia = filterSlider.value;
    } else if(selectedFilter.id === "transparent") {
        transparent = filterSlider.value;
    } else if(selectedFilter.id === "coloration") {
        coloration = filterSlider.value;
    }

    applyFilter();
}

const applyFilter = () => {
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)
    grayscale(${grayscale}%) blur(${blurry}px) sepia(${sepia}%) opacity(${transparent}%) hue-rotate(${coloration}deg)`;
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
}

rotateOptions.forEach(option => {
    option.addEventListener("click", () => { // adding click event listener to all rotate/flip buttons
        if(option.id === "left") {
            rotate -= 90; // if clicked btn is left rotate, decrement rotate value by -90
        } else if(option.id === "right") {
            rotate += 90; // if clicked btn is right rotate, decrement rotate value by +90
        } else if(option.id === "horizontal") {
            // if flipHorizontal value is 1, set this value to -1 else set 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            // if flipVertical value is 1, set this value to -1 else set 1
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter = () => {
    // resetting all variable value to its default value
    brightness = "100"; saturation = "100"; inversion = "0"; 
    grayscale = "0"; blurry = "0"; sepia = "0"; transparent = "100"; 
    coloration = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click(); // clicking brightness btn, so the brightness selected by default
    applyFilter();
}

const saveImage = () => {
    const canvas = document.createElement("canvas"); // creating canvas element
    const ctx = canvas.getContext("2d"); // canvas.getcontext return a drawing context on the canvas
    canvas.width = previewImg.naturalWidth; // setting canvas width to actual image width
    canvas.height = previewImg.naturalHeight; // setting canvas height to actual image height
    
    // applying user selected filters to canvas filter
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) 
    grayscale(${grayscale}%) blur(${blurry}px) sepia(${sepia}%) opacity(${transparent}%) hue-rotate(${coloration}deg)`;
    ctx.translate(canvas.width / 2, canvas.height / 2); // translating canvas from center
    if(rotate !== 0) { // if rotate value isn't 0, rotate the canvas
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical); // flip canvas, horizontally / vertically
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    downloadImage(canvas);
}

const downloadImage = (canvas) => {
    const link = document.createElement("a"); // creating <a> element
    link.download = "image.jpg"; // passing <a> tag download value to "image.png"
    link.href = canvas.toDataURL(); // passing <a> tag href value to canvas data url
    link.click(); // clicking <a> tag so the image download
}

saveImgBtn.addEventListener("click", saveImage);
resetFilterBtn.addEventListener("click", resetFilter);
filterSlider.addEventListener("input", updateFilter);
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());

