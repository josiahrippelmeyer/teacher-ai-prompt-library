//pulling form values for prompt generation
const form = document.getElementById("prompt-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const number = document.getElementById("number");
const responseLength = document.getElementById("length");
const topic = document.getElementById("topic");
const skills = document.getElementById("skills");
const promptDisplay = document.getElementById("aiPrompt");
const copyPromptButton = document.getElementById("copy-prompt-button");
const errorMsg = document.getElementById("errorMsg");

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

  // Check if all required fields are filled out and show error message if not
  if (
    grade.value === "" ||
    subject.value === "" ||
    number.value === "" ||
    responseLength.value === "" ||
    topic.value === "" ||
    skills.value === ""
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Generate the prompt
  const prompt = `Write me ${number.value} potential writing prompt(s) for my ${grade.value} grade ${subject.value} class. They should require students to write a ${responseLength.value} about ${topic.value} and should assess these specific skills: ${skills.value}.`;

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

  // Copy & alert the selected text
  document.execCommand("copy");
  alert("Copied the prompt");

  // Open a link to chat.openai.com
  window.open("http://chat.openai.com", "_blank");
}

form.addEventListener("submit", handleSubmit);
copyPromptButton.addEventListener("click", copyPrompt);
