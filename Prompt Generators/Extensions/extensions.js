const form = document.getElementById("prompt-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const standard = document.getElementById("standard");
const number = document.getElementById("number");
const environment = document.getElementById("environment");
const resources = document.getElementsByName("resource");
const errorMsg = document.getElementById("errorMsg");
const copyPromptButton = document.getElementById("copy-prompt-button");
const promptDisplay = document.getElementById("aiPrompt");

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

  // Get the selected resources
  const selectedResources = [];
  for (let resource of resources) {
    if (resource.checked) {
      selectedResources.push(resource.value);
    }
  }

  // Check if all required fields are filled out
  if (
    grade.value === "" ||
    subject.value === "" ||
    standard.value === "" ||
    number.value === "" ||
    environment.value === "" ||
    selectedResources.length === 0
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Generate the prompt
  const prompt = `Create ${
    number.value
  } extension activities for students who have demonstrated mastery of the essential standard "${
    standard.value
  }" in a ${grade.value} grade ${subject.value} class. Consider the learning environment: ${
    environment.value
  }. The following digital resources are available for student use: ${selectedResources.join(
    ", "
  )}. Make sure the activities are engaging, promote higher-order thinking, and challenge the students to apply their knowledge in new ways.`;

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
