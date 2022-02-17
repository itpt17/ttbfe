import axios from 'axios';

function RequireTimeTable(url){
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    console.log(req.status);
    console.log(req.responseText);
}

export {RequireTimeTable}