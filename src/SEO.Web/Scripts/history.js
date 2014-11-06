(function (window, $, Modernizr) {

    var $window,
        $contentContainer,
        $loadContainer,

        isAnchorClicked = false,

        originalPage = {
            title: window.document.title,
            markup: ''
        };

    var currentPage = {
        pathname: window.location.pathname,

        getRootPathName: function () {
            var path = window.location.pathname;
            path = path.substr(0, path.lastIndexOf('/') + 1);

            if (path === '/') {
                path = window.location.pathname + '/';
            }

            return path;
        },

        getPageName : function () {
            var name = currentPage.getRootPathName();
            var parts = [];
            var path = window.location.pathname;

            if (path !== name) {
                parts = path.split(name);

                if (parts.length > 0) {
                    name = parts.pop();
                }
            }

            name = removeSlashes(name);
            
            return name;
        }
    };

    var hasPageChanged = function () {
        return currentPage.pathname !== window.location.pathname;
    };

    var getPageContents = function (success, failure) {
        return $.get('/api' + window.location.pathname)
                .done(success)
                .fail(failure);
    };

    var renderPage = function () {

        var render = function (page) {
            $contentContainer.html(page.markup);
            handleAnchorClicks();
            window.document.title = page.title + ' :: SEO + SPA = :)';
            $loadContainer.hide();
            $contentContainer.fadeIn();
            currentPage.pathname = window.location.pathname;
        }

        $contentContainer.fadeOut(150, function () {
            $loadContainer.show();

            var currentPageName = removeSlashes(currentPage.getPageName());
            var rootPathName = removeSlashes(currentPage.getRootPathName());

            if (currentPageName.toLowerCase() === rootPathName.toLowerCase()) {
                render(originalPage);
            } else {
                getPageContents(function (newPage) {
                    render(newPage);
                }, function (error) {
                    console.log(error);
                    alert('Error while attempting to request page. See console for details.');
                });
            }
        });
    };

    var removeSlashes = function (text) {
        return text.replace(/\//g, '');
    };

    var handleAnchorClicks = function () {

        var selector = '#content-container a[href^="/"], ' +
                       '#content-container a[href^="' + window.location.origin + '"]';
            
        $(selector).on('click', function (e) {
            e.preventDefault();

            isAnchorClicked = true;

            var href = this.getAttribute('href');

            renderPage();

            history.pushState(null, '', href);

            return false;
        });
    };

    var handlePopState = function(){
        $window.on('popstate', function (e) {
            if (isAnchorClicked && hasPageChanged()) {
                renderPage();
            }
        });
    };

    $(function () {
        if (Modernizr.history && !isAnchorClicked) {

            $window = $(window);

            $contentContainer = $('#content-container');
            originalPage.markup = $contentContainer.html();
            originalPage.title = window.document.title;

            $loadContainer = $('#load-container');

            handleAnchorClicks();

            handlePopState();
        }
    });

}(window, window.jQuery, window.Modernizr));