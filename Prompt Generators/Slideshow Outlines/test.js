//pulling form values for prompt generation
const form = document.getElementById("prompt-form");
const topic = document.getElementById("topic");
const audience = document.getElementById("audience");
const objective = document.getElementById("objective");
const secondaryObjectives = document.getElementById("secondary-objectives");
const length = document.getElementById("length");
const promptDisplay = document.getElementById("aiPrompt");
const copyPromptButton = document.getElementById("copy-prompt-button");

//typwriter animation setup
function typeWriter(txt) {
  var i = 0;
  var speed = 25;
  function type() {
    if (i < txt.length) {
      document.getElementById("aiPrompt").innerHTML += txt.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function generatePrompt() {
  const prompt = `I am making a presentation on ${topic.value} to an audience of ${audience.value}. The primary objective will be ${objective.value}. I would also like to make sure ${secondaryObjectives.value} are communicated as well. Make a slide outline that can be presented within a time limit of ${length.value} minutes. Also, list out three potential, creative titles for the presentation.`;

  // Enable the copy prompt button and remove error message if necessary
  copyPromptButton.disabled = false;
  copyPromptButton.classList.remove("disabled");
  copyPromptButton.classList.add("enabled");
  copyPromptButton.classList.add("hover");
  copyPromptButton.classList.add("active");
  errorMsg.classList.add("hidden");

  // Display the prompt with the typewriter animation
  typeWriter(prompt);
}

// Check if all required fields are filled out and show error message if not
function handleSubmit(event) {
  event.preventDefault();
  if (
    length.value === "" ||
    topic.value === "" ||
    audience.value === "" ||
    objective.value === "" ||
    secondaryObjectives.value === ""
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }
  generatePrompt();
}

function copyPrompt() {
  // Get the text field
  var copyText = document.getElementById("aiPrompt");

  // Select the text field
  var range = document.createRange();
  range.selectNode(copyText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  // Copy and alert
  document.execCommand("copy");
  alert("Copied the prompt");

  // Open a link to chat.openai.com
  window.open("http://chat.openai.com", "_blank");
}

form.addEventListener("submit", handleSubmit);
copyPromptButton.addEventListener("click", copyPrompt);

// Getting API key input and button elements
const apiKeyInput = document.getElementById("apiKey");
const submitApiKeyButton = document.getElementById("submit-api-key-button");

// Function to make an API request
async function fetchGPTResponse(prompt) {
  const apiKey = apiKeyInput.value;

  // Check if the API key is provided
  if (!apiKey) {
    alert("Please provide an API key");
    return;
  }

  // Request headers and body
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const body = JSON.stringify({
    model: "text-davinci-002",
    prompt: prompt,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  try {
    // Make a POST request to the OpenAI API
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
      method: "POST",
      headers: headers,
      body: body,
    });

    const data = await response.json();

    // Show the API response
    if (data.choices && data.choices.length > 0) {
      const responseText = data.choices[0].text;
      promptDisplay.innerText = responseText;
    } else {
      alert("Error: No response from the API");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Function to handle API key submission
function handleApiKeySubmission() {
  // Generate the prompt
  handleSubmit(event);

  // Make an API request
  fetchGPTResponse(promptDisplay.innerText);
}

// Event listeners
submitApiKeyButton.addEventListener("click", handleApiKeySubmission);
