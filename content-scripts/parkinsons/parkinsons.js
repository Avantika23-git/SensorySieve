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



const cursorHideStyle = document.createElement("style");
cursorHideStyle.id = "ss-parkinsons-hide-cursor";
cursorHideStyle.textContent = `* { cursor: none !important; }`;

const customerCoursor=document.createElement("div");
customerCoursor.id="ss-parkinsons-cursor";
document.body.appendChild(customerCursor);

function renderCursor(){
    customCursor.style.left=smoothX + "px";
    customCursor.style.top=smoothY + "px";
    requestAnimationFrame(renderCursor);
}

let lastClickTime=0;
const debounceMs=400;

document.addEventListener(
  "click",
  (e) => {
    const now = Date.now();
    if (now - lastClickTime < debounceMs) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    lastClickTime = now;
  },
  true 
)

const enlargeStyle=document.createElement("style");
enlargeStyle.id="ss-parkinsons-enlarge";
enlargeStyle.textContent=`
        button,a,input,select, textarea ,[role="button"]
        {
        transform: scale(1.5) !important;
        transform-origin: center center !important;
        }
        `;