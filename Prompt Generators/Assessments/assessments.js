// Pull inputs from the form for prompt generation
const form = document.getElementById("prompt-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const topic = document.getElementById("topic");
const quantity = document.getElementById("quantity");
const promptDisplay = document.getElementById("aiPrompt");
const copyPromptButton = document.getElementById("copy-prompt-button");

// Typewriter animation set up
function typeWriter(txt) {
  let i = 0;
  const speed = 25;
  function type() {
    if (i < txt.length) {
      promptDisplay.innerHTML += txt.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
  clearTimeout(type);
}

function handleSubmit(event) {
  event.preventDefault();

  // Get the selected question types from checkboxes
  const questionTypes = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  for (const checkbox of checkboxes) {
    questionTypes.push(checkbox.value);
  }

  // Get the selected difficulty from radio
  const difficulty = document.querySelector('input[type="radio"]:checked')?.value;

  // Check if all required fields are filled out and reveal error message if not
  if (
    grade.value === "" ||
    subject.value === "" ||
    topic.value === "" ||
    questionTypes.length === 0 ||
    difficulty === "" ||
    quantity.value === ""
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Generate the prompt
  const prompt = `Make me a ${quantity.value} question assessment for ${grade.value} grade students in my ${
    subject.value
  } class on the topic of ${
    topic.value
  }. The assessment should be of ${difficulty} difficulty. Make sure to include a variety of these question types: ${questionTypes.join(
    ", "
  )}. Please include the answers.`;

  // Enable the copy prompt button and hide error message
  copyPromptButton.disabled = false;
  copyPromptButton.classList.remove("disabled");
  copyPromptButton.classList.add("enabled");
  copyPromptButton.classList.add("hover");
  copyPromptButton.classList.add("active");
  errorMsg.classList.add("hidden");

  // Display the prompt with the typewriter animation
  typeWriter(prompt);
}

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
