// global variable is jQuery
// top level variable in jQuery is infotown
/**
 * scrollslide.js
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
            group = [],
            groupWidth = 0,
            settings = {
                'slideSelector': '#slide-container',
                'groupSelector': '.slide-group',
                'pageSelector': '.slide-page',
                'inc' : 960,
                'intervalInc': 960,
                'direction': 'right',
                'intervalAnimateDuration': 1920,
                'animateDuration': 1920,
                'timerDuration': 3320
            },
            timer,
            isLoop = false;

                    
        /**
         * Create layout object
         */
        var layout = infotown.namespace('layout');

        /**
         * initialize layout object
         *
         * elemement align horizonal
         * @param {jQuery} outer jQuery element
         * @param {Object} options optional argument
         */
        function _init(outer, options) {
            $.extend(settings, options);
            outer.css({
                overflow: 'hidden',
                position: 'relative',
                width: $(window).width()
            });
            
            // layout panigeSelector class
            // default pageSelector slide-page
            $(settings.pageSelector, outer).each(function(i) {
               var distanceX;
               if (settings.direction === 'right') {
                   distanceX = i * $(settings.pageSelector).outerWidth();
               } else if (settings.direction === 'left') {
                   distanceX = -i * $(settings.pageSelector).outerWidth();
               }
               // pageSelector element layout
               // default pageSelector slide-page
               $(this).css({
                   overflow: 'hidden',
                   top: 0,
                   left: distanceX
               });
            });

            group[0] = $(settings.groupSelector);
            
            // calculate group width and layout
            // default groupSelector slide-group 
            $(settings.pageSelector, settings.groupSelector).each(function () {
                groupWidth += $(this).outerWidth();
            });
            group[0].css('width', groupWidth);
            group[0].css({
                position: 'absolute',
                top: 0,
                left: 0
            });
            
            // set group copy
            group[1] = group[0].clone(true);
            group[1].css({
                position: 'absolute',
                top: 0,
                left: group[0].outerWidth()
            });
            $(settings.slideSelector).append(group[1]);
        }
        layout.init = _init;



        /**
         *  implement handler object
         */
        var handler = infotown.namespace('handler');

        /**
         * callback
         * follow other group so that loop realize
         *
         * @param {Number} i group index
         * @param {String} callee function name
         */
        function follow(i) {
            var j = (i === 0) ? 1 : 0;
            if (parseInt(group[i].css('left'), 10) < -group[i].outerWidth()) {
                group[i].css('left', parseInt(group[j].css('left'), 10) + group[i].outerWidth());
            }
            if (arguments[1] === 'intervalScroll') {
                if (typeof timer !== 'undefined') {
                    clearTimeout(timer);
                }
                timer = setTimeout(intervalScroll, settings.timerDuration);
            }
        }


        /**
         * scroll left on inc amout
         * @param {Number} i group index
         */
        function scroll(i) {
            group[i].stop(true, true).animate({
                left: '-=' + settings.inc 
            }, settings.animateDuration, follow(i));
        }

        /**
         * call scroll
         */
        function next() {
            var i, j;
            if (typeof timer !== 'undefined' && isLoop === true) {
                for (i = 0; i < group.length; i++) {
                    group[i].stop(true, true);
                }
                clearTimeout(timer);
                isLoop = false;
            }
            if($(settings.groupSelector + ':animated').length > 0) {
                return false;
            }
            for (j = 0; j < group.length; j++) {
                scroll(j);
            }
        }
        handler.next = next;

        /**
         * scroll interval
         */
        function intervalScroll() {
            var i, m, n, scrollValue;
            // pass loop condition so that follow other group
            for (m = 0; m < group.length; m++) {
                 n = (m === 0) ? 1 : 0;
                 if (parseInt(group[m].css('left'), 10) < -group[m].width() + 20) {
                     scrollValue = parseInt(group[n].css('left'), 10) + group[m].width();
                     group[m].css({
                         left: scrollValue
                     });
                 }
             }

            for (i = 0; i < group.length; i++) {
                group[i].animate({
                    left: '-=' + settings.intervalInc
                }, settings.intervalAnimateDuration, follow(i, 'intervalScroll'));
            }
        }

        /**
         * interval call scroll slide
         */
        function intervalNext() {
            if($(settings.groupSelector + ':animated').length > 0) {
                return false;
            }
            isLoop = true;
            setTimeout(intervalScroll, 500);
        }
        handler.intervalNext = intervalNext;

        /**
         * stop timer
         */
        function stop() {
            if (typeof timer !== 'undefined') {
                clearTimeout(timer);
            }
            for (i = 0; i < group.length; i++) {
                group[i].stop(true, true);
            }
            isLoop = false;
        }
        handler.stop = stop;

    }());



    (function() {
        var layout = infotown.namespace('layout');
        layout.init($('#slide-container'), 'right', 'auto');
        var handler = infotown.namespace('handler');
        $('#next').click(function() {
            handler.next();
        });
        $('#interval').click(function() {
            handler.stop(); 
            handler.intervalNext();
        });
        $('#stop').click(function() {
            handler.stop();
        });
    }());

});
