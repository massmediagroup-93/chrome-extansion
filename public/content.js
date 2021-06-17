/* global chrome */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  main()
})

function main() {
  const extensionOrigin = `chrome-extension://${chrome.runtime.id}`
  // eslint-disable-next-line no-restricted-globals
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    const testChromeExtension = document.getElementById('test-chrome-extension')

    if (testChromeExtension) {
      if (testChromeExtension.style.display === 'none') {
        testChromeExtension.style.display = 'block'
        window.postMessage({ type: 'MOUNT_THE_APP' }, '*')
      } else {
        testChromeExtension.style.display = 'none'
        window.postMessage({ type: 'UNMOUNT_THE_APP' }, '*')
      }
    } else {
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
}
