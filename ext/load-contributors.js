var queryContributors = (i, header, anchor, count) => {
    // ensure failure to load does not trigger endless reload
    if (count > 1) {
        return;
    }

    $.get($(anchor).attr('href')).done(function (data) {
        var contributorsBox = $(data).find('#blob_contributors_box')
        $(contributorsBox).attr('id', 'blob_contributors_box_'+i);

        var contributors = $(data).find('.commit-tease-contributors');
        $(contributors).css({'margin-top': '0px', 'border-top': 'none'});

        if (!$(contributors).find('.contributors-toggle').length) {
            // reload, not cached yet
            setTimeout(() => {
                queryContributors(i, header, anchor, count+1)
            }, 500);
            return;
        }

        $(contributors).find('.contributors-toggle').contents()[0].textContent = 'File has ';
        $(contributors).find('.contributors-toggle').attr('data-facebox', '#blob_contributors_box_'+i);

        // handle 1 contributor case without image
        if (!$(contributors).find('.avatar-link').length) {
            var avatar = $(contributorsBox).find('.facebox-user-list-item img')[0];
            $(avatar).attr({
                'height': 20,
                'width': 20,
                'class': 'avatar',
                'src': $(avatar).attr('src').replace('s=48', 's=40'),
            });
            var contributor = $('<a class="avatar-link tooltipped tooltipped-s"></a>').append(avatar);
            $(contributors).append(contributor);
        }

        var bar = $('<div class="file-header contributor-bar"></div>')
            .append($(contributors)[0])
            .append($(contributorsBox)[0]);
        $(bar).css('padding-top', '0px');
        $(header).after($(bar));
    });
}

window.loadContributors = () => {
    $('.file-header').each((i, header) => {
        if (!$(header).next().hasClass("contributor-bar")) {
            $(header).find('.file-actions a.btn:contains("View")').each((_, anchor) => {
                queryContributors(i, header, anchor, 0);
            });
        }
    });
}
