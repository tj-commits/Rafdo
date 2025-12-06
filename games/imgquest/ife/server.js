// if (location.pathname === '/') {

// location.replace('/home.html')
// }  else if (location.pathname.startsWith('/imgquest/') || location.pathname.startsWith('imgquest/')) {
//   setTimeout(function () {

//   location.replace('/' + location.pathname.split('/')[1])
//   }, 1)
// }else if (!location.pathname.endsWith('.html')) {
//   const xhr = new XMLHttpRequest()
//   xhr.onload = function () {
//     if (xhr.status !== 404) {
//       document.write('status: ' + xhr.status + ' redirecting')

//         location.replace(location.pathname + '/index.html' + location.search)
//     } else {
//       document.write('')
//       location.replace(location.pathname + '.html' + location.search)
//     }
//   }
//   const loation = location
//   xhr.open('GET', location.href + '/index.html')
//   xhr.send()
// }
//  else {
//   location.replace('/errorpages/404.html')
// }