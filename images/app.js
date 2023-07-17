var productionFolder = "/";
var developmentFolder = ":8000/";

var folderLocation = location.host == 'localhost' ? developmentFolder : productionFolder;
var serverLocation = location.host == 'localhost' ? location.protocol + '//' + location.host + folderLocation : location.protocol + '//' + location.host + folderLocation;
var isMobile = 
{
	Android: function()
	{
		return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function() 
	{
		return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS: function() 
	{
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; 
	},
	iPad: function() 
	{
		return navigator.userAgent.match(/iPad/i) ? true : false;
	},
	Windows: function() 
	{
		return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any: function() 
	{
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
	}
};

jQuery.ajaxSetup ({
    cache: false
});

/* Avoid `console` errors in browsers that lack a console.*/
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
/*
* GLOBAL VARS
*
* Dont't change anything, please
+
*/
var carousels=[];
var mainMenu;
var footer;
var isMobile;
var resizeObservers = [];
var screenSize = {
	'MOBILE':320,
	'TABLET':768,
	'DESKTOP':1024,
	'BIG_DESKTOP':1600
}
var samples;

/*General usage functions*/
function scrollToPosition(position,offset,speed)
{
	speed = speed || 1000;
	offset = offset || 0;
	jQuery("body, html").animate({'scrollTop': position-offset, 'easing': 'easeInOutCubic'}, speed);
};

function scrollToElement($element, offset, speed)
{
	offset = offset || 0;
	speed = speed || 1000

	//jQuery("body, html").animate({'scrollTop': $element.offset().top, 'easing': 'easeInOutCubic'}, speed);
	scrollToPosition($element.offset().top,offset,speed);
};

function notNull(value, error)
{
	if (value == "") {
		return false;
	}
	return true;
};

function isFullname(value)
{
	if(!notNull(value)) return false;
	if (value.indexOf(" ") == -1) return false;
	var temp_array = value.split(" ");
	for (i = 0; i < temp_array.length; i++) {
		if(temp_array[i].length < 2) return false;
	}
	return true;
};

function isEmail(value)
{
	var emailExpression = new RegExp(/^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i);
	return emailExpression.exec(value);
};

function isTelephone(value)
{
	if(!isNull(value)) return false;
	if(value.substr(0,2) == "00") return false;
	if(parseInt(value.substr(2,1)) < 2) return false;
	if(value.length < 10) return false;
	return true;
};

function isState(value) {
	if(!isNull(value)) return false;
	if(value.length < 2) return false;
	return true;
};

function isDate(dateValue)
{
	if (dateValue.value != "") {
		var hoje = new Date();
		var barras = dateValue.split("/");
		if (barras.length == 3)
		{
			dia = barras[0];
			mes = barras[1];
			ano = barras[2];
			resultado = (!isNaN(dia) && (dia > 0) && (dia < 32)) && (!isNaN(mes) && (mes > 0) && (mes < 13)) && (!isNaN(ano) && (ano.length == 4) && (ano >= 1900));
			if (!resultado)	{
				return false;
			}
		} else {
			return false;
		}
		return true;
	}
};

function isPhone(phoneValue){
	exp = /\(\d{2}\)\ \d{4}\-\d{4}/
	return exp.test(phoneValue);
};

function isZipCode(zipCodeValue)
{
	exp = /\d{2}\.\d{3}\-\d{3}/
	return exp.test(zipCodeValue);
};

function isUrl(s)
{
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(s);
};

function replaceUrlParam(param, value)
{
	var url = window.location.href;
	var re = new RegExp("([?|&])" + param + "=.*?(&|$)", "i");

	if (param == 'search') {
		var rp = new RegExp("([?|&])" + 'page' + "=.*?(&|$)", "i");
		url = url.replace(rp, '$1' + 'page' + "=" + '1' + '$2');
	}

	if (url.match(re))
	{
		window.location.href = url.replace(re, '$1' + param + "=" + value + '$2');
	}
	else
	{
		if (url.indexOf('?') == -1)
		{
			window.location.href = url + '?' + param + "=" + value;
		} else
		{
			window.location.href = url + '&' + param + "=" + value;
		}
	}
};

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		if(hash[1] != '')
		{
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
	}
	return vars;
};
function getUrlParam(param) {
    param = param.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + param + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results === null) {
        return null;
    } else {
        return results[1];
    }
}

function getWindowWidth(){
	// return $('body').innerWidth();
	return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}
function getDevice(){
	if(getWindowWidth()>=1600){
		return screenSize.BIG_DESKTOP;
	}else if(getWindowWidth()>=1024){
		return screenSize.DESKTOP;
	}else if(getWindowWidth()>=768){
		return screenSize.TABLET;
	}else{
		return screenSize.MOBILE;
	}
}

function share(url)
{
	if(url == "https://www.pinterest.com/pin/create/button/")
	{
		PinUtils.pinAny();
	}
	else
	{
		var left = (screen.width/2)-(855/2);
		var top = (screen.height/2)-(660/2);
		window.open(url,null,"status=1, width=855, height=660, top="+ top +", left=" + left);
	}
}