console.log($(document));

var GH_TOKEN = localStorage.getItem('GH_TOKEN');
if (!GH_TOKEN) {
    alert("do localStorage.setItem('GH_TOKEN', .....token....);");
}

$.get('https://api.github.com/issues', { access_token: GH_TOKEN })
    .done(function(data) {
        console.log(data);
    });
