console.log('here')
		// copyright rafdo 2024.
    // the rafdo authors.
    // Official Rafdo Code.

/* Place your JavaScript in this file */
const sufferMovieDialog = document.querySelector('dialog')
const notFalse = true
if (localStorage.getItem("suffer") == null) {
    localStorage.setItem("suffer", 0)
}
var date = new Date()
var tooLate = date.getFullYear() !== 2024 || date.getMonth() >= 9
if (parseInt(localStorage.getItem("suffer")) % 2 === 0 && !tooLate) {
    sufferMovieDialog.showModal()
    document.getElementById("close-suffer").addEventListener('click', function(){
        sufferMovieDialog.close()
    },{once:notFalse})
}
console.log(parseInt(localStorage.getItem("suffer")))
localStorage.setItem("suffer", parseInt(localStorage.getItem("suffer")) + 1)







