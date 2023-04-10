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

  // Get the selected question types
  const questionTypes = [];

  // Check if all required fields are filled out
  if (
    grade.value === "" ||
    subject.value === "" ||
    standard.value === "" ||
    objective.value === "" ||
    topic.value === "" ||
    time.value === ""
  ) {
    errorMsg.classList.remove("hidden");
    return;
  }

  // Generate the prompt
  const prompt = `You are a master teacher helping a novice teacher prepare for an upcoming lesson by making a lesson plan outline with them. They teach a ${grade.value} grade ${subject.value} class. The lesson will be on the topic of ${topic.value} and target the essential standard "${standard.value}." By the end of the lesson, students should be able to ${objective.value}. Finally, the lesson should take no longer than ${time.value} minutes. As you build the lesson plan outline, make sure to consider these steps: First, determine how to tie the essential standard to the topic. Second, analyze how students can demonstrate proficiency and the objective has been accomplished. Third, provide several possible assessment methods to assess the students' level of mastery. Fourth, provide possible intervention activities to help students who have not reached proficiency and extension or PBL opportunities for students who have demonstrated mastery. Finally, feel free to provide helpful tips for the novice teacher and warn them of any potential complications they encounter.`;

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
