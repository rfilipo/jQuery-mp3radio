// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";
        console.log("Begin mp3Radio ... ");
		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "mp3Radio",
			defaults = {
                            media:[{
				    title:"Inutil Paisagem - Tom Jobim",
				    description:"Ricardo Filipo plays guitar",
				    url:"media/inutil_paisagem.mp3"
                            }],
			    skin: "oldradio"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {
				this.showMessage( "Loading ..." );
				this.settings.actualMedia = 0;
                                this.loadSkin(this.settings.skin);
                                var me = this;
                                this.createPlayer(this.settings.media, 
                                    function(){
                                        me.animateTitle(5000 , "Play Mantovani selections.");
                                    });
			},
                        animateTitle: function( time, message ){
                            var title = this.$panel.html();
                            var text  = "-------------------------------------------";
                            if (time) {text = message} else time = 200;
                            this.$panel.html(text);
                            var me = this;
                            setTimeout(function(){
                                 me.$panel.html(title);
                            }, time);
                        },
			showMessage: function( text ) {
				$( this.element ).text( text );
			},
			showIcon: function( ) {
                                var me = this;
				this.$icon = $("<div id='radio-icon'/>").appendTo($(this.element).parent());
                                this.$icon.on("click", function(){
                                    $(me.element).slideToggle();
                                    $(me.$icon).slideToggle();
                                });
			},
			loadSkin: function( skin ) {
				console.log("Loading skin: ", skin);
                                $(this.element).html("");
                                $('<link>')
				  .appendTo('head')
				  .attr({type : 'text/css', rel : 'stylesheet'})
				  .attr('href', '/skins/'+skin+'/skin.css');
			},
			changeMedia: function( value ) {
				this.settings.actualMedia = Math.abs(value) < this.media.length ? Math.abs(value) : this.media.length - 1;
                                this.$display.html(this.settings.actualMedia);
                                this.myMedia = this.media[this.settings.actualMedia];
                                this.$panel.html(this.myMedia.title)
                                this.animateTitle();
			},
			createPlayer: function( media, cb ) {
				console.log("Loading media: ", media);
                                this.media = media;
                                this.myMedia = media[this.settings.actualMedia];
                                this.$display = $("<div id='radio-display'\>").appendTo(this.element);
                                this.$panel = $("<div id='radio-panel'\>").appendTo(this.element);
                                this.$panel.text(this.myMedia.title);
                                this.$display.text(this.myMedia.id);
                                this.$close = $("<div id='radio-close-button'\>").appendTo(this.element);
                                this.$contr = $("<div id='radio-controls'\>").appendTo(this.element);
                                this.$dial = $("<div id='radio-dial'\>").appendTo(this.element);
                                this.$play = $("<div id='radio-play'\>").appendTo(this.element);
                                this.$rwin = $("<div id='radio-rw'\>").appendTo(this.element);
                                this.$media = $("<audio class='media' controls id='radio-media'>").attr("src", this.myMedia.url).appendTo(this.$contr);
                                this.value = parseInt(this.$display.html());
                                // behaviors:
                                var mouse;
                                var me = this;
                                this.$dial.on("mousedown", function(){
                                    var mouse, mov = 0;
                                    me.value = parseInt(me.$display.html());
                                    $(this).on("mousemove", function(evt){
                                        if(!mouse) mouse = evt.pageX;
                                        mov = evt.pageX - mouse;
                                        me.changeMedia(parseInt(me.value) + Math.round(mov/10));
                                    });
                                });
                                this.$close.on("click", function(){
                                    $(me.element).slideToggle();
                                    $(me.icon).slideToggle();
                                    me.showIcon();
                                });
                                this.$dial.on("mouseout mouseup", function(){
                                    $(this).off("mousemove");
                                });
                                if (cb) cb();
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
