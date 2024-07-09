document.addEventListener("DOMContentLoaded", function () {
  let startStopBtn = document.getElementById("startStopBtn");
  let lapBtn = document.getElementById("lapBtn");
  let resetBtn = document.getElementById("resetBtn");
  let display = document.getElementById("display");
  let laps = document.getElementById("laps");

  let timer;
  let running = false;
  let elapsedTime = 0;
  let startTime;

  function updateDisplay(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 60000) % 60);
    let hours = Math.floor((time / 3600000) % 24);

    display.innerHTML = `
      ${hours.toString().padStart(2, "0")}:
      ${minutes.toString().padStart(2, "0")}:
      ${seconds.toString().padStart(2, "0")}:
      ${milliseconds.toString().padStart(2, "0")}
    `;
  }

  startStopBtn.addEventListener("click", function () {
    if (running) {
      clearInterval(timer);
      running = false;
      startStopBtn.textContent = "Start";
      lapBtn.disabled = true;
      resetBtn.disabled = false;
    } else {
      startTime = Date.now() - elapsedTime;
      timer = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
      }, 10);
      running = true;
      startStopBtn.textContent = "Stop";
      lapBtn.disabled = false;
      resetBtn.disabled = false;
    }
  });

  lapBtn.addEventListener("click", function () {
    let lapTime = elapsedTime;
    let lapDiv = document.createElement("div");
    lapDiv.textContent = `Lap: ${display.textContent}`;
    laps.appendChild(lapDiv);
  });

  resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    updateDisplay(0);
    laps.innerHTML = "";
    startStopBtn.textContent = "Start";
    lapBtn.disabled = true;
    resetBtn.disabled = true;
  });
});
