/* global chrome */

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, { message: 'load' })
})
