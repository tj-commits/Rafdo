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

setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
  const currentDate = new Date()
  const secondsRatio = currentDate.getSeconds() / 60
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
  setRotation(secondHand, secondsRatio)
  setRotation(minuteHand, minutesRatio)
  setRotation(hourHand, hoursRatio)
}

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()
var input = document.getElementById('userInput')

var list = document.getElementById('empty')

var addItemEl = document.getElementById('enter')

addItemEl.onclick = addItem

const funnyString = "was that the letter 'e' :0 (⊙ˍ⊙)(⊙ˍ⊙)"

function addItem() {
  var itemText = input.value.trim()
  if (itemText === "") return
  var listItem = document.createElement('li')
  var deleteButton = document.createElement('button')

  listItem.appendChild(document.createTextNode(itemText))
  list.appendChild(listItem)
  input.value = ""

  deleteButton.appendChild(document.createTextNode('X'))
  listItem.appendChild(deleteButton)
  deleteButton.onclick = deleteListItem

   // check if the typed thing text contains the letter 'e' or 'x' (case insensitive)
   if (itemText.toLowerCase().includes('e')) {
    showAlert(funnyString);
  }
  else if (itemText.toLowerCase().includes('x')) {
    showAlert("thats the rarest in the alphabet!!i think X<----)");
  } else {
    showAlert('Alright')
  }

  function deleteListItem(){
    listItem.classList.add('delete')
    setTimeout(function() {
      listItem.remove()
    }, 1000)
  }
}

function showAlert(message) {
  document.getElementById('mywindows12').innerHTML = message
  //alert(message)
}

async function madLib(choice) {
  var final = ""
  var ask = ""
  if (choice==1) {
    var blank = "<a name> went for a walk in <a place>. <He or She based on name> found a <a noun>. <same name as before> decided to take it to <a place>. However, the thing wanted to <a verb> <an adverb>. '<an Exclamation>!!!!!!!!!!!!!!!!!!!!!!!' said <the same name as before>. The <the noun from before> was creating chaos!. <name from earlier> quickly threw the <the noun from before> into a cage and locked it."

  } else if (choice == 2)
  {
    var blank = "It was a <a day of the week> and <a name> was excited! Tonight <his or her> <a relative> was going to bring <him or her> to <the name of a restaraunt>. <He or She> hadn't been there in <a length of time>! 'The plate's <a temperature adjective>, monsieur,' the waiter said. 'Thanks, <a name>,' I said. I took a bite of the <a food> and some spilled inside my <an article of clothing>. 'YAAAAHHH!!!!!!' I yelled. 'This food's <the same temperature adjective from earlier>!!!!!!!!!!'"
  } else if (choice == 3) {
    var blank = "After a long day of <a present continuous verb (verb ending with ing)> <a name> went <a place> to relax. However <he or she> did not expect a <a noun> to be <a verb ending with ing> in the middle of <the same place>. It <a past tense verb> on the <a noun> as it also <a past tense verb> merrily."
  }
  for (var i = 0; i < blank.length; i++) {
    if (blank.charAt(i) == "<") {
      i++
      while(blank.charAt(i) != ">") {
        ask += blank.charAt(i)
        i++
      }
      final += await showPrompt('Enter ' + ask)
      ask = ""
    } else {
      final += blank.charAt(i)
    }
  }
  document.getElementById('answerform').style.display = 'none'
  document.getElementById('header2').innerHTML = final
}

function showPrompt(ask) {
  return new Promise((resolve) => {
  let answer 
  const p = document.querySelector('#sw')
  p.innerHTML = "Question: " + ask
  document.getElementById('answerform').style.display = 'block'
  document.getElementById('answerform').addEventListener('submit', function(e) {
    e.preventDefault()
    answer = document.getElementById('input').value
    resolve(answer)
  }, { once: true })
  
  return answer
  })
}



// fULLSCREENCLOCK


const fullscreenclockbtn = document.getElementById('fullscreenclock')
const clocainer = document.querySelector('.clocainer')

let open = false

fullscreenclockbtn.onclick = () => {
  if (open === false) {
    
  clocainer.style.width="100vw"
  clocainer.style.height="100vh"
  clocainer.style.display="flex"
  clocainer.style.justifyContent="center"
  clocainer.style.alignItems="center"
  clocainer.style.backgroundColor = "blue"
  clocainer.style.flexDirection = "column"
  document.body.style.overflow = "hidden"
  fullscreenclockbtn.innerHTML = "Exit full screen clock"
  open = true
  } else {
    clocainer.removeAttribute('style')
    document.body.style.overflow = "unset"
    fullscreenclockbtn.innerHTML = "Full screen clock"
    open = false
  }
}

setTimeout(() => {


  document.body.style.backgroundColor = "red !important"
  
setTimeout(() => {
  document.body.style.backgroundColor = "orange !important"
  setTimeout(() => {
    document.body.style.backgroundColor = "yellow !important"
    setTimeout(() => {
      document.body.style.backgroundColor = "green !important"
      setTimeout(() => {
        document.body.style.backgroundColor = "blue !important"
        setTimeout(() => {
          document.body.style.backgroundColor = "purple !important"
          setTimeout(() => {
            document.body.style.backgroundColor = "hotpink !important"
            setTimeout(() => {
              document.body.style.backgroundColor = "black !important"
            }, 500)
          }, 500)
        }, 500)
      }, 500)
    }, 500)
  }, 500)
}, 500)
}, 1)
