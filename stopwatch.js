document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const lapBtn = document.getElementById("lapBtn");
  const lapTimes = document.getElementById("lapTimes");

  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  let laps = [];

  function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);

    return `${hours
      .toString()
      .padStart(
        2,
        "0"
      )}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  }

  function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
    }, 10);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    laps = [];
    renderLapTimes();
  }

  function recordLap() {
    laps.push(elapsedTime);
    renderLapTimes();
  }

  function renderLapTimes() {
    lapTimes.innerHTML = laps
      .map((lap, index) => {
        return `<div>Lap ${index + 1}: ${formatTime(lap)}</div>`;
      })
      .join("");
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
  lapBtn.addEventListener("click", recordLap);
});
