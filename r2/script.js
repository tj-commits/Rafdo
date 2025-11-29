
import emojiList from './emojis.json' with { type: "json" }
import { zalgoGeneration, zalgoRandomGeneration } from './zalgo.js'

var emojis = emojiList.emojis.map(em => {
  return em.emoji
})


var $=_=>document.querySelector(_)
var number=_=>parseInt(_)
var capitalizeFirstLetter = _ => `${_.charAt(0).toUpperCase()}${_.slice(1)}`
var getRandomInt = (min,max) => Math.floor(Math.random()*(Math.floor(max)-Math.ceil(min)+1))+Math.ceil(min);
var getrandomzalgoint = (min,max) => {
  return zalgoGeneration(getRandomInt(min,max).toString(), 1)
}
function getRandomSample(arr, n) {
  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Return the first n elements
  return arr.slice(0, n);
}
const lowercaseLetters = [];
for (let i = 97; i <= 122; i++) {
  lowercaseLetters.push(String.fromCharCode(i));
}
var makekeymashword = () => {
  var wordlength = getRandomInt(10, 50)
  var letters=lowercaseLetters
  var word = ""
  for (var i = 0; i < wordlength; vi++) {
    word += getRandomSample(letters, 1)[0]
  }
  return word
}
var multipleKeyMashWords = (howmanywords) => {
  var result = []
  for (var i = 0; i < howmanywords.length; i++) {
    result.push(makekeymashword())
  }
  return result
}
let gib = ["opiouiyutrttdgxfvcfgtfgdfghffffdsfdsdfsrgiusdgiksdkgsafdfhgj", "dgurgdsiugyusdguujhbderstdzsdzdsfssrugskdrggsafdfhgj", "kdfgsdkjfgkadtdgxfvcfgtopiouiyutrttdgxfvcfgtfgdfghffffdsfdsdfs", "zsdzdsfssdgurgdsiugyusdgugay", "uygfjhfdkfkhfsafdfhgjrgiusdgiksdkggay", "8weirsjdhvhdfktdgxfvcfgtsdfjgjytyzsdzdsfssrgiusdgiksdkg8weirsjdhvhdfkgayrgiusdgiksdkggayrugskdrggfgdfghffffdsfdsdfs", "uygfjhfdkfkhfkdfgsdkjfgkaddgurgdsiugyusdguujhbderstddgurgdsiugyusdguzsdzdsfss8weirsjdhvhdfkdgurgdsiugyusdgusdfjgjytydrgdjfsiuff", "rgiusdgiksdkgopiouiyutrtdgurgdsiugyusdgugay", "zsdzdsfssrgiusdgiksdkgkdfgsdkjfgkad", "kdfgsdkjfgkadtdgxfvcfgt", "rgiusdgiksdkgdgurgdsiugyusdgurugskdrggzsdzdsfsssafdfhgjtdgxfvcfgtkdfgsdkjfgkad", "gayrgiusdgiksdkgsafdfhgjujhbderstdtdgxfvcfgtfgdfghffffdsfdsdfs", "dgurgdsiugyusdgusdfjgjyty8weirsjdhvhdfkdgurgdsiugyusdgukdfgsdkjfgkaddgurgdsiugyusdgukdfgsdkjfgkadrugskdrggsdfjgjytygay", "rugskdrgggay", "opiouiyutrtuygfjhfdkfkhfjrdsvwkkftdgxfvcfgtfgdfghffffdsfdsdfsrgiusdgiksdkg", "rgiusdgiksdkggay", "kdfgsdkjfgkadtdgxfvcfgtopiouiyutrttdgxfvcfgtfgdfghffffdsfdsdfsrgiusdgiksdkg", "safdfhgjuygfjhfdkfkhfdrgdjfsiuffsdfjgjytyuygfjhfdkfkhf", "uygfjhfdkfkhfopiouiyutrtdgurgdsiugyusdgudfgsegtdfxdgbrugskdrgguygfjhfdkfkhf", "oiurdsuirdguiuygfjhfdkfkhffgdfghffffdsfdsdfsgay", "rgiusdgiksdkgreafdxchkryer", "rgiusdgiksdkguygfjhfdkfkhf", "8weirsjdhvhdfktdgxfvcfgtsafdfhgjsafdfhgjtdgxfvcfgtkdfgsdkjfgkadtdgxfvcfgt", "8weirsjdhvhdfktdgxfvcfgtsdfjgjytyzsdzdsfssrgiusdgiksdkgdfgsegtdfxdgbrugskdrgguygfjhfdkfkhfgay", "rfgfjsgkjsdrgiusdgiksdkgopiouiyutrt", "safdfhgjrgiusdgiksdkggay", "uygfjhfdkfkhfopiouiyutrtdgurgdsiugyusdgudfgsegtdfxdgbrugskdrgg", "oiurdsuirdguirugskdrggdrgdjfsiuffdgurgdsiugyusdguuygfjhfdkfkhfgay", "sdfjgjytyuygfjhfdkfkhfzsdzdsfss8weirsjdhvhdfkrgiusdgiksdkggay", "zsdzdsfssrugskdrgg8weirsjdhvhdfkrugskdrggfgdfghffffdsfdsdfszsdzdsfssuygfjhfdkfkhfopiouiyutrt", "zsdzdsfssdgurgdsiugyusdgu8weirsjdhvhdfkgay", "sdfjgjytydgurgdsiugyusdguzsdzdsfssopiouiyutrtdgurgdsiugyusdgugay", "sdfjgjytyrugskdrggopiouiyutrtopiouiyutrt", "rgiusdgiksdkgfgdfghffffdsfdsdfsfgdfghffffdsfdsdfsrgiusdgiksdkgrugskdrggfgdfghffffdsfdsdfs", "rgiusdgiksdkgfgdfghffffdsfdsdfsfgdfghffffdsfdsdfsrgiusdgiksdkg", "uygfjhfdkfkhfopiouiyutrtdgurgdsiugyusdgudfgsegtdfxdgbrugskdrggrgiusdgiksdkggay", "drgdjfsiuffrgiusdgiksdkgdrgdjfsiuffrgiusdgiksdkgrfgfjsgkjsdrgiusdgiksdkgsdfjgjyty", "fsfhsdufgsurfrgiusdgiksdkgjrdsvwkkffgdfghffffdsfdsdfsrgiusdgiksdkgetbtbdgsfsf", "ewqrtyuioureuyuuyweijrdsvwkkffgdfghffffdsfdsdfsrgiusdgiksdkgetbtbdgsfsf", "rgiusdgiksdkgsdfjgjytyrgiusdgiksdkguygfjhfdkfkhfrgiusdgiksdkguygfjhfdkfkhfetbtbdgsfsf", "zsdzdsfsskdfgsdkjfgkadzsdzdsfsskdfgsdkjfgkadzsdzdsfssoiurdsuirdguizsdzdsfsskdfgsdkjfgkadoiurdsuirdguizsdzdsfss", "opiouiyutrttdgxfvcfgtfgdfghffffdsfdsdfsrgiusdgiksdkgsafdfhgj", "dgurgdsiugyusdguujhbderstdzsdzdsfssrugskdrggsafdfhgj", "rgiusdgiksdkggayrugskdrggfgdfghffffdsfdsdfssdfjgjytyrugskdrggsafdfhgj", "rgiusdgiksdkgfgdfghffffdsfdsdfsrgiusdgiksdkgfgdfghffffdsfdsdfsrgiusdgiksdkgrgiusdgiksdkgfgdfghffffdsfdsdfsrgiusdgiksdkgfgdfghffffdsfdsdfsrgiusdgiksdkgfgdfghffffdsfdsdfsrgiusdgiksdkgfgdfghffffdsfdsdfsrgiusdgiksdkgfgdfghffffdsfdsdfsrgiusdgiksdkgfgdfghffffdsfdsdfsrgiusdgiksdkgfgdfghffffdsfdsdfs", ";", ";", ";", ";", ";", ";", "tdgxfvcfgtujhbderstddgurgdsiugyusdgutdgxfvcfgtrugskdrggdgurgdsiugyusdguyuttrhgjhkjuytrugskdrgggayfgdfghffffdsfdsdfsgayfgdfghffffdsfdsdfsdrgdjfsiuffdgurgdsiugyusdgurugskdrggzsdzdsfsskdfgsdkjfgkaddrgdjfsiuffdgurgdsiugyusdguewqrtyuiozsdzdsfsskdfgsdkjfgkadewqrtyuiodrgdjfsiuffdrgdjfsiuffuygfjhfdkfkhfyuttrhgjhkjuytdrgdjfsiuffuygfjhfdkfkhfyuttrhgjhkjuytfgdfghffffdsfdsdfsdrgdjfsiuffdgurgdsiugyusdgurugskdrggzsdzdsfsskdfgsdkjfgkaddrgdjfsiuffdgurgdsiugyusdguewqrtyuiozsdzdsfsskdfgsdkjfgkadewqrtyuiodrgdjfsiuffoiurdsuirdguidrgdjfsiuffkdfgsdkjfgkadoiurdsuirdguidrgdjfsiufffsfhsdufgsurfoiurdsuirdguioiurdsuirdguioiurdsuirdguioiurdsuirdguikdfgsdkjfgkadzsdzdsfssoiurdsuirdguikdfgsdkjfgkadzsdzdsfsskdfgsdkjfgkadoiurdsuirdguizsdzdsfss", "ureuyuuyweifgdfghffffdsfdsdfskdfgsdkjfgkadzsdzdsfssrfgfjsgkjsdetbtbdgsfsfewqrtyuioewqrtyuiooiurdsuirdguifgdfghffffdsfdsdfsrugskdrggdrgdjfsiuffzsdzdsfssewqrtyuiokdfgsdkjfgkadfgdfghffffdsfdsdfsdrgdjfsiuffdrgdjfsiuffoiurdsuirdguidrgdjfsiuffkdfgsdkjfgkadoiurdsuirdguidrgdjfsiufffsfhsdufgsurfoiurdsuirdguioiurdsuirdguioiurdsuirdguioiurdsuirdguikdfgsdkjfgkadzsdzdsfssoiurdsuirdguikdfgsdkjfgkadzsdzdsfsskdfgsdkjfgkadoiurdsuirdguizsdzdsfsskdfgsdkjfgkadfgdfghffffdsfdsdfsdrgdjfsiuffkdfgsdkjfgkadureuyuuyweioiurdsuirdguizsdzdsfssdgurgdsiugyusdgurugskdrggoiurdsuirdguioiurdsuirdguifgdfghffffdsfdsdfsdrgdjfsiuffdgurgdsiugyusdgurugskdrggzsdzdsfsskdfgsdkjfgkaddrgdjfsiuffdgurgdsiugyusdguewqrtyuiozsdzdsfsskdfgsdkjfgkadewqrtyuiodrgdjfsiuffoiurdsuirdguidrgdjfsiuffkdfgsdkjfgkadoiurdsuirdguidrgdjfsiufffsfhsdufgsurfoiurdsuirdguioiurdsuirdguioiurdsuirdguioiurdsuirdguikdfgsdkjfgkadzsdzdsfssoiurdsuirdguikdfgsdkjfgkadzsdzdsfsskdfgsdkjfgkadoiurdsuirdguizsdzdsfss", "ewqrtyuiokdfgsdkjfgkadoiurdsuirdguidrgdjfsiuffzsdzdsfsskdfgsdkjfgkadewqrtyuioureuyuuyweioiurdsuirdguidrgdjfsiuffewqrtyuiouygfjhfdkfkhfkdfgsdkjfgkad"]
const loremWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "fart", "ex", "ea", "commodo", "consequat", "vel", "met", "aliqu", "fugiat", "nascet", "sucursal", "sict", "nislit", "null", "erreur", "erre", "aliquet", "gegeven", "hebrew", "kjbrew", "eneaeaw", "sdsdsfsdfs", "lorem", "ipsum", "eturnum", "erereererererererer", ";", ";", ";", ";", ";", ";", "opiouiyutrtrgiusdgiksdkggaygayrgiusdgiksdkgfgdfghffffdsfdsdfs", "jrdsvwkkfrugskdrggfgdfghffffdsfdsdfsdrgdjfsiuffrgiusdgiksdkgfgdfghffffdsfdsdfs", "kdfgsdkjfgkad", ...getRandomSample(gib, 1), ...getRandomSample(emojis, 50), ...multipleKeyMashWords(5), '.', '.', ',', '!!!!!!!!!!!', '556', '2,147,483,647', 'Fun fact: Your name is a mixture of multiple heritages in the world of land of death of deltiages in the world of carnation and children of the smeile', ' E ',' E ',' E ',' E ',' E ',' E ',' E ',' E ',' E ',' E ',' E ',' E ',' E ',' E ','            d', getrandomzalgoint(324,3204929348), getrandomzalgoint(324,3204929348), getrandomzalgoint(324,3204929348), getrandomzalgoint(324,3204929348)];



function getRandomWord() {

  const randomIndex = Math.floor(Math.random() * loremWords.length);

  return loremWords[randomIndex];

}



function generateSentence(firstSentence) {
  if (firstSentence===true) return "Lorem ipsum dolor sit amet, consectetur adipiscing elit fart"

  let sentence = "";

  for (let i = 0; i < Math.floor(Math.random() * 8) + 6; i++) {

    sentence += getRandomWord();

  }

  sentence = sentence.trim(); // Remove trailing space
  sentence = capitalizeFirstLetter(sentence)

  return sentence
}



function generateParagraph(paragraphCount) {
  let firstSentence = true
  let paragraphsText = "";

  for (let i = 0; i < paragraphCount; i++) {
    for (let i = 0; i < getRandomInt(1,300); i++) { // 1-300 sentences per pargraph

      paragraphsText += generateSentence(firstSentence) + ", "; // Add a exclamation points at the end of each sentence
      firstSentence = false
    }
    paragraphsText += "<br><br>"
  }

  return paragraphsText;

}

$('#generate').onclick = function(){
  const paragraphs = number($('#paragraphs').value)
  $('#output').innerHTML = generateParagraph(paragraphs)
}
