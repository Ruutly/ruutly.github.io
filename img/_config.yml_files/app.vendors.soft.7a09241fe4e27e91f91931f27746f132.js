// 0
// 0
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-adownload-cookies-cors-cssscrollbar-imgcrossorigin !*/
!function(e,t,n){function o(e,t){return typeof e===t}function s(){var e,t,n,s,i,r,a;for(var l in d)if(d.hasOwnProperty(l)){if(e=[],t=d[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(s=o(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)r=e[i],a=r.split("."),1===a.length?Modernizr[a[0]]=s:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=s),c.push((s?"":"no-")+a.join("-"))}}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):u?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function r(){var e=t.body;return e||(e=i(u?"svg":"body"),e.fake=!0),e}function a(e,n,o,s){var a,d,l,c,f="modernizr",u=i("div"),h=r();if(parseInt(o,10))for(;o--;)l=i("div"),l.id=s?s[o]:f+(o+1),u.appendChild(l);return a=i("style"),a.type="text/css",a.id="s"+f,(h.fake?h:u).appendChild(a),h.appendChild(u),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(t.createTextNode(e)),u.id=f,h.fake&&(h.style.background="",h.style.overflow="hidden",c=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),d=n(u,e),h.fake?(h.parentNode.removeChild(h),p.style.overflow=c,p.offsetHeight):u.parentNode.removeChild(u),!!d}var d=[],l={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){d.push({name:e,fn:t,options:n})},addAsyncTest:function(e){d.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr,Modernizr.addTest("cookies",function(){try{t.cookie="cookietest=1";var e=-1!=t.cookie.indexOf("cookietest=");return t.cookie="cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT",e}catch(n){return!1}}),Modernizr.addTest("cors","XMLHttpRequest"in e&&"withCredentials"in new XMLHttpRequest);var c=[],f=l._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];l._prefixes=f;var p=t.documentElement,u="svg"===p.nodeName.toLowerCase();Modernizr.addTest("adownload",!e.externalHost&&"download"in i("a")),Modernizr.addTest("imgcrossorigin","crossOrigin"in i("img"));var h=l.testStyles=a;h("#modernizr{overflow: scroll; width: 40px; height: 40px; }#"+f.join("scrollbar{width:0px} #modernizr::").split("#").slice(1).join("#")+"scrollbar{width:0px}",function(e){Modernizr.addTest("cssscrollbar",40==e.scrollWidth)}),s(),delete l.addTest,delete l.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);
/**
 * Ajax Request Pool
 * 
 * @author Oliver Nassar <onassar@gmail.com>
 */
jQuery.timeoutPool = [];

/**
 * jQuery.timeoutPool.clear
 * 
 * @access public
 * @param  Number timeout
 * @return void
 */
jQuery.timeoutPool.clear = function(timeout) {
    clearTimeout(timeout);
    this.remove(timeout);
};

/**
 * jQuery.timeoutPool.clearAll
 * 
 * @access public
 * @return void
 */
jQuery.timeoutPool.clearAll = function() {
    var timeouts = [];
    for (var index in this) {
        if (isFinite(index) === true) {
            timeouts.push(this[index]);
        }
    }
    for (index in timeouts) {
        this.clear(timeouts[index]);
    }
};

/**
 * jQuery.timeoutPool.remove
 * 
 * @access public
 * @param  Number timeout
 * @return void
 */
jQuery.timeoutPool.remove = function(timeout) {
    for (var index in this) {
        if (this[index] === timeout) {
            jQuery.timeoutPool.splice(index, 1);
            break;
        }
    }
};

/**
 * Ajax Request Pool
 * 
 * @author Oliver Nassar <onassar@gmail.com>
 */
jQuery.intervalPool = [];

/**
 * jQuery.intervalPool.clear
 * 
 * @access public
 * @param  Number interval
 * @return void
 */
jQuery.intervalPool.clear = function(interval) {
    clearInterval(interval);
    this.remove(interval);
};

/**
 * jQuery.intervalPool.clearAll
 * 
 * @access public
 * @return void
 */
jQuery.intervalPool.clearAll = function() {
    var intervals = [];
    for (var index in this) {
        if (isFinite(index) === true) {
            intervals.push(this[index]);
        }
    }
    for (index in intervals) {
        this.clear(intervals[index]);
    }
};

/**
 * jQuery.intervalPool.remove
 * 
 * @access public
 * @param  Number interval
 * @return void
 */
jQuery.intervalPool.remove = function(interval) {
    for (var index in this) {
        if (this[index] === interval) {
            jQuery.intervalPool.splice(index, 1);
            break;
        }
    }
};

/**
 * Ajax Request Pool
 * 
 * @author Oliver Nassar <onassar@gmail.com>
 * @see    http://stackoverflow.com/questions/1802936/stop-all-active-ajax-requests-in-jquery
 */
jQuery.xhrPool = [];

/**
 * jQuery.xhrPool.abortAll
 * 
 * Retrieves all the outbound requests from the array (since the array is going
 * to be modified as requests are aborted), and then loops over each of them to
 * perform the abortion. Doing so will trigger the ajaxComplete event against
 * the document, which will remove the request from the pool-array.
 * 
 * @access public
 * @return void
 */
jQuery.xhrPool.abortAll = function() {
    var requests = [];
    for (var index in this) {
        if (isFinite(index) === true) {
            requests.push(this[index]);
        }
    }
    for (index in requests) {
        requests[index].abort();
    }
};

/**
 * jQuery.xhrPool.remove
 * 
 * Loops over the requests, removes it once (and if) found, and then breaks out
 * of the loop (since nothing else to do).
 * 
 * @access public
 * @param  Object jqXHR
 * @return void
 */
jQuery.xhrPool.remove = function(jqXHR) {
    for (var index in this) {
        if (this[index] === jqXHR) {
            jQuery.xhrPool.splice(index, 1);
            break;
        }
    }
};

/**
 * Below events are attached to the document rather than defined the ajaxSetup
 * to prevent possibly being overridden elsewhere (presumably by accident).
 */
$(document).ajaxSend(function(event, jqXHR, options) {
    jQuery.xhrPool.push(jqXHR);
});
$(document).ajaxComplete(function(event, jqXHR, options) {
    jQuery.xhrPool.remove(jqXHR);
});

/*!
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2015 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.5
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : false,
            appear          : null,
            load            : null,
            placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;

                                /**
                                 * Oliver Nassar on January 19th, 2016
                                 * 
                                 * @changed 
                                 */
                                settings.load.call(self, elements_left, settings, this);
                                // Was
                                // settings.load.call(self, elements_left, settings);
                                // End
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
/*
 * jQuery MiniColors: A tiny color picker built on jQuery
 *
 * Copyright: Cory LaViska for A Beautiful Site, LLC: http://www.abeautifulsite.net/
 *
 * Contribute: https://github.com/claviska/jquery-minicolors
 *
 * @license: http://opensource.org/licenses/MIT
 *
 */
(function (factory) {
    /* jshint ignore:start */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
    /* jshint ignore:end */
}(function ($) {

    // Defaults
    $.minicolors = {
        defaults: {
            animationSpeed: 50,
            animationEasing: 'swing',
            change: null,
            changeDelay: 0,
            control: 'hue',
            dataUris: true,
            defaultValue: '',
            format: 'hex',
            hide: null,
            hideSpeed: 100,
            inline: false,
            keywords: '',
            letterCase: 'lowercase',
            opacity: false,
            position: 'bottom left',
            show: null,
            showSpeed: 100,
            theme: 'default'
        }
    };

    // Public methods
    $.extend($.fn, {
        minicolors: function(method, data) {

            switch(method) {

                // Destroy the control
                case 'destroy':
                    $(this).each( function() {
                        destroy($(this));
                    });
                    return $(this);

                // Hide the color picker
                case 'hide':
                    hide();
                    return $(this);

                // Get/set opacity
                case 'opacity':
                    // Getter
                    if( data === undefined ) {
                        // Getter
                        return $(this).attr('data-opacity');
                    } else {
                        // Setter
                        $(this).each( function() {
                            updateFromInput($(this).attr('data-opacity', data));
                        });
                    }
                    return $(this);

                // Get an RGB(A) object based on the current color/opacity
                case 'rgbObject':
                    return rgbObject($(this), method === 'rgbaObject');

                // Get an RGB(A) string based on the current color/opacity
                case 'rgbString':
                case 'rgbaString':
                    return rgbString($(this), method === 'rgbaString');

                // Get/set settings on the fly
                case 'settings':
                    if( data === undefined ) {
                        return $(this).data('minicolors-settings');
                    } else {
                        // Setter
                        $(this).each( function() {
                            var settings = $(this).data('minicolors-settings') || {};
                            destroy($(this));
                            $(this).minicolors($.extend(true, settings, data));
                        });
                    }
                    return $(this);

                // Show the color picker
                case 'show':
                    show( $(this).eq(0) );
                    return $(this);

                // Get/set the hex color value
                case 'value':
                    if( data === undefined ) {
                        // Getter
                        return $(this).val();
                    } else {
                        // Setter
                        $(this).each( function() {
                            /**
                             * Oliver Nassar on January 1st, 2016
                             * 
                             * @see https://github.com/claviska/jquery-minicolors/commit/c3d57f4de327be371337512da6a04dd8a989373d
                             * 
                             * Was:
                             *  updateFromInput($(this).val(data));
                             * Now:
                             */
                            if( typeof(data) === 'object' ) {
                                if( data.opacity ) {
                                    $(this).attr('data-opacity', keepWithin(data.opacity, 0, 1));
                                }
                                if( data.color ) {
                                    $(this).val(data.color);
                                }
                            } else {
                                $(this).val(data);
                            }
                            updateFromInput($(this));
                        });
                    }
                    return $(this);

                // Initializes the control
                default:
                    if( method !== 'create' ) data = method;
                    $(this).each( function() {
                        init($(this), data);
                    });
                    return $(this);

            }

        }
    });

    // Initialize input elements
    function init(input, settings) {

        var minicolors = $('<div class="minicolors" />'),
            defaults = $.minicolors.defaults,
            format = input.attr('data-format'),
            keywords = input.attr('data-keywords'),
            opacity = input.attr('data-opacity');

        // Do nothing if already initialized
        if( input.data('minicolors-initialized') ) return;

        // Handle settings
        settings = $.extend(true, {}, defaults, settings);

        // The wrapper
        minicolors
            .addClass('minicolors-theme-' + settings.theme)
            .toggleClass('minicolors-with-opacity', settings.opacity)
            .toggleClass('minicolors-no-data-uris', settings.dataUris !== true);

        // Custom positioning
        if( settings.position !== undefined ) {
            $.each(settings.position.split(' '), function() {
                minicolors.addClass('minicolors-position-' + this);
            });
        }

        // Input size
        if( format === 'rgb' ) {
            $input_size = opacity ? '25' : '20';
        } else {
            $input_size = keywords ? '11' : '7';
        }

        // The input
        input
            .addClass('minicolors-input')
            .data('minicolors-initialized', false)
            .data('minicolors-settings', settings)
            .prop('size', $input_size)
            .wrap(minicolors)
            .after(
                '<div class="minicolors-panel minicolors-slider-' + settings.control + '">' +
                    '<div class="minicolors-slider minicolors-sprite">' +
                        '<div class="minicolors-picker"></div>' +
                    '</div>' +
                    '<div class="minicolors-opacity-slider minicolors-sprite">' +
                        '<div class="minicolors-picker"></div>' +
                    '</div>' +
                    '<div class="minicolors-grid minicolors-sprite">' +
                        '<div class="minicolors-grid-inner"></div>' +
                        '<div class="minicolors-picker"><div></div></div>' +
                    '</div>' +
                '</div>'
            );

        // The swatch
        if( !settings.inline ) {
            input.after('<span class="minicolors-swatch minicolors-sprite"><span class="minicolors-swatch-color"></span></span>');
            input.next('.minicolors-swatch').on('click', function(event) {
                event.preventDefault();
                input.focus();
            });
        }

        // Prevent text selection in IE
        input.parent().find('.minicolors-panel').on('selectstart', function() { return false; }).end();

        // Inline controls
        if( settings.inline ) input.parent().addClass('minicolors-inline');

        updateFromInput(input, false);

        input.data('minicolors-initialized', true);

    }

    // Returns the input back to its original state
    function destroy(input) {

        var minicolors = input.parent();

        // Revert the input element
        input
            .removeData('minicolors-initialized')
            .removeData('minicolors-settings')
            .removeProp('size')
            .removeClass('minicolors-input');

        // Remove the wrap and destroy whatever remains
        minicolors.before(input).remove();

    }

    // Shows the specified dropdown panel
    function show(input) {

        var minicolors = input.parent(),
            panel = minicolors.find('.minicolors-panel'),
            settings = input.data('minicolors-settings');

        // Do nothing if uninitialized, disabled, inline, or already open
        if( !input.data('minicolors-initialized') ||
            input.prop('disabled') ||
            minicolors.hasClass('minicolors-inline') ||
            minicolors.hasClass('minicolors-focus')
        ) return;

        hide();

        minicolors.addClass('minicolors-focus');
        panel
            .stop(true, true)
            .fadeIn(settings.showSpeed, function() {
                if( settings.show ) settings.show.call(input.get(0));
            });

    }

    // Hides all dropdown panels
    function hide() {

        $('.minicolors-focus').each( function() {

            var minicolors = $(this),
                input = minicolors.find('.minicolors-input'),
                panel = minicolors.find('.minicolors-panel'),
                settings = input.data('minicolors-settings');

            panel.fadeOut(settings.hideSpeed, function() {
                if( settings.hide ) settings.hide.call(input.get(0));
                minicolors.removeClass('minicolors-focus');
            });

        });
    }

    // Moves the selected picker
    function move(target, event, animate) {

        var input = target.parents('.minicolors').find('.minicolors-input'),
            settings = input.data('minicolors-settings'),
            picker = target.find('[class$=-picker]'),
            offsetX = target.offset().left,
            offsetY = target.offset().top,
            x = Math.round(event.pageX - offsetX),
            y = Math.round(event.pageY - offsetY),
            duration = animate ? settings.animationSpeed : 0,
            wx, wy, r, phi;

        // Touch support
        if( event.originalEvent.changedTouches ) {
            x = event.originalEvent.changedTouches[0].pageX - offsetX;
            y = event.originalEvent.changedTouches[0].pageY - offsetY;
        }

        // Constrain picker to its container
        if( x < 0 ) x = 0;
        if( y < 0 ) y = 0;
        if( x > target.width() ) x = target.width();
        if( y > target.height() ) y = target.height();

        // Constrain color wheel values to the wheel
        if( target.parent().is('.minicolors-slider-wheel') && picker.parent().is('.minicolors-grid') ) {
            wx = 75 - x;
            wy = 75 - y;
            r = Math.sqrt(wx * wx + wy * wy);
            phi = Math.atan2(wy, wx);
            if( phi < 0 ) phi += Math.PI * 2;
            if( r > 75 ) {
                r = 75;
                x = 75 - (75 * Math.cos(phi));
                y = 75 - (75 * Math.sin(phi));
            }
            x = Math.round(x);
            y = Math.round(y);
        }

        // Move the picker
        if( target.is('.minicolors-grid') ) {
            picker
                .stop(true)
                .animate({
                    top: y + 'px',
                    left: x + 'px'
                }, duration, settings.animationEasing, function() {
                    updateFromControl(input, target);
                });
        } else {
            picker
                .stop(true)
                .animate({
                    top: y + 'px'
                }, duration, settings.animationEasing, function() {
                    updateFromControl(input, target);
                });
        }

    }

    // Sets the input based on the color picker values
    function updateFromControl(input, target) {

        function getCoords(picker, container) {

            var left, top;
            if( !picker.length || !container ) return null;
            left = picker.offset().left;
            top = picker.offset().top;

            return {
                x: left - container.offset().left + (picker.outerWidth() / 2),
                y: top - container.offset().top + (picker.outerHeight() / 2)
            };

        }

        var hue, saturation, brightness, x, y, r, phi,

            hex = input.val(),
            format = input.attr('data-format'),
            keywords = input.attr('data-keywords'),
            opacity = input.attr('data-opacity'),

            // Helpful references
            minicolors = input.parent(),
            settings = input.data('minicolors-settings'),
            swatch = minicolors.find('.minicolors-swatch'),

            // Panel objects
            grid = minicolors.find('.minicolors-grid'),
            slider = minicolors.find('.minicolors-slider'),
            opacitySlider = minicolors.find('.minicolors-opacity-slider'),

            // Picker objects
            gridPicker = grid.find('[class$=-picker]'),
            sliderPicker = slider.find('[class$=-picker]'),
            opacityPicker = opacitySlider.find('[class$=-picker]'),

            // Picker positions
            gridPos = getCoords(gridPicker, grid),
            sliderPos = getCoords(sliderPicker, slider),
            opacityPos = getCoords(opacityPicker, opacitySlider);

        // Handle colors
        if( target.is('.minicolors-grid, .minicolors-slider, .minicolors-opacity-slider') ) {

            // Determine HSB values
            switch(settings.control) {

                case 'wheel':
                    // Calculate hue, saturation, and brightness
                    x = (grid.width() / 2) - gridPos.x;
                    y = (grid.height() / 2) - gridPos.y;
                    r = Math.sqrt(x * x + y * y);
                    phi = Math.atan2(y, x);
                    if( phi < 0 ) phi += Math.PI * 2;
                    if( r > 75 ) {
                        r = 75;
                        gridPos.x = 69 - (75 * Math.cos(phi));
                        gridPos.y = 69 - (75 * Math.sin(phi));
                    }
                    saturation = keepWithin(r / 0.75, 0, 100);
                    hue = keepWithin(phi * 180 / Math.PI, 0, 360);
                    brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
                    break;

                case 'saturation':
                    // Calculate hue, saturation, and brightness
                    hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
                    saturation = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                    brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: brightness }));
                    minicolors.find('.minicolors-grid-inner').css('opacity', saturation / 100);
                    break;

                case 'brightness':
                    // Calculate hue, saturation, and brightness
                    hue = keepWithin(parseInt(gridPos.x * (360 / grid.width()), 10), 0, 360);
                    saturation = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                    brightness = keepWithin(100 - Math.floor(sliderPos.y * (100 / slider.height())), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css('backgroundColor', hsb2hex({ h: hue, s: saturation, b: 100 }));
                    minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (brightness / 100));
                    break;

                default:
                    // Calculate hue, saturation, and brightness
                    hue = keepWithin(360 - parseInt(sliderPos.y * (360 / slider.height()), 10), 0, 360);
                    saturation = keepWithin(Math.floor(gridPos.x * (100 / grid.width())), 0, 100);
                    brightness = keepWithin(100 - Math.floor(gridPos.y * (100 / grid.height())), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    grid.css('backgroundColor', hsb2hex({ h: hue, s: 100, b: 100 }));
                    break;

            }

            // Handle opacity
            if( settings.opacity ) {
                opacity = parseFloat(1 - (opacityPos.y / opacitySlider.height())).toFixed(2);
            } else {
                opacity = 1;
            }
            if( settings.opacity ) input.attr('data-opacity', opacity);

            // Set color string
            if( format === 'rgb' ) {
                // Returns RGB(A) string
                var rgb = hex2rgb(hex),
                    opacity = input.attr('data-opacity') === '' ? 1 : keepWithin( parseFloat( input.attr('data-opacity') ).toFixed(2), 0, 1 );
                if( isNaN( opacity ) ) opacity = 1;

                if( input.minicolors('rgbObject').a < 1 && rgb ) {
                    // Set RGBA string if alpha
                    value = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat( opacity ) + ')';
                } else {
                    // Set RGB string (alpha = 1)
                    value = 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
                }
            } else {
                // Returns hex color
                value = convertCase( hex, settings.letterCase );
            }

            // Update value from picker
            input.val( value );
        }

        // Set swatch color
        swatch.find('span').css({
            backgroundColor: hex,
            opacity: opacity
        });

        // Handle change event
        doChange(input, value, opacity);

    }

    // Sets the color picker values from the input
    function updateFromInput(input, preserveInputValue) {

        var hex,
            hsb,
            format = input.attr('data-format'),
            keywords = input.attr('data-keywords'),
            opacity,
            x, y, r, phi,

            // Helpful references
            minicolors = input.parent(),
            settings = input.data('minicolors-settings'),
            swatch = minicolors.find('.minicolors-swatch'),

            // Panel objects
            grid = minicolors.find('.minicolors-grid'),
            slider = minicolors.find('.minicolors-slider'),
            opacitySlider = minicolors.find('.minicolors-opacity-slider'),

            // Picker objects
            gridPicker = grid.find('[class$=-picker]'),
            sliderPicker = slider.find('[class$=-picker]'),
            opacityPicker = opacitySlider.find('[class$=-picker]');

        // Determine hex/HSB values
        if( isRgb(input.val()) ) {
            // If input value is a rgb(a) string, convert it to hex color and update opacity
            hex = rgbString2hex(input.val());
            alpha = keepWithin(parseFloat(getAlpha(input.val())).toFixed(2), 0, 1);
            if( alpha ) {
                input.attr('data-opacity', alpha);
            }
        } else {
            hex = convertCase(parseHex(input.val(), true), settings.letterCase);
        }

        if( !hex ){
            hex = convertCase(parseInput(settings.defaultValue, true), settings.letterCase);
        }
        hsb = hex2hsb(hex);

        // Get array of lowercase keywords
        keywords = !keywords ? [] : $.map(keywords.split(','), function(a) {
            return $.trim(a.toLowerCase());
        });

        // Set color string
        if( input.val() !== '' && $.inArray(input.val().toLowerCase(), keywords) > -1 ) {
            value = convertCase(input.val());
        } else {
            value = isRgb(input.val()) ? parseRgb(input.val()) : hex;
        }

        // Update input value
        if( !preserveInputValue ) input.val(value);

        // Determine opacity value
        if( settings.opacity ) {
            // Get from data-opacity attribute and keep within 0-1 range
            opacity = input.attr('data-opacity') === '' ? 1 : keepWithin(parseFloat(input.attr('data-opacity')).toFixed(2), 0, 1);
            if( isNaN(opacity) ) opacity = 1;
            input.attr('data-opacity', opacity);
            swatch.find('span').css('opacity', opacity);

            // Set opacity picker position
            y = keepWithin(opacitySlider.height() - (opacitySlider.height() * opacity), 0, opacitySlider.height());
            opacityPicker.css('top', y + 'px');
        }

        // Set opacity to zero if input value is transparent
        if( input.val().toLowerCase() === 'transparent' ) {
            swatch.find('span').css('opacity', 0);
        }

        // Update swatch
        swatch.find('span').css('backgroundColor', hex);

        // Determine picker locations
        switch(settings.control) {

            case 'wheel':
                // Set grid position
                r = keepWithin(Math.ceil(hsb.s * 0.75), 0, grid.height() / 2);
                phi = hsb.h * Math.PI / 180;
                x = keepWithin(75 - Math.cos(phi) * r, 0, grid.width());
                y = keepWithin(75 - Math.sin(phi) * r, 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                // Set slider position
                y = 150 - (hsb.b / (100 / grid.height()));
                if( hex === '' ) y = 0;
                sliderPicker.css('top', y + 'px');

                // Update panel color
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
                break;

            case 'saturation':
                // Set grid position
                x = keepWithin((5 * hsb.h) / 12, 0, 150);
                y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                // Set slider position
                y = keepWithin(slider.height() - (hsb.s * (slider.height() / 100)), 0, slider.height());
                sliderPicker.css('top', y + 'px');

                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: hsb.b }));
                minicolors.find('.minicolors-grid-inner').css('opacity', hsb.s / 100);
                break;

            case 'brightness':
                // Set grid position
                x = keepWithin((5 * hsb.h) / 12, 0, 150);
                y = keepWithin(grid.height() - Math.ceil(hsb.s / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                // Set slider position
                y = keepWithin(slider.height() - (hsb.b * (slider.height() / 100)), 0, slider.height());
                sliderPicker.css('top', y + 'px');

                // Update UI
                slider.css('backgroundColor', hsb2hex({ h: hsb.h, s: hsb.s, b: 100 }));
                minicolors.find('.minicolors-grid-inner').css('opacity', 1 - (hsb.b / 100));
                break;

            default:
                // Set grid position
                x = keepWithin(Math.ceil(hsb.s / (100 / grid.width())), 0, grid.width());
                y = keepWithin(grid.height() - Math.ceil(hsb.b / (100 / grid.height())), 0, grid.height());
                gridPicker.css({
                    top: y + 'px',
                    left: x + 'px'
                });

                // Set slider position
                y = keepWithin(slider.height() - (hsb.h / (360 / slider.height())), 0, slider.height());
                sliderPicker.css('top', y + 'px');

                // Update panel color
                grid.css('backgroundColor', hsb2hex({ h: hsb.h, s: 100, b: 100 }));
                break;

        }

        // Fire change event, but only if minicolors is fully initialized
        if( input.data('minicolors-initialized') ) {
            doChange(input, value, opacity);
        }

    }

    // Runs the change and changeDelay callbacks
    function doChange(input, value, opacity) {

        var settings = input.data('minicolors-settings'),
            lastChange = input.data('minicolors-lastChange');

        // Only run if it actually changed
        if( !lastChange || lastChange.value !== value || lastChange.opacity !== opacity ) {

            // Remember last-changed value
            input.data('minicolors-lastChange', {
                value: value,
                opacity: opacity
            });

            // Fire change event
            if( settings.change ) {
                if( settings.changeDelay ) {
                    // Call after a delay
                    clearTimeout(input.data('minicolors-changeTimeout'));
                    input.data('minicolors-changeTimeout', setTimeout( function() {
                        settings.change.call(input.get(0), value, opacity);
                    }, settings.changeDelay));
                } else {
                    // Call immediately
                    settings.change.call(input.get(0), value, opacity);
                }
            }
            input.trigger('change').trigger('input');
        }

    }

    // Generates an RGB(A) object based on the input's value
    function rgbObject(input) {
        var hex = parseHex($(input).val(), true),
            rgb = hex2rgb(hex),
            opacity = $(input).attr('data-opacity');
        if( !rgb ) return null;
        if( opacity !== undefined ) $.extend(rgb, { a: parseFloat(opacity) });
        return rgb;
    }

    // Generates an RGB(A) string based on the input's value
    function rgbString(input, alpha) {
        var hex = parseHex($(input).val(), true),
            rgb = hex2rgb(hex),
            opacity = $(input).attr('data-opacity');
        if( !rgb ) return null;
        if( opacity === undefined ) opacity = 1;
        if( alpha ) {
            return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + parseFloat(opacity) + ')';
        } else {
            return 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
        }
    }

    // Converts to the letter case specified in settings
    function convertCase(string, letterCase) {
        return letterCase === 'uppercase' ? string.toUpperCase() : string.toLowerCase();
    }

    // Parses a string and returns a valid hex string when possible
    function parseHex(string, expand) {
        string = string.replace(/^#/g, '');
        if( !string.match(/^[A-F0-9]{3,6}/ig) ) return '';
        if( string.length !== 3 && string.length !== 6 ) return '';
        // console.log(string);
        if( string.length === 3 && expand ) {
            string = string[0] + string[0] + string[1] + string[1] + string[2] + string[2];
        }
        return '#' + string;
    }

    // Parses a string and returns a valid RGB(A) string when possible
    function parseRgb(string, obj) {

        var values = string.replace(/[^\d,.]/g, ''),
            rgba = values.split(','),
            output;

        rgba[0] = keepWithin(parseInt(rgba[0], 10), 0, 255);
        rgba[1] = keepWithin(parseInt(rgba[1], 10), 0, 255);
        rgba[2] = keepWithin(parseInt(rgba[2], 10), 0, 255);
        if( rgba[3] ) {
            rgba[3] = keepWithin(parseFloat(rgba[3], 10), 0, 1);
        }

        // Return RGBA object
        if( obj ) {
            return {
                r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: rgba[3] ? rgba[3] : null
            };
        }

        // Return RGBA string
        if( rgba[3] ) {
            return 'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')';
        } else {
            return 'rgb(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ')';
        }

    }

    // Parses a string and returns a valid color string when possible
    function parseInput(string, expand) {
        if( isRgb(string) ) {
            // Returns a valid rgb(a) string
            return parseRgb(string);
        } else {
            return parseHex(string, expand);
        }
    }

    // Keeps value within min and max
    function keepWithin(value, min, max) {
        if( value < min ) value = min;
        if( value > max ) value = max;
        return value;
    }

    // Checks if a string is a valid RGB(A) string
    function isRgb(string) {
        rgb = string.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? true : false;
    }

    // Function to get alpha from a RGB(A) string
    function getAlpha(rgba) {
        rgba = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+(\.\d{1,2})?|\.\d{1,2})[\s+]?/i);
        return (rgba && rgba.length === 6) ? rgba[4] : '1';
    }

   // Converts an HSB object to an RGB object
    function hsb2rgb(hsb) {
        var rgb = {};
        var h = Math.round(hsb.h);
        var s = Math.round(hsb.s * 255 / 100);
        var v = Math.round(hsb.b * 255 / 100);
        if(s === 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if( h === 360 ) h = 0;
            if( h < 60 ) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3; }
            else if( h < 120 ) {rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3; }
            else if( h < 180 ) {rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3; }
            else if( h < 240 ) {rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3; }
            else if( h < 300 ) {rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3; }
            else if( h < 360 ) {rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3; }
            else { rgb.r = 0; rgb.g = 0; rgb.b = 0; }
        }
        return {
            r: Math.round(rgb.r),
            g: Math.round(rgb.g),
            b: Math.round(rgb.b)
        };
    }

    // Converts an RGB string to a hex string
    function rgbString2hex(rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? '#' +
        ('0' + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ('0' + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }

    // Converts an RGB object to a hex string
    function rgb2hex(rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        $.each(hex, function(nr, val) {
            if (val.length === 1) hex[nr] = '0' + val;
        });
        return '#' + hex.join('');
    }

    // Converts an HSB object to a hex string
    function hsb2hex(hsb) {
        return rgb2hex(hsb2rgb(hsb));
    }

    // Converts a hex string to an HSB object
    function hex2hsb(hex) {
        var hsb = rgb2hsb(hex2rgb(hex));
        if( hsb.s === 0 ) hsb.h = 360;
        return hsb;
    }

    // Converts an RGB object to an HSB object
    function rgb2hsb(rgb) {
        var hsb = { h: 0, s: 0, b: 0 };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max !== 0 ? 255 * delta / max : 0;
        if( hsb.s !== 0 ) {
            if( rgb.r === max ) {
                hsb.h = (rgb.g - rgb.b) / delta;
            } else if( rgb.g === max ) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            } else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        } else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if( hsb.h < 0 ) {
            hsb.h += 360;
        }
        hsb.s *= 100/255;
        hsb.b *= 100/255;
        return hsb;
    }

    // Converts a hex string to an RGB object
    function hex2rgb(hex) {
        hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return {
            /* jshint ignore:start */
            r: hex >> 16,
            g: (hex & 0x00FF00) >> 8,
            b: (hex & 0x0000FF)
            /* jshint ignore:end */
        };
    }

    // Handle events
    $(document)
        // Hide on clicks outside of the control
        .on('mousedown.minicolors touchstart.minicolors', function(event) {
            if( !$(event.target).parents().add(event.target).hasClass('minicolors') ) {
                hide();
            }
        })
        // Start moving
        .on('mousedown.minicolors touchstart.minicolors', '.minicolors-grid, .minicolors-slider, .minicolors-opacity-slider', function(event) {
            var target = $(this);
            event.preventDefault();
            $(document).data('minicolors-target', target);
            move(target, event, true);
        })
        // Move pickers
        .on('mousemove.minicolors touchmove.minicolors', function(event) {
            var target = $(document).data('minicolors-target');
            if( target ) move(target, event);
        })
        // Stop moving
        .on('mouseup.minicolors touchend.minicolors', function() {
            $(this).removeData('minicolors-target');
        })
        // Show panel when swatch is clicked
        .on('mousedown.minicolors touchstart.minicolors', '.minicolors-swatch', function(event) {
            var input = $(this).parent().find('.minicolors-input');
            event.preventDefault();
            show(input);
        })
        // Show on focus
        .on('focus.minicolors', '.minicolors-input', function() {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            show(input);
        })
        // Update value on blur
        .on('blur.minicolors', '.minicolors-input', function() {
            var input = $(this),
                keywords = input.attr('data-keywords'),
                settings = input.data('minicolors-settings'),
                hex,
                rgba,
                swatchOpacity;

            if( !input.data('minicolors-initialized') ) return;

            // Get array of lowercase keywords
            keywords = !keywords ? [] : $.map(keywords.split(','), function(a) {
                return $.trim(a.toLowerCase());
            });

            // Set color string
            if( input.val() !== '' && $.inArray(input.val().toLowerCase(), keywords) > -1 ) {
                value = input.val();
            } else {
                // Get RGBA values for easy conversion
                if( isRgb(input.val()) ) {
                    rgba = parseRgb(input.val(), true);
                } else {
                    hex = parseHex(input.val(), true);
                    rgba = hex ? hex2rgb(hex) : null;
                }

                // Convert to format
                if( rgba === null ) {
                    value = settings.defaultValue;
                } else if( settings.format === 'rgb' ) {
                    value = settings.opacity ?
                        parseRgb('rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + input.attr('data-opacity') + ')') :
                        parseRgb('rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')');
                } else {
                    value = rgb2hex(rgba);
                }
            }

            // Update swatch opacity
            swatchOpacity = settings.opacity ? input.attr('data-opacity') : 1;
            if( value.toLowerCase() === 'transparent' ) swatchOpacity = 0;
            input
                .closest('.minicolors')
                .find('.minicolors-swatch > span')
                .css('opacity', swatchOpacity);

            // Set input value
            input.val(value);

            // Is it blank?
            if( input.val() === '' ) input.val(parseInput(settings.defaultValue, true));

            // Adjust case
            input.val( convertCase(input.val(), settings.letterCase) );

        })
        // Handle keypresses
        .on('keydown.minicolors', '.minicolors-input', function(event) {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            switch(event.keyCode) {
                case 9: // tab
                    hide();
                    break;
                case 13: // enter
                case 27: // esc
                    hide();
                    input.blur();
                    break;
            }
        })
        // Update on keyup
        .on('keyup.minicolors', '.minicolors-input', function() {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            updateFromInput(input, true);
        })
        // Update on paste
        .on('paste.minicolors', '.minicolors-input', function() {
            var input = $(this);
            if( !input.data('minicolors-initialized') ) return;
            setTimeout( function() {
                updateFromInput(input, true);
            }, 1);
        });

}));
/* Web Font Loader v1.6.21 - (c) Adobe Systems, Google. License: Apache 2.0 */
(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.m=b||a;this.c=this.m.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function z(a){if("string"===typeof a.f)return a.f;var b=a.m.location.protocol;"about:"==b&&(b=a.a.location.protocol);return"https:"==b?"https:":"http:"}function ea(a){return a.m.location.hostname||a.a.location.hostname}
function A(a,b,c){function d(){k&&e&&f&&(k(g),k=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,k=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function B(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function C(){this.a=0;this.c=null}function D(a){a.a++;return function(){a.a--;E(a)}}function F(a,b){a.c=b;E(a)}function E(a){0==a.a&&a.c&&(a.c(),a.c=null)};function G(a){this.a=a||"-"}G.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function H(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return I(a)+" "+(a.f+"00")+" 300px "+J(a.c)}function J(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function K(a){return a.a+a.f}function I(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.m.document.documentElement;this.h=b;this.a=new G("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);L(a,"loading")}function M(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}L(a,"inactive")}function L(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,K(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function N(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function O(a){u(a.c,"body",a.a)}function P(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+J(a.c)+";"+("font-style:"+I(a)+";font-weight:"+(a.f+"00")+";")};function Q(a,b,c,d,e,f){this.g=a;this.f=b;this.a=d;this.c=c;this.j=e||3E3;this.h=f||void 0}Q.prototype.start=function(){function a(){q()-d>=c.j?c.f(c.a):b.fonts.load(fa(c.a),c.h).then(function(b){1<=b.length?c.g(c.a):setTimeout(a,25)},function(){c.f(c.a)})}var b=this.c.m.document,c=this,d=q();a()};function R(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.o=this.j=this.h=this.g=null;this.g=new N(this.c,this.s);this.h=new N(this.c,this.s);this.j=new N(this.c,this.s);this.o=new N(this.c,this.s);a=new H(this.a.c+",serif",K(this.a));a=P(a);this.g.a.style.cssText=a;a=new H(this.a.c+",sans-serif",K(this.a));a=P(a);this.h.a.style.cssText=a;a=new H("serif",K(this.a));a=P(a);this.j.a.style.cssText=a;a=new H("sans-serif",K(this.a));a=
P(a);this.o.a.style.cssText=a;O(this.g);O(this.h);O(this.j);O(this.o)}var S={D:"serif",C:"sans-serif"},T=null;function U(){if(null===T){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return T}R.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.o.a.offsetWidth;this.A=q();la(this)};
function ma(a,b,c){for(var d in S)if(S.hasOwnProperty(d)&&b===a.f[S[d]]&&c===a.f[S[d]])return!0;return!1}function la(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=U()&&ma(a,b,c));d?q()-a.A>=a.w?U()&&ma(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):na(a):V(a,a.v)}function na(a){setTimeout(p(function(){la(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.o=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,K(a).toString(),"active")],[b.a.c("wf",a.c,K(a).toString(),"loading"),b.a.c("wf",a.c,K(a).toString(),"inactive")]);L(b,"fontactive",a);this.o=!0;oa(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,K(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,K(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,K(a).toString(),"inactive"));w(b.f,d,e)}L(b,"fontinactive",a);oa(this)};function oa(a){0==--a.f&&a.j&&(a.o?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),L(a,"active")):M(a.a))};function pa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}pa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;qa(this,new ha(this.c,a),a)};
function ra(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,k=d||null||{};if(0===c.length&&f)M(b.a);else{b.f+=c.length;f&&(b.j=f);var h,m=[];for(h=0;h<c.length;h++){var l=c[h],n=k[l.c],r=b.a,x=l;r.g&&w(r.f,[r.a.c("wf",x.c,K(x).toString(),"loading")]);L(r,"fontloading",x);r=null;null===X&&(X=window.FontFace?(x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))?42<parseInt(x[1],10):!0:!1);X?r=new Q(p(b.g,b),p(b.h,b),b.c,l,b.s,n):r=new R(p(b.g,b),p(b.h,b),b.c,l,b.s,a,
n);m.push(r)}for(h=0;h<m.length;h++)m[h].start()}},0)}function qa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,c,d){ra(a,f,b,c,d)})};function sa(a,b){this.c=a;this.a=b}function ta(a,b,c){var d=z(a.c);a=(a.a.api||"fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/,"");return d+"//"+a+"/"+b+".js"+(c?"?v="+c:"")}
sa.prototype.load=function(a){function b(){if(e["__mti_fntLst"+c]){var d=e["__mti_fntLst"+c](),g=[],k;if(d)for(var h=0;h<d.length;h++){var m=d[h].fontfamily;void 0!=d[h].fontStyle&&void 0!=d[h].fontWeight?(k=d[h].fontStyle+d[h].fontWeight,g.push(new H(m,k))):g.push(new H(m))}a(g)}else setTimeout(function(){b()},50)}var c=this.a.projectId,d=this.a.version;if(c){var e=this.c.m;B(this.c,ta(this,c,d),function(d){d?a([]):b()}).id="__MonotypeAPIScript__"+c}else a([])};function ua(a,b){this.c=a;this.a=b}ua.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new C;b=0;for(c=d.length;b<c;b++)A(this.c,d[b],D(g));var k=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),m=0;m<h.length;m+=1)k.push(new H(d[0],h[m]));else k.push(new H(d[0]));F(g,function(){a(k,f)})};function va(a,b,c){a?this.c=a:this.c=b+wa;this.a=[];this.f=[];this.g=c||""}var wa="//fonts.googleapis.com/css";function xa(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function ya(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function za(a){this.f=a;this.a=[];this.c={}}
var Aa={latin:"BESbswy",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Ba={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ca={i:"i",italic:"i",n:"n",normal:"n"},Da=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Ea(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var k=d[1];g=[];if(k)for(var k=k.split(","),h=k.length,m=0;m<h;m++){var l;l=k[m];if(l.match(/^[\w-]+$/)){var n=Da.exec(l.toLowerCase());if(null==n)l="";else{l=n[2];l=null==l||""==l?"n":Ca[l];n=n[1];if(null==n||""==n)n="4";else var r=Ba[n],n=r?r:isNaN(n)?"4":n.substr(0,1);l=[l,n].join("")}}else l="";l&&g.push(l)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=Aa[d[0]])&&(a.c[e]=d))}a.c[e]||(d=Aa[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new H(e,f[d]))}};function Fa(a,b){this.c=a;this.a=b}var Ga={Arimo:!0,Cousine:!0,Tinos:!0};Fa.prototype.load=function(a){var b=new C,c=this.c,d=new va(this.a.api,z(c),this.a.text),e=this.a.families;xa(d,e);var f=new za(e);Ea(f);A(c,ya(d),D(b));F(b,function(){a(f.a,f.c,Ga)})};function Ha(a,b){this.c=a;this.a=b}Ha.prototype.load=function(a){var b=this.a.id,c=this.c.m;b?B(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],k=b[f+1],h=0;h<k.length;h++)e.push(new H(g,k[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(m){}a(e)}},2E3):a([])};function Ia(a,b){this.c=a;this.f=b;this.a=[]}Ia.prototype.load=function(a){var b=this.f.id,c=this.c.m,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,k=c.fonts.length;g<k;++g){var h=c.fonts[g];d.a.push(new H(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},B(this.c,z(this.c)+(this.f.api||"//f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new pa(window);Y.a.c.custom=function(a,b){return new ua(b,a)};Y.a.c.fontdeck=function(a,b){return new Ia(b,a)};Y.a.c.monotype=function(a,b){return new sa(b,a)};Y.a.c.typekit=function(a,b){return new Ha(b,a)};Y.a.c.google=function(a,b){return new Fa(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());


/**
 * Function.prototype.delay
 * 
 * Delays the execution of a function by a number of milliseconds, accepting
 * optional <context> and <args> arguments. Note that the <milliseconds> is also
 * optional. If it's not provided, 0 will be used (which pushes the call to the
 * end of the JS execution stack).
 * 
 * @access public
 * @param  undefined|Number milliseconds (default: 0)
 * @param  undefined|Object context (default: window)
 * @param  undefined|Array args (default: [])
 * @return Number
 */
Function.prototype.delay = function(milliseconds, context, args) {
    var _this = this,
        reference = setTimeout(
            function() {
                jQuery.timeoutPool.remove(reference);
                _this.apply(context || window, args || []);
            },
            milliseconds || 0
        );
    jQuery.timeoutPool.push(reference);
    return reference;
};

/**
 * Function.prototype.interval
 * 
 * @access public
 * @param  Number milliseconds
 * @param  undefined|Object context (default: window)
 * @param  undefined|Array args (default: [])
 * @return Number
 */
Function.prototype.interval = function(milliseconds, context, args) {
    var _this = this,
        reference = setInterval(
            function() {
                jQuery.intervalPool.remove(reference);
                _this.apply(context || window, args || []);
            },
            milliseconds.toInt()
        );
    jQuery.intervalPool.push(reference);
    return reference;
};

/**
 * Function.prototype.minDelay
 * 
 * Ensures that a function is called only if a minimum number of milliseconds
 * have passed. This is determined by checking the current timestamp against a
 * Date object that's passed in, which should be used as the benchmark in the
 * application logic. Do a quick search to see how this is being used.
 * 
 * @access public
 * @param  Date start
 * @param  undefined|Number milliseconds
 * @param  undefined|Object context
 * @param  undefined|Array args
 * @return void
 */
Function.prototype.minDelay = function(start, milliseconds, context, args) {
    var now = new Date().getTime();
    if (now > (start.getTime() + milliseconds)) {
        this.apply(context || window, args || []);
    } else {
        this.minDelay.delay(25, this, [
            start, milliseconds, context || window, args || []
        ]);
    }
};

// Function.prototype.if = function(validator) {
    
// };

/**
 * Function.prototype.proxy
 * 
 * @access public
 * @param  Object context
 * @param  Array args
 * @return Function
 */
Function.prototype.proxy = function(context, args) {
    if (args === undefined) {
        return jQuery.proxy(this, context);
    }
    if (args.length === 1) {
        return jQuery.proxy(this, context, args[0]);
    } else if (args.length === 2) {
        return jQuery.proxy(this, context, args[0], args[1]);
    } else if (args.length === 3) {
        return jQuery.proxy(this, context, args[0], args[1], args[2]);
    } else if (args.length === 4) {
        return jQuery.proxy(this, context, args[0], args[1], args[2], args[3]);
    }
    alert('Do not use this function for now :/');
return;
    var _this = this;
    args = arg || [];
    return function() {
        _this.apply(context, args);
    };
};

/** 
 * trim
 * 
 * Helper method, used by vector layers, to trim whitespace from a canvas and
 * return back details on what was trimmed (eg. boundaries), along with details
 * on the trimmed canvas.
 * 
 * @see    https://gist.github.com/remy/784508
 * @access public
 * @param  HTMLCanvasElement canvas
 * @return Object
 */
HTMLCanvasElement.prototype.trim = function() {
    var ctx = this.getContext('2d'),
        pixels = ctx.getImageData(0, 0, this.width, this.height),
        bounds = {
            top: null,
            left: null,
            right: null,
            bottom: null
        };

    for (var i = 0, l = pixels.data.length, x, y; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
            x = (i / 4) % this.width;
            y = ~~((i / 4) / this.width);

            if (bounds.top === null) {
                bounds.top = y;
            }

            if (bounds.left === null) {
                bounds.left = x;
            } else if (x < bounds.left) {
                bounds.left = x;
            }

            if (bounds.right === null) {
                bounds.right = x;
            } else if (bounds.right < x) {
                bounds.right = x;
            }

            if (bounds.bottom === null) {
                bounds.bottom = y;
            } else if (bounds.bottom < y) {
                bounds.bottom = y;
            }
        }
    }

    /** 
     * See comment for this. Ran into myself when comparing this trim method to
     * Photoshop's
     * 
     * @see https://gist.github.com/remy/784508
     */
    ++bounds.bottom;
    ++bounds.right;

    // Done
    return {
        ratio: (bounds.right - bounds.left) / (bounds.bottom - bounds.top),
        width: bounds.right - bounds.left,
        height: bounds.bottom - bounds.top,
        bounds: bounds,
        canvas: this
    };
};

/**
 * info
 * 
 * @access public
 * @param  String info
 * @return void
 */
info = function(info) {
    console.info(info);
};

/**
 * Adds the client-side time as a header to all outbound ajax calls, and sets
 * the timeout value for ajax calls. The server side has a value higher than
 * this to ensure a Fatal error doesn't get passed to the frontend and a legit
 * timeout can be detected.
 * 
 * The downside of this approach is that the timer starts when a <jQuery.ajax>
 * call is made. So if there are ajax calls backed up, the timer starts despite
 * the fact that a request hasn't yet been received by the server. More info is
 * here:
 * https://i.imgur.com/AV5LCej.png
 * http://api.jquery.com/jquery.ajax/
 * 
 * @note The below note is no longer true. I changed the CORS config to accept
 *       all headers. See cors.current.xml file
 * @note I had to add <x-stencil-time> to the CORS configuration file (along
 *       with <accept>), since SVG's are accessed via a jQuery XHR request to
 *       allow detection of CORS errors with The Noun Project. So Oliver: if you
 *       add any more headers below, ensure you add the lowercased versions of
 *       them to the CORS configuration for each bucket. See:
 *       https://i.imgur.com/WJo6Aje.png
 * @note Originally, I was sending the timezone in plain text version (eg.
 *       4:32p April 18th, UTC..). After launch, we ran into an issue where
 *       certain timezones bugged out when they had accents in them. So switched
 *       this to send Unix timestamp information.
 */
jQuery.ajaxSetup({
    beforeSend: function(xhr) {
        xhr.setRequestHeader('X-Stencil-Time', Math.floor(Date.now() / 1000));
    }//,
    // timeout: 25000
});

// $(window).ajaxSend(function(event, jqXHR, settings) {
//     var max = 25000,
//         interval,
//         start = Date.now(),
//         check = function() {
//             var current = Date.now();
//             if (jqXHR.readyState === 4) {
//                 // StencilBooter.log(current - start);
//                 clearInterval(interval);
//             } else {
//                 if (current > (start + max)) {
//                     clearInterval(interval);
//                     jqXHR.abort();
//                 }
//             }
//         };
//     StencilBooter.log(start);
//     interval = setInterval(check, 10);
// });

/**
 * jQuery.fn.disable
 * 
 * @access public
 * @return jQuery
 */
jQuery.fn.disable = function() {
    this.attr('disabled', 'disabled');
    return this;
};

/**
 * jQuery.fn.disabled
 * 
 * Disables or enables the input.
 * 
 * @access public
 * @param  Boolean disabled
 * @return jQuery
 */
jQuery.fn.disabled = function(disabled) {
    if (disabled === true) {
        this.attr('disabled', 'disabled');
    } else {
        this.removeAttr('disabled');
    }
    return this;
};

/**
 * jQuery.fn.enable
 * 
 * @access public
 * @return jQuery
 */
jQuery.fn.enable = function() {
    this.removeAttr('disabled');
    return this;
};

/**
 * jQuery.fn.focusable
 * 
 * Returns the first focusable element in the jQuery object
 * 
 * @access public
 * @return jQuery
 */
jQuery.fn.focusable = function() {
    var selector = [
        'input[type="tel"]:visible',
        'input[type="checkbox"]:visible',
        'input[type="radio"]:visible',
        'input[type="email"]:visible',
        'input[type="password"]:visible',
        'input[type="text"]:visible',
        'select:visible',
        'textarea:visible'
    ].join(',');
    return this.find(selector).first();
};

/**
 * jQuery.fn.hourglass
 * 
 * @access public
 * @return void
 */
jQuery.fn.hourglass = function() {
    var hourglass = App.getHourglass(),
        $hourglass = hourglass.getElement(),
        offset = this.offset();
    $hourglass.toggleClass('hidden');
    $hourglass.css({
        width: this.css('width'),
        height: this.css('height'),
        top: offset.top,
        left: offset.left,
    });
};

/**
 * jQuery.fn.outer
 * 
 * Returns the outer HTML of a jQuery element.
 * 
 * There was a problem with IE11, whereby retrieving the outer html (by cloning
 * a wrapper-tag) caused elements that had checked="checked" to have the
 * attribute stripped. This was a known bug with jQuery. To get around this, I
 * reverted to the more-standard outerHTML property on the first element of the
 * jQuery selector.
 * 
 * @see    https://bugs.jquery.com/ticket/10550
 * @see    http://stackoverflow.com/questions/2419749/get-selected-elements-outer-html
 * @see    http://caniuse.com/#feat=xml-serializer
 * @access public
 * @return String
 */
jQuery.fn.outer = function() {
    return this.get(0).outerHTML;
    // return $('<p>').append(this.eq(0).clone()).html();
};

/**
 * jQuery.fn.serializeObject
 * 
 * @see    http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
 * @access public
 * @return Object
 */
jQuery.fn.serializeObject = function() {
    var obj = {},
        arr = this.serializeArray();
    jQuery.each(
        arr,
        function() {
            if (obj[this.name] !== undefined) {
                if (!obj[this.name].push) {
                    obj[this.name] = [obj[this.name]];
                }
                obj[this.name].push(this.value || '');
            } else {
                obj[this.name] = this.value || '';
            }
        }
    );
    return obj;
};


/**
 * jQuery.fn.tag
 * 
 * Returns a lowercased version of the element's tag name.
 * 
 * @access public
 * @return jQuery
 */
jQuery.fn.tag = function() {
    return this.prop('tagName').toLowerCase();
};

/**
 * jQuery.fn.tooltips
 * 
 * @access public
 * @param  Boolean enabled
 * @return jQuery
 */
jQuery.fn.tooltips = function(enabled) {
    if (enabled === true) {
        this.attr('tooltip', 'tooltip');
    } else {
        this.removeAttr('tooltip');
    }
    return this;
};


/**
 * JSON.valid
 * 
 * @access public
 * @param  String str
 * @return Boolean
 */
JSON.valid = function(str) {
    try {
        JSON.parse(str);
        return true;
    } catch(e) {}
    return false;
};


/**
 * rgba
 * 
 * Converts a hex string and opacity number to an rgba string.
 * 
 * @see    https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
 * @access public
 * @param  String hex
 * @param  Number opacity
 * @return String
 */
function rgba(hex, opacity) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16);
    return 'rgba(' + ([r, g, b, opacity].join(',')) + ')';
}


/**
 * centsToDollars
 * 
 * Converts a number of cents to a string, formatted as USD currency.
 * 
 * @access public
 * @param  undefined|Boolean clean Whether or not the result should be "cleaned"
 *         of any trailing zeros. eg. $10.00 becomes $10
 * @return String
 */
String.prototype.centsToDollars = Number.prototype.centsToDollars = function(clean) {
    var dollars = (this.toInt() / 100).toString();
    if (dollars.indexOf('.') === -1) {
        dollars += '.00';
    } else if (dollars.match(/\.[0-9]{1}$/) !== null) {
        dollars += '0';
    }
    if (clean) {
        return dollars.replace(/\.00$/, '');
    }
    return dollars;
};

/**
 * commas
 * 
 * Formats a number so that it has commas at the appropriate places (eg. 1,000,
 * 10,000, 1,000,000).
 * 
 * @access public
 * @return String
 */
String.prototype.commas = Number.prototype.commas = function() {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};


/**
 * (closure)
 * 
 * Sets up conversion extensions for strings.
 */
(function() {

    /**
     * link
     * 
     * Converts a string to a link, accepting possible options for it.
     * 
     * @access private
     * @param  String str
     * @param  Object options
     * @return String
     */
    var link = function(str, options) {
        var $element = $('<a>', {
            text: str,
            target: options.target || '_blank',
            href: options.href || '#',
            class: options.classes && options.classes.join(' ')
        });
        return $element.outer();
    };

    /**
     * String.prototype.convert
     * 
     * @access public
     * @param  String type
     * @param  Object options
     * @return String
     */
    String.prototype.convert = function(type, options) {
        switch (type) {
            case 'link':
                return link(this, options);
        }
    };
})();


/**
 * (closure)
 * 
 * Sets up encoding extensions for strings.
 */
(function() {

    /**
     * hashtag
     * 
     * Converts any hashtags to links, with the appropriate href and classes and
     * the tag as the anchor text.
     * 
     * @access private
     * @param  String str
     * @param  Object options
     * @return String
     */
    var hashtag = function(str, options) {
        return str.replace(/[#]+[A-Za-z0-9-_]+/g, function(tag) {
            var href = options.href.replace('$hashtag', tag.replace('#', ''));
            return tag.convert('link', {
                href: href,
                classes: ['hashtag']
            });
        });
    };

    /**
     * newlines
     * 
     * Replaces any newlines with <br /> tags.
     * 
     * @access private
     * @param  String str
     * @return String
     */
    var newlines = function(str) {
        return str.replace(/\n/g, function(tag) {
            return '<br>';
        });
    };

    /**
     * url
     * 
     * Converts and URL strings to links, with the URL as the anchor text.
     * 
     * @access private
     * @param  String str
     * @return String
     */
    var url = function(str) {
        return str.replace(
            /[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g,
            function(url) {
                return url.convert('link', {
                    href: url,
                    classes: ['url']
                });
            }
        );
    };

    /**
     * username
     * 
     * Converts any @ usernames to links, with the appropriate href and classes
     * and the username as the anchor text.
     * 
     * @access private
     * @param  String str
     * @param  Object options
     * @return String
     */
    var username = function(str, options) {
        return str.replace(/[@]+[A-Za-z0-9-_]+/g, function(username) {
            var href = options.href.replace(
                '$username',
                username.replace('@', '')
            );
            return username.convert('link', {
                href: href,
                classes: ['username']
            });
        });
    };

    /**
     * String.prototype.encode
     * 
     * @access public
     * @param  String type
     * @param  Object options
     * @return String
     */
    String.prototype.encode = function(type, options) {
        switch (type) {
            case 'url':
                return url(this);
            case 'username':
                return username(this, options);
            case 'hashtag':
                return hashtag(this, options);
            case 'newlines':
                return newlines(this);
        }
    };
})();

/**
 * plural
 * 
 * @access public
 * @return String
 */
String.prototype.plural = function() {
    var last = this.slice(-1);
    if (last === 'y') {
        return this.replace(/y$/, 'ies');
    }
    return (this) + 's';
};

/**
 * singular
 * 
 * @access public
 * @return String
 */
String.prototype.singular = function() {
    var tail = this.slice(-3);
    if (tail === 'ies') {
        return this.replace(/ies$/, 'y');
    }
    return this.replace(/s$/, '');
};


/**
 * (closure)
 * 
 * Sets up truncation methods for strings.
 */
(function() {

    /**
     * facebook
     * 
     * @note   Looks like Facebook truncates urls according to the structure.
     *         If the query param <?> is found, it cuts off that and everything
     *         after it. Otherwise, if it's a long, directory-style path, it
     *         shows the host, truncates, and then shows the final fragment,
     *         truncating that 40 characters.
     * @see    https://i.imgur.com/vplVxjW.png
     * @see    https://i.imgur.com/XI1J9Cd.png
     * @see    https://i.imgur.com/oLd9nw0.png
     * @access private
     * @param  String str
     * @param  Number limit
     * @param  Object options
     * @return String
     */
    var facebook = function(str, limit, options) {
        return str;
    };

    /**
     * general
     * 
     * @access private
     * @param  String str
     * @param  Number limit
     * @param  Object options
     * @return String
     */
    var general = function(str, limit, options) {
        return str;
    };

    /**
     * String.prototype.truncate
     * 
     * @access public
     * @param  String type
     * @param  Number limit
     * @param  Object options
     * @return String
     */
    // String.prototype.truncate = function(type, limit, options) {
    //     switch (type) {
    //         case 'facebook':
    //             return facebook(this, limit, options);
    //         default:
    //             return general(this, limit, options);
    //     }
    // };

    /**
     * String.prototype.truncate
     * 
     * @access public
     * @param  Number limit
     * @return String
     */
    String.prototype.truncate = function(limit) {
        return String(this);
        if (this.length > limit) {
            return this.substr(0, limit) + ('&hellip;');
        }
        return String(this);
    };
})();

/**
 * toFloat
 * 
 * @access public
 * @return Number
 */
String.prototype.toFloat = Number.prototype.toFloat = function() {
    return parseFloat(this);
};

/**
 * trimToLength
 * 
 * @see    http://stackoverflow.com/questions/4637942/how-can-i-truncate-a-string-in-jquery
 * @access public
 * @return Number
 */
String.prototype.trimToLength = function(m) {
  return (this.length > m) 
    ? jQuery.trim(this).substring(0, m).split(' ').slice(0, -1).join(' ') + '...'
    : this;
};

/**
 * toInt
 * 
 * @access public
 * @return Number
 */
String.prototype.toInt = Number.prototype.toInt = function() {
    return parseInt(this, 10);
};

/**
 * round
 * 
 * Rounds a String/Number to 4 decimal points if no precision parameter is
 * passed in. Here are some samples of calling this:
 * - 10.123456.round(0) = 10
 * - 10.123456.round(1) = 10.1
 * - 10.123456.round(2) = 10.12
 * - 10.123456.round(3) = 10.123
 * - 10.123456.round(4) = 10.1235
 * - 10.123456.round(5) = 10.12346
 * 
 * @access public
 * @param  Number precision
 * @return Number
 */
String.prototype.round = Number.prototype.round = function(precision) {
    var power = Math.pow(10, precision);
    // return Math.round(this.toFloat() * 100) / 100;
    return Math.round(this.toFloat() * power) / power;
};

/**
 * ceil
 * 
 * Rounds a Float/Number/String to the cloest decimal.
 * 
 * @access public
 * @return Number
 */
String.prototype.ceil = Number.prototype.ceil = function() {
    return Math.ceil(this.toFloat());
};

/**
 * slugify
 * 
 * @access public
 * @param  undefined|Number limit (default: 100)
 * @param  undefined|Boolean lowercase (default: true)
 * @return String
 */
String.prototype.slugify = function(limit, lowercase) {
    var str = this;
    limit = limit === undefined ? 100 : limit.toInt();
    lowercase = lowercase === undefined ? true : lowercase;
    str = str.trim();
    if (lowercase === true) {
        str = str.toLowerCase();
    }
    str = str.replace(/'/g, '');
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&/g, '-and-');
    str = str.replace(/[^a-zA-Z0-9-]/g, ' ');
    str = str.replace(/-/g, ' ');
    str = str.replace(/[\s]{2,}/g, ' ');
    str = str.trim();
    str = str.replace(/ /g, '-');
    str = str.slice(0, limit);
    return str;
};

/**
 * ucfirst
 * 
 * Uppercase's the first letter of the string.
 * 
 * @access public
 * @return String
 */
String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * dataURItoBlob
 * 
 * @see    http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
 * @access public
 * @param  String dataURI
 * @return Blob|BlobBuilder
 */
function dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = unescape(dataURI.split(',')[1]);
    }
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0],
        ab = new ArrayBuffer(byteString.length),
        ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    try {
        return new Blob([ab], {type: mimeString});
    } catch (e) {
        var BlobBuilder = window.WebKitBlobBuilder || window.MozBlobBuilder,
            bb = new BlobBuilder();
        bb.append(ab);
        return bb.getBlob(mimeString);
    }
}

