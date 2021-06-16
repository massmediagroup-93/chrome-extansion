/* global chrome */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  main()
})

function main() {
  const extensionOrigin = `chrome-extension://${chrome.runtime.id}`
  // eslint-disable-next-line no-restricted-globals
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // Fetch the local React index.html page
    // eslint-disable-next-line no-undef
    fetch(chrome.runtime.getURL('index.html') /* , options */)
      .then(response => response.text())
      .then(html => {
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`)
        // eslint-disable-next-line no-undef
        $(styleStashHTML).appendTo('body')
      })
      .catch(error => {
        console.warn(error)
      })
  }
}
