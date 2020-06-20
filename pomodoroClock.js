const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const restartButton = document.getElementById("restart");
const sessionUpButton = document.getElementById("sessionMinutesUp");
const sessionDownButton = document.getElementById("sessionMinutesDown");
const breakUpButton = document.getElementById("breakMinutesUp");
const breakDownButton = document.getElementById("breakMinutesDown");
const minutesInput = parseInt(sessionInput.textContent);
const minutesTimer = document.getElementById("minutes");
const breakMinutesOutput = document.getElementById("breakMinutes");
const breakSecondOutput = document.getElementById("breakSeconds");
const secondsOutput = document.getElementById("seconds");
const breakOrSession = document.getElementById("breakOrSession");
const breakInput = document.getElementById("breakInput");
let paused = false;
let stopped = false;
let timer;
let seconds = (minutesInput * 60) / minutesInput;
let playing = false;

function counter(minutes) {
    timer = setInterval(function () {
        if (paused === false) {
            if (seconds === 60) {
                if (minutes != 0) {
                    seconds--;
                    secondsOutput.textContent = seconds;
                    minutes--;
                    minutesTimer.textContent = minutes;
                }
            } else if (seconds < 60 && seconds > 0) {
                seconds--;

                if (seconds < 10) {
                    secondsOutput.textContent = `0${seconds}`;
                } else {
                    secondsOutput.textContent = seconds;
                }
            } else {
                if (minutesTimer.textContent === "0" && seconds === 0) {
                    if (breakOrSession.textContent === "Session ") {
                        breakOrSession.textContent = "Break ";
                        seconds = 60;
                        clearTimeout(timer);
                        setTimeout(counter(parseInt(breakInput.textContent)), 500);
                    } else {
                        breakOrSession.textContent = "Session ";
                        seconds = 60;
                        clearTimeout(timer);
                        setTimeout(counter(parseInt(sessionInput.textContent)), 500);
                    }
                } else {
                    seconds = 60;
                }

            }
        } else if (stopped === true) {
            clearTimeout(timer);
            return;
        } else {
            clearTimeout(timer);
            return;
        }
    
    }, 1000);
}

playButton.addEventListener("click", function () {
    if (playing === true) {
        return;
    } else {
        paused = false;
        stopped = false;
        playing = true;
        counter(parseInt(sessionInput.textContent));
    }
});

pauseButton.addEventListener("click", function () {
    paused = true;
    playing = false;
    clearTimeout(timer);
    return;
});

sessionUpButton.addEventListener("click", function () {
    if (!playing) {
        sessionInput.textContent = parseInt(sessionInput.textContent) + 1;
        minutes.textContent = sessionInput.textContent;
    }
});

sessionDownButton.addEventListener("click", function () {
    if (!playing && parseInt(sessionInput.textContent) > 0) {
        sessionInput.textContent = parseInt(sessionInput.textContent) - 1;
        minutes.textContent = sessionInput.textContent;
    }
});

breakUpButton.addEventListener("click", function () {
    if (!playing) {
        breakInput.textContent = parseInt(breakInput.textContent) + 1;
    }
});

breakDownButton.addEventListener("click", function () {
    if (!playing && parseInt(breakInput.textContent) > 0) {
        breakInput.textContent = parseInt(breakInput.textContent) - 1;
    }
});

stopButton.addEventListener("click", function () {
    breakOrSession.textContent = "Session ";
    minutesTimer.textContent = parseInt(sessionInput.textContent);
    userInput = parseInt(minutesTimer.textContent);
    paused = true;
    stopped = true;
    playing = false;
    userInput = parseInt(minutesTimer.textContent);
    secondsOutput.textContent = "00";
    seconds = 60;
    clearTimeout(timer);
});

restartButton.addEventListener("click", function () {
    clearTimeout(timer);
    paused = true;
    stopped = true;
    playing = false;
    minutesTimer.textContent = 25;
    seconds = 60;
    userInput = parseInt(minutesTimer.textContent);
    secondsOutput.textContent = "00";
    minutesToSeconds = userInput * 60;
    secondsDisplay = minutesToSeconds % 60;
});
