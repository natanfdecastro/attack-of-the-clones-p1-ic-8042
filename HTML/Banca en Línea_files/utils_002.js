/**
 * Funcion para mostrar u ocultar 
 */
function showOrHideRequestPassword(){	

	if (document.getElementById("containerRequestPasswordId").style.display  == 'none') {
		var showElement = document.getElementById("containerRequestPasswordId");
		    showElement.style.display = 'block';
	} else {
		var hideElement = document.getElementById("containerRequestPasswordId");
		hideElement.style.display = 'none';
	}
	
}

function closedLogoutMessageDialog(){	
	
	var hideElement = document.getElementById("logoutMessageId");
	hideElement.style.display = 'none';

}

function HiddenMessageBalloon(){
	document.getElementById("balloonId").style.display = 'none';
    document.getElementById("triangleId").style.display = 'none';
    document.getElementById("whiteTriangleId").style.display = 'none';
}