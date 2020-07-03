const https = require("https");
const http = require('http');
const url = require("url");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var express = require("express")
var router = express.Router()

function scrap(params){

    const virtualConsole = new jsdom.VirtualConsole();
    // const dom = new JSDOM(``, {
    //     url: "https://www.univ-orleans.fr/EDTWeb/edt",
    //     referrer: "https://www.univ-orleans.fr/EDTWeb/edt",
    //     contentType: "text/html",
    //     includeNodeLocations: true,
    //     storageQuota: 10000000,
    //     runScripts: "dangerously",
    //     resources: "usable",
    //     virtualConsole
    //
    // });

    let options = {
        runScripts: "dangerously",
        resources: "usable",
        virtualConsole}
    const dom = JSDOM.fromURL("https://www.univ-orleans.fr/EDTWeb/edt",options).then(dom => {
        console.log(dom.serialize())});
    virtualConsole.on("error", (msg) => { console.debug("vr:"+msg) });
    virtualConsole.on("warn", (msg) => { console.debug("vr:"+msg)  });
    virtualConsole.on("info", (msg) => { console.debug("vr:"+msg)  });
    virtualConsole.on("dir", (msg) => { console.debug("vr:"+msg)  });
}

router.get("/", function (request, res, next){
    var params = request.query
    scrap(params);
    let output = {test:"test"};
    output['params'] = params

    res.json(output)
})


module.exports = router