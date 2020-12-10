/**
 * CRI-18946 earaya-ifz 1.0
 */
//Se necesita para unificar las listas del tipo de cambio
var exchangesRatesUnified = [];

// se unifican las listas
for ( var i = 0; i < exchangeRates_EUR.length; i++) {

	var exchangeRateUnifed = {
		countryCode : exchangeRates_EUR[i].countryCode,
		countryDescription : exchangeRates_EUR[i].countryDescription,
		currencyCode : exchangeRates_EUR[i].currencyCode,
		currencyDescription : exchangeRates_EUR[i].currencyDescription,
		buyEUR : exchangeRates_EUR[i].buy,
		sellEUR : exchangeRates_EUR[i].sell,
		printable : exchangeRates_EUR[i].printable,
		moneySymbol : exchangeRates_EUR[i].moneySymbol,// necesario para saber
														// el simbolo de la
														// moneda
		hasDollar : false
	// necesario para saber si es un pais que su moneda es de dolares
	};
	for ( var j = 0; j < exchangeRates_USD.length; j++) {
		// Para los paises con tipo de cambio para dolares, se agrega el tipo de
		// cambio y se activa la variable hasDollar
		// para ese pais, en caso de ser el Salvador se omite como tipo de
		// cambio para dolares.
		if (exchangeRates_EUR[i].countryCode == exchangeRates_USD[j].countryCode
				&& exchangeRates_USD[j].countryCode != 'SV') {
			exchangeRateUnifed.buyUSD = exchangeRates_USD[j].buy;
			exchangeRateUnifed.sellUSD = exchangeRates_USD[j].sell;
			exchangeRateUnifed.hasDollar = true;
			break;
		}
	}
	exchangesRatesUnified.push(exchangeRateUnifed);
}

var currentExchangeRate;// Aqui se establece el tipo de cambio seleccionado
var isDollar = true;// Para saber si se muestra el tipo de cambio de local a
					// dolares o viceversa
var amount = document.getElementById("amountConverter");// Se obtiene el
														// elemento donde se
														// ingresa la cantidad a
														// convertir
var resultAmount = document.getElementById("resultAmount");// elemento al cual se le
												// asignara el resultado final
												// de la conversion
var symbol = document.getElementById("moneySymbolConverter");// Elemento el
																// cual se le
																// cambiara el
																// simbolo de la
																// moneda por la
																// cual se esta
																// convirtiendo
var changeExchangeConverter = document.getElementById('changeExchange');// boton
																		// del
																		// cual
																		// se
																		// realiza
																		// el
																		// cambio
var countryOptions = "";// opciones del menu
var countryIndex = 0;// Para saber cual pais
var countryDropDownDiv = document.getElementById('countryDropDownDiv');// Necesario
																		// para
																		// actualizar
																		// el
																		// combobox
var isLocalExchange = true;// Para saber si el convertidor esta en compra o
							// venta
var symbolForInput = document.getElementById('symbolForInput');// Elemento para
																// el simbolo a
																// mostrar al
																// lado del
																// input
var sellLabel = document.getElementById("sellLabel");
var Buylabel = document.getElementById("Buylabel");
var sellLabelEuro = document.getElementById("sellLabelEuro");
var BuylabelEuro = document.getElementById("BuylabelEuro");

function decimalLength(value){
	var pieces = value.toString().split(".");
	return pieces[1].length;
}

