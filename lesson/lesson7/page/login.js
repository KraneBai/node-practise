window.onload = function () {
    XMLHttp = new XMLHttpRequest();
    XMLHttp.open('GET', '/getData', true)
    XMLHttp.send(null);
    XMLHttp.onreadystatechange = function () {
        if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
            console.log(XMLHttp.responseText)
            console.log(typeof XMLHttp.responseText)
        }
    }
}