const form = document.getElementById("data-analysis-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const assessmentType = document.getElementById("assessmentType");
const maxScore = document.getElementById("maxScore");
const data = document.getElementById("dataPoints");
const errorMsg = document.getElementById("errorMsg");
const copyPromptButton = document.getElementById("copy-prompt-button");

//typewriter animation
function typeWriter(txt) {
  var i = 0;
  var speed = 10;
  function type() {
    if (i < txt.length) {
      document.getElementById("aiPrompt").innerHTML += txt.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function handleSubmit(event) {
  event.preventDefault();

  if (
    grade.value === "" ||
    subject.value === "" ||
    assessmentType.value === "" ||
    data.value === "" ||
    maxScore.value === ""
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  const prompt = `I have a score set from a ${grade.value} grade ${subject.value} ${assessmentType.value}. The maximum score is ${maxScore.value}. Here is the data set: ${data.value}. Please analyze the data and provide insights, trends, and recommendations based on the analysis.`;

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