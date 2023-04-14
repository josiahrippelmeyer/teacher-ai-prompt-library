// Pull inputs from the form for prompt generation
const form = document.getElementById("prompt-form");
const topic = document.getElementById("topic");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const points = document.getElementById("points");
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

  // Get the selected format
  const format = document.querySelector('input[name="format"]:checked')?.value;

  // Check if all required fields are filled out
  if (topic.value === "" || grade.value === "" || subject.value === "" || format === "") {
    errorMsg.classList.remove("hidden");
    return;
  }

  const pointsArray = points.value
    .split(";")
    .map((point) => point.trim())
    .filter((point) => point.length > 0);
  const pointsString =
    pointsArray.length > 0 ? ` In particular, focus on the following points: ${pointsArray.join(", ")}.` : "";

  // Generate the prompt
  const prompt = `I need help simplifying the topic "${topic.value}" for my ${grade.value} grade ${subject.value} class.${pointsString} I want the explanation to be in ${format} format. Please consider my students' age and background knowledge when breaking down this complex idea into more understandable terms.`;

  // Enable the copy prompt button and hide error message
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