// exchangeRateFormatConverterea los resultado de la conversion
function exchangeRateFormatConverter(n, decimals) {
	return parseFloat(n).toFixed(decimals).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

// Para saber cual es la moneda del tipo de cambio.
function getCurrentMoneySymbol() {
	if (isDollar && isLocalExchange) {
		return dolarSymbol;
	} else if (isDollar && !isLocalExchange) {
		return currentExchangeRate.moneySymbol;
	} else if (!isDollar && isLocalExchange) {
		return euroSymbol;
	} else {
		return currentExchangeRate.moneySymbol;
	}
}
//Para saber si es compra o venta
 function getActiveExchangeRate(){
		if (isDollar && isLocalExchange) {
			sellLabel.className = "activeConverter";
			Buylabel.className ="exchangeRateLabel";
		} else if (isDollar && !isLocalExchange) {
			Buylabel.className = "activeConverter";
			sellLabel.className ="exchangeRateLabel";
		} else if (!isDollar && isLocalExchange) {
			sellLabelEuro.className = "activeConverter";
			BuylabelEuro.className ="exchangeRateLabel";
		} else {
			BuylabelEuro.className = "activeConverter";
			sellLabelEuro.className ="exchangeRateLabel";
		}
 }
// Para saber el simbolo de la moneda de cambio
function getExchangeMoneySymbol() {
	if ((isDollar && isLocalExchange) || (!isDollar && isLocalExchange)) {
		return currentExchangeRate.moneySymbol;
	} else {
		if (isDollar && !isLocalExchange) {
			return dolarSymbol;
		} else {
			return euroSymbol;
		}
	}
}

// Limpia el convertidor y los valores relacionados
function cleanInputs() {
	document.getElementById("amountConverter").value = "";
	exchangeResult = 0.0;
	resultAmount.innerHTML = 0.0;
	resultAmount.value = 0.0;
}

// Permite cambiar los tabs, de dollar a euro o viceversa
function changeTab(divToShow, divToHide, tabToActive, tabToDesactive,
		validateDollar, change) {
	isDollar = validateDollar;
	var divShow = document.getElementById(divToShow);
	divShow.style.display = "block";
	var divHide = document.getElementById(divToHide);
	divHide.style.display = "none";
	if(currentExchangeRate.hasDollar){
		var activeTab = document.getElementById(tabToActive);
		activeTab.className = "active-currency";
		var desActiveTab = document.getElementById(tabToDesactive);
		desActiveTab.className = "Defaultcurrency";
		cleanInputs();
		
	}
	symbol.innerHTML = getCurrentMoneySymbol();
	symbolForInput.innerHTML = getExchangeMoneySymbol();
	BuylabelEuro.className ="exchangeRateLabel";
	sellLabelEuro.className ="exchangeRateLabel";
	Buylabel.className ="exchangeRateLabel";
	sellLabel.className ="exchangeRateLabel";
}

// Permite llenar todas las opciones de los paises dinamicamente
function fillOptions(country) {
	countryOptions = "<div id='countryDropDown'><select class='dropDownFix' id='countryDropDownList' onchange=\"registerGAEvent('LOGIN_CONVERTER','Cambio de País Tipo de Cambio', 'Cambiar País'); changeCountry(this);\">";
	setIndex(country);
	for ( var i = 0; i < exchangesRatesUnified.length; i++) {
		countryOptions += "<option value='"
				+ exchangesRatesUnified[i].countryCode + "' ";
		if (countryIndex == i) {
			countryOptions += "selected";
		}
		countryOptions += ">" + exchangesRatesUnified[i].countryDescription
				+ "</option>"
	}

	countryOptions += "</select></div>";
}

// Cambio de pais
function changeCountry(changeCountry) {
	country = changeCountry.value;
	setExchangeRate(country, isDollar);
	setIndex(country);
	cleanInputs();
	symbol.innerHTML = getCurrentMoneySymbol();
	symbolForInput.innerHTML = getExchangeMoneySymbol();
}

// Obtener el index correcto del pais
function setIndex(country) {
	for ( var i = 0; i < exchangesRatesUnified.length; i++) {
		if (country == exchangesRatesUnified[i].countryCode) {
			countryIndex = i;
			break;
		}
	}

}

setIndex(country);

// Dibujar dinamicamente el combo del pais
function setCombo() {

	var isDropDownExist = document.getElementById('countryDropDown');

	if (undefined != isDropDownExist) {
		countryDropDownDiv.removeChild(isDropDownExist);
	}
	countryDropDownDiv.innerHTML = countryOptions;
}


// Setea los valores necesarios para hacer el tipo de cambio
function setExchangeRate(country, validateTab) {
	var exchangeRateBuyUSD = document.getElementById("exchangeRateBuyUSD");
	var exchangeRateSellUSD = document.getElementById("exchangeRateSellUSD");
	var exchangeRateBuyEUR = document.getElementById("exchangeRateBuyEUR");
	var exchangeRateSellEUR = document.getElementById("exchangeRateSellEUR");
	// Por el pais se obtiene la informacion del tipo de cambio
	for ( var i = 0; i < exchangesRatesUnified.length; i++) {
		if (country == exchangesRatesUnified[i].countryCode) {
			currentExchangeRate = exchangesRatesUnified[i];
			if (!currentExchangeRate.hasDollar) {
				changeTab("euroDiv", "dollarDiv", "euroTab", "dollarTab",
						validateTab, false);
				document.getElementById('dollarTab').style.display = "none";
				document.querySelector('.currencySeparator').style.display = "none";
				document.getElementById('euroTab').className = "onlyEuro";
				document.getElementById('buyCurrencyEuro').className = "newBuy";
				isDollar = false;

			} else {
				document.getElementById('dollarTab').style.display = "block";
				document.querySelector('.currencySeparator').style.display = "block";
				document.getElementById('buyCurrencyEuro').className = "newBuy";
				document.getElementById('euroTab').className = "";
				changeTab("dollarDiv", "euroDiv", "dollarTab", "euroTab",
						validateTab, false);
				isDollar = true;
				exchangeRateBuyUSD.innerHTML = currentExchangeRate.moneySymbol
						+ currentExchangeRate.buyUSD;

				exchangeRateSellUSD.innerHTML = currentExchangeRate.moneySymbol
						+ currentExchangeRate.sellUSD;
				

			}

			exchangeRateBuyEUR.innerHTML = currentExchangeRate.moneySymbol
					+ currentExchangeRate.buyEUR;

			exchangeRateSellEUR.innerHTML = currentExchangeRate.moneySymbol
					+ currentExchangeRate.sellEUR;

		}
	}
	fillOptions(country);
	setCombo();

}

setExchangeRate(country, true);

symbol.innerHTML = getCurrentMoneySymbol();
symbolForInput.innerHTML = getExchangeMoneySymbol();

var exchangeResult;

// Funcion para hacer el cambio del convertidor y realizar la conversion si se
// encuentra algun monto en el input
function changeExchange() {
	registerGAEvent('LOGIN_CONVERTER','Cambiar Moneda', 'Cambiar Moneda'); 
	if (isLocalExchange) {
		isLocalExchange = false;
	} else {
		isLocalExchange = true;
	}
	var changeAmount = amount.value || 0.0;
	var changeResult = resultAmount.innerHTML || 0.0;
	changeResult = changeResult.replace(/,/g, "");

	if ("0.0" != changeResult && 0 != changeAmount) {
		if (isLocalExchange && isDollar) {
			amount.value = exchangeRateFormatConverter(changeAmount * deleteComa(currentExchangeRate.sellUSD), decimalLength(currentExchangeRate.sellUSD)).replace(/,/g, "");
			resultAmount.innerHTML = exchangeRateFormatConverter(changeAmount, decimalLength(currentExchangeRate.sellUSD));
			resultAmount.value = exchangeRateFormatConverter(changeAmount, decimalLength(currentExchangeRate.sellUSD));
		} else if (!isLocalExchange && isDollar) {
			amount.value = changeResult;
			resultAmount.innerHTML = exchangeRateFormatConverter(changeResult * deleteComa(currentExchangeRate.buyUSD), decimalLength(currentExchangeRate.buyUSD));
			resultAmount.value = exchangeRateFormatConverter(changeResult * deleteComa(currentExchangeRate.buyUSD), decimalLength(currentExchangeRate.buyUSD));
		} else if (isLocalExchange && !isDollar) {
			amount.value = exchangeRateFormatConverter(changeAmount * deleteComa(currentExchangeRate.sellEUR), decimalLength(currentExchangeRate.sellEUR));
			resultAmount.innerHTML = exchangeRateFormatConverter(changeAmount, decimalLength(currentExchangeRate.sellEUR));
			resultAmount.value = exchangeRateFormatConverter(changeAmount, decimalLength(currentExchangeRate.sellEUR));
		} else if (!isLocalExchange && !isDollar) {
			amount.value = changeResult.replace(/,/g, "");
			resultAmount.innerHTML = exchangeRateFormatConverter(changeResult * deleteComa(currentExchangeRate.buyEUR), decimalLength(currentExchangeRate.sellEUR));
			resultAmount.value = exchangeRateFormatConverter(changeResult * deleteComa(currentExchangeRate.buyEUR), decimalLength(currentExchangeRate.sellUSD));
		}

	}

	symbol.innerHTML = getCurrentMoneySymbol();
	symbolForInput.innerHTML = getExchangeMoneySymbol();
	getActiveExchangeRate();
}
// Valida si se ingresa un numero o un caracter diferente
var currentValue = 0;

function isNumberKey(evt) {
	var value = document.getElementById("amountConverter").value;
	
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57) && !(charCode == 46)) {
		return false;
	}
	return true;
}
// Se hace la conversion mientras se escribe la cantidad
function typeamountConverter() {	
	var amountValue = document.getElementById("amountConverter");
	var cantPuntos = amountValue.value.split('.').length -1;
	
	if (amountValue.value != "" && undefined != amountValue && cantPuntos < amountValue.value.length) {
		validateDot(cantPuntos, amountValue);
		currentValue = amountValue.value;
		converter(amountValue.value.replace(/,/g, ""));
	} else {
		cleanInputs();
	}

	var resultValue = exchangeResult;
	resultValue = resultValue.replace(/,/g, "");

	resultAmount.value = parseInt(resultValue);
	resultAmount.innerHTML = exchangeResult;
	getActiveExchangeRate();
	

}

