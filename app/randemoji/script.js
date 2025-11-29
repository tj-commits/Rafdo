import { qs, sample } from './utils.js'
import emojiList from './emojis.json' with { type: "json" }
const emojiTextEl = qs('[data-emoji]')
const nameTextEl = qs('[data-emoji-name]')
const categoryTextEl = qs('[data-emoji-category]')
const copyEmojiButtonEl = qs('[data-copy-to-clipboard]')
const generateEmojiButtonEl = qs('[data-generate-emoji-button]')
const copiedToClipboardSnackbarEl = qs('[data-copy-to-clipboard-notification-snackbar]')

generateEmojiButtonEl.addEventListener('click', generateRandomEmoji)
copyEmojiButtonEl.addEventListener('click', copyEmojiToClipboard)

function generateRandomEmoji() {
   console.log('hi')
   const randomEmoji = sample(emojiList.emojis)
   emojiTextEl.innerText = randomEmoji.emoji
   nameTextEl.innerText = randomEmoji.name
   categoryTextEl.innerText = "Category: " + randomEmoji.category
   setFavicon(randomEmoji.emoji)
}

function setFavicon(emoji) {

var canvas = document.createElement('canvas');
    canvas.width = 16;canvas.height = 16;
    var ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 100% sans-serif';
        ctx.fillText(emoji, 1, 12)

        var link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = canvas.toDataURL("image/x-icon");
        qs('head').appendChild(link);
}

function copyEmojiToClipboard() {
   console.log('hi')
   const emoji = emojiTextEl.textContent
   navigator.clipboard.writeText(emoji).then(function() {
      copiedToClipboardSnackbarEl.classList.add('show')
      copiedToClipboardSnackbarEl.classList.add('snackbar-success')
      copiedToClipboardSnackbarEl.innerHTML = "Emoji copied to clipboard!"
      console.log('before timeout')
      setTimeout(function() {
         console.log('timeout')
         copiedToClipboardSnackbarEl.classList.remove('show')
         copiedToClipboardSnackbarEl.classList.remove('snackbar-success')
      }, 2000)
   }).catch(function() {
      copiedToClipboardSnackbarEl.classList.add('show')
      copiedToClipboardSnackbarEl.classList.add('snackbar-danger')
      copiedToClipboardSnackbarEl.innerHTML = "Error copying emoji to clipboard. Please try again."
      console.log('before timeout')
      setTimeout(() => {
         console.log('timeout')
         copiedToClipboardSnackbarEl.classList.remove('show')
         copiedToClipboardSnackbarEl.classList.remove('snackbar-danger')
      }, 2000)
   })
}

addEventListener('load', function() {
   generateRandomEmoji()
})
