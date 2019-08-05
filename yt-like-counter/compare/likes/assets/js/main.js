
         var key = "AIzaSyAzRmWRQKbQpnAIH-Ws0ruzgxafjECdBCg";
         var video1 = "";
         var video2= "";

            setInterval(like1, 2500);
            setInterval(like2, 2500);
            setInterval(diff, 2500);

            /*getKey();
            setInterval(getKey, 20000)

      function getKey() {
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
           if (this.readyState == 4 && this.status == 200) {
               key = this.responseText;

               $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=' + video1+ '&key=' + key, function(data) {
                  $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=' + video2+ '&key=' + key, function(data2) {
                   document.getElementById("title1").innerHTML = data.items[0].snippet.title;
                   document.getElementById("image1").src = 'https://img.youtube.com/vi/'+video1+'/maxresdefault.jpg'
                   document.getElementById("title2").innerHTML = data2.items[0].snippet.title;
                   document.getElementById("image2").src = 'https://img.youtube.com/vi/'+video2+'/maxresdefault.jpg'
               })
            })

           }
       };
       xhttp.open("GET", "https://api.shaz.lol/counters/getKey.php", true);
       xhttp.send();
   }*/

   document.addEventListener("DOMContentLoaded", function(){
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=' + video1+ '&key=' + key, function(data) {
                  $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=' + video2+ '&key=' + key, function(data2) {
                   document.getElementById("title1").innerHTML = data.items[0].snippet.title;
                   document.getElementById("image1").src = 'https://img.youtube.com/vi/'+video1+'/maxresdefault.jpg'
                   document.getElementById("title2").innerHTML = data2.items[0].snippet.title;
                   document.getElementById("image2").src = 'https://img.youtube.com/vi/'+video2+'/maxresdefault.jpg'
               })
            })

            like1();
            like2();
            diff();
        });

   function like1() {
       $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + video1 + '&key=' + key, function(data) {
           $('#count1').html(data.items[0].statistics.likeCount);
       });
   }
   function like2() {
       $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + video2 + '&key=' + key, function(data) {
           $('#count2').html(data.items[0].statistics.likeCount);
       });
   }

   function diff() {
       $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + video1 + '&key=' + key, function(data) {
         $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=statistics&id=' + video2 + '&key=' + key, function(data2) {
           $('#count3').html(Math.abs(data.items[0].statistics.likeCount - data2.items[0].statistics.likeCount));
         })
       });
   }

   function search1() {
       var replaceurl = document.getElementById('search1').value.replace("%20", " ");
       $.getJSON('https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&type=video&q=' + replaceurl + '&key=' + key, function(data) {
         window.location.href = '/yt-like-counter/compare/likes/?q1=' + data.items[0].id.videoId + '&q2=' + video2;
       })
   }

   function search2() {
       var replaceurl = document.getElementById('search2').value.replace("%20", " ");
       $.getJSON('https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&type=video&q=' + replaceurl + '&key=' + key, function(data) {
         window.location.href = '/yt-like-counter/compare/likes/?q1=' + video1 + '&q2=' + data.items[0].id.videoId;
       })
   }


   $(document).ready(function() {
       $('#searchbutton1').click(function() {
           search1();
       });
       $('#searchbutton2').click(function() {
           search2();
       });
   });

   document.getElementById("search1").addEventListener("keyup", function(event) {
       if (event.keyCode === 13) {
           event.preventDefault();
           search1();
       }
   })

   document.getElementById("search2").addEventListener("keyup", function(event) {
       if (event.keyCode === 13) {
           event.preventDefault();
           search2();
       }
   })

   function getUrlVars() {
       var vars = {};
       var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
           vars[key] = value
       });
       return vars
   }

   if (!getUrlVars()["q1"]) {
    video1 = "dBxOYE2j55U";
} else {
    video1 = getUrlVars()["q1"];
}

if (!getUrlVars()["q2"]) {
    video2 = "By_Cn5ixYLg";
} else {
    video2 = getUrlVars()["q2"];
}

if (!getUrlVars()["q1"] && !getUrlVars()["q2"]) {
    $(document).ready(function() {
        if (window.location.href.indexOf("?") > -1) {
            history.pushState(null, '', window.location.href + '&q1=' + video1 + '&q2=' + video2);
        } else {
            history.pushState(null, '', window.location.href + '?q1=' + video1 + '&q2=' + video2);
        }
    });
}
