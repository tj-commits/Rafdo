const spinner = document.querySelector('.spinner')
const red = document.querySelector('.red')
const indigo = document.querySelector('.indigo')
const yellow = document.querySelector('.yellow')
const fuchsia = document.querySelector('.fuchsia')

let cur
indigo.classList.add('white')
yellow.classList.add('white')
switchCur('red')

function switchCur(newCur) {
   switch (newCur) {
      case 'red': {
         fuchsia.classList.add('white')
         red.classList.remove('white')
         break
      }
      case 'yellow': {
         yellow.classList.remove('white')
         red.classList.add('white')
         break
      }
      case 'indigo': {
         indigo.classList.remove('white')
         yellow.classList.add('white')
         break
      }
      default: {
         fuchsia.classList.remove('white')
         indigo.classList.add('white')
      }
   }

   cur = newCur
}

setInterval(function() {
   switch (cur) {
      case 'red': {
         switchCur('yellow')
         break
      }
      case 'yellow': {
         switchCur('indigo')
         break
      }
      case 'indigo': {
         switchCur('fuchsia')
         break
      }
      default: {
         switchCur('red')
      }
   }
}, 100)