function validateDot(cantPuntos, amountValue){
	if (cantPuntos >= 2) {
		amountValue.value = currentValue;
	}	
}

// Se envia el monto obtenido mientras escriben
function converter(amountValue) {

	if (isLocalExchange) {
		// si es el cambio a venta
		validateExchangeSell(amountValue);		
	} else {
		// si el cambio es por compra
		validateExchangeBuy(amountValue);
}
}

function validateExchangeBuy(amountValue) {
	if (isDollar) {
		// valida si el cambio es en dolares
		exchangeResult = exchangeRateFormatConverter(amountValue * deleteComa(currentExchangeRate.buyUSD), decimalLength(currentExchangeRate.buyUSD));
	} else {
		// valida si el cambio es en euros
		exchangeResult = exchangeRateFormatConverter(amountValue * deleteComa(currentExchangeRate.buyEUR), decimalLength(currentExchangeRate.buyEUR));
	}
}

function validateExchangeSell(amountValue) {
	if (isDollar) {
		// valida si el cambio es en dolares
		exchangeResult = exchangeRateFormatConverter(amountValue / deleteComa(currentExchangeRate.sellUSD), decimalLength(currentExchangeRate.sellUSD));
	} else {
		// valida si el cambio es en euros
		exchangeResult = exchangeRateFormatConverter(amountValue / deleteComa(currentExchangeRate.sellEUR), decimalLength(currentExchangeRate.sellEUR));
	}
}

function deleteComa(str){
	str = str.replace(/,/g, "");
	return str;
}