

let searchBtn = document.getElementById("search-btn");
let shopnowBtn = document.getElementById("call-to-action")
let home = document.getElementById("logo-image")

searchBtn.addEventListener("click", function() {
    window.location.replace("products.html");
});

shopnowBtn.addEventListener("click", function(){
    window.location.replace("products.html");
})

home.addEventListener("click", function(){
    window.location.replace("index.html");
})