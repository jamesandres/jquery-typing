// jQuery-typing
//
// Version: 0.2.0
// Website: http://narf.pl/jquery-typing/
// License: public domain <http://unlicense.org/>
// Author:  Maciej Konieczny <hello@narf.pl>

(function ($) {

    //--------------------
    //  jQuery extension
    //--------------------

    $.fn.typing = function (options) {
        return this.each(function () {
            listenToTyping(this, options);
        });
    };


    //-------------------
    //  actual function
    //-------------------

    function listenToTyping(elem, options) {
        // override default settings
        var settings = $.extend({
            start: null,
            stop: null,
            delay: 400
        }, options);

        // create other function-scope variables
        var $elem = $(elem),
            typing = false,
            delayedCallback;

        // react to keypresses
        function reactToKeypress(event) {
            if (!typing) {
                // set flag and run callback
                typing = true;
                if (settings.start) {
                    settings.start.call(this, event);
                }
            }
        }

        // listen to regular keypresses
        $elem.keypress(reactToKeypress);

        // listen to backspace and delete presses
        $elem.keydown(function (event) {
            if (event.keyCode === 8 || event.keyCode === 46) {
                reactToKeypress.call(elem, event);
            }
        });

        // listen to keyup events
        $elem.keyup(function (event) {
            if (typing) {
                // discard previous delayed callback and create new one
                clearTimeout(delayedCallback);
                delayedCallback = setTimeout(function () {
                    // set flag and run callback
                    typing = false;
                    if (settings.stop) {
                        settings.stop.call(elem, event);
                    }
                }, settings.delay);
            }
        });
    }
})(jQuery);
