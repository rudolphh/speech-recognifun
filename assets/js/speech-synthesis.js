const msg = new SpeechSynthesisUtterance();

let voice = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelector('[type="range"], [name="text"]');

// msg.text = transcript or query somewhere

function populateVoices() {
    voices = this.getVoices();
    console.log(voices);
    voicesDropdown.innerHTML = voices.map(voice => 
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    ).join('');
}

function setVoice() {
    console.log('voice changed');
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle() {
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
}



speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);