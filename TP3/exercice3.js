var data;

global.XMLHttpRequest = require('xhr2');

function load() {
    //var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "slides.json");
    xhttp.onload = function() {
        data = JSON.parse(this.responseText);
    };
    xhttp.send();
}

load();

function load_slide(url) {
    var div = document.getElementById("MAIN");
    if (div.firstChild) div.removeChild(div.firstChild);
    var frame = document.createElement("iframe");
    frame.src = url;
    frame.style.height = "100%";
    frame.style.width = "100%";
    div.appendChild(frame);
}

function paly() {
    var slides = data.slides;
    for (var slide in slides) {
        console.log(slide);
        var time = slide['time'] * 1000;
        var url = slide['url'];
        setTimeout(load_slide, time, url);
    }
}