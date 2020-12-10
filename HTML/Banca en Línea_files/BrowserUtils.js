/**
 *  @autor gdiazs
 *  @version 1.0 
 *  Esta clase permite validar el navegador y la versión, también permite mostrar mensajes
 */

 if (+(/MSIE\s(\d+)/.exec(navigator.userAgent)||0)[1] < 9) {
 	alert("La versión de su navegador no se encuentra soportada");
 	window.location.reload();
 }

 var BrowserUtils = (function(win) {


 	function extractBrowserName() {

 		 var name = win.navigator.userAgent;
 		 if (name.match(/OPR\/(.*)$/))
 		 	return "opera";
 		 if (name.match(/Firefox\/(.*)$/))
 		 	return "firefox";
 		 if (name.match(/Chrome\/(.*)$/))
 		 	return "chrome";
 		 if(!!window.MSInputMethodContext && !!document.documentMode){
 		 	return "ie";
 		 }

 	}


	 function isValidIEBrowser (message) {
		 if (+(/MSIE\s(\d+)/.exec(navigator.userAgent)||0)[1] < 11) {
		    alert(message);
		    return false;
		 }
		 return true;
	 }

 	function extractBrowserVersion(){
 		var userAgent = win.navigator.userAgent;
 		var browserName = extractBrowserName();
 		var browserVersion = "";

 		if(browserName === "opera"){
 			var start = userAgent.indexOf("OPR");
 			browserVersion = userAgent.substring(start+4, start+6);
 		}
 		if(browserName === "firefox"){
 			var start = userAgent.indexOf("Firefox");
 			browserVersion = userAgent.substring(start+8, start+10);
 		}
 		if(browserName === "chrome"){
 			var start = userAgent.indexOf("Chrome");
 			browserVersion = userAgent.substring(start+7, start+9);
 		}
 		if (+(/MSIE\s(\d+)/.exec(navigator.userAgent)||0)[1] < 11) {

 			browserName = "ie";
 			browserVersion = +(/MSIE\s(\d+)/.exec(navigator.userAgent)||0)[1];
 		}else{
 			if (browserName === "ie"){
 				browserVersion = 11;
 			}
 		}

 		return {
 			name: browserName,
 			version: browserVersion
 		};
 	}


 	return {

 		getBrowserVersion: function () {
 			return extractBrowserVersion();
 		},

 		showHeaderMessage: function(msg) {
 			
 			$("#idIncompatibleBrowser").remove();

 			var message = bacSignBrowserMessage ;
 			 
 			$("body").append(message);

 			$("#idIncompatibleBrowser").addClass("browserWarning");

 			$("#idIncompatibleBrowser").animate({
 				"height": "50px",
 				"padding-top": "5px"
 			},{
 				duration: 300,
 			});

 			$("#idIncompatibleBrowserClose").click(function (event) {
 				event.preventDefault();
 				$("#idIncompatibleBrowser").remove();
 			});


		},

		showLoader: function (callback, isRetry) {

			
				var div = bacSignModal;
				
				
				$('#bacfirma-loader').remove();
				$('body').append(div);
				$("#bacfirma-retry-btn").hide();
				

				$("#bacfirma-modal-close").click(function (e) {
					e.preventDefault();
					$("#bacfirma-modal").remove();

				});
				
				
				if (isRetry){
					
					$("#step1").hide();
					$("#step2").fadeIn();
					$("#closeModalImg").hide();
					
					callback(function(){
						// On user not reponse
						$("#step2").fadeOut(function(){
							$("#error").fadeIn();
							$("#bacfirma-retry-btn").show();
							$("#closeModalImg").show();
						});
						
					});
					//Stop the process
		
				}else{
					$("#bacfirma-continue").click(function(event){
						event.preventDefault();
						$("#closeModalImg").hide();
						$("#step1").fadeOut(function(){
							$("#step2").fadeIn();
						});
						
						callback(function(){
							// On user not reponse
							$("#step2").fadeOut(function(){
								$("#closeModalImg").show();
								$("#error").fadeIn();
								$("#bacfirma-retry-btn").show();
							});
						});
						
					});
				}
				
				

				//Animación para mostar el modal
				$("#bacfirma-modal").animate({"opacity": "1"}, 200, function () {});

		},

		closeLoader: function () {
			//Animación para quitar el modal
			$("#bacfirma-modal").animate({"opacity": "0"}, 200, function () {
				$("#bacfirma-modal").remove();
			});
		}
 		
		,

		showMessageInModal: function (message) {
			// On user not reponse
			$("#step2").fadeOut(function(){
				$("#closeModalImg").show();
				$("#error").fadeIn();
				$("#error p:last").text(message);
				$("#bacfirma-retry-btn").show();
			});
		}
 	}

 });
