console.log("67");;

// Redirect to Netlify only if on rafdo.rf.gd
if (window.location.hostname === 'rafdo.rf.gd') {
  const currentPath = window.location.pathname + window.location.search + window.location.hash;
  const targetUrl = 'https://rafdo.netlify.app' + currentPath;
  window.location.replace(targetUrl);
}