/**
 * random
 * 
 * @see    http://stackoverflow.com/questions/1349404/generate-a-string-of-5-random-characters-in-javascript
 * @param  Number length (default: 10)
 * @return String
 */
function random(length) {
    var str = '',
        range = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567' +
            '89',
        i = 0,
        l = length || 10;
    for (i; i < l; i++) {
        str += range.charAt(Math.floor(Math.random() * range.length));
    }
    return str;
}

/**
 * resizeDataURI
 * 
 * @see    http://stackoverflow.com/questions/20958078/resize-a-base-64-image-in-javascript-without-using-canvas
 * @param  String dataURI
 * @param  Number width
 * @param  Number height
 * @param  Function callback
 * @param  String mime
 * @return void
 */
function resizeDataURI(dataURI, width, height, callback, mime) {
    var img = document.createElement('img');
    img.onload = function() {
        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(this, 0, 0, width, height);
        callback(canvas.toDataURL(mime, 1.0));
    };
    img.src = dataURI;
}

/**
 * fabric.Canvas.prototype.getDiagonalLength
 * 
 * @access public
 * @return void
 */
fabric.Canvas.prototype.getDiagonalLength = function() {
    return Math.ceil(
        Math.sqrt(
            Math.pow(this.getWidth(), 2) +
            Math.pow(this.getHeight(), 2)
        )
    );
};


