document.addEventListener('DOMContentLoaded', () => {
    const parkinsonsCheckbox = document.getElementById('parkinsonsMode');
    const focusCheckbox = document.getElementById('focusMode');
    const dyslexiaCheckbox = document.getElementById('dyslexiaMode');
    const creamCheckbox = document.getElementById('dyslexiaCream');

    getModeStates((states)=>{
        parkinsonsCheckbox.checked = states.parkinsonsMode;
        focusCheckbox.checked = states.focusMode;
        dyslexiaCheckbox.checked = states.dyslexiaMode;
        creamCheckbox.checked = states.dyslexiaCream;
    
});

parkinsonsCheckbox.addEventListener('change', (e) => {
    setMode(STORAGE_KEYS.PARKINSONS , e.target,checked);
});

focusCheckboc.addEventListener('change', (e) => {
    setMode(STORAGE_KEYS.FOCUS, e.target.checked);
});

dyslexiaCheckbox.addEventListener('change', (e) => {
    setMode(STORAGE_KEYS.DYSLEXIA, e.target.checked);
});

creamCheckbox.addEventListener('change', (e) =>{
    setMode(STORAGE_KEYS.DYSLEXIA_CREAM, e.target.checked);

});
});