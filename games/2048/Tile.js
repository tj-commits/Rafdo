const STARTING_VALUE_1 = parseInt(new URLSearchParams(location.search).get('sv1') || 2)
const STARTING_VALUE_2 = parseInt(new URLSearchParams(location.search).get('sv2') || 4)

export default class Tile {
  #tileElement
  #x
  #y
  #value

  constructor(tileContainer, value = Math.random() > 0.5 ? STARTING_VALUE_1 : STARTING_VALUE_2) {
    this.#tileElement = document.createElement("div")
    this.#tileElement.classList.add("tile")
    tileContainer.append(this.#tileElement)
    this.value = value
  }

  get tileElement() {
    return this.#tileElement
  }

  get value() {
    return this.#value
  }

  set value(v) {
    this.#value = v
    this.#tileElement.textContent = v
    const power = Math.log2(v)
    const backgroundLightness = 100 - power * 9
    const textLightness = backgroundLightness <= 50 ? 90 : 10
    this.#tileElement.style.setProperty(
      "--background-lightness",
      `${backgroundLightness}%`
    )
    this.#tileElement.style.setProperty("--text-lightness", `${textLightness}%`)
  }

  set x(value) {
    this.#x = value
    this.#tileElement.style.setProperty("--x", value)
  }

  set y(value) {
    this.#y = value
    this.#tileElement.style.setProperty("--y", value)
  }

  remove() {
    this.#tileElement.remove()
  }

  waitForTransition(animation = false) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? "animationend" : "transitionend",
        resolve,
        { once: true }
      )
    })
  }
}