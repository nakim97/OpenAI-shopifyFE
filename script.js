// global variables 
import {API_KEY} from './apikey.js';
let query = document.getElementById("promptInput");
const responseContainer = document.getElementById("responseContainer");
const engineSelector = document.getElementById("engineSelector");
let engine = 'text-curie-001';


// event listeners for buttons
document.getElementById("submitBtn").addEventListener("click", function(e){
    e.preventDefault();
    fetchPrompt();
});

document.getElementById("clearBtn").addEventListener("click", function(e){
    e.preventDefault();
    let queryVar= query.toString().replace(query, "");
    query.value = queryVar;
});

document.getElementById("randomBtn").addEventListener("click", function(e){
    e.preventDefault();
    fetchWords();
});

// event listener function to change engine choice
engineSelector.addEventListener("change", function(e){
    e.preventDefault();
    responseContainer.innerHTML = "";
    query.value = "";
    if(document.getElementById('engine').value == 'Davinci'){
        engine = 'text-davinci-002';
    };
    if(document.getElementById('engine').value == 'Curie'){
        engine = 'text-curie-001';
    };
    if(document.getElementById('engine').value == 'Ada'){
        engine = 'text-ada-001';
    };
    if(document.getElementById('engine').value == 'Babbage'){
        engine = 'text-babbage-001';
    };

});

// function to fetch data responses from Open AI API
function fetchPrompt(){
    const data = {
        prompt: query.value,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };
    fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        return displayResponse(data);
    })
    .catch((error) => {
        console.log(error);
    });
};

// function to display responses fetched from Open AI API
function displayResponse(data){
    responseContainer.innerHTML += `
    <div id="responseCard">
      <button id="removeBtn" onclick="return this.parentNode.remove()"> x </button>
      <h3 id = "promptTitle"> Prompt: ${query.value}</h3>
      <h3 id = "responseResult"> Response: ${data.choices[0].text}</h3>
    </div>
   `
};

// function to fetch words from word list provided by rhdzmota
function fetchWords(){
      fetch("https://rhdzmota.com/files/wordle.json")
      .then(response => {
        return response.text()
      })
      .then((data) => {
        wordRandomizer(JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      })
};

// helper function to randomize words from word list and display 
function wordRandomizer(data){
    var randomWord = data[Math.floor((Math.random() * data.length))];
    let randomVar= query.toString().replace(query, randomWord);
    query.value = randomVar;
};

