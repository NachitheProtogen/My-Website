let chapter1 = document.getElementById("chapter1");
let chapter2 = document.getElementById("chapter2");
let chapter3 = document.getElementById("chapter3");
let chapter4 = document.getElementById("chapter4");
let chapter5 = document.getElementById("chapter5");
let chapter6 = document.getElementById("chapter6");
// :3
let chapter1target = document.getElementById("chapter1target");
let chapter2target = document.getElementById("chapter2target");
let chapter3target = document.getElementById("chapter3target");
let chapter4target = document.getElementById("chapter4target");
let chapter5target = document.getElementById("chapter5target");
let chapter6target = document.getElementById("chapter6target");
//This sript is so fucking uglyyyyy
chapter1.addEventListener("click", () => {
    chapter1target.scrollIntoView({behavior: "smooth"})
});

chapter2.addEventListener("click", () => {
    chapter2target.scrollIntoView({behavior: "smooth"})
});

chapter3.addEventListener("click", () => {
    chapter3target.scrollIntoView({behavior: "smooth"})
});

chapter4.addEventListener("click", () => {
    chapter4target.scrollIntoView({behavior: "smooth"})
});

chapter5.addEventListener("click", () => {
    chapter5target.scrollIntoView({behavior: "smooth"})
});

chapter6.addEventListener("click", () => {
    chapter6target.scrollIntoView({behavior: "smooth"})
});