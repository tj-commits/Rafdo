/*for (var i = 1; i <= 10; i++) {
  const p = document.createElement('p')
  p.innerText = i
  document.body.appendChild(p)
}*/

let minutes = "00";
let seconds = "00";
let tens = "00";

let appendTens = document.getElementById("tens");
var appendSeconds = document.getElementById('seconds')
let appendMinutes = document.getElementById('minutes')
var buttonStart = document.getElementById('button-start');
var buttonStop = document.getElementById('button-stop');
var buttonReset = document.getElementById('button-reset');

let Interval

let running = false

const reset = () => {
  clearInterval(Interval)
  tens = "00"
  seconds = "00"
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds
  running = false
}

buttonStart.onclick = () => {
    clearInterval(Interval)
    Interval = setInterval(startTimer, 10)
    running = true
}

buttonStop.onclick = () => {
  clearInterval(Interval)
  running = false
}

buttonReset.onclick = () => {
    reset()
    minutes = ""
    appendMinutes.innerHTML = minutes
}
function startTimer () {
  tens++

  if (tens <= 9) {
    appendTens.innerHTML="0" + tens;
  }

  if (tens > 9) {
  appendTens.innerHTML = tens;
  }

  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }

  if (seconds >= 60) {
    minutes++;
    reset()
    appendMinutes.innerHTML = '<span class="mins">' + minutes + '</span>' + ':'
    Interval = setInterval(startTimer, 10)
    running = true
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}