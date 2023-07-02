let sessionLength = 25;
let breakLength = 5;
let timeLeft = sessionLength * 60;
let intervalId = null;
let isBreak = false;

function updateDOM() {
    document.getElementById('session-length').innerText = sessionLength;
    document.getElementById('break-length').innerText = breakLength;
    document.getElementById('time-left').innerText = Math.floor(timeLeft / 60) + ':' + ('0' + timeLeft % 60).slice(-2);
}

document.getElementById('session-decrement').addEventListener('click', function() {
  if (intervalId === null) {
      sessionLength = Math.max(1, sessionLength - 1);
      timeLeft = sessionLength * 60;
      updateDOM();
  }
});

document.getElementById('session-increment').addEventListener('click', function() {
  if (intervalId === null) {
      sessionLength = Math.min(60, sessionLength + 1);
      timeLeft = sessionLength * 60;
      updateDOM();
  }
});

document.getElementById('break-decrement').addEventListener('click', function() {
  if (intervalId === null) {
      breakLength = Math.max(1, breakLength - 1);
      updateDOM();
  }
});

document.getElementById('break-increment').addEventListener('click', function() {
  if (intervalId === null) {
      breakLength = Math.min(60, breakLength + 1);
      updateDOM();
  }
});

document.getElementById('start_stop').addEventListener('click', function() {
  if (intervalId === null) {
      this.innerText = 'Stop';
      intervalId = setInterval(function() {
          timeLeft--;
          if (timeLeft < 0) {
              isBreak = !isBreak;
              timeLeft = (isBreak ? breakLength : sessionLength) * 60;
              document.getElementById('beep').play();
          }
          updateDOM();
      }, 1000);
  } else {
      this.innerText = 'Start';
      clearInterval(intervalId);
      intervalId = null;
  }
});

document.getElementById('reset').addEventListener('click', function() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    sessionLength = 25;
    breakLength = 5;
    timeLeft = sessionLength * 60;
    isBreak = false;
    document.getElementById('start_stop').innerText = 'Start';
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    updateDOM();
});
