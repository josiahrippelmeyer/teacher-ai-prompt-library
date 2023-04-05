//pulling form values for prompt generation
const form = document.getElementById("prompt-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const standard = document.getElementById("standard");
const objective = document.getElementById("objective");
const topic = document.getElementById("topic");
const time = document.getElementById("time");
const promptDisplay = document.getElementById("aiPrompt");
const copyPromptButton = document.getElementById("copy-prompt-button");

//typwriter animation
function typeWriter(txt) {
  var i = 0;
  var speed = 25;
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

  // Get the selected question types
  const questionTypes = [];

  // Get the selected assessment method
  const assessment = document.querySelector('input[type="radio"]:checked')?.value;

  // Check if all required fields are filled out
  if (
    grade.value === "" ||
    subject.value === "" ||
    standard.value === "" ||
    objective.value === "" ||
    topic.value === "" ||
    assessment === "" ||
    time.value === ""
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Generate the prompt
  const prompt = `Write me a lesson plan on ${topic.value} for a ${grade.value} grade ${subject.value} class. The essential standard for this unit is "${standard.value}". At the end of the ${time.value} minute lesson, students should be able ${objective.value}. Please include an example ${assessment} to assess my students knowledge. Additionally, detail possible extension and intervention activities for this lesson.`;

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
