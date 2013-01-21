// global variable is jQuery
// top level variable in smoothslide is infotown
/**
 * smoothslide.js
 *
 * Copyright 2012 Sawai Hiroshi
 * http://www.info-town.jp
 *
 */
jQuery(function($) {
    /**
     * utilities
     */
    // create object from object
    if (!Object.create) {
        (function () {
            function F() {}

            Object.create = function (object) {
                F.prototype = object;
                return new F();
            };
        }());
    }


    // namespace
    var infotown = {};
    // extend jQuery
    $.extend({
        'infotown': infotown
    });
    infotown.namespace = function() {
        var object = this;
        return function(name) {
            if (typeof object[name] == "undefined") {
                object[name] = {};
            }
            return object[name];
        };
    }();
    

    // implement layout object and handler object
    (function() {
        /**
         * common property
         */
        var i,
            group,
            groupWidth = 0,
            slideWidth = 0,
            settings = {
                'containerSelector': '#slide-container',
                'groupSelector': '#slide-group',
                'slideSelector': '.slide',
                'scrollAmount' : '',
                'animateDuration': 1470,
                'timerDuration': 2940 
            },
            timer,
            isInterval = false,
            currentSlide = 0,
            maxSlide = 0;

                    
        /**
         * Create layout object
         */
        var layout = infotown.namespace('layout');


        /**
         * initialize layout object
         *
         * slide elemement align horizonal
         * @param {Object} options optional argument
         */
        function _init(options) {
            var container;

            $.extend(settings, options);

            container = $(settings.containerSelector);
            settings.scrollAmount = (settings.scrollAmount > 0) ? settings.scrollAmount : container.outerWidth();
            
            container.css({
                overflow: 'hidden',
                position: 'relative'
            });
            
            // layout slideSelector class(default slideSelector is slide-page)
            $(settings.slideSelector, container).each(function(i) {
                var distanceX;
                distanceX = i * $(settings.slideSelector).outerWidth();
                $(this).css({
                    overflow: 'hidden',
                    top: 0,
                    left: distanceX
                });
            });

            maxSlide = $(settings.slideSelector).length;

            group = $(settings.groupSelector);
            slideWidth = $($(settings.slideSelector).get(0)).outerWidth();
            
            // calculate group width and layout(default groupSelector is slide-group) 
            $(settings.slideSelector, settings.groupSelector).each(function () {
                groupWidth += $(this).outerWidth();
            });

            group.css({
                position: 'absolute',
                width: groupWidth,
                top: 0,
                left: 0
            });
        }
        layout.init = _init;


        /**
         *  implement handler object
         */
        var handler = infotown.namespace('handler');

        
        /**
         * scroll on scrollAmount amount
         * @param {String} type standard of interval
         */
        var scroll = function(type) {
            return function() {
                if (currentSlide >= maxSlide - 1) {
                    group.stop(true, true).animate({
                        left: '+=' + (groupWidth - slideWidth)
                    }, settings.animateDuration, function() {
                        currentSlide = 0;
                        if (type === 'interval') {
                            timer = setTimeout(scroll('interval'), settings.timerDuration);
                        }
                    });
                } else {
                    group.stop(true, true).animate({
                        left: '-=' + settings.scrollAmount 
                    }, settings.animateDuration, function() {
                        currentSlide++;
                    });
                    if (type === 'interval') {
                        timer = setTimeout(scroll('interval'), settings.timerDuration);
                    }
                }
            };
        };

        /**
         * scroll to next slide
         */
        function next() {
            if (typeof timer !== 'undefined' && isInterval === true) {
                group.stop(true, true);
                clearTimeout(timer);
                isInterval = false;
            }
            if($(settings.groupSelector + ':animated').length > 0) {
                return false;
            }
            (scroll('standard')());
        }
        handler.next = next;

        /**
         * interval scroll slide
         */
        function intervalNext() {
            if($(settings.groupSelector + ':animated').length > 0) {
                return false;
            }
            isInterval = true;
            setTimeout(scroll('interval'), 500);
        }
        handler.intervalNext = intervalNext;

        /**
         * stop timer
         */
        function stop() {
            if (typeof timer !== 'undefined') {
                clearTimeout(timer);
            }
            group.stop(true, true);
            isInterval = false;
        }
        handler.stop = stop;

    }());
});
