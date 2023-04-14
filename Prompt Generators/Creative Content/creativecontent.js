const form = document.getElementById("creative-content-form");
const contentType = document.getElementById("contentType");
const theme = document.getElementById("theme");
const length = document.getElementById("length");
const requirements = document.getElementById("requirements");
const errorMsg = document.getElementById("errorMsg");
const promptDisplay = document.getElementById("aiPrompt");
const copyPromptButton = document.getElementById("copy-prompt-button");

// Typewriter animation set up
let timerId;

function typeWriter(txt) {
  let i = 0;
  const speed = 10;

  // Clear the prompt and any ongoing animation
  promptDisplay.innerHTML = "";

  function type() {
    if (i < txt.length) {
      promptDisplay.innerHTML += txt.charAt(i);
      i++;
      timerId = setTimeout(type, speed);
    } else {
      clearTimeout(timerId);
    }
  }
  type();
}

function handleSubmit(event) {
  event.preventDefault();

  // Stop any ongoing typing animation before starting a new one
  clearTimeout(timerId);

  const contentType = document.querySelector('input[name="contentType"]:checked')?.value;

  // Check if all required fields are filled out
  if (contentType === "" || theme.value === "") {
    errorMsg.classList.remove("hidden");
    return;
  }

  let lengthDescription = length.value ? ` The content should be approximately ${length.value} long.` : "";
  let requirementsDescription = requirements.value
    ? ` Please include the following specific requirements: ${requirements.value}`
    : "";

  // Generate the prompt
  const prompt = `Create a ${contentType} with the theme or topic of "${theme.value}".${lengthDescription}${requirementsDescription}`;

  // Enable the copy prompt button and remove error message if necessary
  copyPromptButton.disabled = false;
  copyPromptButton.classList.remove("copy-disabled");
  copyPromptButton.classList.add("enabled");
  copyPromptButton.classList.add("hover");
  copyPromptButton.classList.add("active");
  errorMsg.classList.add("hidden");

  // Display the prompt with the typewriter animation
  typeWriter(prompt);
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
