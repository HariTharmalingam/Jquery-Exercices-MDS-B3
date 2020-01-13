'use strict';

(function ($) {
  $.fn.searchEngine = function (options) {
    this.settings = $.extend({
      'el': $(this) || [],
      form: [],
      pokemons: [],

    },options);

    var el = this.settings.el;
    var priv = {};
    var pokemons = this.settings.pokemons;
    var inputCss = this.settings.inputCss;
    var buttonCss = this.settings.buttonCss;

    // Public Methods - External methods
    Object.assign(this, {
      /**
       * Generate Slider
       */
      'formGenerator': function () {
        var formGenerator= $('<form id="search" action="#" method="post"></form>');

        formGenerator.append(priv.searchInput());
        formGenerator.append(priv.button());
        el.append(formGenerator);

        $.each(searchEngine.pokemons, function () {
          el.append()

        });

        $('.pokemon').hide();

        $('#search').submit(function (event) {
          event.preventDefault();
          var term = $('#term').val().toLowerCase();
          $('#term').val("");
          $('.pokemon').hide();
          $('.product[data-terms~="'+term+'"]').show();
        });
      },
    });

    // Private Methods - Internal methods
    Object.assign(priv, {
      /**
       * Create search input
       */
      'searchInput': function () {
          return $('<input/>', {
            placeholder: 'Ex: Bulbizarre or Fire',
            type: 'text',
            name: 'term',
            id: 'term'
        }).css(inputCss)
      },
      /**
       * Create pokemon div
       */
      'pokemonWrapper': function () {
        return $('<div><div/>',{
          class: 'pokemon',
        })
      },
      /**
       * Create search input
       */
      'button': function () {
        return $('<button/>', {
          text: 'Rechercher',
          type: 'submit'
        }).css(buttonCss)
      },

      /**
       * Initialize the plugin
       */
      'init': function () {
        this.formGenerator();
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();

    return this;
  }
}(jQuery));