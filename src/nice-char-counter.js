// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

    "use strict";

        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be changed by someone else). undefined isn"t really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.

        // window and document are passed through as local variable rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).

        // Create the defaults once
        var pluginName = "niceCharCounter",
            defaults = {
                limit: 100,
                warningPercent: 70,
                successColor: "#29b664",
                warningColor: "#c0392b",
                overColor: "#e74c3c",
                counter: "#counter",
                hardLimit: false,
                text: "{{remainder}}"
            };

        // The actual plugin constructor
        function Plugin ( element, options ) {
            this.element = element;
            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don"t want to alter the default options for
            // future instances of the plugin
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            
            this.init();

            var _this = this;

            $(this.element).keyup(function(){
                var $this= $(this);
                var total = $this.val().length;
                _this.doAction(total);
            });
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {
            tey: function(){
                console.log("tey");
            },
            init: function () {

                if (this.settings.hardLimit) {
                    $(this.element).attr("maxlength", this.settings.limit);
                }

                var text = this.settings.text.replace("{{remainder}}", "<span class=\"charsValue\">" + this.settings.limit + "</span>");

                if ($(this.settings.counter).length < 1) {
                    console.error("You have to set the counter");
                    return false;
                }

                $(this.settings.counter).html(text);

                $(this.settings.counter).children("span.charsValue").css("color", this.settings.successColor);

                this.doAction($(this.element).val().length);
            },
            doAction: function (total) {
                var $span = $(this.settings.counter).children("span.charsValue");
                var residual = this.settings.limit - total;
                var warning = Math.round((this.settings.limit * this.settings.warningPercent) / 100);
                  
                if (residual <= warning && residual >= 0) {
                    $span.css("color", this.settings.warningColor);
                } else if (residual < 0) {
                    $span.css("color", this.settings.overColor);
                } else {
                    $span.css("color", this.settings.successColor);
                }
                $span.html(residual);
            }
        });

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function ( options ) {
                return this.each(function() {
                        if ( !$.data( this, "plugin_" + pluginName ) ) {
                                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                        }
                });
        };

})( jQuery, window, document );