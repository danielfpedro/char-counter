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
                descending: true,
                warningPercent: 70,
                successColor: "#29b664",
                warningColor: "#c0392b",
                overColor: "#e74c3c",
                counter: "#counter",
                hardLimit: false,
                text: "{{remainder}}",
                onType: function(){
                    console.log("On Type");
                },
                clearLimitTrigger: function(){
                    console.log("Clear Limit Trigger");
                },
                onClearLimit: function(){
                    console.log("On Clear Limit");
                },
                warningTrigger: function(){
                    console.log("Warning Trigger");
                },
                onWarning: function(){
                    console.log("On Warning");
                },
                overTrigger: function(){
                    console.log("Over Trigger");
                },
                onOver: function(){
                    console.log("On Over");
                }
            };

        // The actual plugin constructor
        function Plugin (element, options) {
            this.element = element;
            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don"t want to alter the default options for
            // future instances of the plugin
            this.settings = $.extend( {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;

            this.currentState = "";

            var warningFactor = Math.round((this.settings.limit * this.settings.warningPercent) / 100);
            this.warningFactor = this.settings.limit - warningFactor;
            
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
                var remaining = this.settings.limit - total;

                var remainingPercent = Math.round((total * 100) / this.settings.limit);
                remainingPercent = (remainingPercent < 100) ? remainingPercent : 100;

                var ui = {tota: total, remaining: remaining, remainingPercent: remainingPercent};
                  
                if (this.settings.warningPercent > 0 && remaining <= this.warningFactor && remaining >= 0) {
                    $span.css("color", this.settings.warningColor); // quase
                    this.settings.onWarning(ui);
                    
                    this.setStateAndTrigger("warning", ui);

                } else if (remaining < 0) {
                    $span.css("color", this.settings.overColor); // estourou
                    this.settings.onOver(ui);
                    
                    this.setStateAndTrigger("over", ui);

                } else{
                    $span.css("color", this.settings.successColor); // acima do warning
                    this.settings.onClearLimit(ui);
                    
                    this.setStateAndTrigger("clearLimit", ui);

                }

                this.settings.onType(ui, this.currentState, this.settings);

                if (this.settings.descending) {
                    $span.html(remaining);
                } else {
                    $span.html(total);
                }
                
            },
            setStateAndTrigger: function (state, ui){
                if (state !== this.currentState) {
                    this.settings[state + "Trigger"](ui, this.setting);
                }
                this.currentState = state;
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