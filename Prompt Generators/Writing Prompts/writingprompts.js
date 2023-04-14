//pulling form values for prompt generation
const form = document.getElementById("prompt-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const number = document.getElementById("number");
const length = document.getElementById("length");
const topic = document.getElementById("topic");
const skills = document.getElementById("skills");
const writingTypeInput = document.getElementById("writingType");
const toneInput = document.getElementById("tone");
const promptDisplay = document.getElementById("aiPrompt");
const copyPromptButton = document.getElementById("copy-prompt-button");
const errorMsg = document.getElementById("errorMsg");

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

  // Check if all required fields are filled out and show error message if not
  if (
    grade.value === "" ||
    subject.value === "" ||
    number.value === "" ||
    length.value === "" ||
    topic.value === "" ||
    skills.value === ""
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Generate the prompt
  const prompt = `First, think of ${number.value} potential writing prompt(s) for a ${grade.value} 
  grade ${subject.value} class. Consider the topic "${topic.value}" and specific skills to assess, 
  such as ${skills.value}. 
  ${writingTypeInput.value ? `Focus on the type of writing: ${writingTypeInput.value}.` : ""}
  ${toneInput.value ? ` Ensure the tone is ${toneInput.value}.` : ""} 
  Be sure to consider how to best connect the assessed skills to the topic. After you have brainstormed ideas, 
  write the final ${number.value} writing prompt(s) that require students 
  to write a ${length.value} and assess the mentioned skills.`;

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

  // Copy & alert the selected text
  document.execCommand("copy");
  alert("Copied the prompt");

  // Open a link to chat.openai.com
  window.open("http://chat.openai.com", "_blank");
}

form.addEventListener("submit", handleSubmit);
copyPromptButton.addEventListener("click", copyPrompt);
