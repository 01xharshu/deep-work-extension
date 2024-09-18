let timer;
let isActive = false;
let timeLeft = 0;

const timerDisplay = document.getElementById('timer');
const bellSound = document.getElementById('bellSound');

document.getElementById('deepButton').addEventListener('click', () => setTimer(25 * 60));
document.getElementById('restButton').addEventListener('click', () => setTimer(5 * 60));
document.getElementById('resetButton').addEventListener('click', resetTimer);

function setTimer(duration) {
    // If the timer is running, clear the existing timer
    if (isActive) {
        clearInterval(timer);
    }

    // Set the new duration and start the countdown
    timeLeft = duration;
    isActive = true;
    timerDisplay.innerText = formatTime(timeLeft);
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            bellSound.play();
            
            // Send a message to background.js
            chrome.runtime.sendMessage({ action: "timerEnded" });
            
            isActive = false;
            timerDisplay.innerText = '00:00';
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    isActive = false;
    timeLeft = 0;
    timerDisplay.innerText = '00:00';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}