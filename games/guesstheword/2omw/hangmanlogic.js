/// HI THERE!!!!
/// WHY ARE YOU READING THIS SOURCE CODE
// IT'S JUST SOME DUMB SOURCE CODE BY A TEN YEAR OLD
// IF YOU ARE INTERESTED IN WORKING FOR RAFDO
// JUST EMAIL ME AT THEFOXJONES@GMAIL.COM





// this is just some statuses
const HANGMAN_STATUS = {
  PLAYING: 'playing',
  FINISHED: 'finished',
  FAILED: 'failed'
}

// we need this variable to see if we have updated the status message after the game has already started so we can say rules: you can press enter if users have found the easter egg. there is probably a better way to do this tho.
let beforeUpdateStatusMessage = false

// This is a list of letters so we can get all our keyboard buttons

const LETTERS = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]

// these two varaibles just represent green and gray, which are colors that the keyboard buttons can become
const GREEN = true
const GRAY = false

// this changes the keyboard button color
function makeKeyboardButtonColor(color, element) {
    // color is gren if true, otherwise gry
    if (color === GREEN) {
        // gren
        element.classList.add('gren')
        console.log('Made one keyboard element green')
    } else {
        // gry
        element.classList.add('gry')
        console.log('Made one keyboard element gray')
    }
}

// this creates our keyboard object with the elements and the keys which are the letters

function getKeyboard() {
    const letters = LETTERS
    var result = {};
    LETTERS.forEach(l => {
        result[l] = document.getElementById(l)
    })
    return result
}

// this is the class for the actual game but it doesnt do any of the ui stuff excepet for keyboard button colors because i was lazy to move that just the logic

class HangmanGame {
    //constructor
  constructor (word, times, render){
      this.word = word.toLowerCase().split('')
      this.times = times
      this.guessedLetters = []
      this.status = HANGMAN_STATUS.PLAYING
      this.renderFn = render
      this.keyboard = getKeyboard()
  }

  calculateStatus(){
      const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

      if (this.times === 0){
          this.status = HANGMAN_STATUS.FAILED
          console.log('User lost')
      } else if (finished){
          this.status = HANGMAN_STATUS.FINISHED
          console.log('User won')
      } else {
          this.status = HANGMAN_STATUS.PLAYING
      }
  }

  get statusMsg(){
      if (this.status === HANGMAN_STATUS.PLAYING){
          // this is to compensate for the easteregg 
          const s = Boolean(!!beforeUpdateStatusMessage) // we need to clone this boolean because we are going to change it but we want the original value.
          const thisthing = `${this.times} GUESS${parseInt(this.times) === 1 ? "" : "ES"} LEFT` // we reference this twice there is probably a better way to do this but i dont bother
          beforeUpdateStatusMessage = true // updating this variable because its now been one time
          return s ? thisthing : (localStorage.getItem('guesstheword:easteregg') != null ? "RULES: YOU CAN PRESS ENTER." : thisthing) // doing the logic
      } else if (this.status === HANGMAN_STATUS.FAILED){
          console.log('User has lost the game')
          return `GAME OVER! WORD${parseInt(new URLSearchParams(location.search).get('words') || '2') !== 1 ? "S" : ""}: "${this.word.join('').toUpperCase()}".` // using logic to make sure "WORD" can be "WORD" or "WORDS" depending on if the number of words to guess  our user failed us
      } else {
          console.log('User has won the game!')
          return `YOU WON!` // our user is supreme
      }
  }

  get puzzle(){
      let str = ''
      if (this.status === HANGMAN_STATUS.FAILED) return this.word.join('').toLowerCase()
      this.word.forEach((letter) => {
          if (this.guessedLetters.includes(letter) || letter === ' '){
              str += letter
          }else{
              str += '_'
          }
      })
      return str
  }
  giveUp() {
      this.times = 0
      this.calculateStatus()
      this.renderFn()
      console.log('User gave up')
  }


  makeGuess(guess){

      if (this.status !== HANGMAN_STATUS.PLAYING) return

      guess = guess.toLowerCase()
      if (!LETTERS.includes(guess)) return
      const isUnique = !this.guessedLetters.includes(guess)
      const isBadGuess = !this.word.includes(guess)

      let result = false

      if (isUnique){
          this.guessedLetters.push(guess)
          if (isBadGuess) {
              this.times--
makeKeyboardButtonColor(GRAY, game.keyboard[guess])
                console.log('bad guess')
              result = false
          } else {

makeKeyboardButtonColor(GREEN, game.keyboard[guess])
    console.log('good guess')
          result = true
          }
      }

      this.calculateStatus()
      return result
  }

}

