import { createElement } from "./utils.js";
const nicePurple = 'style="color:rgb(197, 199, 255)"';
const lightPurple = 'style="color:rgb(204, 204, 255)"';
const homeBtn = document.getElementById("home");
const backBtn = document.getElementById("back");
const time = document.getElementById("time");
const menu = document.getElementById("menu");
// menu.addEventListener("click", openLast);

let result;
if (new Date().getMinutes() < 10) {
  result = `${new Date().getHours()}:0${new Date().getMinutes()}`;
} else {
  result = `${new Date().getHours()}:${new Date().getMinutes()}`;
}
let last;
time.innerHTML = result;
backBtn.addEventListener("click", home);
homeBtn.addEventListener("click", home);
const closed = document.getElementById("close");
const screen = document.querySelector(".screen");
let atHome = false;
let mainDiv;
let mainDivClock;
let cvDiv;
let wasCreated;
function home(event) {
  if (!atHome) {
    if (!wasCreated) {
      createHomeScreen();
    } else {
      openHomeScreen();
    }
    if (screen.contains(mainDivClock)) {
      screen.removeChild(mainDivClock);
    }
    if (screen.contains(cvDiv)) {
      screen.removeChild(cvDiv);
    }
    atHome = true;
  }
}
function createHomeScreen() {
  if (screen.contains(closed)) screen.removeChild(closed);

  screen.style.backgroundImage = "url(static/homeScreen.jpg)";
  screen.classList.add("image");
  mainDiv = createElement("div", "", screen, { class: "app-drawer" });
  const app1 = createElement("button", "", mainDiv, {
    style: "background-image: url('static/clock.png')",
    class: "image",
  });
  app1.addEventListener("click", openClock);
  const app2 = createElement("button", "", mainDiv, {
    style: "background-image : url('static/calc.png')",
    class: "image",
  });
  app2.addEventListener("click", openCalculator);

  const app3 = createElement("button", "", mainDiv, {
    style: "background-image :url('static/cv.jpg')",
    class: "image",
  });
  app3.addEventListener("click", openCv);
  wasCreated = true;
}
function openHomeScreen() {
  screen.appendChild(mainDiv);
  screen.style.backgroundImage = "url('static/homeScreen.jpg')";
  screen.classList.add("image");
  if (screen.contains(closed)) screen.removeChild(closed);
}
window.onload = createHomeScreen();

