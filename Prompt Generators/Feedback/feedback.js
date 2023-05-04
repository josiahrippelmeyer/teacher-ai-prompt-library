const form = document.getElementById("feedback-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const task = document.getElementById("task");
const source = document.getElementById("source");
const criteria = document.getElementById("criteria");
const yesScore = document.getElementById("yesScore");
const noScore = document.getElementById("noScore");
const maxScore = document.getElementById("maxScore");
const exemplar = document.getElementById("exemplar");
const errorMsg = document.getElementById("errorMsg");
const copyPromptButton = document.getElementById("copy-prompt-button");
const promptDisplay = document.getElementById("aiPrompt");

//Unhide score and exemplar inputs
noScore.addEventListener("change", () => {
  if (noScore.checked) {
    maxScoreInput.classList.add("hidden");
  }
});

yesScore.addEventListener("change", () => {
  if (yesScore.checked) {
    maxScoreInput.classList.remove("hidden");
  }
});

// Typewriter animation set up
let timerId;

function typeWriter(txt) {
  let i = 0;
  const speed = 5;

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

  // Check if all required fields are filled out

  if (
    grade.value === "" ||
    subject.value === "" ||
    task.value === "" ||
    criteria.value === "" ||
    (yesScore.checked && maxScore.value === "")
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  const criteriaList = criteria.value.split(";").join(", ");

  let scoreDescription;
  if (yesScore.checked) {
    scoreDescription = ` After providing personalized feedback, score the response out of 
    ${maxScore.value}.${
      exemplar.value
        ? `Here is an example of a ${maxScore.value} 
    out of ${maxScore.value} to assist in your scoring: "${exemplar.value}".`
        : ""
    }`;
  } else {
    scoreDescription = "";
  }

  const prompt = `I will be providing feedback on written responses from ${grade.value} grade ${
    subject.value
  } students. The task type is ${task.value}.${
    source.value ? ` The relevant source material is: "${source.value}."` : ""
  } The feedback should focus on the following criteria: ${criteriaList}.${scoreDescription} From now on, every message you receive will be a student response that requires feedback according to the given criteria. Please provide specific and constructive feedback for each student response.`;

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
  const copyText = document.getElementById("aiPrompt");

  // Select the text field
  const range = document.createRange();
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
