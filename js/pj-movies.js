window.addEventListener("load", PJMoviesMain, false);

function PJMoviesMain() {
    var movieID = null;
    var meta = null;

    if(window.location.toString().match(/rottentomatoes/)) {
        meta = document.querySelector("meta[name='movieID']");
        movieID = meta.getAttribute("content")
    }else{
        meta = document.querySelector("meta[property='pageId']");
        movieID = meta.getAttribute("content");

        // Kill the 't' chars from IMDB ids
        movieID = movieID.replace(/t/g,'');

    }

    if(movieID) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://patrickmjones.com/blog/wp-content/plugins/pj-movies/service.php?q='+movieID);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                if(window.location.toString().match(/rottentomatoes/)) {
                    // ### RottenTomatoes
                    var scoreNodeOG = document.querySelector(".audience-score.meter");
                    var scoreNode = scoreNodeOG.cloneNode(true);
                    var meter = scoreNode.querySelector(".meter-tomato");

                    if(data.seen) {
                        if(data.score > 2) {
                            meter.classList.remove("spilled");
                            meter.classList.add("upright");
                        }else{
                            meter.classList.remove("upright");
                            meter.classList.add("spilled");
                        }
                        scoreNode.querySelector(".meter-value .superPageFontColor").innerHTML = data.score + "/5";
                        var link = scoreNode.querySelector("a");
                        link.href = data.url;
                        link.setAttribute("target", "_blank");
                        
                    }else{
                        meter.classList.remove("upright");
                        meter.classList.remove("spilled");
                        scoreNode.querySelector(".meter-value .superPageFontColor").innerHTML = "N/A";
                    }

                    scoreNode.querySelector(".media-body > .superPageFontColor").innerHTML = "Patrick";

                    scoreNodeOG.parentNode.insertBefore(scoreNode, scoreNodeOG.nextSibling);
                    // ### End RottenTomatoes
                }else{
                    // ### IMDB

                    // ### End IMDB
                }
                
            }
            else {
                // Something not good happened O.O
            }
        };
        xhr.send();
    }    
}