/**
 * fabric.Canvas.prototype.resizeTo
 * 
 * @access public
 * @param  Number width
 * @param  Number height
 * @return void
 */
fabric.Canvas.prototype.resizeTo = function(width, height) {
    this.setDimensions({
        width: width.toInt(),
        height: height.toInt()
    });
    this.trigger('resized');
};


/**
 * fabric.Image.prototype.makeSlidable
 * 
 * @note   Need to take scale factors into consideration because when a Pixabay
 *         image is applied to the canvas, it is initially scaled up/down to
 *         match the canvas before it's associated-asset is ready (which will
 *         then provide a remote image src that is requested to exactly fit).
 * @see    https://groups.google.com/forum/#!topic/fabricjs/D2O0RAw1kDw
 * @access public
 * @return void
 */
fabric.Image.prototype.makeSlidable = function() {
    this.on('moving', function() {

        /** 
         * The ratios of the canvas and image are used to determine if the image
         * can be slide vertically or horizontally. It's a way around using the 
         * Frame reference here, since the canvas will be the same ratio.
         */
        var canvas = {
                width: this.canvas.width,
                height: this.canvas.height
            },
            image = {
                width: this.width * this.scaleX,
                height: this.height * this.scaleY
            },
            bound;
        canvas.ratio = canvas.width / canvas.height;
        image.ratio = image.width / image.height;

        /**
         * Too small to warrant any dragging
         * 
         * I discovered a bug when the the image that was set as the background
         * image had a ratio that was very close to that of the selected frame.
         * When that happened, it was possible to move the background image a
         * little, but when downloaded (or shared), there would be whitespace
         * on one of the sides (top, right, bottom or left). This was because
         * there would be enough "space" to slide that background image in the
         * preview, resulting in either the top or left values being updated.
         * But the values they were updated to were quite minor. The result is
         * that when a Ghost canvas retrieved the background image url from
         * Cloudinary, the resulting image did not have the fidelity to ensure
         * the same output, simply because Cloudinary does not support
         * decimal-based pixel outputs (nor can it). So although the Ghost
         * canvas was doing everything properly, the whitebars could show up
         * because the background image it was using was not specific-enough
         * from a pixel-perspective.
         * 
         * So, in cases where the ratio between the image and the canvas differs
         * by at most 2 percent, I simply lock the image down.
         */
        var comparison = image.ratio / canvas.ratio;
        if (comparison > 0.9800 && comparison < 1.0200) {
        // if (comparison > 0.99 && comparison < 1.01) {
        // if (comparison > 0.995 && comparison < 1.005) {
            this.set('left', canvas.width / 2);
            this.set('top', canvas.height / 2);
        } else {

            /**
             * Moving up/down
             * 
             * If the width of the image is the same as the canvas, then the image
             * can be moved up and down. This means that parts of the image below
             * and above the canvas viewport are hiding, and can be brought into
             * view by dragging.
             */
            if (image.ratio < canvas.ratio) {
                this.set('left', canvas.width / 2);
                bound = (canvas.height / 2) - (image.height - canvas.height) / 2;
                if (this.top < bound) {
                    this.set('top', bound);
                } else {
                    bound = (canvas.height / 2) + (image.height - canvas.height) / 2;
                    if (this.top > bound) {
                        this.set('top', bound);
                    }
                }
            }
            /**
             * Moving left/right
             * 
             * Otherwise, the width of the image is not the same as that canvas,
             * which means that the height of the image is set as the height of the
             * canvas. In that case, the image can be moved horizontally (left and
             * right), so that parts of the image to the left and right of the
             * canvas can be brought into the canvas' viewport.
             */
            else {
                this.set('top', canvas.height / 2);
                bound = (canvas.width / 2) - (image.width - canvas.width) / 2;
                if (this.left < bound) {
                    this.set('left', bound);
                } else {
                    bound = (canvas.width / 2) + (image.width - canvas.width) / 2;
                    if (this.left > bound) {
                        this.set('left', bound);
                    }
                }
            }
        }

        /**
         * Event should always be called, since it's likely the user will always
         * hit either a vertical or horizontal bound (since it's hard to move
         * your mouse perfectly straight in one direction).
         */
        this.trigger('snap/position');
    });

    // Proxy for moving event
    this.on('lock', function() {
        this.trigger('moving');
    });
};


