let rawX=0;
let rawY=0;

document.addEventListener(
    "mousemove", (event) => {
    rawX = event.clientX;
    rawY = event.clientY;
    console.log("raw:", rawX, rawY);
});


let smoothX=0;
let smoothY=0;
const alpha=0.2;

function updateSmoothCoordinates() {
    smoothX += (rawX - smoothX) * alpha;
  smoothY += (rawY - smoothY) * alpha;
    requestAnimationFrame(updateSmoothPosition);
}

updateSmoothCoordinates();