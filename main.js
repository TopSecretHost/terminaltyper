let commands = [];
let current = null;
let startTime, typedChars = 0, deletes = 0;

async function fetchCommands() {
  const res = await fetch('commands.json');
  commands = await res.json();
  loadNewCommand();
}

function loadNewCommand() {
  current = commands[Math.floor(Math.random() * commands.length)];
  document.getElementById('prompt').innerText = current.command;
  document.getElementById('input').value = '';
  renderBreakdown();
  renderUseCases();
  document.getElementById('stats').innerText = '';
}

function renderBreakdown() {
  const blurb = document.getElementById('blurbList');
  blurb.innerHTML = '';
  current.breakdown.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.label}</strong>: ${item.desc}`;
    blurb.appendChild(li);
  });
}

function renderUseCases() {
  const box = document.getElementById('useCases');
  box.innerHTML = '';
  current.useCases.forEach(uc => {
    const p = document.createElement('p');
    p.innerHTML = `<strong>💡</strong> ${uc}`;
    box.appendChild(p);
  });
}

function showGame() {
  document.getElementById('startScreen').classList.add('hidden');
  document.getElementById('gameUI').classList.remove('hidden');
  fetchCommands();
}

function prepCountdown() {
  let count = 3;
  const countdown = document.getElementById('countdown');
  countdown.innerText = `Starting in ${count}...`;
  countdown.classList.remove('hidden');

  const interval = setInterval(() => {
    count--;
    countdown.innerText = count > 0 ? `Starting in ${count}...` : '';
    if (count <= 0) {
      clearInterval(interval);
      countdown.classList.add('hidden');
      startTyping();
    }
  }, 1000);
}

function startTyping() {
    loadNewCommand(); // 🔥 always grab a new round
    const input = document.getElementById('input');
    input.removeAttribute('disabled');
    input.focus();
    input.value = '';
    startTime = Date.now();
    typedChars = 0;
    deletes = 0;
  }
  
function resetGame() {
  document.getElementById('input').setAttribute('disabled', 'true');
  loadNewCommand();
}

document.getElementById('input').addEventListener('input', e => {
  const value = e.target.value;
  const prompt = current.command;
  typedChars++;

  if (value.length > prompt.length) {
    e.target.classList.add('flash-warn');
    setTimeout(() => e.target.classList.remove('flash-warn'), 100);
    return;
  }

  // Count deletes
  if (value.length < typedChars) deletes++;

  // Display colored prompt (correct vs incorrect)
  let display = '';
  for (let i = 0; i < prompt.length; i++) {
    if (i < value.length) {
      display += value[i] === prompt[i]
        ? `<span class="correct">${prompt[i]}</span>`
        : `<span class="incorrect">${prompt[i]}</span>`;
    } else {
      display += `<span class="untyped">${prompt[i]}</span>`;
    }
  }
  document.getElementById('prompt').innerHTML = display;

  // Check if done
  if (value.length === prompt.length) {
    const duration = (Date.now() - startTime) / 1000;
    const wpm = Math.round((prompt.length / 5) / (duration / 60));
    const correct = value.split('').filter((c, i) => c === prompt[i]).length;
    const accuracy = Math.round((correct / prompt.length) * 100);
    const cleanScore = Math.max(0, 100 - deletes);

    document.getElementById('stats').innerText =
      `⏱ Time: ${duration.toFixed(1)}s | ⌨️ WPM: ${wpm} | 🎯 Accuracy: ${accuracy}% | 🧼 Clean Typing: ${cleanScore}%`;

    document.getElementById('history').innerHTML += `<li><code>${prompt}</code><br><small>${wpm} WPM | ${accuracy}% | Clean: ${cleanScore}%</small></li>`;
    document.getElementById('input').setAttribute('disabled', 'true');
  }
});

document.getElementById('themeSelect').addEventListener('change', e => {
  const body = document.getElementById('body');
  body.className = `theme-${e.target.value} font-mono p-8 min-h-screen`;
});
