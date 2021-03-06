let hideCommitFilesLoaded = false;
const hideCommitFiles = function () {
    if (hideCommitFilesLoaded) {
      return;
    }
    hideCommitFilesLoaded = true;

    let $commitMenu = $('.diffbar-range-menu .select-menu-modal');
    let $commitLinks = $commitMenu.find('a[role=menuitem]');
    // disable this if only 1 commit link + all changes link
    if ($commitLinks.length <= 2) {
      console.log('Only 1 commit in PR. Nothing to hide.');
      return;
    }

    const toggleHoverStyle = {'text-decoration': 'underline'};
    const toggleResetStyle = {'text-decoration': 'inherit'};
    const toggleStyle = {'padding': '10px', 'margin-top': '-10px'};
    $commitMenu.css('width', '600px');
    $commitLinks.each(function (index) {
      let isHidden = false;
      let $link = $(this);

      if (index === 0) {
        let $allCommitsToggle = $('<a class="right" href="#">Hide all files</a>');
        $allCommitsToggle.css(toggleStyle);
        $link.find('.select-menu-item-text').prepend($allCommitsToggle);

        // On all commits click delegate to all commits
        $allCommitsToggle.click(function (e) {
          e.preventDefault();
          isHidden = !isHidden;
          $allCommitsToggle.text(isHidden ? 'Show all files' : 'Hide all files');
          $commitLinks.find('[data-visibility-status="' + (isHidden ? 'show' : 'hide') + '"]').trigger('click');

          return false;
        });
      }

      let $commitCode = $link.find('.select-menu-item-text code');
      let $fileToggle = $('<a class="right test" href="#" data-visibility-status="show">Hide files</a>');
      $fileToggle.css(toggleStyle);
      $fileToggle.insertBefore($commitCode);
      $fileToggle.hover(() => $fileToggle.css(toggleHoverStyle), () => $fileToggle.css(toggleResetStyle));

      const commitUrl = $link.attr('href');
      $.get(commitUrl).then(function (singleCommitBody) {
        let $singleCommitBody = $(singleCommitBody);

        let $commitAuthor = $singleCommitBody.find('.commit-author-section img');
        $commitAuthor.addClass('right');
        $commitAuthor.insertBefore($fileToggle);

        // display commit diff stats
        let diffStat = $singleCommitBody.find('.diffbar-item.diffstat');
        diffStat.addClass('right').removeClass('diff-item');
        diffStat.insertAfter($commitCode);

        // collect all files which are part of that commit
        let files = [];
        let $filesChanged = $singleCommitBody.find('#files .file-header');
        $filesChanged.each(function () {
          files.push($(this).attr('data-path'));
        });

        // Click on show/hide files toggle
        $fileToggle.click(function (e) {
          e.preventDefault();
          isHidden = !isHidden;
          $fileToggle.text(isHidden ? 'Show files' : 'Hide files');
          $fileToggle.attr('data-visibility-status', isHidden ? 'hide' : 'show');
          files.forEach(function (file) {
            if (isHidden) {
              $('[data-path="' + file + '"]').parent().hide();
            } else {
              $('[data-path="' + file + '"]').parent().show();
            }
          });

          return false;
        })
      });
    });
};
