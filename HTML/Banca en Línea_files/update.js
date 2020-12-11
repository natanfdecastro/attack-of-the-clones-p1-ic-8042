//browser-update.org notification script, <browser-update.org>
//Copyright (c) 2007-2015, MIT Style License <browser-update.org/LICENSE.txt>
//It is RECOMMEDED to directly link to this file and not to use a local copy
//because we update and maintain the detection code
var $buo = function(op,test) {
var jsv=18;
var n = window.navigator,b;
this.op=op||{};
//options DerGer4etZ4elt!
this.op.l = op.l||(n.languages ? n.languages[0] : null) || n.language || n.browserLanguage || n.userLanguage||document.documentElement.getAttribute("lang")||"en";
var ll=this.op.l.substr(0,2);
this.op.vsakt = {i:11,f:38,o:28,s:8,n:20,c:42};
this.op.vsdefault = {i:9,f:35,o:12.1,s:6.1,n:12,c:40};
this.op.vsmin={i:6,f:5,o:12,s:5.1,n:12};
var myvs=op.vs||{};
this.op.vs =op.vs||this.op.vsdefault;
for (b in this.op.vsakt) {
    if (this.op.vs[b]>=this.op.vsakt[b])
        this.op.vs[b]=this.op.vsakt[b]-0.2;
    if (!this.op.vs[b])
        this.op.vs[b]=this.op.vsdefault[b];
    if (this.op.vs[b]<this.op.vsmin[b])
        this.op.vs[b]=this.op.vsmin[b];      
}
if (op.reminder<0.1 || op.reminder===0)
    this.op.reminder=0;
else
    this.op.reminder=op.reminder||24;
this.op.reminderClosed=op.reminderClosed||(24*7);
this.op.onshow = op.onshow||function(o){};
this.op.onclick = op.onclick||function(o){};
this.op.onclose = op.onclose||function(o){};
this.op.url= op.url||"//browser-update.org/update-browser.html#"+jsv+":"+(location.hostname||"x");
if (op.l)
	this.op.url= op.url||"//browser-update.org/"+ll+"/update-browser.html#"+jsv+":"+(location.hostname||"x");
this.op.pageurl = op.pageurl || window.location.hostname || "unknown";
this.op.newwindow=(op.newwindow!==false);

this.op.test=test||op.test||false;
if (window.location.hash=="#test-bu")
    this.op.test=true;
/*
if (op.exp && !this.op.test  && Math.round(Math.random()*100)<1) {
    var ix = new Image();
    ix.src="//browser-update.org/uas.php";
}
*/

function getBrowser(ua_str) {
    var n,v,t,ua=ua_str||navigator.userAgent;
    var names={i:'Internet Explorer',f:'Firefox',o:'Opera',s:'Apple Safari',n:'Netscape Navigator', c:"Chrome", x:"Other"};
    if (/bot|googlebot|facebook|slurp|wii|silk|blackberry|maxthon|maxton|mediapartners|dolfin|dolphin|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|konqueror|rekonq|symbian|webos|coolnovo|blackberry|bb10|RIM|PlayBook|PaleMoon|QupZilla|YaBrowser/i.test(ua)) n="x";
    else if (/Trident.*rv:(\d+\.\d+)/i.test(ua)) n="i";
    else if (/Trident.(\d+\.\d+)/i.test(ua)) n="io";
    else if (/MSIE.(\d+\.\d+)/i.test(ua)) n="i";
    else if (/Edge.(\d+\.\d+)/i.test(ua)) n="i";
    else if (/OPR.(\d+\.\d+)/i.test(ua)) n="o";
    else if (/Chrome.(\d+\.\d+)/i.test(ua)) n="c";
    else if (/Firefox.(\d+\.\d+)/i.test(ua)) n="f";
    else if (/Version.(\d+.\d+).{0,10}Safari/i.test(ua))	n="s";
    else if (/Safari.(\d+)/i.test(ua)) n="so";
    else if (/Opera.*Version.(\d+\.\d+)/i.test(ua)) n="o";
    else if (/Opera.(\d+\.?\d+)/i.test(ua)) n="o";
    else if (/Netscape.(\d+)/i.test(ua)) n="n";
    else return {n:"x",v:0,t:names[n]};
    
    var v= parseFloat(RegExp.$1);
    var donotnotify=false;
    //do not notify ver old systems since their is no up-to-date browser available
    if (/windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(ua)) donotnotify="oldOS";
    
    //do not notify firefox ESR
    if (n=="f" && (Math.round(v)==24 || Math.round(v)==31))
        donotnotify="ESR";
    //do not notify opera 12 on linux since it is the latest version
    if (/linux|x11|unix|bsd/.test(ua) && n=="o" && v>12) 
        donotnotify="Opera12Linux";
    
    if (n=="x") return {n:"x",v:v||0,t:names[n],donotnotify:donotnotify};
    

    if (n=="so") {
        v=((v<100) && 1.0) || ((v<130) && 1.2) || ((v<320) && 1.3) || ((v<520) && 2.0) || ((v<524) && 3.0) || ((v<526) && 3.2) ||4.0;
        n="s";
    }
    if (n=="i" && v==7 && window.XDomainRequest) {
        v=8;
    }
    if (n=="io") {
        n="i";
        if (v>6) v=11;
        else if (v>5) v=10;
        else if (v>4) v=9;
        else if (v>3.1) v=8;
        else if (v>3) v=7;
        else v=9;
    }	
    return {n:n,v:v,t:names[n]+" "+v,donotnotify:donotnotify};
}

this.op.browser=getBrowser();
if (!this.op.test && (!this.op.browser || !this.op.browser.n || this.op.browser.n=="x" || this.op.browser.donotnotify!==false || (document.cookie.indexOf("browserupdateorg=pause")>-1 && this.op.reminder>0) || this.op.browser.v>this.op.vs[this.op.browser.n]))
    return;


if (!this.op.test  && Math.round(Math.random()*100)<1) {
    var i = new Image();
    i.src="//browser-update.org/viewcount.php?n="+this.op.browser.n+"&v="+this.op.browser.v + "&p="+ escape(this.op.pageurl) + "&jsv="+jsv+ "&inv="+this.op.v+"&vs="+myvs.i+","+myvs.f+","+myvs.o+","+myvs.s;
}

function setCookie(hours) {
    var d = new Date(new Date().getTime() +1000*3600*hours);
    document.cookie = 'browserupdateorg=pause; expires='+d.toGMTString()+'; path=/';
}
if (this.op.reminder>0) {
    setCookie(this.op.reminder);
}

var languages = "xx,jp,sl,id,uk,rm,da,ca,sv,hu,fa,gl";
if (languages.indexOf(ll)>0)
    this.op.url="//browser-update.org/update.html#"+jsv+"@"+(location.hostname||"x");
var tar="";
if (this.op.newwindow)
    tar=' target="_blank"';

function busprintf() {
    var args=arguments;
    var data = args[ 0 ];
    for( var k=1; k<args.length; ++k ) {
        data = data.replace( /%s/, args[ k ] );
    }
    /* 
     * Muesta un texto plano en lugar del globo 
     * cuando el navegador es inferir a IE8.
     * Variable balloonMessage declarada en commonErrorBalloon.jsp 
     * */
    document.getElementById("balloonId").className = "balloonDisplay";
    document.getElementById("triangleId").className = "balloonDisplay";
    document.getElementById("whiteTriangleId").className = "balloonDisplay";
    
    document.getElementById("noBalloonMessage").innerHTML = balloonMessage;
    document.getElementById("noBalloonMessage").style.display = "block";
  
    return data;
}

var t = 'Estimado cliente. Debido a nuestro proceso de mejora continua, <a%s>le invitamos a realizar la actualizaci&oacute;n de su navegador por una versi&oacute;n de Internet Explorer m&aacute;s reciente. Muchas gracias</a >';
if (ll=="en")
t = 'Dear Customer. Due to our continuous improvement process,<a%s> we invite you to upgrade your browser to a newer version of Internet Explorer. Thank you.</a >';
else if (ll=="es")
t = 'Estimado cliente. Debido a nuestro proceso de mejora continua, <a%s>le invitamos a realizar la actualizaci&oacute;n de su navegador por una versi&oacute;n de Internet Explorer m&aacute;s reciente. Muchas gracias</a >';

if (op.text)
    t = op.text;
if (op["text_"+ll])
    t = op["text_"+ll];

this.op.text=busprintf(t,this.op.browser.t,' href="'+this.op.url+'"'+tar);

var div = document.createElement("div");
this.op.div = div;
div.id="buorg";
div.className="buorg";
div.innerHTML= '<div>' + this.op.text + '<div id="buorgclose">&times;</div></div>';

var sheet = document.createElement("style");
//sheet.setAttribute("type", "text/css");
var style = ".buorg {position:absolute;position:fixed;z-index:111111;\
width:100%; top:0px; left:0px; \
border-bottom:1px solid #A29330; \
background:#FDF2AB no-repeat 13px center url('http://browser-update.org/img/dialog-warning.gif');\
text-align:left; cursor:pointer; \
font-family: Arial,Helvetica,sans-serif; color:#000; font-size: 12px;}\
.buorg div { padding:5px 36px 5px 40px; } \
.buorg a,.buorg a:visited  {color:#E25600; text-decoration: underline;}\
#buorgclose { position: absolute; right: 6px; top:-2px; height: 20px; width: 12px; font-weight: bold;font-size:18px; padding:0; }";
document.body.insertBefore(div,document.body.firstChild);
document.getElementsByTagName("head")[0].appendChild(sheet);
try {
    sheet.innerText=style;
    sheet.innerHTML=style;
}
catch(e) {
    try {
        sheet.styleSheet.cssText=style;
    }
    catch(e) {
        return;
    }
}
var me=this;
div.onclick=function(){
    if (me.op.newwindow)
        window.open(me.op.url,"_blank");
    else
        window.location.href=me.op.url;
    setCookie(me.op.reminderClosed);
    me.op.onclick(me.op);
    return false;
};
try {
div.getElementsByTagName("a")[0].onclick = function(e) {
    var e = e || window.event;
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
    me.op.onclick(me.op);
    return true;
};
}
catch(e) {}

var hm=document.getElementsByTagName("html")[0]||document.body;
this.op.bodymt = hm.style.marginTop;
hm.style.marginTop = (div.clientHeight)+"px";
(function(me) {
            document.getElementById("buorgclose").onclick = function(e) {
                var e = e || window.event;
                if (e.stopPropagation) e.stopPropagation();
                else e.cancelBubble = true;
                me.op.div.style.display = "none";
                hm.style.marginTop = me.op.bodymt;
                me.op.onclose(me.op);
                setCookie(me.op.reminderClosed);
                return true;
            };
})(me);

op.onshow(this.op);

};

var $buoop = $buoop||{};
$bu=$buo($buoop);
