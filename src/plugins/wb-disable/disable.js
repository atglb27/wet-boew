/*
 * @title WET-BOEW Disable Event
 * @overview Event creates the active offer for users that have disabled the event.
 * @license wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 * @author @gc
 */
(function( $, window, vapour ) {
"use strict";

/*
 * Variable and function definitions.
 * These are global to the event - meaning that they will be initialized once per page,
 * not once per instance of event on the page.
 */
var selector = vapour.sDisabled,
	$document = vapour.doc,

	/*
	 * createOffer runs once per plugin element on the page.
	 * @method createOffer
	 */
	createOffer = function( elm ) {

		// Let remove ourselves from the queue we only run once
		window._timer.remove( selector );

		var li = document.createElement( "li" ),
			pageUrl = vapour.pageUrlParts,
			nQuery = "?",
			param,
			$html = vapour.html,
			i18n = window.i18n;

		li.className = "wb-skip";


		// Rebuild the query string
		for ( param in pageUrl.params ) {
			if ( pageUrl.params.hasOwnProperty( param ) && param !== "wbdisable" ) {
				nQuery += param + "=" + pageUrl.params[ param ] + "&#38;";
			}
		}

		if ( vapour.isDisabled || ( vapour.ie && vapour.ielt7 ) ) {
			$html.addClass( "no-js wb-disable" );
			if ( localStorage ) {

				// Store preference for WET plugins and polyfills to be disabled in localStorage
				localStorage.setItem( "wbdisable", "true");
			}

			// Append the Standard version link
			li.innerHTML = "<a class='wb-skip-link' href='" + nQuery + "wbdisable=false'>" + i18n( "%wb-enable" ) + "</a>";

			// Add link to re-enable WET plugins and polyfills
			elm.appendChild( li );
			return true;
		} else if ( localStorage ) {

			// Store preference for WET plugins and polyfills to be enabled in localStorage
			localStorage.setItem( "wbdisable", "false" );
		}

		// Append the Basic HTML version link version
		li.innerHTML = "<a class='wb-skip-link' href='" + nQuery + "wbdisable=true'>" + i18n( "%wb-disable" ) + "</a>";
		elm.appendChild( li ); // Add link to disable WET plugins and polyfills
	};

// Bind the events
$document.on( "timerpoke.wb", selector, function() {
	createOffer( this );
});

// Add the timer poke to initialize the plugin
window._timer.add( selector );

})( jQuery, window, vapour );