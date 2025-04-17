let startTime = 0;
let elapsedTime = 0;
let timerInterval;
const display = document.getElementById('display');
const laps = document.getElementById('laps');

function formatTime(time) {
  const ms = time % 1000;
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / (1000 * 60)) % 60);
  const h = Math.floor(time / (1000 * 60 * 60));

  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

document.getElementById('start').addEventListener('click', () => {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
  }
});

document.getElementById('pause').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.getElementById('reset').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
  if (elapsedTime > 0) {
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.children.length + 1}: ${formatTime(elapsedTime)}`;
    laps.appendChild(li);
  }
});