/**
 * fabric.Object.prototype.boxIn
 * 
 * Boxes an object into the canvas (to prevent it from being dragged outside of
 * it), limited to the threshold. Threshold is a ratio of the width. So for
 * example, a threshold value of 0.5 would allow half the image to be dragged
 * outside the canvas.
 * 
 * @note   Threshold not yet implemented
 * @access public
 * @param  Number threshold
 * @return void
 */
fabric.Object.prototype.boxIn = function(threshold) {

    /**
     * limit
     * 
     * @this   fabric.Object
     * @access private
     * @return void
     */
    var limit = function() {

        // Offsets
        var width = this.canvas.getWidth(),
            height = this.canvas.getHeight();

        // Horizontal
        var check = this.getWidth() * threshold - this.getWidth() / 2;
        if (this.left < check) {
            this.set('left', check);
            this.trigger('boxedIn');
        } else {
            check = width - (this.getWidth() * threshold - this.getWidth() / 2);
            if (this.left >= check) {
                this.set('left', check);
                this.trigger('boxedIn');
            }
        }

        // Vertical
        check = this.getHeight() * threshold - this.getHeight() / 2;
        if (this.top < check) {
            this.set('top', check);
            this.trigger('boxedIn');
        } else {
            check = height - (this.getHeight() * threshold - this.getHeight() / 2);
            if (this.top >= check) {
                this.set('top', check);
                this.trigger('boxedIn');
            }
        }
    };

    // Events and unbinding
    this.on('moving', limit);
    this.on('removed', function() {
        this.off('moving', limit);
    });

    // Proxy for moving event
    // var proxy = function() {
    //     this.trigger('moving');
    // };
    // this.on('lock', proxy);
    // this.on('removed', function() {
    //     this.off('lock', proxy);
    // });
};


