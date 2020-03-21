var Reddit = {};
var post = "";

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-119417406-7');

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value
    });
    return vars
}

function search() {
    var value = document.getElementById('search').value;
    var split = value.split(".com/")
    var split2 = split[1].split("/comments/")

    window.location.href = '/reddit-upvote-count/?p='+split2[0].replace("/", "--")+'$$'+split2[1].replace("/", "--");
}

if(!getUrlVars()["p"]){
    post = "r--movies$$62sjuh--the_senate_upvote_this_so_that_people_see_it_when";
} else {
	post = getUrlVars()["p"];
}

setInterval(function(){
    var videoo = post.split("$$")

    $.getJSON('https://csgo.cx/https://www.reddit.com/'+videoo[0].replace("--", "/")+'/comments/'+videoo[1].replace("--", "/")+"/.json?limit=1", function(data) {
        Reddit.UpdateManager.updateUpvote(data[0].data.children[0].data.ups)
        Reddit.UpdateManager.updateComment(data[0].data.children[0].data.num_comments)
    })
}, 2000);

window.onload = () => {
    var videoo = post.split("$$")
    Reddit.UrlManager.addPost();
    Reddit.UrlManager.addTheme();

    if (getUrlVars()["theme"] == "0") Reddit.ThemeManager.load(0)
    if (getUrlVars()["theme"] == "1") Reddit.ThemeManager.load(1)
    if (getUrlVars()["theme"] == "2") Reddit.ThemeManager.load(2)
    if (getUrlVars()["theme"] == "3") Reddit.ThemeManager.load(3)

    $.getJSON('https://csgo.cx/https://www.reddit.com/'+videoo[0].replace("--", "/")+'/comments/'+videoo[1].replace("--", "/")+"/.json?limit=1", function(data) {
        Reddit.UpdateManager.updateTitle(data[0].data.children[0].data.title)
    })

    $(".links").load("/assets/global/other.html");

    $('#searchbutton').click(function() {
        search();
    });
}

document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search();
    }
})



Reddit.UpdateManager = {
    updateTitle: function(a) {
        document.querySelector("#title").innerText = a;
    },
    
    updateUpvote: function(a) {
        document.querySelector("#upvote").innerHTML = a;
    },

    updateComment: function(a) {
        document.querySelector("#comment").innerHTML = a;
    },
};

Reddit.UrlManager = {
	addPost: function() {
		if (!getUrlVars()["p"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&p='+post)
			} else {
				history.pushState(null,'',window.location.href+'?p='+post);
			}
		}
	},
	addTheme: function() {
		if (!getUrlVars()["theme"]) {
			if (window.location.href.indexOf("?")>-1){
				history.pushState(null,'',window.location.href+'&theme=0')
			} else {
				history.pushState(null,'',window.location.href+'?theme=0');
			}
		}
	}
};




