// Pull inputs from the form for prompt generation
const form = document.getElementById("prompt-form");
const topic = document.getElementById("topic");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const points = document.getElementById("points");
const format = document.getElementById("format");
const errorMsg = document.getElementById("errorMsg");
const promptDisplay = document.getElementById("aiPrompt");
const copyPromptButton = document.getElementById("copy-prompt-button");

// Typewriter animation set up
function typeWriter(txt) {
  let i = 0;
  const speed = 10;
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

  if (topic.value === "" || grade.value === "" || subject.value === "" || format.value === "") {
    errorMsg.classList.remove("hidden");
    return;
  }

  const pointsArray = points.value
    .split(";")
    .map((point) => point.trim())
    .filter((point) => point.length > 0);
  const pointsString =
    pointsArray.length > 0 ? ` In particular, focus on the following points: ${pointsArray.join(", ")}.` : "";

  const prompt = `I have a ${grade.value} ${subject.value} class, and I need to explain the complex topic of ${topic.value} in simple terms for my students.${pointsString} Can you provide a simplified explanation in the format of ${format.value}? As you create the explanation, consider the students' age and background knowledge, and break down the complex ideas into more easily understandable concepts.`;

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
