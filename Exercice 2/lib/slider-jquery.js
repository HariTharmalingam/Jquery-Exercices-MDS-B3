'use strict';

(function ($) {
    $.fn.mySlider = function (options) {
        this.settings = $.extend({
            'el': $(this) || [],
            slider: [],
            sliderCss: {
                width: 720,
                height: 420,
                overflow:'hidden',
                position: 'relative',
                border: '10px solid #000',
                margin: 'auto',
            },
            imageContainerCss : {
                position: 'absolute',
                width: 4200,
                height: 400,
                top: 0,
                left: 0,
            },
            imageCss : {
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding: 15,
            },
            previousButtonCss : {
                display: 'inline-block',
                width: 64,
                height: 64,
                position: 'absolute',
                top: '50%',
                marginTop: -32,
                background: 'url(../img/left.png)',
                left: 0,
            },
            nextButtonCss : {
                display: 'inline-block',
                width: 64,
                height: 64,
                position: 'absolute',
                top: '50%',
                marginTop: -32,
                background: 'url(../img/next.png)',
                right: 0,
            },
        },options);

        function slide(){

            var total = sliderImage.length;  //6;
            var size = 700;
            var n = 1;

            //on incremente le numero actuel
            n++;

            //si on a depasse le nombre total, on retourne sur la premiere
            if(n > total)
                n = 1;

            //on calcule la nouvelle position correspondante
            var pLeft = -(n-1)*size;

            //on anime la div vers cette nouvelle position
            $('div').animate({'left' : pLeft+'px'}, time/4)

        }//fin fonction

        var el = this.settings.el;
        var sliderCss = this.settings.sliderCss;
        var imageContainerCss = this.settings.imageContainerCss;
        var imageCss = this.settings.imageCss;
        var nextButtonCss = this.settings.nextButtonCss;
        var previousButtonCss = this.settings.previousButtonCss;
        var priv = {};

        // Public Methods - External methods
        Object.assign(this, {

        });

        // Private Methods - Internal methods
        Object.assign(priv, {
            /**
             * Generate Slider
             */
            'sliderGenerator': function () {
                var slider = $('<article></article>').css(sliderCss);

                slider.append(priv.imageContainer());
                el.append(slider);

            },
            /**
             * Image Container
             */
            'imageContainer': function (sliderImage) {
                var imageContainer =  $('<div></div>').css(imageContainerCss);

                sliderImage.forEach(function (sliderImage) {

                    imageContainer.append(priv.image(sliderImage));

                });
            },
            /**
             * Create image
             */
            'image': function (sliderImage) {
                return $('<img/>', {
                    data: {...sliderImage},
                    href: sliderImage.options.url,
                }).css(imageCss);
            },
            /**
             * Create previous button
             */
            'previousButton': function () {
                return $('<a></a>', {
                'click': function () {
                    slide(-1);
                }
                }).css(previousButtonCss);
            },
            /**
             * Create next button
             */
            'nextButton': function () {
                return $('<a></a>', {
                    'click': function () {
                        slide(1);
                    }
                }).css(nextButtonCss);
            },
            /**
             * Initialize the plugin
             */
            'init': function () {
                priv.sliderGenerator(this.settings.slider);
            }.bind(this)
        });

        // Initialise the plugin
        priv.init();

        return this;
    }
}(jQuery));