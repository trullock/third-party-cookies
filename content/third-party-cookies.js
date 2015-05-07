(function(window, undefined){
	"use strict";
	
	var 	hackNecessary = false
		  , popup = null
		  , $body = null;
	
	// Tests if cookies are enabled, and applys the hack if not
	function test() {
		document.cookie = "cookies=enabled";
		if (document.cookie.indexOf('cookies=enabled') < 0) {
			
			window.cookieHackCallback = callback;
			$body = document.getElementsByTagName('body')[0];
			
			$body.addEventListener('click', handleBodyClick, false);

		} else {
			removeCookie('cookies');
		}
	}
	
	// Handles clicks to the <body> as part of the applied hack
	function handleBodyClick(){
				
		popup = window.open('popup.asp', "hack", "width=150, height=150");
		
		if(!popup) {
			handleBlockedPopup();
			return;
		}
		
		window.setTimeout(function(){
			// callback should have fired by now. If the callback still exists, then it didnt fire.
			if(window.cookieHackCallback)
				handleBlockedPopup();
		}, 2000);
		
		$body.removeEventListener('click', handleBodyClick);
	}
	
	// Handles the case that popups are blocked
	function handleBlockedPopup(){
		alert('popups blocked, yo');
		
		// Tidy up
		window.cookieHackCallback = null;
	}
	
	// Handles the case that cookies are blocked
	function handleNoCookies(){
		alert('cookies blocked, yo');
	}

	// Callback invoked by the popup
	function callback(){
		// Popup should be a thing, but just in case
		if(!popup)
			return;
		
		// Tidy up
		popup.close();
		popup = null;
		window.cookieHackCallback = null;
		
		if(document.cookie.indexOf('popup=1') < 0) {
			handleNoCookies();
		} else {
			removeCookie('popup');
		}
	}
	
	function removeCookie(name){
		document.cookie = name + "=0; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
	}
	
	test();
	
})(window);
