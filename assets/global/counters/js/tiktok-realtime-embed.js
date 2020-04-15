window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');

var ok;

window.onload = () => {
    $.getJSON('https://tiktok.livecounts.io/single/'+user, function(data) {
        document.querySelector('#user_pic').src = data.avatar
        document.querySelector('#name').innerHTML = data.username
        document.querySelector('#odometer').innerHTML = data.followCount
    })
}

setInterval(function() {
    $.getJSON('https://tiktok.livecounts.io/single/'+user, function(data) {
        if (!ok) {
            document.querySelector('#user_pic').src = data.avatar
            document.querySelector('#name').innerHTML = data.username
            ok = true;  
        }
        document.querySelector('#odometer').innerHTML = data.followCount
    })
}, 2000)

//---------------------------------------------------------------//
//  ______ _    _ _   _  _____ _______ _____ ____  _   _  _____  //
// |  ____| |  | | \ | |/ ____|__   __|_   _/ __ \| \ | |/ ____| //
// | |__  | |  | |  \| | |       | |    | || |  | |  \| | (___   //
// |  __| | |  | | . ` | |       | |    | || |  | | . ` |\___ \  //
// | |    | |__| | |\  | |____   | |   _| || |__| | |\  |____) | //
// |_|     \____/|_| \_|\_____|  |_|  |_____\____/|_| \_|_____/  //
//                                                        		 //
//---------------------------------------------------------------//                                                            

var user = "";

if (getUrlVars()["t"] == "1") {
	document.getElementById('style').href='../../../assets/global/odometer-fast.css';
}

if (getUrlVars()["o"] == "1" && getUrlVars()["t"] == "1") {
    $('head').append('<link rel="stylesheet" type="text/css" href="/assets/global/odometer-2.css">');
    document.getElementById('style').href='../../../assets/global/odometer-fast.css';
}

if (getUrlVars()["o"] == "1") {
	document.getElementById('style').href='../../../assets/global/odometer-fast.css';
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

if (!getUrlVars()["u"]) {
    $(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&u=' + user);
        } else {
            history.pushState(null, '', window.location.href + '?u=' + user);
        }
    });
}

if (!getUrlVars()["o"]) {
	$(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&o=0');
        } else {
            history.pushState(null, '', window.location.href + '?o=0');
        }
    });
}

if (!getUrlVars()["u"]) {
	user = "charlidamelio";
} else {
	user = getUrlVars()["u"];
}