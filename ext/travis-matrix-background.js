var travisBaseUrl = 'https://api.travis-ci.com';

var getTravisMatrix = function(msg, port) {
  var url = travisBaseUrl + '/builds/' + msg.url.split('/').pop()

  getTravisToken(msg).then(function(token) {
    var options = {
      method: 'GET',
      headers: {
        "Accept": "application/vnd.travis-ci.2+json",
        "Authorization": 'token ' + token
      }
    }

    fetch(url, options).then(function(response) {
      response.json().then(function(data) {
        port.postMessage({
          command: msg.command,
          index: msg.index,
          data: data
        })
      })
    })
  })
}

getTravisToken = function(msg) {
  var travisToken = localStorage.getItem('TRAVIS_TOKEN') || null
  if(travisToken !== null) {
    return Promise.resolve(travisToken);
  }

  var url = travisBaseUrl + "/auth/github"
  var options = {
    method: 'POST',
    headers: {
      "Accept": "application/vnd.travis-ci.2+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ "github_token": msg.access_token })
  }

  return fetch(url, options).then(function(response) {
    return response.json().then(function(data) {
      localStorage.setItem('TRAVIS_TOKEN', data.access_token)
      return data.access_token
    })
  })
}

chrome.runtime.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if(msg.command === 'travis-matrix') {
      getTravisMatrix(msg, port)
    }
  })
})
