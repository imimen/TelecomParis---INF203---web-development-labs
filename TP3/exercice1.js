function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "text.txt", true);
    xhttp.onload = function() {
        document.getElementById("textarea").textContent += this.responseText;
    };
    xhttp.send();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i=0; i<6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function loadDoc2() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "text.txt");
    xhttp.onload = function() {
        var lines = this.responseText.split("<br/>");
        var div = document.getElementById("textarea2");
        var element;
        var color;
        for (var i=0; i<lines.length; i++){
            element = document.createAttribute("P");
            element.textContent = lines[i];
            color = getRandomColor()
            element.style.color = color;
            div.appendChild(element);
        }
    };
    xhttp.send();
}