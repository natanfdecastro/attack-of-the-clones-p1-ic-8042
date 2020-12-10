//var domain = "https://www.sucursalelectronica.com";
var domain = "";

var message1 = "Digite su usuario";
var message2 = "Digite 6 caracteres minimo en el campo usuario";
var message3 = "El campo usuario tiene caracteres inválidos";
var message4 = "El campo usuario tiene formato incorrecto";
var message5 = "Digite su contraseña";
var message6 = "La contraseña debe tener mínimo 2 y máximo 16 caracteres";
var message71 = "Ingrese entre";
var message72 = "(cuenta bancaria) o entre";
var message73 = "(numero de tarjeta) digitos";
var message74 = "y";
var message8 = "Digite su clave de acceso.";
var message9 = "La clave de acceso tiene caracteres inválidos";
var message101 = "La clave de acceso debe de tener";
var message102 = "dígitos";
var message103 = "o";
var message11 = "Digite su usuario o número de cuenta";
var message20 = "Digite 6 caracteres en el campo token";
var message21 = "El campo token tiene caracteres inválidos";

var MIN_LENGTH = 2;
var ACCOUNT_MIN_LENGTH = 3;



function initializeLogIn() {
	storageCookieName = this.type + 'id';
	stateCookieName = 'keep' + storageCookieName;
	persistent = getCookie(stateCookieName);
	if (persistent != null) {
		persistent = (persistent == 'true');
		this.persistence.checked = persistent;
		id = getCookie(storageCookieName);
		if (id != null && persistent) {
			this.id.value = getCookie(storageCookieName);
			this.key.focus();
		} else {
			this.id.focus();
		}
	}
}

function saveState() {
	storageCookieName = this.type + 'id';
	stateCookieName = 'keep' + this.type + 'id';
	keepCookie(stateCookieName, this.persistence.checked);
	if (!this.persistence.checked) {
		deleteCookie(storageCookieName, '/');
	}
}

function saveId() {
	storageCookieName = this.type + 'id';
	stateCookieName = 'keep' + storageCookieName;
	persistent = getCookie(stateCookieName);
	if (persistent != null) {
		persistent = (persistent == 'true');
		if (persistent) {
			// alert(document.cookie);
			keepCookie(storageCookieName, this.id.value);
		}
	}
}

var submitCount = 0;

// Función para verificar la validez del nombre de usuario y el password
// Creada: Lawrence Borbón, Martes 07 de Mayo del 2003
//Resive dos parametros id y passwd, que corresponden al valor almacenado en el campo
// usuario y al valor almacenado en el campo clave, respectivamente
function verify(id, passwd) {
  //Valoración de la longitud del nombre, ya sea que no esta escrito o que faltan caracteres
	if (id.value.length < MIN_LENGTH) {
		if (id.value.length == 0)
			// Digite su usuario
		    setValidationMessage("message1", message1);
		else
			// "Digite 3 caracteres mínimo en el campo usuario"
			setValidationMessage("message2", message2);
		id.focus();
		id.select();
		return (false);
	}
  //Valoración del contenido de campo nombre, para encotrar solo símbolos válidos
	var checkOK = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ" + "0123456789";
	var checkStr = id.value;
	var allValid = true;
	for (i = 0; i < checkStr.length; i++) {
		ch = checkStr.charAt(i);
		for (j = 0; j < checkOK.length; j++)
			if (ch == checkOK.charAt(j))
				break;
		if (j == checkOK.length) {
			allValid = false;
			break;
		}
	}
	if (!allValid) {
		// El campo usuario tiene caracteres inválidos
		setValidationMessage("message3", message3);
		id.focus();
		id.select();
		return (false);
	}
	var checkNum = "0123456789"
	
  //Valiadción de la longitud de la clave, ya sea que no ha sido digitada o que no tiene suficientes caracteres
	if (passwd.value.length < 6) {
		if (passwd.value.length == 0)
			// Digite su contraseña
			setValidationMessage("message5", message5);
		else
			// La contraseña debe tener mínimo 6 y máximo 16 caracteres
			setValidationMessage("message6", message6);
		passwd.focus();
		passwd.select();
		return (false);
	}
	return (true);
}
function validInput(string) {
	var checkOK = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ" + "0123456789";
	var allValid = true;

	if ((string.length < MIN_LENGTH) || (string.length > 16)) {
		allValid = false;
		return allValid;
	}
	for (i = 0; i < string.length; i++) {
		ch = string.charAt(i);
		for (j = 0; j < checkOK.length; j++)
			if (ch == checkOK.charAt(j))
				break;
		if (j == checkOK.length) {
			allValid = false;
			break;
		}
	}
	return allValid;
}
function validNumber(string) {
	var checkNum = "0123456789"
	var allValid = true;

	for (a = 0; a < string.length; a++) {
		ch = string.charAt(a);
		for (b = 0; b < checkNum.length; b++) {
			if (ch == checkNum.charAt(b)) {
				break;
			}
		}
		if (b == checkNum.length) {
			allValid = false;
			break;
		}
	}
	return allValid;
}
function displayMessageNumber(length,int_min_cta,int_max_cta,int_min_tar,int_max_tar){
	if ( (length < int_min_cta) || (length > 9) && (length < 14) || (length > 16 ) ){
	//Ingrese entre - (cuenta bancaria) o entre - (número de tarjeta) dígitos
		setValidationMessage("message71", message71+ " " +int_min_cta + " " + message74 + " " + int_max_cta + " " + message72 + " " + int_min_tar + " " + message74 + " " + int_max_tar + " " + message73);
		return false;
	}
	else
		return true;
}

