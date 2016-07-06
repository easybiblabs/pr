var GH_TOKEN = localStorage.getItem('GH_TOKEN');
if (!GH_TOKEN) {
    alert("do localStorage.setItem('GH_TOKEN', .....token....);");
}

$.get('https://api.github.com/issues', { access_token: GH_TOKEN })
    .done(function(data) {
        console.log(data);
    });

var loadContributors = () => {
    $('.file-header').each((_, header) => {
        $(header).find('.file-actions a.btn:contains("View")').each((_, anchor) => {
            $.get($(anchor).attr('href')).done(function (data) {
                var contributors = $(data).find('.commit-tease-contributors');
                $(contributors).css('margin-top', '0px');
                $(contributors).css('border-top', 'none');
                var bar = $('<div class="file-header"></div>').append($(contributors)[0]);
                $(bar).css('padding-top', '0px');
                $(header).after($(bar));
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (pageDetect.isRepo()) {
        gitHubInjection(window, () => {
            if (pageDetect.isPRFiles()) {
                blamePR();
                loadContributors();
            }
        });
    }
});

