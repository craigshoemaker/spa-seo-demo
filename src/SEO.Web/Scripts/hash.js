(function (window, $, Modernizr) {

    var $contentContainer,
        $loadContainer,
        originalPage = {
            title: '',
            markup: ''
        },
        hash = '#';

    var currentPage = {
        getRootPathName : function () {
            var path = window.location.pathname;
            path = path.substr(0, path.lastIndexOf('/') + 1);

            if (path === '/') {
                path = window.location.pathname + '/';
            }

            return path;
        },

        hasPageNameInPath: function () {
            return window.location.pathname.length > currentPage.getRootPathName().length + 1;
        },

        getPagePathFromLocation : function () {
            var root = currentPage.getRootPathName();
            var path = root + window.location.hash.replace(hash + '/', '');
            return path;
        },

        getPageNameFromHash: function(){
            return window.location.hash.replace(/#\//g, '');
        },

        isOriginalPage: function () {
            return currentPage.getPageNameFromHash().length == 0;
        }
    };

    var handleAnchorClicks = function () {

        var selector = '#content-container a[href^="/"], ' +
                       '#content-container a[href^="' + window.location.origin + '"]';

        $(selector).on('click', function (e) {
            e.preventDefault();

            var href = this.getAttribute('href');
            var name = href.substr(href.lastIndexOf('/') + 1);

            if (currentPage.hasPageNameInPath()) { // makes sure URLs always have same form
                window.location.href = currentPage.getRootPathName() + hash + '/' + name;
            } else {
                window.location.hash = hash + '/' + name;
            }

            return false;
        });
    };

    var getPageContents = function (success, failure) {

        // turns:   http://www.example.com/articles/#/what-is-history
        // into:    http://www.example.com/api/articles/what-is-history

        return $.get('/api' + currentPage.getPagePathFromLocation())
                .done(success)
                .fail(failure);
    };

    var renderPage = function () {

        var render = function (page) {
            $contentContainer.html(page.markup);
            window.document.title = page.title + ' :: SEO + SPA = :)';
            handleAnchorClicks();
            $loadContainer.hide();
            $contentContainer.fadeIn();
        };

        $contentContainer.fadeOut(150, function () {
            $loadContainer.show();

            if (currentPage.isOriginalPage()) {
                render(originalPage);
            }
            else {
                getPageContents(function (newPage) {
                    render(newPage);
                }, function (e) {
                    console.log(e);
                    alert('Error while attempting to request page. See console for details.');
                });
            }
        });
    };

    var loadPageIfHashExists = function(){
        if (window.location.hash.length > 0) {
            renderPage();
        } else {
            handleAnchorClicks();
        }
    };

    $(function () {
        if (Modernizr.hashchange) {
            $loadContainer = $('#load-container');
            $contentContainer = $('#content-container');
            originalPage.markup = $contentContainer.html();
            originalPage.title = window.document.title;

            loadPageIfHashExists();

            $(window).on('hashchange', renderPage);

            // see layout HEAD for more scripts
        }
    });

}(window, window.jQuery, Modernizr));