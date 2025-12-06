/* Place your JavaScript in this file */
/////// entrance page


/* copyright rafdo. whatever */



const homepage = './discover.html'
document.getElementById('btn-1id').onclick = function () {
  console.log('ok.........................')
  document.body.innerHTML =
    "<p id=msg>.......... are you sure?</p><button id=ye>yes</button><button id='nop'>no</button><!--k-->"
  oc(document.getElementById('nop'), () => {
    var m = document['getElement' + 'ById']('msg')
    var y = document.getElementById('ye')
    var n = document.getElementById('nop')
    m.innerHTML = "....i don't care, youre entering ImageQuest no matter what."
    y.innerHTML = 'ok fine'
    n.innerHTML = 'you can\'t make me'
    oc(y, () => {
      location.assign(homepage)
    })

    oc(n, () => {
      y.remove()
      n.remove()
      m.innerHTML =
        ".....oh, yes i can. so your entering anyway. lol"
      setTimeout(
        () => {
      location.assign(homepage)
        },
        5 * (5 - (5 / 5)) * (5 * (5 - (5 - (5/5) - (5/5)))) * (5 * (5 - (5 - (5/5) - (5/5))))
      )
    })
  })
  oc(document.getElementById('ye'), () => location.assign('./discover.html'))
}

// Really useful function |
//              (insert down caret here)
function t(undefined) {
  return (function (anotherUndefined) {
    return undefined === anotherUndefined
  })()
}

// adds onclick event listener that only happens once
function oc(el, handler) {
  el.addEventListener('click', handler, { once: (t() ? t() : !t()) ? t() : t() })
}
