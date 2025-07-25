let gameSeq = [];
let userSeq = [];
let btns = ['red', 'yellow', 'green', 'purple'];
let started = false;
let level = 0;
let highScore = localStorage.getItem('simonHighScore') || 0;
let currentDifficulty = 'normal';
let gameSpeed = {
  easy: 1200,
  normal: 800,
  hard: 500,
};
let isShowingSequence = false;

// DOM elements
const h2 = document.getElementById('game-status');
const startBtn = document.getElementById('start-btn');
const currentLevelDisplay = document.getElementById('current-level');
const highScoreDisplay = document.getElementById('high-score');
const difficultySelect = document.getElementById('difficulty');

// Initialize
highScoreDisplay.textContent = highScore;

// Sound effects (simple beep sounds using Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(frequency, duration = 200) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + duration / 1000
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
}

const buttonSounds = {
  red: 261.63,
  yellow: 329.63,
  green: 392.0,
  purple: 523.25,
};

// Event listeners
startBtn.addEventListener('click', startGame);
difficultySelect.addEventListener('change', function () {
  currentDifficulty = this.value;
});

document.addEventListener('keypress', function (event) {
  if (event.code === 'Space' && !started) {
    startGame();
  }
});

function startGame() {
  if (started) return;

  started = true;
  level = 0;
  gameSeq = [];
  userSeq = [];

  startBtn.style.display = 'none';
  h2.textContent = 'Watch the sequence...';

  setTimeout(() => {
    levelUp();
  }, 1000);
}
function gameFlash(btn) {
  const color = btn.id;
  playSound(buttonSounds[color], 150);

  btn.classList.add('flash');
  btn.classList.add('pulse');

  setTimeout(function () {
    btn.classList.remove('flash');
    btn.classList.remove('pulse');
  }, 200);
}

function userFlash(btn) {
  const color = btn.id;
  playSound(buttonSounds[color], 100);

  btn.classList.add('userflash');
  btn.classList.add('pulse');

  setTimeout(function () {
    btn.classList.remove('userflash');
    btn.classList.remove('pulse');
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  currentLevelDisplay.textContent = level;
  h2.textContent = `Level ${level} - Watch carefully!`;

  // Random selection with slight anti-repeat logic
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];

  // Avoid immediate repeats after level 3
  if (
    level > 3 &&
    gameSeq.length > 0 &&
    randColor === gameSeq[gameSeq.length - 1] &&
    Math.random() < 0.7
  ) {
    randIdx = Math.floor(Math.random() * 4);
    randColor = btns[randIdx];
  }

  gameSeq.push(randColor);
  showSequence();
}

function showSequence() {
  isShowingSequence = true;
  disableButtons();

  let delay = 500;

  gameSeq.forEach((color, index) => {
    setTimeout(() => {
      const btn = document.querySelector(`.${color}`);
      gameFlash(btn);

      // If this is the last button in sequence
      if (index === gameSeq.length - 1) {
        setTimeout(() => {
          isShowingSequence = false;
          enableButtons();
          h2.textContent = `Your turn! Repeat the sequence (${gameSeq.length} colors)`;
        }, gameSpeed[currentDifficulty]);
      }
    }, delay + index * gameSpeed[currentDifficulty]);
  });
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      // Correct sequence completed
      h2.textContent = 'Correct! Next level coming...';
      disableButtons();

      setTimeout(() => {
        levelUp();
      }, 1500);
    }
  } else {
    // Wrong answer
    gameOver();
  }
}

function gameOver() {
  let gameOverText = `🎯 Game Over! You reached level <strong>${level}</strong>`;

  // Update high score
  if (level > highScore) {
    highScore = level;
    highScoreDisplay.textContent = highScore;
    localStorage.setItem('simonHighScore', highScore);
    gameOverText += `<br><br>🏆 New High Score!`;
  }

  h2.innerHTML = gameOverText;

  // Flash red background
  document.body.classList.add('game-over');
  playSound(150, 500); // Low error sound

  setTimeout(() => {
    document.body.classList.remove('game-over');
    showRestartOption();
  }, 1000);
}

function showRestartOption() {
  startBtn.textContent = '🔄 Play Again';
  startBtn.style.display = 'block';
  h2.innerHTML += `<br><br>Click the button or press Space to play again`;
  reset();
}

function btnPress() {
  if (!started || isShowingSequence) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute('id');
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

function disableButtons() {
  const allBtns = document.querySelectorAll('.btn');
  allBtns.forEach((btn) => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';
  });
}

function enableButtons() {
  const allBtns = document.querySelectorAll('.btn');
  allBtns.forEach((btn) => {
    btn.style.pointerEvents = 'auto';
    btn.style.opacity = '1';
  });
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  currentLevelDisplay.textContent = '0';
  isShowingSequence = false;
  enableButtons();
}

// Add click event listeners to all buttons
const allBtns = document.querySelectorAll('.btn');
allBtns.forEach((btn) => {
  btn.addEventListener('click', btnPress);

  // Touch events for mobile
  btn.addEventListener('touchstart', function (e) {
    e.preventDefault();
    if (!started || isShowingSequence) return;
    playSound(buttonSounds[this.id], 50);
  });

  btn.addEventListener('touchend', function (e) {
    e.preventDefault();
    if (!started || isShowingSequence) return;
    btnPress.call(this);
  });

  // Hover sound for desktop only
  btn.addEventListener('mouseenter', () => {
    if (!isShowingSequence && started && !('ontouchstart' in window)) {
      playSound(buttonSounds[btn.id], 50);
    }
  });
});

// Keyboard controls
document.addEventListener('keydown', function (event) {
  if (!started || isShowingSequence) return;

  const keyMap = {
    1: 'red',
    2: 'yellow',
    3: 'green',
    4: 'purple',
    q: 'red',
    w: 'yellow',
    a: 'green',
    s: 'purple',
  };

  const color = keyMap[event.key.toLowerCase()];
  if (color) {
    document.querySelector(`.${color}`).click();
  }
});

// Orientation and resize handling
window.addEventListener('orientationchange', function () {
  setTimeout(() => {
    if (window.DeviceOrientationEvent) {
      window.scrollTo(0, 1);
    }
  }, 100);
});

window.addEventListener('resize', function () {
  if (started && !isShowingSequence) {
    const gameContainer = document.querySelector('.btn-container');
    if (gameContainer) {
      gameContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});
