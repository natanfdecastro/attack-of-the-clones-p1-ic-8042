// utils.js

/******************************** Variables globales. ********************************/

// expresiones regulares para reemplazar tildes y eñes.
var ntildeRe = new RegExp ('&ntilde;', 'g') ;
var ntildeCapRe = new RegExp ('&Ntilde;', 'g');
var aacuteRe = new RegExp ('&aacute;', 'g');
var aacuteCapRe = new RegExp ('&Aacute;', 'g');
var eacuteRe = new RegExp ('&eacute;', 'g');
var eacuteCapRe = new RegExp ('&Eacute;', 'g');
var iacuteRe = new RegExp ('&iacute;', 'g');
var iacuteCapRe = new RegExp ('&Iacute;', 'g');
var oacuteRe = new RegExp ('&oacute;', 'g');
var oacuteCapRe = new RegExp ('&Oacute;', 'g');
var uacuteRe = new RegExp ('&uacute;', 'g');
var uacuteCapRe = new RegExp ('&Uacute;', 'g');
var uumlRe = new RegExp ('&uuml;', 'g');
var uumlCapRe = new RegExp ('&Uuml;', 'g');

/************************************* Funciones. *************************************/

/**
Carga la página y los componentes que requieran inicialización.
jvillalobos. 08-11-2004
*/
function loadBody(selectedMenuOption) {
	// oculta las listas del menú. Se hace de esta manera para que los usuarios
	// que no tienen javascript habilitado puedan ver las opciones.
	// se llama 2 veces a la función porque en el primer llamado se asigna el
	// display como block y en el segundo llamado se asigna como none.
	toggleObject("BankProductsItemSubOptionList","block");
	toggleObject("BankProductsItemSubOptionList","block");
	toggleObject("CreditProductsItemSubOptionList", "block");
	toggleObject("CreditProductsItemSubOptionList", "block");
	toggleObject("InvestmentProductsItemSubOptionList", "block");
	toggleObject("InvestmentProductsItemSubOptionList", "block");
	/*switch(selectedMenuOption) {
		case "consolidatedQuery": 
			selectMenuItem("bankAccountMenuLink", "bankAccountSubOptionList",
						   "bankAccountBalanceOption");
		break;
	}*/
}


/*
Encuentra un objeto en el documento.
jvillalobos. 14-09-2004
*/
function findObject(n, d) {

	var p,i,x;
	
	if(!d){
		d = document;
	}

	if((p = n.indexOf("?")) > 0 && parent.frames.length) {
    	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
    }
    
	if(!(x=d[n])&&d.all) {
		x=d.all[n];
	}
	
	for (i=0;!x&&i<d.forms.length;i++) {
		x=d.forms[i][n];
	}
	
  	for(i=0;!x&&d.layers&&i<d.layers.length;i++) {
  		x = findObject(n,d.layers[i].document);
  	}
	
	if(!x && d.getElementById) {
		x = d.getElementById(n);
	}
	
	return x;
}

/*
Realiza un efecto de rollover sobre una imagen.
jvillalobos. 14-09-2004
*/
function rollOverImage() {
	var i,x;
	var j=0;
	var a = rollOverImage.arguments;
	
	document.preloadedImages = new Array;
  
	for(i = 0; i < (a.length-2); i += 3) {
		if ((x = findObject(a[i])) != null){
			document.preloadedImages[j++] = x;
			
			if(!x.oSrc) {
				x.oSrc = x.src;
			}
			
			x.src = a[i+2];
		}
	}
}

/*
Realiza un efecto de rollout en una imagen.
jvillalobos. 14-09-2004
*/
function rollOutImage() {
	var i, x, a=document.preloadedImages;
	
	for(i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) {
		x.src=x.oSrc;
	}
}

/*
Aparece / desaparece un objeto. 'name' es el nombre del objeto y 'type' es el tipo de
display del objeto (block o inline). Retorna false si el objeto no fue encontrado.
jvillalobos. 21-09-2004
*/
function toggleObject(name, type) {
	var obj = findObject(name);
	var result = false;

	if(obj){
		if (obj.style["display"] == null || obj.style["display"] == "none" ||
			obj.style["display"] == "") {

			if(type) {
				obj.style["display"] = type;
			} else {
				obj.style["display"] = "block";
			}
		} else {
			obj.style["display"] = "none";
		}
		
		result = true;
	}

	return result;
}


/**
Permite controlar los submits dobles. Muestra un mensaje si el usuario intenta
hacer doble submit.
*/

function validSubmit() {
	var result = false;
	submitCount++;
	
	if (submitCount == 1) {
		result = true;
	} else {
		addDialogToPage();
	}
	return result;
}

