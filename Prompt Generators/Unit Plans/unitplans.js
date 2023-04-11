const form = document.getElementById("prompt-form");
const grade = document.getElementById("grade");
const subject = document.getElementById("subject");
const topic = document.getElementById("topic");
const lessons = document.getElementById("lessons");
const duration = document.getElementById("duration");
const standards = document.getElementById("standards");
const skills = document.getElementById("skills");
const resources = document.getElementById("resources");
const connections = document.getElementById("connections");
const errorMsg = document.getElementById("errorMsg");
const promptDisplay = document.getElementById("aiPrompt");
const copyPromptButton = document.getElementById("copy-prompt-button");

// Typewriter animation
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
    topic.value === "" ||
    lessons.value === "" ||
    duration.value === "" ||
    standards.value === "" ||
    skills.value === ""
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Generate the prompt with chain-of-thought
  const prompt = `You are helping a teacher create a unit plan for a ${grade.value} grade ${
    subject.value
  } class on the topic of ${topic.value}. The unit should consist of ${lessons.value} lessons, each lasting ${
    duration.value
  } minutes. The essential standards or learning objectives for this unit are: ${
    standards.value
  }. The unit should focus on developing the following skills: ${skills.value}.${
    resources.value ? " The suggested resources or materials for this unit are: " + resources.value + "." : ""
  }${
    connections.value
      ? " Some real-world connections or current events that can be tied to this unit are: " + connections.value + "."
      : ""
  } As you provide a detailed outline for this unit plan, consider the following: First, break down the essential standards into smaller learning objectives that can be achieved in each lesson. Second, create engaging activities that will help students develop the targeted skills. Third, provide options for formative and summative assessments that align with the learning objectives. Fourth, suggest possible intervention strategies and extension activities for students who need additional support or are ready for a challenge. Finally, offer tips on how to effectively integrate the suggested resources and real-world connections into the lessons.`;

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

  // Copy and alert
  document.execCommand("copy");
  alert("Copied the prompt");

  // Open a link to chat.openai.com
  window.open("http://chat.openai.com", "_blank");
}

form.addEventListener("submit", handleSubmit);
copyPromptButton.addEventListener("click", copyPrompt);
