let startTime;
let running = false;
let laps = [];

function startStop() {
  if (running) {
    clearInterval(interval);
    document.getElementById('startStop').textContent = 'Start';
  } else {
    startTime = Date.now() - laps.reduce((acc, lap) => acc + lap, 0);
    interval = setInterval(updateDisplay, 10);
    document.getElementById('startStop').textContent = 'Stop';
  }
  running = !running;
}

function lap() {
  if (running) {
    const elapsedTime = Date.now() - startTime;
    laps.unshift(elapsedTime);
    const lapTime = formatTime(elapsedTime);
    const lapList = document.getElementById('laps');
    const li = document.createElement('li');
    li.textContent = lapTime;
    lapList.insertBefore(li, lapList.firstChild);
  }
}

function reset() {
  clearInterval(interval);
  document.getElementById('display').textContent = '00:00:00.000';
  document.getElementById('startStop').textContent = 'Start';
  document.getElementById('laps').innerHTML = '';
  running = false;
  laps = [];
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  document.getElementById('display').textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('lap').addEventListener('click', lap);
document.getElementById('reset').addEventListener('click', reset);
