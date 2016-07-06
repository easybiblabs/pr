var icons = {
  'regular': chrome.extension.getURL('icons/regular.ico'),
  'broken': chrome.extension.getURL('icons/broken.ico'),
  'mergeable': chrome.extension.getURL('icons/mergeable.ico')
}

var currentIcon = icons.regular
var stateInterval = false

var hasFailedChecks = function() {
  return document.querySelectorAll('.completeness-indicator-error').length
}

var isMergeable = function() {
  return document.querySelectorAll('.completeness-indicator-success').length
}

var isMerged = function() {
  return document.querySelectorAll('.post-merge-message').length || document.querySelectorAll('.pull-request-ref-restore').length
}

var setPRFavicon = function() {
  var newIcon = icons.broken

  if (isMerged()) {
    clearInterval(stateInterval)
    newIcon = icons.regular
  }

  if (isMergeable() && !hasFailedChecks()) {
    newIcon = icons.mergeable
  }

  var icon = document.querySelectorAll('link[rel="icon"]')[0]
  if(icon.href !== newIcon) {
    console.log('setting favicon to ', newIcon, icon.href)
    icon.href = newIcon
  }
}

stateInterval = setInterval(function() {
  if (!pageDetect.isPR()) {
    return
  }

  setPRFavicon()
}, 1000)
