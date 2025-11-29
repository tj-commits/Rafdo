export function qs(selector, parent = document) {
	return parent.querySelector(selector)
}

export function sample(array) {
	return array[randomNumberBetween(0, array.length - 1)]
}

export function randomNumberBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
