(function () {
    const FONT_CLASS = 'ss-dyslexia-active';
    const CREAM_CLASS = 'ss-dyslexia-cream';


function injectFontFace() {
    if (document.getElementById('ss-dyslexia-fontface')) return ;
    const fontUrl =  chrome.runtime.getURL('assets/fonts/OpenDyslexic-Regular.otf');
    const style =  document.createElement('style');
    style.id = 'ss-dyslexia-fontface';
    style.textContent = `
     @font-face {
        font-family: 'OpenDyslexic' ;
        src: url('${fontUrl}') format('opentype');
        font-weight: normal;
        font-style: normal;
    }
        `;
    document.head.appendChild(style);
}

function enableDyslexiaMode(creamBackground) {
    injectFontFace();
    document.documentElement.classList.add(FONT_CLASS);
    if (creamBackground) {
        document.documentElement.classList.add(CREAM_CLASS);
    }
    else {
        document.documentElement.classList.remove(CREAM_CLASS);
    }

    }
    
function disableDyslexiaMode() {
    document.documentElement.classList.remove(FONT_CLASS);
    document.documentElement.classList.remove(CREAM_CLASS);
}

chrome.storage.local.get(['dyslexiaMode', 'dyslexiaCream'], (result) => {
    if(result.dyslexiaMode) {
        enableDyslexiaMode(result.dyslexiaCream);
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if(area !== 'local') return ;
    if('dyslexiaMode' in changes || 'dyslexiaCream' in changes) {
        chrome.storage.local.get(['dyslexiaMode', 'dyslexiaCream'] , (result) => {
        if(result.dyslexiaMode) {
            enableDyslexiaMode(result.dyslexiaCream);
        }
        else {
            disableDyslexiaMode();
        }
        });
    }
});
})();