//request puzzle API
const getPuzzle = async (wordCount) => {
  const response = await fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`)
  if (response.status === 200){
      const data = await response.json()
      let puzzle = data.puzzle
      if (NUMBER_OF_WORDS === '4') {
    if (localStorage.getItem('poopfarttoiletfart') !== 'fart in the toilet') {
        puzzle = "Fart In The Toilet"
        localStorage.setItem('poopfarttoiletfart', 'fart in the toilet')
    }
}
      console.log('Puzzle retrieved: ' +puzzle)

      return puzzle
  } else {
      console.log('unable to get puzzle')
      document.body.innerHTML = "<div style=\"display: flex; justify-content: center; align-items: center;\"><h2>Whoops! Unable to get puzzle! please report this bug to me at x5r32@outlook.com</h2></div>"
      throw new Error ('Unable to get puzzle')
  }
}

//DOM interaction
const wordTextElement = document.getElementById('hangman-word')
const statusTextElement = document.getElementById('hangman-status')
const giveUpButton = document.getElementById('giveup')

let game

let enterCount = 0
function enterPressed() {
    const body = document.body
    const overlayDiv = document.getElementById('overlay')
    const overlayImage = document.getElementById('overlayimg')
    console.log('enter pressed')
    if (localStorage.getItem('guesstheword:easteregg') != null) return
    if (enterCount === 0) {
      overlayDiv.style.display = "flex"
      overlayImage.style.cursor = "pointer"
      body.style.overflow = 'hidden'
      overlayImage.onclick = function() {
        body.style.overflow = 'unset'
        overlayDiv.style.display = "none"
      }
    } else if (enterCount === 1) {
        alert('don\'t press enter...')
    } else if (enterCount === 2) {
        alert('WHY ARE YOU PRESSING ENTER')
    } else if (enterCount === 3) {
        alert("I think you need a lesson.")
        alert("Enter is not allowed here")
        alert("Rule breaking is not allowed here")
        alert("understand?")
        alert("I hope you won't press enter again.")
    } else if (enterCount === 4) {
        alert("CAN YOU NOT FOLLOW SIMPLE INSTRUCTIONS?!?!?!?!?")
        alert('If you do this ridiculousness one more time...')
        alert('Then I will be very mad.')
        alert('Got it?')
        alert('you sure??')
        const bruh = prompt('Enter "noenter" if you will never press enter on this page again.')
        if (bruh !== "noenter") {
            alert('What, did you misspell?')
            alert('Try again.')
            const bru2h = prompt('Enter "noenter" if you will never press enter on this page again. Which you must. So enter "noenter" or else')
            if (bru2h !== "noenter") {
                alert("I don't think you should be here if you're going to spam enter.")
                location.replace('http://news.rr.nihalnavath.com/posts/Rickroll-f278ee88')
            } else {
                alert('Ok...')
            }
        } else {
            alert("Ok...")
        }
    } else if (enterCount === 5) {
        alert('You lied to me.')
        alert('Why did you lie to me?')
        alert('Sure, press enter all you want, but keep in mind that I will haunt you for the rest of your life...')
        localStorage.setItem('guesstheword:easteregg', 'mhm')
        //location.reload()
        beforeUpdateStatusMessage = false
        game.renderFn()
        console.log('YOU PRESSED ENTER!!! OMG SERET IMQEUST')
        location.replace('https://imagequest.vercel.app/youpressedenter/')
    } else {
        
    }

    enterCount++
}


window.addEventListener('keypress', (e) => {
  if(e.charCode === 13) {
      // we have enter
      enterPressed()
  } else {
  const guess = String.fromCharCode(e.charCode)
  whenkeypressed(guess)
      console.log('user pressed key')
  }
})

const render = (letterFound) => {
    console.log('rendering')
  wordTextElement.innerHTML =''
  statusTextElement.textContent = game.statusMsg

  game.puzzle.split('').forEach((letter) => {
      const letterEl = document.createElement('span')
      letterEl.textContent = letter
      wordTextElement.appendChild(letterEl)
  })
  if (game.status === HANGMAN_STATUS.FAILED) {
      const keyboardButtons = document.querySelectorAll('.keyboard-button')
      console.log(keyboardButtons)
      keyboardButtons.forEach(button => {
          button.setAttribute('disabled', '')
          button.classList.add('disabled')
      })
  }
}

function whenkeypressed(guess) {
  const letterFound = game.makeGuess(guess)
  render(letterFound)
}

const NUMBER_OF_GUESSES = parseInt(new URLSearchParams(location.search).get('guesses') || "15")
if (NUMBER_OF_GUESSES > 20) {
    console.log('number of guesses too big')
    alert('Number of guesses must be 20 or less')
    history.back()
}
const NUMBER_OF_WORDS = new URLSearchParams(location.search).get('words') || '2'


const startGame = async () => {
  let puzzle = await getPuzzle(NUMBER_OF_WORDS)
  const lowercasePuzzle = puzzle.toLowerCase()
  if (lowercasePuzzle === "a pinch of salt") {
      console.log('more salt more salt')
    const word = (() => {
        const rand = Math.random()
        let word
        if (rand < 0.3333333) {
            word = "glob"
            return word
        } else if (rand < 0.66666666) {
            word = "mountain"
            return word
        } else {
            word = "heap"
            return word
        }
    })()
    puzzle = `a ${word} of salt`
  }
  puzzle = puzzle.replaceAll(' ', '  ')
  game = new HangmanGame(puzzle, NUMBER_OF_GUESSES, render)
  render()


for (const letter in game.keyboard) {
    const letterElement = game.keyboard[letter]
    letterElement.onclick = () => {
        console.log('clicked a leter')

whenkeypressed(letter)
    }
}
}

document.getElementById('reset').addEventListener('click', () => location.reload())
giveUpButton.addEventListener('click', () => {
    if (game != null) game.giveUp()
})
startGame()