function displayMessagePassword(password, int_len_bco, int_len_com) {
	var length = password.length;
	if (length == 0) {
		// Digite su clave de acceso.
		setValidationMessage("message8", message8);
		return false;
	}
	if (!validNumber(password)) {
		// La clave de acceso tiene caracteres invalidos
		setValidationMessage("message9", message9);
		return false;
	}

	if ((length != int_len_bco) && (length != int_len_com)) {
		// La clave debe tener una longitud de bco o com
		if (int_len_bco == int_len_com) {
			setValidationMessage("message101", message101 + " " + int_len_bco + " " + message102);
			return false;
		} else {
			setValidationMessage("message101",message101 + " " + int_len_com + " " + message103 + " " + int_len_bco + " " + message102);
			return false;
		}
	}
	
	return true;
}

function checkOption(form) {

	REDIRECT_URL = "/redir/redirect.go";

	product = form.product;
	password = form.pass;
	token = form.token;
	
	var signature = form.signaturePersistent;
	if (signature.checked){
		form.action = domain + REDIRECT_URL;
		return false;
	}
	

	if (product.value.length == 0) {
		// Digite su usuario o numero de cuenta
		setValidationMessage("message11", message11);
		product.focus();
		return false;
	}

	if (token.value.length > 0) {
		tokenNumber = validNumber(token.value);
		if (tokenNumber) {
			if (token.value.length != 6) {
				setValidationMessage("message20", message20);
				return false;
			}
		} else {
			setValidationMessage("message21", message21);
			form.token.value = "";
			return false;
		}

	}

	number = validNumber(product.value);
	if (number) {
		if (displayMessageNumber(product.value.length, ACCOUNT_MIN_LENGTH, 9, 14, 16)) {
			if (displayMessagePassword(password.value, bancamaticLength, fonomaticLength)) {
				// Si es un número de cuenta o tarjeta válido se envía a la aplicación redireccionadora
				form.action = domain + REDIRECT_URL;
				return true;
			}
			else{
				password.focus();
				password.select();
				return false;
			}

		}
		else{
			product.focus();
			product.select();
			return false;
		}

	}
	else if (verify(product, password)){
		// Si es un usuario válido se envía a la aplicación redireccionadora
		form.action = domain + REDIRECT_URL;
		return true;

	}
	return false;
}

function loginbox(type, persistence, id, key) {
	this.type = type;
	this.persistence = persistence;
	this.id = id;
	this.key = key;
	this.initialize = initializeLogIn;
	this.saveState = saveState;
	this.saveId = saveId;
	this.verify = verify;
}

function keepCookie(name, value) {
	var now = new Date();
	fixDate(now);// fix the bug in Navigator 2.0, Macintosh
	// cookie expires in two years (actually, 365 days)
	// 365 days in a year
	// 24 hours in a day
	// 60 minutes in an hour
	// 60 seconds in a minute
	// 1000 milliseconds in a second
	now.setTime(now.getTime() + 365 * 2 * 24 * 60 * 60 * 1000);
	setCookie(name, value, now, '/');
}