/**
 * fabric.Object.prototype.getRatio
 * 
 * @access public
 * @return Number
 */
fabric.Object.prototype.getRatio = function() {
    return this.get('width') / this.get('height');
};


/**
 * fabric.Object.prototype.getRelativeHeight
 * 
 * @access public
 * @return Number
 */
fabric.Object.prototype.getRelativeHeight = function() {
    return this.getHeight() / this.canvas.getHeight();
};


/**
 * fabric.Object.prototype.getRelativeLeft
 * 
 * @access public
 * @return Number
 */
fabric.Object.prototype.getRelativeLeft = function() {
    return this.getLeft() / this.canvas.getWidth();
};


/**
 * fabric.Object.prototype.getRelativeTop
 * 
 * @access public
 * @return Number
 */
fabric.Object.prototype.getRelativeTop = function() {
    return this.getTop() / this.canvas.getHeight();
};


/**
 * fabric.Object.prototype.getRelativeWidth
 * 
 * @access public
 * @return Number
 */
fabric.Object.prototype.getRelativeWidth = function() {
    return this.getWidth() / this.canvas.getWidth();
};


/**
 * fabric.Object.prototype.snapToAngle
 * 
 * @access public
 * @param  Number multiple
 * @param  Number threshold
 * @return void
 */
fabric.Object.prototype.snapToAngle = function(multiple, threshold) {

    /**
     * snap
     * 
     * @this   fabric.Object
     * @access private
     * @return void
     */
    var snap = function() {
        var angles = 360 / multiple,
            angle = this.getAngle(),
            lower, upper;
        for (var x = 0, l = angles; x < l; ++x) {
            lower = (multiple * x) - threshold;
            upper = (multiple * x) + threshold;
            if (lower < 0) {
                lower = 360 + lower;
                if (angle > lower || angle < upper) {
                    this.setAngle(multiple * x);
                    this.trigger('snap/angle');
                }
            } else {
                if (angle > lower && angle < upper) {
                    this.setAngle(multiple * x);
                    this.trigger('snap/angle');
                }
            }
        }
    };

    // Events and unbinding
    this.on('rotating', snap);
    this.on('removed', function() {
        this.off('rotating', snap);
    });
};


