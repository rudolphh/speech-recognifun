const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.interimResults = true;

let p = document.createElement("p");
let small = document.createElement('small');
p.textContent = "Voiceinator"
small.innerHTML = 'Say a simple <strong>color</strong>, tell <strong>Rudy</strong> what to Google, or <strong>hey Bible</strong> to search scripture'
small.innerHTML += `
<small><div style="margin: 5px; font-weight: normal;">can also use: </div>
    <ul>
      <li><strong>hey YouTube </strong>&lt;search query&gt;</li>
      <li><strong>hey indeed </strong>&lt;'job title' in 'location'&gt;</li>
    </ul>
  </small>`;

const words = document.querySelector(".words");
words.appendChild(p);
words.appendChild(small);

recognition.addEventListener("result", (e) => {
  //console.log(e.results);
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.textContent = transcript;

  if (e.results[0].isFinal) {
    //p = document.createElement("p");
    //words.appendChild(p);

    msg.text = transcript;
speechSynthesis.speak(msg);

    let spokenColors = transcript.split(' ').filter((word) => CSS_COLOR_NAMES.includes(word.charAt(0).toUpperCase() + word.slice(1)));
    document.body.style.backgroundColor = spokenColors[spokenColors.length-1];

    // "rudy"
    if(transcript.includes("Rudy")){ 
      let baseUrl = 'https://www.google.com/search?q=';
      let searchIndex = transcript.lastIndexOf("Rudy") + 5;// ignore name plus a space
      //console.log(searchIndex)
      let query = transcript.substring(searchIndex);
      //console.log("field: " + searchField);

      // encode only the query string
      let completeUrl = baseUrl + encodeURIComponent(query)
      console.log(completeUrl)
      window.open(completeUrl);
    }

    // "bible"
    if(transcript.includes("hey Bible")) {

      let searchIndex = transcript.lastIndexOf("Bible") + 6;// ignore name plus a space
      let query = transcript.substring(searchIndex);

      const beBack = document.getElementById("myAudio");
      const vcinLogo = document.querySelector('.vcin-logo');

      if(!vcinLogo.classList.contains('disappear')) {
        beBack.play();
        vcinLogo.classList.add('disappear');
        searchInputLabel.style.display = 'inline-block';
      }

      searchInput.innerHTML = query;
      search(encodeURIComponent(query));
    }

    // jobs
    let phrase = "hey indeed"
    if(transcript.toLowerCase().includes(phrase)) {
      let baseUrl = "https://www.indeed.com/jobs?q="
      let searchIndex = transcript.lastIndexOf(phrase) + phrase.length+1;
      let query = transcript.substring(searchIndex);

      let completeUrl = baseUrl + encodeURIComponent(query);

      console.log(completeUrl);
      window.open(completeUrl);
    }

    //youtube
    phrase = 'hey YouTube'
    if(transcript.includes(phrase)){ 
      let baseUrl = 'https://www.youtube.com/results?search_query=';
      let searchIndex = transcript.lastIndexOf(phrase) + phrase.length+1;
      let query = transcript.substring(searchIndex);

      // encode only the query string
      let completeUrl = baseUrl + encodeURIComponent(query)
      console.log(completeUrl)
      window.open(completeUrl);
    }

  }

  console.log(transcript);
});

recognition.addEventListener("end", recognition.start);

recognition.start();