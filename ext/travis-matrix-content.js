const loadTravisMatrix = function () {
  var buildItems = document.querySelectorAll('.build-status-item')
  var port = chrome.runtime.connect({name: "travis-matrix"})

  buildItems.forEach(function(item, index) {
    var buildUrl = $(item).find('.build-status-details').attr('href')

    port.postMessage({
      command: "travis-matrix",
      url: buildUrl,
      index: index,
      access_token: localStorage.getItem('GH_TOKEN')
    })
  })

  port.onMessage.addListener(function(msg) {
    if(msg.command !== 'travis-matrix') {
      return
    }

    var jobs = msg.data.jobs
    var info = pageDetect.getOwnerAndRepo()

    var tbl = document.createElement('table')
    tbl.classList.add('travis-matrix')

    jobs.forEach(function(job) {
      var tr = tbl.insertRow()
      
      var td = tr.insertCell()
      td.classList.add('travis-' + job.state)
      td.appendChild(document.createTextNode(''))

      tr.insertCell().appendChild(document.createTextNode(job.number))
      tr.insertCell().appendChild(document.createTextNode(job.state))
      tr.insertCell().appendChild(document.createTextNode(job.config.env))

      var buildLink = document.createElement('a')
      buildLink.href = [
        'https://travis-ci.com',
        info.ownerName,
        info.repoName,
        'jobs',
        job.id
      ].join('/')
      buildLink.innerHTML = 'Go to Log'
      tr.insertCell().appendChild(buildLink)
    })

    buildItems[msg.index].appendChild(tbl)
  })
}