Reddit.ThemeManager = {
    load: function(theme) {
        switch(theme) {
            case 0: {
                $("html").css("background-color", "transparent");
                $("ul").css("background-color", "transparent");
                $(".odometer").css("color", "#24292E");
                $(".title").css("color", "#000000");
                $("#nav").css("color", "#000000");
                $(".odometer").removeClass('rainbow-text');
                $(".title").removeClass('rainbow-text');
                $("#nav").removeClass('rainbow-text');
                $("#square-dark").css("outline", "none")
                $("#square-white").css("outline-style", "solid")
                $("#square-white").css("outline-color", "black")
                $("#square-rainbow-black").css("outline", "none")
                $("#square-rainbow-white").css("outline", "none")
                
                if (window.location.href.indexOf("theme=0") > -1) {
                    return;
                } else {
                    if (window.location.href.indexOf("?") > -1) {
                        if (window.location.href.indexOf("theme=1") > -1) {
                            history.pushState(null, '', window.location.toString().replace('&theme=1', '&theme=0'));
                        }
                        if (window.location.href.indexOf("theme=2") > -1) {
                            history.pushState(null, '', window.location.toString().replace('&theme=2', '&theme=0'));
                        }
                        if (window.location.href.indexOf("theme=3") > -1) {
                            history.pushState(null, '', window.location.toString().replace('&theme=3', '&theme=0'));
                        }
                    } else {
                        if (window.location.href.indexOf("theme=1") > -1) {
                            history.pushState(null, '', window.location.toString().replace('?theme=1', '?theme=0'));
                        }
                        if (window.location.href.indexOf("theme=2") > -1) {
                            history.pushState(null, '', window.location.toString().replace('?theme=2', '?theme=0'));
                        }
                        if (window.location.href.indexOf("theme=3") > -1) {
                            history.pushState(null, '', window.location.toString().replace('?theme=3', '?theme=0'));
                        }
                    }
                }
            } break;
            
            case 1: {
                $("html").css("background-color", "black");
                $("ul").css("background-color", "black");
                $(".odometer").css("color", "#808080");
                $(".title").css("color", "#808080");
                $("#nav").css("color", "#808080");
                $(".odometer").removeClass('rainbow-text');
                $(".title").removeClass('rainbow-text');
                $("#nav").removeClass('rainbow-text');
                $("#square-dark").css("outline-style", "solid")
                $("#square-dark").css("outline-color", "white")
                $("#square-white").css("outline", "none")
                $("#square-rainbow-black").css("outline", "none")
                $("#square-rainbow-white").css("outline", "none")

                if (window.location.href.indexOf("?") > -1) {
                    if (window.location.href.indexOf("theme=0") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=0', '&theme=1'));
                    }
                    if (window.location.href.indexOf("theme=2") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=2', '&theme=1'));
                    }
                    if (window.location.href.indexOf("theme=3") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=3', '&theme=1'));
                    }
                } else {
                    if (window.location.href.indexOf("theme=0") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=0', '?theme=1'));
                    }
                    if (window.location.href.indexOf("theme=2") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=2', '?theme=1'));
                    }
                    if (window.location.href.indexOf("theme=3") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=3', '?theme=1'));
                    }
                }
            } break;

            case 2: {
                $("html").css("background-color", "black");
                $("ul").css("background-color", "black");
                $(".odometer").addClass('rainbow-text');
                $(".title").addClass('rainbow-text');
                $("#nav").addClass('rainbow-text');
                $("#square-dark").css("outline", "none")
                $("#square-white").css("outline-style", "solid")
                $("#square-white").css("outline-color", "black")
                $("#square-rainbow-black").css("outline", "none")
                $("#square-rainbow-white").css("outline", "none")

                if (window.location.href.indexOf("?") > -1) {
                    if (window.location.href.indexOf("theme=1") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=1', '&theme=2'));
                    }
                    if (window.location.href.indexOf("theme=0") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=0', '&theme=2'));
                    }
                    if (window.location.href.indexOf("theme=3") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=3', '&theme=2'));
                    }
                } else {
                    if (window.location.href.indexOf("theme=1") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=1', '?theme=2'));
                    }
                    if (window.location.href.indexOf("theme=0") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=0', '?theme=2'));
                    }
                    if (window.location.href.indexOf("theme=3") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=3', '?theme=2'));
                    }
                }

            } break;

            case 3: {
                $("html").css("background-color", "transparent");
                $("ul").css("background-color", "transparent");
                $(".odometer").addClass('rainbow-text');
                $(".title").addClass('rainbow-text');
                $("#nav").addClass('rainbow-text');
                $("#square-dark").css("outline", "none")
                $("#square-rainbow-white").css("outline-style", "solid")
                $("#square-rainbow-white").css("outline-color", "black")
                $("#square-white").css("outline", "none")
                $("#square-rainbow-black").css("outline", "none")

                if (window.location.href.indexOf("?") > -1) {
                    if (window.location.href.indexOf("theme=1") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=1', '&theme=3'));
                    }
                    if (window.location.href.indexOf("theme=0") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=0', '&theme=3'));
                    }
                    if (window.location.href.indexOf("theme=2") > -1) {
                        history.pushState(null, '', window.location.toString().replace('&theme=2', '&theme=3'));
                    }
                } else {
                    if (window.location.href.indexOf("theme=1") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=1', '?theme=3'));
                    }
                    if (window.location.href.indexOf("theme=0") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=0', '?theme=3'));
                    }
                    if (window.location.href.indexOf("theme=2") > -1) {
                        history.pushState(null, '', window.location.toString().replace('?theme=2', '?theme=3'));
                    }
                }
            } break;
        }
    }
};

