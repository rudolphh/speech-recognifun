const msg = new SpeechSynthesisUtterance();
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = true;

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
    recognition.stop();
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle() {
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
}



window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
//window.speechSynthesis.addEventListener('end', recognition.start);
voicesDropdown.addEventListener('change', setVoice);