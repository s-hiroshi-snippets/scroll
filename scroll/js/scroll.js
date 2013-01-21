/**
 * scroll.js
 *
 * Copyright 2012 Sawai Hiroshi
 * http://www.info-town.jp
 *
 */
jQuery(function($) {
    /*
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
        // common property
        var currentPageIndex = 0,
            pageSelector = '.page',
            pageNames = {};

        // {
        //     page0: 0,
        //     page1: 1
        // }
        $(pageSelector).each(function (k) {
            pageNames[$(this).attr('id')] = k;
        });
                

        /**
         * Create layout object
         */
        var layout = infotown.namespace('layout');

        /**
         * initialize layout object
         *
         * class name 'page' elemement align horizonal
         * @param {jQuery} elem outer element
         * @param {String} direction scroll direction (right,left) optional
         * @param {Number} height optional
         * @param {Number} top position of layout optional
         */
        function _init(elem, direction, height, top) {
            direction = direction || 'right';
            height = (height === 'auto') ? $(window).height() : height;
            top = top || 0;
            elem.css({
                overflow: 'hidden',
                position: 'relative',
                width: $(window).width(),
                height: (height - top)
            });
            
            // list of element of class name pageSelector
            $(pageSelector, elem).each(function(i) {
               var distanceX;
               if (direction === 'right') {
                   distanceX = i * $(window).width();
               } else if (direction === 'left') {
                   distanceX = -i * $(window).width();
               }
               $(this).css({
                   overflow: 'hidden',
                   width: $(window).width(),
                   height: (height - top), 
                   top: '0px',
                   left: distanceX
               });
            });
        }
        layout.init = _init;


        /**
         *  Create handler object
         *
         *  event handler for scroll
         */
        var handler = infotown.namespace('handler');

        /**
         * next
         *
         * scroll page to next
         * @param {jQuery} target
         * @param {String} direction scroll direction (right,left) optional
         * @param {Integer} duration optional
         */
        function _next(target, direction, duration) {
            duration = duration || 600;
            var plusminus = (direction === 'left') ? '+=' : '-=';
            var incWidth = plusminus + String($(window).width()) + 'px';
            $(pageSelector, target).each(function(j) {
                $(this).animate({
                    top: '0px',
                    left: incWidth
                }, duration);
            });

        }

        /**
         * Previous
         * 
         * scroll to previous page
         * @param {jQuery} target
         * @param {String} direction scroll direction (right,left) optional
         * @param {Integer} duration optional
         */
        function _prev(target, direction, duration) {
            duration = duration || 600;
            var plusminus = (direction === 'left')? '-=' : '+=';
            var incWidth = plusminus + String($(window).width()) + 'px';
            $(pageSelector, target).each(function(j) {
                $(this).animate({
                   top: '0px',
                   left: incWidth
                }, duration);
            });
        }

        /**
         * Go to id page
         * scroll to id
         * @param {String} idName
         * @param {jQuery} target
         * @param {String} direction scroll direction (right,left) optional
         * @param {Integer} duration Integer optional
         */
        function _go(idName, target, direction, duration) {
            direction = direction || 'right';
            duration = duration || 600;
            var pages;
            var diff;
            if (typeof idName !== 'string') {
                return false;
            }
            if (pageNames[idName] == 'undefined') {
                return false;
            }
            pages = $('.page', target);
            diff = currentPageIndex - pageNames[idName];
            var incWidth;
            if (direction === 'right') {
                incWidth = '+=' + String($(window).width() * diff) + 'px';
            } else if (direction === 'left') {
                incWidth = '-=' + String($(window).width() * diff) + 'px';
            }
            // all page is move.
            pages.each(function(j) {
                $(this).animate({
                   top: '0px',
                   left: incWidth
                }, duration);
            });
        }
                
        /**
         * set next handler
         *
         * @param {jQuery} evtTarget event target
         * @param {Array} scrollTargets array of layout object
         * @param {Integer} duration
         */
        function _setNext(evtTarget, scrollTargets, duration) {
            if (!(evtTarget instanceof jQuery)) {
                return false;
            }
            $(evtTarget).click(function() {
                for (var i = 0; i < scrollTargets.length; i++) {
                    _next(scrollTargets[i].obj, scrollTargets[i].direction, duration);
                }
                currentPageIndex += 1;
            });
        }
        handler.setNext = _setNext;

        /**
         * set previous handler
         *
         * @param {jQuery} evtTarget event target
         * @param {Array} scrollTargets array of layout object
         * @param {Integer} duration// create object from object
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
         */
        function _setPrev(evtTarget, scrollTargets, duration) {
            if (!(evtTarget instanceof jQuery)) {
                return false;
            }
            $(evtTarget).click(function() {
                for (var j = 0; j < scrollTargets.length; j++) {
                    _prev(scrollTargets[j].obj, scrollTargets[j].direction, duration);
                }
                currentPageIndex -= 1;
            });
        }
        handler.setPrev = _setPrev;
 
        /**
         * set go id handler
         *
         * @param {jQuery} evtTarget event target
         * @param {Array} scrollTargets array of layout object
         * @param {Integer} duration
         */
        function _setGoId(evtTarget, scrollTargets, duration) {
            $(evtTarget).click(function() {
                // href="#home" -> home, href="#service" -> service, ...
                var name = $(this).attr('href').slice(1);
                var i;
                for (i = 0; i < scrollTargets.length; i++) {
                    _go(name, scrollTargets[i].obj, scrollTargets[i].direction, duration);
                }
                currentPageIndex = pageNames[name];
                return false; // important preventDefault and sopPropagation
            });
        }
        handler.setGoId = _setGoId;

    }());




    (function() {
        var layout = infotown.namespace('layout');

        var content = Object.create(layout);
        content.init($('#scroll-container'), 'right', 'auto', 200);

        // setting handler
        var handler = infotown.namespace('handler');
        var scrollTargets = [];
        scrollTargets[0] = {
            obj: $('#scroll-container'),
            direction: 'right'
        };
        
        handler.setNext($('.arrow-right'), scrollTargets, 700);
        handler.setPrev($('.arrow-left'), scrollTargets, 700);
        handler.setGoId($('#scroll-nav li a'), scrollTargets,  600);

    }());

});
