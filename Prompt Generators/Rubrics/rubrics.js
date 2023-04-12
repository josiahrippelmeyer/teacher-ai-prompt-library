const form = document.getElementById("prompt-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const task = document.getElementById("task");
const descriptions = document.getElementById("descriptions");
const performanceLevels = document.getElementById("performanceLevels");
const errorMsg = document.getElementById("errorMsg");
const copyPromptButton = document.getElementById("copy-prompt-button");
const aiCriteria = document.getElementById("aiCriteria");
const userCriteria = document.getElementById("userCriteria");
const criteriaInput = document.getElementById("criteriaInput");

//Unhide criteria input
aiCriteria.addEventListener("change", () => {
  if (aiCriteria.checked) {
    criteriaInput.classList.add("hidden");
  }
});

userCriteria.addEventListener("change", () => {
  if (userCriteria.checked) {
    criteriaInput.classList.remove("hidden");
  }
});

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

  // Check if all required fields are filled out
  if (
    grade.value === "" ||
    subject.value === "" ||
    performanceLevels.value === "" ||
    (userCriteria.checked && descriptions.value === "")
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  let criteriaDescription;
  if (userCriteria.checked) {
    criteriaDescription = `The criteria should include: ${descriptions.value.split(";").join(", ")}.`;
  } else {
    criteriaDescription = `Please suggest suitable criteria for the rubric.`;
  }

  // Generate the prompt
  const prompt = `I need a rubric for a ${grade.value} grade ${subject.value} assignment on ${task.value}. The rubric should have ${performanceLevels.value} performance levels. ${criteriaDescription} Please describe each performance level for every criterion and provide a clear distinction between each level.`;

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
