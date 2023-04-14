// Pull inputs from the form for prompt generation
const form = document.getElementById("prompt-form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const paste = document.getElementById("paste");
const length = document.getElementById("length");
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

  // Check if all required fields are filled out and reveal error message if not
  if (form.value === "" || title.value === "" || author.value === "" || paste.value === "" || length.value === "") {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Generate the prompt
  const prompt = `I'd like a summary of the article "${title.value}" by ${author.value}. 
  Identify the main idea, critical supporting details, and other vital information. 
  Then, please create a ${length.value} long summary that succinctly covers that information. 
  Here is the article:`;

  // Enable the copy prompt button and hide error message
  copyPromptButton.disabled = false;
  copyPromptButton.classList.remove("copy-disabled");
  copyPromptButton.classList.add("enabled");
  copyPromptButton.classList.add("hover");
  copyPromptButton.classList.add("active");
  errorMsg.classList.add("hidden");

  // Display the prompt with the typewriter animation
  typeWriter(prompt);
  setTimeout(() => {
    promptDisplay.innerHTML += paste.value;
  }, 2500);
}

promptDisplay.innerHTML += paste.value;
function copyPrompt() {
  // Get the text field
  const copyText = document.getElementById("aiPrompt");

  // Select the text field
  const range = document.createRange();
  range.selectNode(copyText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  // Copy and alert
  document.execCommand("copy");
  alert("Copied the prompt");

  // Open a link
  window.open("http://chat.openai.com", "_blank");
}

form.addEventListener("submit", handleSubmit);
copyPromptButton.addEventListener("click", copyPrompt);