function openCalculator() {
  screen.appendChild(closed);
  screen.style.backgroundImage = "none";

  screen.removeChild(mainDiv);
  atHome = false;
  last = "calc";
}
function openClock() {
  last = "clock";
  screen.style.backgroundImage = "none";
  if (screen.contains(mainDiv)) {
    screen.removeChild(mainDiv);
  }

  mainDivClock = createElement("div", "", screen, { class: "main-clock" });

  // labels
  const labelsDiv = createElement("div", "", mainDivClock, {
    class: "labels-div",
  });

  const labelhrs = createElement("label", "Hours", labelsDiv, {});

  const labelMins = createElement("label", "Minutes", labelsDiv, {});

  const labelSecs = createElement("label", "Seconds", labelsDiv, {});

  const inputsDiv = createElement("div", "", mainDivClock, {
    class: "inputs-div",
  });

  const inputHrs = createElement("input", "", inputsDiv, {
    type: "text",
    placeholder: "0",
  });

  const inputMins = createElement("input", "", inputsDiv, {
    type: "text",
    placeholder: "0",
  });

  const inputSecs = createElement("input", "", inputsDiv, {
    type: "text",
    placeholder: "0",
  });

  const startResetDiv = createElement("div", "", mainDivClock, {
    id: "start-div",
  });
  let err = false;
  const resetBtn = createElement("button", "Reset", startResetDiv, {});
  resetBtn.addEventListener("click", reset);

  const startBtn = createElement("button", "Start", startResetDiv, {});
  startBtn.addEventListener("click", clock);

  const timerText = createElement("div", "", mainDivClock, {
    id: "timer-text",
  });

  let interval = null;
  let wasReset = false;
  function reset() {
    clearInterval(interval);
    inputHrs.value = "";
    inputMins.value = "";
    inputSecs.value = "";
    wasReset = true;
    startBtn.disabled = false;
  }
  function clock() {
    function cleartext() {
      timerText.textContent = ``;
    }
    timerText.textContent = "";
    if (
      isNaN(inputHrs.value) ||
      isNaN(inputMins.value) ||
      isNaN(inputSecs.value)
    ) {
      timerText.textContent = `Enter a number`;
      setInterval(cleartext, 2000);
      err = true;
    }
    startBtn.disabled = true;
    wasReset = false;
    clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
    let totalTime = 0;
    const totalValue = () => {
      totalTime =
        Number(inputHrs.value) * 3600 +
        Number(inputMins.value) * 60 +
        Number(inputSecs.value);
    };

    function updateTimer() {
      totalValue();
      totalTime--;
      if (totalTime >= 0) {
        let displayHours = Math.floor(totalTime / 3600);
        let displayMinutes = Math.floor(totalTime / 60 - displayHours * 60);
        let displaySeconds =
          totalTime - (displayHours * 3600 + displayMinutes * 60);
        // timer.textContent = `${displayHours}: ${displayMinutes}: ${displaySeconds}`
        inputHrs.value = displayHours;
        inputMins.value = displayMinutes;
        inputSecs.value = displaySeconds;
      } else {
        if (!wasReset && !err) {
          timerText.textContent = `Finished`;
        }
        startBtn.disabled = false;
        clearInterval(interval);
        inputHrs.value = "";
        inputMins.value = "";
        inputSecs.value = "";
      }
    }
  }
  atHome = false;
}
window.onload = home();
function openCv() {
  atHome = false;
  screen.style.backgroundImage = "none";
  if (screen.contains(mainDiv)) screen.removeChild(mainDiv);
  last = "cv";

  cvDiv = createElement("div", "", screen, { class: "cv-div" });

  const name = createElement("h1", `Ivaylo Krystev Atanasov`, cvDiv, {});

  const info = createElement(
    "h2",
    `Sliven,Bulgaria |+xxx xxx xx66| \...ovv@gmail.com`,
    cvDiv,
    {}
  );

  const p = document.createElement("p");
  cvDiv.appendChild(p);
  p.innerHTML = `
    <h2 ${nicePurple}>Skills:</h2>
    <ul>
    <li>Decent knowledge and understanding of <b>JavaScript</b>&nbsp;</li>
    <li>Decent grasp of <b>computer science</b>&nbsp;and <b>mathematics</b></li>
    <li><b>Fluent</b>&nbsp;English speaker</li>
    <li><b>Algorithmic thinking</b>&nbsp;and <b>problem solving</b></li>
    <li>Ablility to <b>quickly</b> grasp new concepts</li>
    </ul>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <h2 ${nicePurple}>Education:</h2>
    <p>&nbsp</p>
    <h4>Softuni | JavaScript courses |<br> June 2022 - now</h4>
    <p>&nbsp;</p>
    <h3 ${lightPurple}>JS Skills acquired during:</h3>
    <ul>
    <li>Functions and higher order functions</li>
    <li>Arrays/nested arrays</li>
    <li>Objects and classes</li>
    <li>Regular expressions</li>
    <li>DOM manipulation</li>
    <li>Unit testing/ Error handling</li>
    <li>Prototypes and inheritance</li>
    <li>HTTP/REST services</li>
    <li>Asynchronous programming</li>
    <li>Remote Data and Authentication</li>
    </ul>
    <p>&nbsp;</p>
    <h2 ${nicePurple}>About me:</h2>
    <ul>
    <li>I enjoy learning about computer components and computer building</li>
    <li>I often endulge in JavaScript and CSS courses&nbsp;</li>
    <li>I like to reverse engineer interactive single-page applications</li>
    <li>I'm keen on weight-lifting and mountain hiking</li>
    </ul>`;
}

