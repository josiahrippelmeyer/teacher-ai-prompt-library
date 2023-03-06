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
