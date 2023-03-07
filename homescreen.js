const nicePurple = 'style="color:rgb(197, 199, 255)"';
const lightPurple = 'style="color:rgb(204, 204, 255)"';
const homeBtn = document.getElementById("home");
const backBtn = document.getElementById("back");
const time = document.getElementById("time");
const menu = document.getElementById("menu");
menu.addEventListener("click", openLast);

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
const close = document.getElementById("close");
const screen = document.querySelector(".screen");
let atHome = false;
let mainDiv;
let mainDivClock;
let cvDiv;
function home(event) {
  if (!atHome) {
    createHomeScreen();
    if (mainDivClock) {
      mainDivClock.style.display = "none";
    }
    if (cvDiv) {
      cvDiv.style.display = "none";
    }

    atHome = true;
  }
}
const app1 = document.createElement("button");
const app2 = document.createElement("button");
const app3 = document.createElement("button");

function createHomeScreen() {
  close.style.display = "none";
  screen.style.backgroundImage = "url('home-screen2.jpg')";
  screen.classList.add("image");
  mainDiv = document.createElement("div");
  mainDiv.classList.add("app-drawer");
  app1.style.backgroundImage = "url('clock.png')";
  app1.classList.add("image");
  app1.setAttribute("id", "clockHomeScreen");
  app1.addEventListener("click", openClock);
  mainDiv.appendChild(app1);
  app2.style.backgroundImage = "url('calc.png')";
  app2.classList.add("image");
  app2.setAttribute("id", "calcHomeScreen");
  app2.addEventListener("click", openCalculator);
  // app2.addEventListener('click')
  mainDiv.appendChild(app2);
  app3.style.backgroundImage = "url('cv.jpg')";
  app3.classList.add("image");
  app3.addEventListener("click", openCv);
  mainDiv.appendChild(app3);

  screen.appendChild(mainDiv);

}
function openHomeScreen(){}
window.onload = createHomeScreen()
function openCalculator() {
  close.style.display = "block";
  screen.style.backgroundImage = "none";
  mainDiv.style.display = "none";
  atHome = false;
  last = "calc";
}
function openClock() {
  // app1.classList.add('open')
  last = "clock";
  screen.style.backgroundImage = "none";
  mainDiv.style.display = "none";

  mainDivClock = document.createElement("div");
  mainDivClock.classList.add("main-clock");

  const labelsDiv = document.createElement("div");
  labelsDiv.classList.add("labels-div");
  const labelhrs = document.createElement("label");
  labelhrs.textContent = "Hours";
  const labelMins = document.createElement("label");
  labelMins.textContent = "Minutes";
  const labelSecs = document.createElement("label");
  labelSecs.textContent = "Seconds";

  labelsDiv.appendChild(labelhrs);
  labelsDiv.appendChild(labelMins);
  labelsDiv.appendChild(labelSecs);

  const inputsDiv = document.createElement("div");
  inputsDiv.classList.add("inputs-div");
  const inputHrs = document.createElement("input");
  inputHrs.setAttribute("type", "text");
  inputHrs.setAttribute("placeholder", "00");
  inputHrs.placeholder = "0";

  const inputMins = document.createElement("input");
  inputMins.setAttribute("type", "text");
  inputMins.setAttribute("placeholder", "00");
  inputMins.placeholder = "0";

  const inputSecs = document.createElement("input");
  inputSecs.setAttribute("type", "text");
  inputSecs.placeholder = "0";

  inputsDiv.appendChild(inputHrs);
  inputsDiv.appendChild(inputMins);
  inputsDiv.appendChild(inputSecs);

  mainDivClock.appendChild(labelsDiv);
  mainDivClock.appendChild(inputsDiv);

  const startResetDiv = document.createElement("div");
  let err = false;
  const resetBtn = document.createElement("button");
  resetBtn.textContent = `Reset`;
  resetBtn.addEventListener("click", reset);
  startResetDiv.appendChild(resetBtn);

  const startBtn = document.createElement("button");
  startBtn.textContent = `Start`;
  startResetDiv.setAttribute("id", "start-div");
  startBtn.addEventListener("click", clock);
  startResetDiv.appendChild(startBtn);
  mainDivClock.appendChild(startResetDiv);

  const timerText = document.createElement("div");
  timerText.setAttribute("id", "timer-text");
  mainDivClock.appendChild(timerText);
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
        inputMins.value = displaySeconds;
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

  screen.appendChild(mainDivClock);
  atHome = false;
}
window.onload = home();
function openCv() {
  atHome = false;
  screen.style.backgroundImage = "none";
  mainDiv.style.display = "none";
  last = "cv";

  cvDiv = document.createElement("div");
  cvDiv.classList.add("cv-div");
  const name = document.createElement("h1");
  name.textContent = `Ivaylo Krystev Atanasov`;
  cvDiv.appendChild(name);
  const info = document.createElement("h2");
  info.textContent = `Sliven,Bulgaria |+xxx xxx xx66| \...ovv@gmail.com`;
  cvDiv.appendChild(info);
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

  screen.appendChild(cvDiv);
}
function openLast() {
  if (last == "calc") {
    homeBtn.click();
    app2.click();
  } else if (last == "clock") {
    homeBtn.click();
    app1.click();
  } else if (last == "cv") {
    homeBtn.click();
    app3.click();
  }
}