/**
 * fabric.Object.prototype.snapToDrawings
 * 
 * 
 * @todo   Look into how important it is for the reference objects to be sorted
 *         in an order that results in the smartest snapping (for example, the
 *         RectangleDrawing object being last, since if there's somethign close
 *         to the middle of the canvas, the user likely wants to snap to that
 *         and not the middle of the rectangle).
 * @access public
 * @return void
 */
fabric.Object.prototype.snapToDrawings = function() {

    /**
     * snap
     * 
     * @this   fabric.Object
     * @access private
     * @return void
     */
    var snap = function() {

        /**
         * 
         * 
         */
        this.setCoords();
        var center = this.getCenterPoint(),
            bounding = this.getBoundingRect(),
            snapped = false,
            left,
            top,
            rule,
            threshold = 6,
            ref,
            english,
            drawings = this.canvas.magnets.drawings;

        /**
         * Vertical-alignment
         * 
         */
        for (var index in drawings) {
            // snapped = false;
            ref = {
                obj: drawings[index].getCotton(),
                threshold: drawings[index].magnets.thresholds.moving.pixels,
                center: drawings[index].getCotton().getCenterPoint(),
                bounding: drawings[index].getCotton().getBoundingRect()
            };

            // Exclude any self-referencing drawings
// StencilBooter.log(drawings[index].getCotton(), this);
            if (ref.obj === this) {
// StencilBooter.log('t');
                continue;
            }

            // Ensure bounding box coordinates are in sync
            ref.obj.setCoords();

            /**
             * Center point vertical-alignment
             * 
             */

            // Object center point is in vertical-alignment with ref center point
            if (
                center.x > (ref.center.x - ref.threshold.horizontal.centerToCenter)
                && center.x < (ref.center.x + ref.threshold.horizontal.centerToCenter)
            ) {
                snapped = true;
                english = '[v]center-to-center';
                left = ref.center.x;
                rule = ref.center.x;
                break;
            }

            // // Object center point is in vertical-alignment with ref left point
            // if (
            //     center.x > (ref.bounding.left - ref.threshold.horizontal.centerToLeft)
            //     && center.x < (ref.bounding.left + ref.threshold.horizontal.centerToLeft)
            // ) {
            //     snapped = true;
            //     left = ref.bounding.left;
            //     rule = ref.bounding.left;
            //     break;
            // }

            // // Object center point is in vertical-alignment with ref right point
            // if (
            //     center.x > (ref.bounding.left + ref.bounding.width - ref.threshold.horizontal.centerToRight)
            //     && center.x < (ref.bounding.left + ref.bounding.width + ref.threshold.horizontal.centerToRight)
            // ) {
            //     snapped = true;
            //     left = ref.bounding.left + ref.bounding.width;
            //     rule = ref.bounding.left + ref.bounding.width;
            //     break;
            // }

            /**
             * Left point vertical-alignment
             * 
             */

            // // Object left point is in vertical-alignment with ref center point
            // if (
            //     bounding.left > (ref.center.x - ref.threshold.horizontal.leftToCenter)
            //     && bounding.left < (ref.center.x + ref.threshold.horizontal.leftToCenter)
            // ) {
            //     snapped = true;
            //     left = ref.center.x + bounding.width / 2;
            //     rule = ref.center.x;
            //     break;
            // }

            // Object left point is in vertical-alignment with ref left point
            if (
                bounding.left > (ref.bounding.left - ref.threshold.horizontal.leftToLeft)
                && bounding.left < (ref.bounding.left + ref.threshold.horizontal.leftToLeft)
            ) {
                english = '[v]left-to-left';
                snapped = true;
                left = ref.bounding.left + bounding.width / 2;
                rule = ref.bounding.left;
                if (String(drawings[index]) === 'RectangleDrawing') {
                    // left = Math.min()
                    rule = 1;
                }
                break;
            }

            // Object left point is in vertical-alignment with ref right point
            if (
                bounding.left > ((ref.bounding.left + ref.bounding.width) - ref.threshold.horizontal.leftToRight)
                && bounding.left < ((ref.bounding.left + ref.bounding.width) + ref.threshold.horizontal.leftToRight)
            ) {
                english = '[v]left-to-right';
                snapped = true;
                left = ref.bounding.left + ref.bounding.width + (bounding.width / 2);
                rule = ref.bounding.left + ref.bounding.width;
                break;
            }

            /**
             * Right point vertical-alignment
             * 
             */

            // // Object right point is in vertical-alignment with ref center point
            // if (
            //     (bounding.left + bounding.width) > (ref.center.x - ref.threshold.horizontal.rightToCenter)
            //     && (bounding.left + bounding.width) < (ref.center.x + ref.threshold.horizontal.rightToCenter)
            // ) {
            //     snapped = true;
            //     left = ref.center.x - bounding.width / 2;
            //     rule = ref.center.x;
            //     break;
            // }

            // Object right point is in vertical-alignment with ref left point
            if (
                (bounding.left + bounding.width) > (ref.bounding.left - ref.threshold.horizontal.rightToLeft)
                && (bounding.left + bounding.width) < (ref.bounding.left + ref.threshold.horizontal.rightToLeft)
            ) {
                english = '[v]right-to-left';
                snapped = true;
                left = ref.bounding.left - bounding.width / 2;
                rule = ref.bounding.left;
                break;
            }

            // Object right point is in vertical-alignment with ref right point
            if (
                (bounding.left + bounding.width) > ((ref.bounding.left + ref.bounding.width) - ref.threshold.horizontal.rightToRight)
                && (bounding.left + bounding.width) < ((ref.bounding.left + ref.bounding.width) + ref.threshold.horizontal.rightToRight)
            ) {
                english = '[v]right-to-right';
                snapped = true;
                left = ref.bounding.left + ref.bounding.width - (bounding.width / 2);
                rule = ref.bounding.left + ref.bounding.width;
                if (String(drawings[index]) === 'RectangleDrawing') {
                    rule = ref.obj.getWidth();
                }
                break;
            }
        }
        var fabricGuides = Canvases.Preview.getFabricGuides(),
            $htmlGuides = Canvases.Preview.getHtmlGuides(),
            start,
            end;
        if (snapped === true) {
// StencilBooter.log(String(drawings[index]));
            drawings[index].highlight();
            this.set('left', left);
            this.canvas.trigger('snap/position', {
                drawing: drawings[index],
                english: english
            });
            this.trigger('snap/position', {
                drawing: drawings[index],
                english: english
            });

            // Position rule
            start = {
                x: Math.ceil(rule) - 1,
                y: 0
            };
            end = {
                x: Math.ceil(rule) - 1,
                y: this.canvas.getHeight()
            };
            fabricGuides.vertical.set({
                'x1': start.x,
                'y1': start.y,
                'x2': end.x,
                'y2': end.y
            });
            fabricGuides.vertical.backdrop.set({
                'x1': start.x,
                'y1': start.y,
                'x2': end.x,
                'y2': end.y
            });

            // Show fabric guides
            fabricGuides.vertical.set('visible', true);
            fabricGuides.vertical.backdrop.set('visible', true);
            fabricGuides.vertical.backdrop.bringToFront();
            fabricGuides.vertical.bringToFront();

            // Show HTML guides
            // $htmlGuides.filter('.vertical').removeClass('hidden');
        }

        /**
         * Horizontal-alignment
         * 
         */
        snapped = false;
        for (index in drawings) {
            ref = {
                obj: drawings[index].getCotton(),
                threshold: drawings[index].magnets.thresholds.moving.pixels,
                center: drawings[index].getCotton().getCenterPoint(),
                bounding: drawings[index].getCotton().getBoundingRect()
            };

            // Exclude any self-referencing drawings
            if (ref.obj === this) {
                continue;
            }

            /**
             * Center point horizontal-alignment
             * 
             */

            // Object center point is in horizontal-alignment with ref center point
            if (
                center.y > (ref.center.y - ref.threshold.vertical.centerToCenter)
                && center.y < (ref.center.y + ref.threshold.vertical.centerToCenter)
            ) {
                english = '[h]center-to-center';
                snapped = true;
                top = ref.center.y;
                rule = ref.center.y;
                break;
            }

            // // Object center point is in horizontal-alignment with ref top point
            // if (
            //     center.y > (ref.bounding.top - ref.threshold.vertical.centerToTop)
            //     && center.y < (ref.bounding.top + ref.threshold.vertical.centerToTop)
            // ) {
            //     snapped = true;
            //     top = ref.bounding.top;
            //     rule = ref.bounding.top;
            //     break;
            // }

            // // Object center point is in horizontal-alignment with ref bottom point
            // if (
            //     center.y > (ref.bounding.top + ref.bounding.height - ref.threshold.vertical.centerToBottom)
            //     && center.y < (ref.bounding.top + ref.bounding.height + ref.threshold.vertical.centerToBottom)
            // ) {
            //     snapped = true;
            //     top = ref.bounding.top + ref.bounding.height;
            //     rule = ref.bounding.top + ref.bounding.height;
            //     break;
            // }

            /**
             * Left point horizontal-alignment
             * 
             */

            // // Object top point is in horizontal-alignment with ref center point
            // if (
            //     bounding.top > (ref.center.y - ref.threshold.vertical.topToCenter)
            //     && bounding.top < (ref.center.y + ref.threshold.vertical.topToCenter)
            // ) {
            //     snapped = true;
            //     top = ref.center.y + bounding.height / 2;
            //     rule = ref.center.y;
            //     break;
            // }

            // Object top point is in horizontal-alignment with ref top point
            if (
                bounding.top > (ref.bounding.top - ref.threshold.vertical.topToTop)
                && bounding.top < (ref.bounding.top + ref.threshold.vertical.topToTop)
            ) {
                english = '[h]top-to-top';
                snapped = true;
                top = ref.bounding.top + bounding.height / 2;
                rule = ref.bounding.top;
                if (String(drawings[index]) === 'RectangleDrawing') {
                    rule = 1;
                }
                break;
            }

            // Object top point is in horizontal-alignment with ref bottom point
            if (
                bounding.top > ((ref.bounding.top + ref.bounding.height) - ref.threshold.vertical.topToBottom)
                && bounding.top < ((ref.bounding.top + ref.bounding.height) + ref.threshold.vertical.topToBottom)
            ) {
                english = '[h]top-to-bottom';
                snapped = true;
                top = ref.bounding.top + ref.bounding.height + (bounding.height / 2);
                rule = ref.bounding.top + ref.bounding.height;
                break;
            }

            /**
             * Right point horizontal-alignment
             * 
             */

            // // Object bottom point is in horizontal-alignment with ref center point
            // if (
            //     (bounding.top + bounding.height) > (ref.center.y - ref.threshold.vertical.bottomToCenter)
            //     && (bounding.top + bounding.height) < (ref.center.y + ref.threshold.vertical.bottomToCenter)
            // ) {
            //     snapped = true;
            //     top = ref.center.y - bounding.height / 2;
            //     rule = ref.center.y;
            //     break;
            // }

            // Object bottom point is in horizontal-alignment with ref top point
            if (
                (bounding.top + bounding.height) > (ref.bounding.top - ref.threshold.vertical.bottomToTop)
                && (bounding.top + bounding.height) < (ref.bounding.top + ref.threshold.vertical.bottomToTop)
            ) {
                english = '[h]bottom-to-top';
                snapped = true;
                top = ref.bounding.top - bounding.height / 2;
                rule = ref.bounding.top;
                break;
            }

            // Object bottom point is in horizontal-alignment with ref bottom point
            if (
                (bounding.top + bounding.height) > ((ref.bounding.top + ref.bounding.height) - ref.threshold.vertical.bottomToBottom)
                && (bounding.top + bounding.height) < ((ref.bounding.top + ref.bounding.height) + ref.threshold.vertical.bottomToBottom)
            ) {
                english = '[h]bottom-to-bottom';
                snapped = true;
                top = ref.bounding.top + ref.bounding.height - (bounding.height / 2);
                rule = ref.bounding.top + ref.bounding.height;
                if (String(drawings[index]) === 'RectangleDrawing') {
                    rule = ref.obj.getHeight();
                }
                break;
            }
        }
        if (snapped === true) {
            drawings[index].highlight();
            this.set('top', top);
            this.canvas.trigger('snap/position', {
                drawing: drawings[index],
                english: english
            });
            this.trigger('snap/position', {
                drawing: drawings[index],
                english: english
            });

            // Position rule
            start = {
                x: 0,
                y: Math.ceil(rule) - 1
            };
            end = {
                x: this.canvas.getWidth(),
                y: Math.ceil(rule) - 1
            };
            fabricGuides.horizontal.set({
                'x1': start.x,
                'y1': start.y,
                'x2': end.x,
                'y2': end.y
            });
            fabricGuides.horizontal.backdrop.set({
                'x1': start.x,
                'y1': start.y,
                'x2': end.x,
                'y2': end.y
            });

            // Show fabric guides
            fabricGuides.horizontal.set('visible', true);
            fabricGuides.horizontal.backdrop.set('visible', true);
            fabricGuides.horizontal.backdrop.bringToFront();
            fabricGuides.horizontal.bringToFront();

            // Show HTML guides
            // StencilBooter.log($htmlGuides.filter('.horizontal'));
            // $htmlGuides.filter('.horizontal').removeClass('hidden');
        }
    };

    // Events and unbinding
    this.on('moving', snap);
    this.on('removed', function() {
        this.off('moving', snap);
    });
};


/**
 * fabric.PathGroup.prototype.setFillColor
 * 
 * Helper method for PathGroup's to ensure that transparent paths don't have
 * their color set as the fillColor. Otherwise, you get things like this:
 * https://i.imgur.com/qSDmyAI.png
 * 
 * Versus this:
 * https://i.imgur.com/6ms5Lhm.png
 * 
 * @note   fill and stroke checks below are meant to accomodate cases where a
 *         vector is using stroke instead of fill to define the color. eg:
 *         https://i.imgur.com/HFiYMC4.png
 * @see    http://stackoverflow.com/questions/15675856/fabric-js-change-color-fill-stroke-of-imported-svg
 * @todo   Circle icon doesn't have opacity applied properly:
 *         https://i.imgur.com/8PxWyUk.png
 * @access public
 * @param  String fillColor
 * @return void
 */
