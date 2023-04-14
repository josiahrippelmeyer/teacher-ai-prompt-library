//pulling form values for prompt generation
const form = document.getElementById("prompt-form");
const topic = document.getElementById("topic");
const audience = document.getElementById("audience");
const objective = document.getElementById("objective");
const secondaryObjectives = document.getElementById("secondary-objectives");
const length = document.getElementById("length");
const keyPoint1 = document.getElementById("keyPoint1");
const keyPoint2 = document.getElementById("keyPoint2");
const keyPoint3 = document.getElementById("keyPoint3");
const evidence1 = document.getElementById("evidence1");
const evidence2 = document.getElementById("evidence2");
const evidence3 = document.getElementById("evidence3");
const visualAid1 = document.getElementById("visualAid1");
const visualAid2 = document.getElementById("visualAid2");
const visualAid3 = document.getElementById("visualAid3");
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

function generatePrompt() {
  let keyPoints = "";
  if (keyPoint1.value || keyPoint2.value || keyPoint3.value) {
    keyPoints = `The key points I want to cover include:\n`;
    if (keyPoint1.value) keyPoints += `1. ${keyPoint1.value}\n`;
    if (keyPoint2.value) keyPoints += `2. ${keyPoint2.value}\n`;
    if (keyPoint3.value) keyPoints += `3. ${keyPoint3.value}\n`;
  }

  let evidenceText = "";
  if (evidence1.value || evidence2.value || evidence3.value) {
    evidenceText = `. To support my key points, I have the following data and evidence:\n`;
    if (evidence1.value) evidenceText += `1. ${evidence1.value}\n`;
    if (evidence2.value) evidenceText += `2. ${evidence2.value}\n`;
    if (evidence3.value) evidenceText += `3. ${evidence3.value}\n`;
  }

  let visualAids = "";
  if (visualAid1.value || visualAid2.value || visualAid3.value) {
    visualAids = `. I would like to incorporate the following visual aids:\n`;
    if (visualAid1.value) visualAids += `1. ${visualAid1.value}\n`;
    if (visualAid2.value) visualAids += `2. ${visualAid2.value}\n`;
    if (visualAid3.value) visualAids += `3. ${visualAid3.value}\n`;
  }

  const prompt = `I am creating a presentation on ${topic.value} for an audience of ${audience.value}. The primary objective is ${objective.value}, and the secondary objectives include ${secondaryObjectives.value}. The presentation should be designed to fit within a time limit of ${length.value} minutes.\n\n${keyPoints}${evidenceText}${visualAids}. Please help me create a detailed, thoughtfully organized, and engaging slide outline for my presentation that effectively communicates my message to the audience. Additionally, suggest three creative and relevant titles for the presentation and include strategies that will ensure my audience stays engaged throughout the presentation.`;
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

// Check if all required fields are filled out and show error message if not
function handleSubmit(event) {
  event.preventDefault();

  // Stop any ongoing typing animation before starting a new one
  clearTimeout(timerId);

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
