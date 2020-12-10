/**
 * 
 * Description: Se despliega el popUp para notificaciones, errores o seg�n el mensaje 
 * CRI-19595 Enrollment en L�nea
 * version: 1.0 
 * Author: carodriguezg(1.0)
 *
 */
var isAlertActive = false;
var isAlertWaiting = false;

/**
Muestra un Alert personalizado que bloquea la p�gina para mostrar
un mensaje determinado al usuario
*/

function showCustomAlert(alertText){	
	if(!isAlertActive){
		/* Div que bloque la pagina mientras carga */
		var frontDialogDiv = document.createElement("div");
		frontDialogDiv.id = "loading-lock-dialog";	

		/* Div del mensaje de alerta */	
		var loaderDialogDiv = document.createElement("div");
		loaderDialogDiv.id = "dialog-lock-content";

		/* Contenido central del mensaje de alerta */	
		var loaderDialogCenter = document.createElement("div");
		loaderDialogCenter.id = "dialog-lock-centrar";

		/* Tit�lo de nombre seleccionado */
		var userSelected = document.createElement("p");
		userSelected.id = "dialog-lock-text_4";
		var userSelectedText = document.createTextNode(alertText);
		userSelected.appendChild(userSelectedText);
		loaderDialogCenter.appendChild(userSelected);

		/* Bot�n de cerrar el dialogo */
		var loaderButtonOk = document.createElement("button");
		loaderButtonOk.id = "dialog-Ok-button_1";
		var buttonOkText = document.createTextNode(buttonAccept);
		loaderButtonOk.appendChild(buttonOkText);
		loaderDialogCenter.appendChild(loaderButtonOk);

		/* Se agrega contenido central */
		loaderDialogDiv.appendChild(loaderDialogCenter);

		/* Se agrega dialogo en la p�gina */
		document.body.insertBefore(frontDialogDiv, document.body.firstChild);
		document.body.insertBefore(loaderDialogDiv, document.body.firstChild);
		isAlertctive = true;
	}
	
		document.getElementById('dialog-Ok-button_1').onclick = function(){
			document.getElementById('loading-lock-dialog').style.display = "none";
			document.getElementById('dialog-lock-content').style.display = "none";
			isAlertActive = false;
			};
}

/**
Muestra un Alert personalizado que bloquea la p�gina para mostrar
un mensaje determinado al usuario
*/

function showFullCustomAlert(alertText, funtionClick){	
	if(!isAlertActive){
		/* Div que bloque la pagina mientras carga */
		var frontDialogDiv = document.createElement("div");
		frontDialogDiv.id = "loading-lock-dialog";	

		/* Div del mensaje de alerta */	
		var loaderDialogDiv = document.createElement("div");
		loaderDialogDiv.id = "dialog-lock-content";

		/* Contenido central del mensaje de alerta */	
		var loaderDialogCenter = document.createElement("div");
		loaderDialogCenter.id = "dialog-lock-centrar";

		/* Tit�lo de nombre seleccionado */
		var userSelected = document.createElement("p");
		userSelected.id = "dialog-lock-text_4";
		var userSelectedText = document.createTextNode(alertText);
		userSelected.appendChild(userSelectedText);
		loaderDialogCenter.appendChild(userSelected);

		/* Bot�n de cerrar el dialogo */
		var loaderButtonOk = document.createElement("button");
		loaderButtonOk.id = "dialog-Ok-button";
		loaderButtonOk.setAttribute("onclick",funtionClick);
		var buttonOkText = document.createTextNode(buttonAccept);
		loaderButtonOk.appendChild(buttonOkText);
		loaderDialogCenter.appendChild(loaderButtonOk);

		/* Se agrega contenido central */
		loaderDialogDiv.appendChild(loaderDialogCenter);

		/* Se agrega dialogo en la p�gina */
		document.body.insertBefore(frontDialogDiv, document.body.firstChild);
		document.body.insertBefore(loaderDialogDiv, document.body.firstChild);
		isAlertctive = true;
	}
	
		document.getElementById('dialog-Ok-button_1').onclick = function(){
			document.getElementById('loading-lock-dialog').style.display = "none";
			document.getElementById('dialog-lock-content').style.display = "none";
			isAlertActive = false;
			};
}