fabric.PathGroup.prototype.setFillColor = function(fillColor) {
    var white = function(str) {
        str = str.toLowerCase();
        str = str.trim();
        str = str.replace(/ /g, '');
        str = str.replace('#', '');
        str = str.replace('rgb(', '');
        str = str.replace('rgba(', '');
        str = str.replace(')', '');
        return str === 'fff' || str === 'ffffff' || str === '255,255,255';
    };
    for (var i = 0, l = this.paths.length, path; i < l; i++) {
        path = this.paths[i];
        if (white(path.fill) === false && path.fill !== '') {
            path.setFill(fillColor);
        }
        if (
            path.stroke !== null
            && white(path.stroke) === false
            && path.stroke !== ''
        ) {
            path.setStroke(fillColor);
        }
    }
};


/**
 * fabric.Text.prototype.addBackdrop
 * 
 * @access public
 * @param  String color
 * @param  String stretch
 * @return void
 */
fabric.Text.prototype.addBackdrop = function(color, stretch) {

    // Create
    var backdrop = this.get('backdrop');
    if (backdrop === undefined) {

        // Create drawing
        backdrop = new fabric.Rect({
            originX: 'center',
            originY: 'center',
            selectable: false,
            hasControls: false,
            hasBorders: false
        });
        backdrop.set('stretch', stretch);
        this.set('backdrop', backdrop);

        // Add to canvas / position
        this.canvas.add(backdrop);
        this.positionBackdrop();

        // Position events
        this.on({
            'changed': this.positionBackdrop,
            'moving': this.positionBackdrop,
            'rotating': this.positionBackdrop,
            'scaling': this.positionBackdrop
        });

        // Unbinding
        this.on('removed', function() {
            this.clearBackdrop();
        });
    }

    // Apply color and stretch
    backdrop.setColor(color);
    backdrop.set('stretch', stretch);
};


/**
 * fabric.Text.prototype.clearBackdrop
 * 
 * @access public
 * @return void
 */
fabric.Text.prototype.clearBackdrop = function() {
    var backdrop = this.get('backdrop');
    if (backdrop !== undefined) {
        this.set({
            padding: this.originalPadding
        });
        this.setCoords();
        this.off({
            'changed': this.positionBackdrop,
            'moving': this.positionBackdrop,
            'rotating': this.positionBackdrop,
            'scaling': this.positionBackdrop
        });
        backdrop.remove();
        this.set('backdrop', undefined);
    }
};


/**
 * fabric.Text.prototype.positionBackdrop
 * 
 * @note   When using getBoundingRect height for the backdrop, problems like
 *         this turned up when the layer was angled:
 *         https://i.imgur.com/5rWgfyd.png
 *         This was introduced in this commit:
 *         https://github.com/onassar/Stencil/commit/bbb108b4453cd05cc23d38e082eb2eb815f3bf69
 * @access public
 * @return void
 */
fabric.Text.prototype.positionBackdrop = function() {
    var backdrop = this.get('backdrop'),
        options = {
            angle: this.getAngle()
        },
        originalPadding = this.originalPadding,
        backdropPaddingFactor = this.get('backdropPaddingFactor');
        // bounding = this.getBoundingRect();
    if (backdrop.get('stretch') === 'full') {
        var additional = (this.getHeight() * backdropPaddingFactor);
        options.height = this.getHeight() + additional * 2;
        options.width = this.canvas.getDiagonalLength() * 2;
        this.set({
            padding: originalPadding + additional
        });
    } else if (backdrop.get('stretch') === 'slim') {
        var additional = Math.max(
            this.getHeight() * backdropPaddingFactor,
            this.getWidth() * backdropPaddingFactor
        ).round(4);
        this.set({
            padding: originalPadding + additional
        });
// StencilBooter.log(originalPadding, additional, originalPadding + additional);
        options.height = this.getHeight() + additional * 2;
        options.width = this.getWidth() + additional * 2;
        this.setCoords();
        // options.padding = overflow;
// StencilBooter.log(overflow);
        // options.padding = overflow;
        // options.height = this.getHeight() + padding + overflow;
        // options.width = this.getWidth() + padding + overflow;
    }
    backdrop.set(options);
    backdrop.setPositionByOrigin(
        this.getCenterPoint(),
        'center',
        'center'
    );
    this.canvas.renderAll();
};
(function(global) {

  'use strict';

  var fabric  = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend;

  /**
   * Caman filter class
   * @class fabric.Image.filters.Caman
   * @memberOf fabric.Image.filters
   * @extends fabric.Image.filters.BaseFilter
   * @see {@link http://fabricjs.com/image-filters/|ImageFilters demo}
   * @example
   * var filter = new fabric.Image.filters.Caman('vintage', {
   *   brightness: 200
   * });
   * object.filters.push(filter);
   * object.applyFilters(canvas.renderAll.bind(canvas));
   */
  fabric.Image.filters.Caman = fabric.util.createClass(fabric.Image.filters.BaseFilter, /** @lends fabric.Image.filters.Caman.prototype */ {

    /**
     * Caman filter name
     * @param {String} name
     * @default
     */
    name: null,

    /**
     * Filter type
     * @param {String} type
     * @default
     */
    type: 'Caman',

    // 
    initialize: function(name, options) {
      this.name = name;
      this.options = options || {};
    },
    applyTo: function(canvasEl, scaleX, scaleY, callback) {
      var name = this.name,
        options = this.options;
      canvasEl.setAttribute('data-caman-hidpi-disabled', 1);
      Caman(canvasEl, function () {
          this[name].apply(this, options.args || [])
          this.render(callback);
      });
    },
    toObject: function() {
      return {
        type: this.type,
        name: this.name,
        options: this.options
      };
    }
  });

  /**
   * Returns filter instance from an object representation
   * @static
   * @param {Object} object Object to create an instance from
   * @return {fabric.Image.filters.Caman} Instance of fabric.Image.filters.Caman
   */
  fabric.Image.filters.Caman.fromObject = function(object) {
    return new fabric.Image.filters.Caman(object);
  };

})(typeof exports !== 'undefined' ? exports : this);
(function(global) {

  'use strict';

  var fabric  = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend;

  /**
   * Fade filter class
   * @class fabric.Image.filters.Fade
   * @memberOf fabric.Image.filters
   * @extends fabric.Image.filters.BaseFilter
   * @see {@link fabric.Image.filters.Fade#initialize} for constructor definition
   * @example <caption>Fade filter with opacity</caption>
   * var filter = new fabric.Image.filters.Fade({
   *   opacity: 0.5
   * });
   * object.filters.push(filter);
   * object.applyFilters(canvas.renderAll.bind(canvas));
   */
  fabric.Image.filters.Fade = fabric.util.createClass(fabric.Image.filters.BaseFilter, /** @lends fabric.Image.filters.Fade.prototype */ {

    /**
     * Filter type
     * @param {String} type
     * @default
     */
    type: 'Fade',

    /**
     * Constructor
     * @memberOf fabric.Image.filters.Fade.prototype
     * @param {Object} [options] Options object
     * @param {Number} [options.opacity] Opacity value that controls the tint effect's transparency (0..1)
     */
    initialize: function(options) {
      options = options || { };
      this.opacity = options.opacity.toFloat();
    },

    /**
     * Applies filter to canvas element
     * @param {Object} canvasEl Canvas element to apply filter to
     */
    applyTo: function(canvasEl) {
      var context = canvasEl.getContext('2d'),
          imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
          data = imageData.data,
          iLen = data.length, i;

      for (i = 0; i < iLen; i+=4) {
        data[i + 3] = data[i + 3] * this.opacity;
      }

      context.putImageData(imageData, 0, 0);
    },

    /**
     * Returns object representation of an instance
     * @return {Object} Object representation of an instance
     */
    toObject: function() {
      return extend(this.callSuper('toObject'), {
        opacity: this.opacity
      });
    }
  });

  /**
   * Returns filter instance from an object representation
   * @static
   * @param {Object} object Object to create an instance from
   * @return {fabric.Image.filters.Fade} Instance of fabric.Image.filters.Fade
   */
  fabric.Image.filters.Fade.fromObject = function(object) {
    return new fabric.Image.filters.Fade(object);
  };

})(typeof exports !== 'undefined' ? exports : this);
/**
 * Extend existing filters to use a callback
 * 
 */
(function() {
    var filter,
        filters = [
            'Brightness',
            'Convolute',
            'Fade',
            'GradientTransparency',
            'Grayscale',
            'Invert',
            'Mask',
            'Noise',
            'Pixelate',
            'RemoveWhite',
            'Sepia',
            'Sepia2',
            'Tint',
            'Multiply',
            'Blend',
            'Resize'
        ],
        index,
        tmp;
    for (index in filters) {
        filter = filters[index];
        tmp = fabric.Image.filters[filter].prototype.applyTo;
        (function(filter, tmp) {
            fabric.Image.filters[filter].prototype.applyTo = function() {
                var args = Array.prototype.slice.call(arguments),
                    callback = false;
                if (typeof args[args.length - 1] === 'function') {
                    callback = args.pop();
                }
                tmp.apply(this, args);
                callback && callback();
            };
            fabric.Image.filters[filter].prototype.get = function(key) {
              return this._dataStore[key];
            };
            fabric.Image.filters[filter].prototype.set = function(key, value) {
              this._dataStore = this._dataStore || {};
              this._dataStore[key] = value;
            };
        })(filter, tmp);
    }
})();

/**
 * Helpers
 * 
 */
fabric.Image.filters.Caman.prototype.get = function(key) {
  return this._dataStore[key];
};
fabric.Image.filters.Caman.prototype.set = function(key, value) {
  this._dataStore = this._dataStore || {};
  this._dataStore[key] = value;
};


/**
 * @see http://demo.tutorialzine.com/2013/02/instagram-filter-app/
 * @see https://gist.github.com/pierrickouw/2ab679159beee9d80ca6
 * @see http://www.studyjs.com/fabricjs/fabricjs.html
 * @see http://fabricjs.com/image-filters
 * @see http://fabricjs.com/docs/fabric.Image.filters.Tint.html
 */
fabric.Image.prototype.applyFilters = function(callbackInitial, filters, imgElement, forResizing) {

    filters = filters || this.filters;
    imgElement = imgElement || this._originalElement;

    if (!imgElement) {
      return;
    }

    var imgEl = imgElement,
        canvasEl = fabric.util.createCanvasElement(),
        replacement = fabric.util.createImage(),
        _this = this;

    canvasEl.width = imgEl.width;
    canvasEl.height = imgEl.height;
    canvasEl.getContext('2d').drawImage(imgEl, 0, 0, imgEl.width, imgEl.height);

    if (filters.length === 0) {
      this._element = imgElement;
      callbackInitial && callbackInitial();
      this.trigger('applyFilters/complete');
      return canvasEl;
    }
    this.trigger('applyFilters/start');
    var callback = function() {
      replacement.width = canvasEl.width;
      replacement.height = canvasEl.height;
      replacement.onload = function() {
        _this._element = replacement;
        !forResizing && (_this._filteredEl = replacement);
        // StencilBooter.log('firing applyFilters/complete');
        callbackInitial && callbackInitial();
        _this.trigger('applyFilters/complete');
        replacement.onload = canvasEl = imgEl = null;
      };
      replacement.src = canvasEl.toDataURL('image/png');
      // return canvasEl;
    };
    var applyFiltersRecursively = function(filters, index, callback) {
      if (filters[index] === undefined) {
        callback();
      } else {
        var filter = filters[index];
        filter.applyTo(
          canvasEl,
          filter.scaleX || _this.scaleX,
          filter.scaleY || _this.scaleY,
          function() {
            if (!forResizing && filter && filter.type === 'Resize') {
              _this.width *= filter.scaleX;
              _this.height *= filter.scaleY;
            }
            applyFiltersRecursively(filters, index + 1, callback);
          }
        );
      }
    };
    applyFiltersRecursively(filters, 0, callback);
    return canvasEl;
};

/**
 * 
 * fabric.Object.drawBorders
 * 
 * Extended to allow contrasting colors to be defined for the border controls,
 * as well as the rotating-control-connector line.
 * 
 * @access private
 * @return void
 */
