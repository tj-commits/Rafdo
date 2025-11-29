var noon = 12
var evening = 18

function showCurrentTime() {

  var clock = document.querySelector('#clock')

  var currentTime = new Date()

  var hours = currentTime.getHours()

  var minutes = currentTime.getMinutes()

  var seconds = currentTime.getSeconds()

  var meridian = "AM";

  if (hours >= noon) {
    meridian = "PM"
  }

  if (hours > noon) {
    hours -= 12
  }

  if (minutes < 10) {
    minutes = "0" + minutes
  }

  if (seconds < 10) {
    seconds = "0" + seconds
  }

  var clockTime = `${hours}:${minutes}:${seconds} ${meridian}`

  clock.innerText = clockTime
}

function updateClock() {
  var time = new Date().getHours()
  var messageText

  var timeEventJS = document.querySelector('#timeEvent')

  if (time < noon) {
    messageText = "Good morning, friend!"
  } else if (time >= evening) {
    messageText = "Good evening, monsieur."
  } else {
    messageText = "Good afternoon, my friend!"
  }

  timeEventJS.innerText = messageText

  showCurrentTime()
}

updateClock()

setInterval(updateClock, 1000)
