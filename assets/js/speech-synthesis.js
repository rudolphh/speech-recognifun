const msg = new SpeechSynthesisUtterance();

let voice = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"]');

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

function setOptions() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
}

options.forEach(option => option.addEventListener('change', setOptions));


window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
//window.speechSynthesis.addEventListener('end', recognition.start);
voicesDropdown.addEventListener('change', setVoice);