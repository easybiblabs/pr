window.loadContributors = () => {
    $('.file-header').each((_, header) => {
        $(header).find('.file-actions a.btn:contains("View")').each((_, anchor) => {
            $.get($(anchor).attr('href')).done(function (data) {
                var contributors = $(data).find('.commit-tease-contributors');
                $(contributors).css({'margin-top': '0px', 'border-top', 'none'});
                var bar = $('<div class="file-header"></div>').append($(contributors)[0]);
                $(bar).css('padding-top', '0px');
                $(header).after($(bar));
            });
        });
    });
}
