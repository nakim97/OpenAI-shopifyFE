const query = document.getElementById("promptInput");
const responseContainer = document.getElementById("responseContainer");
let engine = 'text-curie-001';

document.getElementById("submitBtn").addEventListener("click", function(e){
    e.preventDefault();
    fetchPrompt();
})

document.getElementById("clearBtn").addEventListener("click", function(e){
    e.preventDefault();
    query.value = '';
})

function changeEngine(){
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
};

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
            Authorization: `Bearer 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`
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        return displayResponse(data);
    })
    .catch((error) => {
        console.error(error);
    });
}

function displayResponse(data){
    responseContainer.innerHTML += `
    <div id="responseCard">
      <h3 id = "promptTitle"> Prompt: ${query.value}</h3>
      <h3 id = "responseResult"> Response: ${data.choices[0].text}</h3>
    </div>
   `
};

