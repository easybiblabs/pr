window.loadContributors = () => {
    $('.file-header').each((_, header) => {
        if (!$(header).next().hasClass("contributor-bar")) {
            $(header).find('.file-actions a.btn:contains("View")').each((_, anchor) => {
                $.get($(anchor).attr('href')).done(function (data) {
                    var contributors = $(data).find('.commit-tease-contributors');
                    $(contributors).css({'margin-top': '0px', 'border-top': 'none'});
                    $(contributors).find('.contributors-toggle').contents()[0].textContent = 'File has ';
                    var bar = $('<div class="file-header contributor-bar"></div>').append($(contributors)[0]);
                    $(bar).css('padding-top', '0px');
                    $(header).after($(bar));
                });
            });
        }
    });
}
