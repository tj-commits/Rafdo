



function Init(srcpath) {


    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
        const response = this.responseText
        document.documentElement.remove()
        const thewindow = document.createElement('span')
        thewindow.id = "betterhtml-window"
        thewindow.innerHTML = response
        document.append(thewindow)


      var prevLength = document.querySelectorAll('script').length
      function checkDOMChange()
    {
        if (document.querySelectorAll('script').length <= prevLength) {
            ([...document.querySelectorAll('script')]).forEach((s) => {
                if (!s.hasAttribute('data-ran')) {
                    if (s.hasAttribute('src')) {
                        const scriptxhr = new XMLHttpRequest();
                        scriptxhr.onload = function () {
                            new Function(scriptxhr.responseText)()
                        }
                        scriptxhr.open('GET', s.getAttribute('src'))
                        scriptxhr.send()
                    } else {
                    new Function(s.innerHTML)()
                    s.setAttribute('data-ran', 'true')

                    }
                }
            })
        }
        prevLength = document.querySelectorAll('script').length
        if (document.querySelector('#body')) {
            Object.defineProperty(document, 'body', {
                get() {
                        return document.querySelector('#body')
                }
            })
        }
    }

    checkDOMChange()




    const Log = function (message)
    {
    const Console = console;
    if ("log" in Console)
    {
    return console.log("%c"

                +message,


                    "font-weight: bold;");

    }
    }

        ;(function () {


            window.Log = Log
            document.windowElement = document.querySelector('#betterhtml-window')
            Log('[BetterHTML] betterhtml loaded successfully');


        })()
    }

    xhr.open('GET', srcpath)
    xhr.send()

}

window.BetterHTML = { init: Init }
