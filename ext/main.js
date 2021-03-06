var GH_TOKEN = localStorage.getItem('GH_TOKEN');
if (!GH_TOKEN) {
    alert("do localStorage.setItem('GH_TOKEN', .....token....);");
}

/*
$.get('https://api.github.com/issues', { access_token: GH_TOKEN })
    .done(function(data) {
        console.log(data);
    });
*/

document.addEventListener('DOMContentLoaded', () => {
    if (pageDetect.isRepo()) {
        gitHubInjection(window, () => {
            if (pageDetect.isPRFiles()) {
                blamePR();
                loadContributors();
                hideCommitFiles();
            }
            if(pageDetect.isPR()) {
              loadTravisFavicon();
              loadTravisMatrix();
            }
        });
    }
});

