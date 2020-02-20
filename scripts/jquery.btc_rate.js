;(function ( $, window, document, undefined ) {
		var firebaseApi = "https://bitpay.com/api/rates/uah";
		var bitpayApi = "https://bitpay.com/api/rates/uah";
		var yui = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22https://www.bitstamp.net/api/ticker/%22&format=json&callback=";
		var bitstampApi = "https://www.bitstamp.net/api/ticker/";
		var btceApi = "https://btc-e.com/api/2/btc_usd/ticker";
		var coinbaseApi = "https://coinbase.com/api/v1/prices/buy";
		var bitfinexApi = "https://api.bitfinex.com/v1/ticker/btcusd";


		var pluginName = "btc",
				defaults = {
					propertyName: "value",
					btcSource: bitpayApi,
					decimals: 5
		};

		function Plugin ( element, options ) {
				this.element = element;
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		$.extend(Plugin.prototype, {
				init: function () {
						this.getBTCData();
				},
				getBTCData: function() {
					$.ajax({
						context: this,
						url: this.settings.btcSource,
						type: "GET",
						dataType: "json",
						success: function(data) {
								var usd = $(this.element).data("usd");
								var rate = data.rate;
								var conversion = usd / rate;
								var result = conversion.toFixed(this.settings.decimals);

								$(this.element).append(
									"&nbsp;<span style='border-bottom: 1px dotted #999' \>" + result + " BTC \</span>");

						},
						error: function() {
							console.log("Не могу получить курс биткоина!");
						}
					});
				}
		});

		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
				return this;
		};

})( jQuery, window, document );