fabric.util.object.extend(fabric.Object.prototype, {

  /**
   * Draws borders of an object's bounding box.
   * Requires public properties: width, height
   * Requires public options: padding, borderColor
   * @param {CanvasRenderingContext2D} ctx Context to draw on
   * @return {fabric.Object} thisArg
   * @chainable
   */
  drawBorders: function(ctx) {
    if (!this.hasBorders) {
      return this;
    }

    ctx.save();

    ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
    ctx.strokeStyle = this.stencilBorderColor1;

    ctx.lineWidth = 1 / this.borderScaleFactor;

    var wh = this._calculateCurrentDimensions(),
        width = wh.x,
        height = wh.y;
    if (this.group) {
      width = width * this.group.scaleX;
      height = height * this.group.scaleY;
    }

    ctx.strokeRect(
      ~~(-(width / 2)) - 0.5, // offset needed to make lines look sharper
      ~~(-(height / 2)) - 0.5,
      ~~(width) + 1, // double offset needed to make lines look sharper
      ~~(height) + 1
    );

    ctx.strokeStyle = this.stencilBorderColor2;
    // ctx.setLineDash([1,3]);
    ctx.setLineDash([3,3]);

    ctx.strokeRect(
      ~~(-(width / 2)) - 0.5, // offset needed to make lines look sharper
      ~~(-(height / 2)) - 0.5,
      ~~(width) + 1, // double offset needed to make lines look sharper
      ~~(height) + 1
    );


    if (this.hasRotatingPoint && this.isControlVisible('mtr') && !this.get('lockRotation') && this.hasControls) {

      var rotateHeight = -height / 2;

      ctx.lineWidth = 1;

      ctx.strokeStyle = this.stencilRotatingPointColor1;
      ctx.setLineDash([1]);
      ctx.beginPath();
      ctx.moveTo(0, rotateHeight);
      ctx.lineTo(0, rotateHeight - this.rotatingPointOffset);
      ctx.closePath();
      ctx.stroke();

      
      ctx.strokeStyle = this.stencilRotatingPointColor2;
      // ctx.setLineDash([1,2]);
      ctx.setLineDash([1,3]);
      ctx.beginPath();
      ctx.moveTo(0, rotateHeight);
      ctx.lineTo(0, rotateHeight - this.rotatingPointOffset);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
    return this;
  }
});


/**
 * 
 * fabric.Object._drawControl
 * 
 * Extended to allow for a fill style and stroke to be set on controls, and
 * those controls to be circles instead of rectangles.
 * 
 * @todo!  See note below. This may cause issues down the line
 * @note   I removed the clearRect function. This was likely very important, but
 *         I couldn't figure out how to use it with arcs.
 * @note   Defined within a closure to ensure definition of <isVML> cannot
 *         conflict with any native fabric logic / variable scope.
 * @access private
 * @return void
 */
(function() {
  var isVML = function() { return typeof G_vmlCanvasManager !== 'undefined'; };
  fabric.util.object.extend(fabric.Object.prototype, {

    /**
     * @private
     */
    _drawControl: function(control, ctx, methodName, left, top) {
      if (!this.isControlVisible(control)) {
        return;
      }
      var size = this.cornerSize,
        radius = size / 2;
      ctx.fillStyle = this.stencilCornerFillColor;
      ctx.strokeStyle = this.stencilCornerStrokeColor;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(left + radius, top + radius, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  });
})();


/**
 * 
 * fabric.Textbox.prototype._renderText
 * 
 * Extended to reverse order of stroke and filling, to allow for more pleasing
 * stroke.
 * 
 * @see    http://stackoverflow.com/questions/26639132/canvas-fabricjs-separate-stroke-from-text-edge
 * @access private
 * @return void
 */
fabric.Text.prototype._renderText = function(ctx) {
  this._translateForTextAlign(ctx);
  // this._renderTextFill(ctx);
  this._renderTextFill(ctx);
  this._renderTextStroke(ctx);
  this._renderTextFill(ctx);
  this._translateForTextAlign(ctx, true);
};


/**
 * 
 * fabric.Textbox.prototype._setShadow
 * 
 * I overwrote this method because during export, the shadow wasn't being set
 * properly. So I had to hardcode some pretty ugly logic below that checks the
 * window for an export that's going on, if it is, multiplies the properties
 * by a multiplier to get the desired effect.
 * 
 * @access private
 * @return void
 */
fabric.Text.prototype._setShadow = function(ctx) {
    if (!this.shadow) {
      return;
    }

    // 
    var offsetX = this.shadow.offsetX,
      offsetY = this.shadow.offsetY,
      blur = this.shadow.blur;
    if (window.exportingMultiplier !== undefined) {
      offsetX *= window.exportingMultiplier;
      offsetY *= window.exportingMultiplier;
      blur *= window.exportingMultiplier;
    }


    var multX = (this.canvas && this.canvas.viewportTransform[0]) || 1,
        multY = (this.canvas && this.canvas.viewportTransform[3]) || 1;

    ctx.shadowColor = this.shadow.color;
    ctx.shadowBlur = blur * (multX + multY) * (this.scaleX + this.scaleY) / 4;
    ctx.shadowOffsetX = offsetX * multX * this.scaleX;
    ctx.shadowOffsetY = offsetY * multY * this.scaleY;
};


/**
 * fabric.Rect.fromElement
 * 
 * Extended to deal with bug fix. I had to insert the fabric.util.object.extend
 * line since in the library, the reference is to a local function <extend>
 * which I don't have access to here.
 * 
 * @see    http://stackoverflow.com/questions/35119357/cant-load-a-vector-into-fabricjs?noredirect=1#comment58150548_35119357
 * @see    https://jsfiddle.net/fhgj39rs/1/
 * @see    https://github.com/kangax/fabric.js/pull/2771
 * @access public
 * @return fabric.Rect
 */
fabric.Rect.fromElement = function(element, options) {
  if (!element) {
    return null;
  }
  options = options || { };

  var parsedAttributes = fabric.parseAttributes(element, fabric.Rect.ATTRIBUTE_NAMES);

  parsedAttributes.left = parsedAttributes.left || 0;
  parsedAttributes.top  = parsedAttributes.top  || 0;
  // var rect = new fabric.Rect(extend((options ? fabric.util.object.clone(options) : { }), parsedAttributes));
  var rect = new fabric.Rect(fabric.util.object.extend((options ? fabric.util.object.clone(options) : { }), parsedAttributes));

  // rect.visible = rect.width > 0 && rect.height > 0;
  rect.visible = rect.visible && rect.width > 0 && rect.height > 0;
  return rect;
};


/**
 * Change strokeWidth to 0 across the board; was causing issues with width
 * calculations.
 * 
 * @see https://github.com/kangax/fabric.js/issues/2570
 * @see https://github.com/kangax/fabric.js/issues/2535
 * @see https://github.com/kangax/fabric.js/issues/2619
 */
fabric.Object.prototype.strokeWidth = 0;


/**
 * Overwriting this method to ensure that on tablets, the textarea is positioned
 * in the visible area, taking into account the keyboard height.
 */
fabric.IText.prototype.initHiddenTextarea = function() {
    var y = this.getCenterPoint().y,
        height = $(this.canvas.lowerCanvasEl).css('height').toInt(),
        bottom = (
            $(window).height() - $(this.canvas.lowerCanvasEl).offset().top - height
        ) + (height - y);
    this.hiddenTextarea = fabric.document.createElement('textarea');

    this.hiddenTextarea.setAttribute('autocapitalize', 'off');
    // this.hiddenTextarea.style.cssText = 'position: fixed; bottom: 20px; left: 0px; opacity: 0;'
    //                                     + ' width: 0px; height: 0px; z-index: -999;';
    this.hiddenTextarea.style.cssText = 'position: fixed; bottom: ' + (bottom) + 'px; left: 0px; opacity: 0;'
                                        + ' width: 0px; height: 0px; z-index: -999; padding: 0; margin: 0;';
    fabric.document.body.appendChild(this.hiddenTextarea);

    fabric.util.addListener(this.hiddenTextarea, 'keydown', this.onKeyDown.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'input', this.onInput.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'copy', this.copy.bind(this));
    fabric.util.addListener(this.hiddenTextarea, 'paste', this.paste.bind(this));

    if (!this._clickHandlerInitialized && this.canvas) {
      fabric.util.addListener(this.canvas.upperCanvasEl, 'click', this.onClick.bind(this));
      this._clickHandlerInitialized = true;
    }
};


// /**
//  * 
//  */
// fabric.Textbox.prototype._wrapLine = function(ctx, text, lineIndex) {
//   var lineWidth        = 0,
//       lines            = [],
//       line             = '',
//       words            = text.split(' '),
//       word             = '',
//       offset           = 0,
//       infix            = ' ',
//       wordWidth        = 0,
//       infixWidth       = 0,
//       largestWordWidth = 0;

//   for (var i = 0; i < words.length; i++) {
//     word = words[i];
//     wordWidth = this._measureText(ctx, word, lineIndex, offset);
//     offset += word.length;

//     lineWidth += infixWidth + wordWidth;

//     if (lineWidth >= this.width && line !== '') {
//       lines.push(line);
//       line = '';
//       lineWidth = wordWidth;
//     }

//     if (line !== '' || i === 1) {
//     if (line !== '') {
//       line += infix;
//     }
//     line += word;

//               // //
//               // if(word == '' && text.charAt(0) == ' ') {
//               //   lines.push(line);
//               //   line = '';
//               // }

//               // // Back to original check
//               // if (line !== '') {
//               //   line += infix;
//               // }
//               // line += word;
//               // //

//     infixWidth = this._measureText(ctx, infix, lineIndex, offset);
//     offset++;

//     // keep track of largest word
//     if (wordWidth > largestWordWidth) {
//       largestWordWidth = wordWidth;
//     }
//   }

//   i && lines.push(line);

//   if (largestWordWidth > this.dynamicMinWidth) {
//     this.dynamicMinWidth = largestWordWidth;
//   }

//   for (var index in lines) {
//     // lines[index] = lines[index].replace(/^ /, '');
//   }
//   return lines;
// };

// http://codereview.stackexchange.com/questions/16081/splitting-text-into-lines-from-a-max-width-value-for-canvas
// fabric.Textbox.prototype._wrapLine = function(ctx, text, lineIndex) {
//     var words = text.split(' '),
//         lines = [],
//         line = '';
//     if (this._measureText(ctx, text, lineIndex) < this.width) {
//         return [text];
//     }
//     while (words.length > 0) {
//         while (this._measureText(ctx, words[0], lineIndex) >= this.width) {
//             var tmp = words[0];
//             words[0] = tmp.slice(0, -1);
//             if (words.length > 1) {
//                 words[1] = tmp.slice(-1) + words[1];
//             } else {
//                 words.push(tmp.slice(-1));
//             }
//         }
//         if (this._measureText(ctx, line + words[0], lineIndex) < this.width) {
//             line += words.shift() + ' ';
//         } else {
//             lines.push(line);
//             line = '';
//         }
//         if (words.length === 0) {
//             lines.push(line);
//         }
//     }
//     return lines;
// };

// http://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element

/**
 * 
 * Initial largestWordWidth is set because if the text has only one word on the
 * line, then the loop will not be entered into, which would result in no
 * largestWordWidth value, and bugging out since the dynamicMinWidth would be
 * unset / zero.
 */
fabric.Textbox.prototype._wrapLine = function(ctx, text, lineIndex) {
    var words = text.split(' '),
      lines = [],
      currentLine = words[0],
      // largestWordWidth = 0;
      largestWordWidth = this._measureText(ctx, words[0], 0);

    for (var i = 1, word, width; i < words.length; i++) {
        word = words[i];
        ww = this._measureText(ctx, word, lineIndex);
        width = this._measureText(ctx, currentLine + ' ' + word, lineIndex);
        if (width < this.width) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
        if (ww > largestWordWidth) {
          largestWordWidth = ww;
        }
    }
    lines.push(currentLine);
    if (words.length === 1) {
      this.dynamicMinWidth = this._measureText(ctx, currentLine, lineIndex);
    } else {
      if (largestWordWidth > this.dynamicMinWidth) {
        this.dynamicMinWidth = largestWordWidth;
      }
    }
    return lines;
};


/**
 * renderCursor
 * 
 * Overwrites the fabric native method to add a second rectangle directly to the
 * right of the cursor that is white, to ensure it's always visible.
 */
fabric.Textbox.prototype.renderCursor = function(boundaries, ctx) {
  var cursorLocation = this.get2DCursorLocation(),
    lineIndex = cursorLocation.lineIndex,
    charIndex = cursorLocation.charIndex,
    charHeight = this.getCurrentCharFontSize(lineIndex, charIndex),
    leftOffset = (lineIndex === 0 && charIndex === 0)
      ? this._getLineLeftOffset(this._getLineWidth(ctx, lineIndex))
      : boundaries.leftOffset;
  ctx.fillStyle = this.getCurrentCharColor(lineIndex, charIndex);
  ctx.globalAlpha = this.__isMousedown ? 1 : this._currentCursorOpacity;
  ctx.fillRect(
    boundaries.left + leftOffset,
    boundaries.top + boundaries.topOffset,
    this.cursorWidth / this.scaleX,
    charHeight
  );
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.globalAlpha = this.__isMousedown ? 1 : this._currentCursorOpacity;
  ctx.fillRect(
    boundaries.left + leftOffset + 1,
    boundaries.top + boundaries.topOffset,
    this.cursorWidth / this.scaleX,
    charHeight
  );
};

// fabric.Text.prototype._renderTextFill = function(ctx) {
//       if (!this.fill && !this._skipFillStrokeCheck) {
//         return;
//       }

//       var lineHeights = 0;

//       for (var i = 0, len = this._textLines.length; i < len; i++) {
//         var heightOfLine = this._getHeightOfLine(ctx, i),
//             maxHeight = heightOfLine / this.lineHeight;

//         this._renderTextLine(
//           'fillText',
//           ctx,
//           this._textLines[i],
//           this._getLeftOffset(),
//           this._getTopOffset() + lineHeights + maxHeight,
//           i
//         );
//         lineHeights += heightOfLine;
//       }
//   };

// @see https://github.com/kangax/fabric.js/issues/2343
// @see https://github.com/kangax/fabric.js/issues/2059
// @see https://github.com/kangax/fabric.js/issues/1814
// @see http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
// @see https://github.com/kangax/fabric.js/issues/291
// @see https://github.com/kangax/fabric.js/issues/2637
// fabric.Textbox.prototype._getHeightOfLine = function(ctx, lineIndex) {
//       if (this.__lineHeights[lineIndex]) {
//         return this.__lineHeights[lineIndex];
//       }

//       var line = this._textLines[lineIndex],
//           maxHeight = this._getHeightOfChar(ctx, lineIndex, 0);

//       for (var i = 1, len = line.length; i < len; i++) {
//         var currentCharHeight = this._getHeightOfChar(ctx, lineIndex, i);
//         if (currentCharHeight > maxHeight) {
//           maxHeight = currentCharHeight;
//         }
//       }
//       this.__lineHeights[lineIndex] = maxHeight * this.lineHeight * this._fontSizeMult;
//       if (lineIndex === 0) {
//         this.__lineHeights[lineIndex] = this.__lineHeights[lineIndex] / 2 +maxHeight / 2;
//       } else if (lineIndex === this._textLines.length - 1) {
//         this.__lineHeights[lineIndex] = this.__lineHeights[lineIndex] / 2 +maxHeight / 2;
//       }
//       return this.__lineHeights[lineIndex];
// };

fabric.StaticCanvas.prototype._initRetinaScaling = function() {
    if (fabric.devicePixelRatio === 1 || !this.enableRetinaScaling) {
      return;
    }

    this.lowerCanvasEl.setAttribute('width', (this.width * fabric.devicePixelRatio).round(0));
    this.lowerCanvasEl.setAttribute('height', (this.height * fabric.devicePixelRatio).round(0));

    this.contextContainer.scale(fabric.devicePixelRatio, fabric.devicePixelRatio);
};

/**
 * requires
 * 
 * @access public
 * @param  String|Array dependencies
 * @access Function callback
 * @return Function
 */
window.StencilBooter.requires = function(dependencies, callback) {
    if (typeof dependencies === 'string') {
        dependencies = [dependencies];
    }

    /**
     * loader
     * 
     * @access private
     * @return void
     */
    var loader = function() {
        var passed = true;
        for (var x = 0, l = dependencies.length; x < l; ++x) {
            if (window[dependencies[x]] === undefined) {
                passed = false;
                break;
            }
        }
        if (passed === false) {
            StencilBooter.queue.push(loader);
        } else {
            callback();
        }
    };
    return loader;
};
