jQuery(function($) {

    // scroll object
    var scroll = App.namespace('scroll');
    // options of scroll object
    var settings = {};
    // jQuery Object of  div element
    var pages;

    /*
     * helper
     */

    // scroll next page
    function _next() {
        pages.each(function(i) {
            var posLeft = '-=' + String(settings.winWidth) + 'px';
            $(this).animate({
                top: '0px',
                left: posLeft
            }, settings.duration);
        });
        settings.currentIndex += 1;
    }

    // scroll prev page
    function _prev() {
        pages.each(function(i) {
            var posLeft = '+=' + String(settings.winWidth) + 'px';
            $(this).animate({
                top: '0px',
                left: posLeft
            }, settings.duration);
        });
        settings.currentIndex -= 1;
    }

    // scroll id page
    function _go(id) {
        var diff;
        if (typeof id !== 'string') {
            return false;
        }
        if (settings.pagesIndex[id] == 'undefined') {
            return false;
        } else {
            diff = settings.currentIndex - settings.pagesIndex[id];
            settings.currentIndex = settings.pagesIndex[id];
        }
        // all page is move.
        pages.each(function(i) {
            var incWidth = '+=' + String(settings.winWidth * diff) + 'px';
            $(this).animate({
                top: '0px',
                left: incWidth
            }, settings.duration);
        });
    }


    /*
     * public method
     */

    // initialize scroll object
    function _init(outer, duration) {
        var pagesIndex = [];
        var anchors = $('#nav li a');
        anchors.each(function(i) {
            pagesIndex[$(this).attr('href').slice(1)] = i;
        });
        settings= $.extend({
            winWidth: $(window).width(),
            winHeight: $(window).height(),
            elem: 'html',
            duration: 600,
            pagesIndex: pagesIndex,
            currentIndex: 0
        }, arguments);

        // inclusion object
        outer = $('#' + outer);
        var outerHeight = settings.winHeight - outer.offset().top;
        outer.css({
            overflow: 'hidden',
            position: 'relative',
            width: settings.winWidth,
            height: outerHeight
        });
        pages = $('.page', outer);
        // page element list
        pages.each(function(i) {
            var distanceX = i * settings.winWidth;
            $(this).css({
                overflow: 'hidden',
                width: settings.winWidth,
                height: outerHeight,
                top: '0px',
                left: distanceX
            });
        });
        // set event handle
        $('.arrow-right').click(function() {
            _next();
        });
        $('.arrow-left').click(function() {
            _prev();
        });
        $('#nav li a').click(function() {
            _go($(this).attr('href').slice(1));
            return false;
        });
    }

    scroll.init = _init;

});
