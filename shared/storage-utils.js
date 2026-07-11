const STORAGE_KEYS = {
    PARKINSONS: 'parkinsonsMode',
    FOCUS: 'focusMode',
    DYSLEXIA: 'dyslexiaMode',
    DYSLEXIA_CREAM: 'dyslexiaCream'
};

function getModeStates(callback) {
    chrome.storage.local.get(
        [STORAGE_KEYS.PARKINSONS, STORAGE_KEYS.FOCUS, STORAGE_KEYS.DYSLEXIA,  STORAGE_KEYS.DYSLEXIA_CREAM],
        (result) => {
            callback({
                parkinsonsMode: !!result.parkinsonsMode,
                focusMode: !!result.focusMode,
                dyslexiaMode: !!result.dyslexiaMode,
                dyslexiaCream: !!result.dyslexiaCream
            });
        }
    );
}

function setMode(key,value, callback) {
    chrome.storage.local.set({ [key]: value}, () =>{ 
        if (callback) callback();
    });
}
      