/**
Muestra un dialogo de espera que bloquea la página miestras se carga 
si el usuario intenta hacer doble submit.
*/
var isDialogActive = false;
var isWaiting = false;
var isFirstTime = true;
function addDialogToPage(){	
	if(!isDialogActive){
		/* Div que bloque la pagina mientras carga */
		var frontDialogDiv = document.createElement("div");
		frontDialogDiv.id = "loading-lock-dialog";
		/* Div del dialogo de carga */	
		var loaderDialogDiv = document.createElement("div");
		loaderDialogDiv.id = "dialog-lock-content";
	    /* Título del dialogo */
		var loaderDialogTitle = document.createElement("p");
		loaderDialogTitle.id = "dialog-lock-title";
		var titleText = document.createTextNode(loadingtitleLabel);
		loaderDialogTitle.appendChild(titleText);
		loaderDialogDiv.appendChild(loaderDialogTitle);
		/* Texto del dialogo */
		var loaderDialogText = document.createElement("p");
		loaderDialogText.id = "dialog-lock-text";
		var dialogText = document.createTextNode(loadingtextLabel);
		loaderDialogText.appendChild(dialogText);
		loaderDialogDiv.appendChild(loaderDialogText);
		/* Botón de cerrar el dialogo */
		var loaderDialogClose = document.createElement("div");
		loaderDialogClose.id = "dialog-close-button";
		loaderDialogDiv.appendChild(loaderDialogClose);	
		/* Imagen del dialogo */
		var loaderDialogImage = document.createElement("div");
		loaderDialogImage.id = "dialog-lock-image";
		loaderDialogDiv.appendChild(loaderDialogImage);
		/* Se agrega dialogo en la página */
		document.body.insertBefore(frontDialogDiv, document.body.firstChild);
		document.body.insertBefore(loaderDialogDiv, document.body.firstChild);
		isDialogActive = true;
	}
	
	if(!isFirstTime){
		document.getElementById('dialog-lock-title').innerHTML = loadingtitleLabel2;
		document.getElementById('dialog-lock-text').innerHTML = loadingtextLabel2;
	}
	
	if(!isWaiting){
		/*Incializa las propiedades de estilo "Display" para el dialogo*/
		document.getElementById('dialog-close-button').style.display = "none";
		document.getElementById('loading-lock-dialog').style.display = "block";
		document.getElementById('dialog-lock-content').style.display = "block";
		isWaiting = true;
		/*Presenta un botón de cerrar al cabo de un tiempo determinado.*/
		function showCloseButton(){
			document.getElementById('dialog-close-button').style.display = "block";
			document.getElementById('dialog-close-button').onclick = function(){
				document.getElementById('loading-lock-dialog').style.display = "none";
				document.getElementById('dialog-lock-content').style.display = "none";
				document.getElementById('dialog-close-button').style.display = "none";
				isWaiting = false;
				isFirstTime = false;
			};		
		};
		/*Establece el tiempo de espera para presentar el botón de cerrar*/
		setTimeout(showCloseButton, timeoutLoading);	
	}
}

/**
Permite controlar los submits dobles. 
Ejecuta el submit del FORM.
*/
function singleSubmit(form) {

	var result = validSubmit();
	if (result) {
		form.submit();
	} 	
	return result;
}

/**
 * Reemplaza las ocurrencias de referencias a entidades HTML (e.g. &ntilde ;, &aacute ;,...)
 * por sus caracteres equivalentes.
 */
function replaceCharacterEntities(str) {
	// ver las variables globales.
	str = str.replace(ntildeRe, 'ñ');
	str = str.replace(ntildeCapRe, 'Ñ');
	str = str.replace(aacuteRe, 'á');
	str = str.replace(aacuteCapRe, 'Á');
	str = str.replace(eacuteRe, 'é');
	str = str.replace(eacuteCapRe, 'É');
	str = str.replace(iacuteRe, 'í');
	str = str.replace(iacuteCapRe, 'Í');
	str = str.replace(oacuteRe, 'ó');
	str = str.replace(oacuteCapRe, 'Ó');
	str = str.replace(uacuteRe, 'ú');
	str = str.replace(uacuteCapRe, 'Ú');
	str = str.replace(uumlRe, 'ü');
	str = str.replace(uumlCapRe, 'Ü');
	return str;
}

	/** Resetea un formulario tomando en cuenta el submitCount	
	@author jgonzalez
	@version 1.0
	Fecha: 14-07-2005*/
	function resetForm(form) {
		if (submitCount > 0) {
			//alert(redirectLabel);
			addDialogToPage();
		} else {
			return form.reset();
		}
	}
	
/**
 Funcion para ocultar un tag por el id
 @author ahernandez (2006-01-13)
*/
function hideTag(tag, tagId, hide)
{
     obj = document.getElementById(tagId);	
 	 if (obj != null) {		
		if (hide) { obj.style.display = ''; }
		else      { obj.style.display = 'none'; }
	 }
}

/**
 * Allows writing only numbers,with no dots in a textbox. Do not allows negative numbers
 * @param event the keypressed event
 * @param obj the object to be checked
 * @usage i.e. <input type='text' onkeypress='return checkNumberNoDot(event,this)'/>
 */
function checkNumberNoDot(event, obj) {
	var noIE=false;
	if (!event) var event = window.event;
	if (event.keyCode) code = event.keyCode;
	else if (event.which) {code = event.which; noIE=true;}
	return ( (code >= 48 && code <= 57 ) || code == 8 || code == 13 || code==9 || (code == 35 && noIE==true) );
}
/*
* Checks that the keys CRTL+V are not pressed
* @param event the keydown event
* @param obj the object to be checked
* @return false if the CRTL+V is pressed otherwise returns true
*/
function noPaste(event, obj){

	if (event.modifiers && Event.CONTROL_MASK){
	  return false; //netscape 4.0
	}
    else if (event.ctrlKey && (event.keyCode == 86)){
    	return false;//iexplorer, netscape 6.0, firefox
    }
    else return true;
    
}