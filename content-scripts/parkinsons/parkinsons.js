let rawX=0;
let rawY=0;

document.addEventListener(
    "mousemove", (event) => {
    rawX = event.clientX;
    rawY = event.clientY;
    console.log("raw:", rawX, rawY);
});


