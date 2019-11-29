'use strict';

(function ($) {
    $.fn.myForm = function (options) {
        this.settings = $.extend({
            'el': $(this) || [],
            form: [],
            css: {
                margin: 10,
                padding: 10,
                fontSize: 15,
                borderRadius: 5,
                border: '1px solid'
            },
            buttonCss: {
                margin: 10,
                border: 'none',
                padding: 10,
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: 16
            },
            errorCss: {
                margin: 10,
                padding: 10,
                fontSize: 15,
                color: '#ff0000',
            },
        }, options);

        var el = this.settings.el;
        var css = this.settings.css;
        var buttonCss = this.settings.buttonCss;
        var errorCss =  this.settings.errorCss;
        var priv = {};

        // Public Methods - External methods
        Object.assign(this, {
            /**
             * Get Data
             */
            'Data': function (callback) {
                $(el).children('form').children('button').on('click', function (e) {
                    e.preventDefault();

                    callback(el.children('form').serializeArray());

                });
            }
        });

        // Private Methods - Internal methods
        Object.assign(priv, {
            /**
             * Create Form
             */
            'formGenerator': function (form) {
                var formContainer= $('<form></form>');

                form.forEach(function (input) {

                    if (input.type === 'input') {
                        formContainer.append(priv.inputWrap(priv.input(input)));
                    }
                });

                formContainer.append(priv.button());
                el.append(formContainer);
            },
            /**
             * Create input wrap
             */
            'inputWrap': function (input) {
                return $('<div></div>')
                    .append(input, priv.error(input.data('options').error));
            },
            /**
             * Create input
             */
            'input': function (input) {
                return $('<input/>', {
                    class: 'input',
                    name : input.name,
                    value: input.value || '',
                    data: {...input},
                    placeholder: input.options.placeholder || '',
                    'keypress' : function () {
                        var value = $(this).val();
                        var regex = RegExp(input.options.validRegex, 'gi');

                        if (!regex.test(value)) {
                            $(this).parent().children('p').show();
                        } else {
                            $(this).parent().children('p').hide();
                        }
                    }
                }).css(css);
            },
            /**
             * Create error
             */
            'error': function (messageError) {
                return $('<p></p>', {
                    class: 'msg-error'
                }).css(errorCss).text(messageError).hide();
            },
            /**
             * Create button
             */
            'button': function () {
                return $('<button/>', {
                    text: 'Submit'
                }).css(buttonCss)
            },
            /**
             * Initialize the plugin
             */
            'init': function () {
                priv.formGenerator(this.settings.form);
            }.bind(this)
        });

        // Initialise the plugin
        priv.init();

        return this;
    };
}(jQuery));