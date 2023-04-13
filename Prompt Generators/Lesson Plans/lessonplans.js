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
  const prompt = `Create a detailed lesson plan outline for a ${grade.value} grade ${subject.value} class on the topic of ${topic.value}, targeting the essential standard "${standard.value}". The lesson should be designed to last ${time.value} minutes and enable students to achieve the following learning objective: ${objective.value}.

  Please include the following elements in the lesson plan outline:
  1. Introduction: Explain how to engage students and introduce the topic, connecting it to the essential standard.
  2. Main Activity: Describe the core instructional activities that will help students develop an understanding of the topic and achieve the learning objective.
  3. Assessments: Suggest various assessment methods to gauge students' level of mastery.
  4. Intervention and Extension Activities: Provide possible intervention activities for students who need extra support and extension or PBL opportunities for students who have demonstrated mastery.
  5. Closure: Detail how to wrap up the lesson and reinforce the key takeaways.
  6. Tips and Potential Complications: Offer helpful advice for the novice teacher and warn them of any potential challenges they may encounter during the lesson.`;

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
