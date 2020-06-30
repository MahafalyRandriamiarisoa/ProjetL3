
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const https = require("https");
const http = require('http');
const url = require("url");

const ical = require("ical.js")

const fs = require('fs')

//todo: Fav Salle

var express = require("express")
var router = express.Router()

var text;


function parseRawIcal(data){

    try{

        let sdata = data.rawdata
        // fs.writeFile('ICALfile', sdata, ()=>{})
        // let sical = ICAL.stringify(data.rawdata)
        let jical = ICAL.parse(sdata)
        // console.debug(jical)

        var comp = new ICAL.Component(jical);
        var vevent = comp.getFirstSubcomponent("vevent");

        var event = new ICAL.Event(vevent)

        //20190906T113000Z prog imp

        let time = new ICAL.Time({
            year: 2019,
            month: 9,
            day: 6,
            isDate: false
        })

        // Sun Dec 17 1995 03:24:00 GMT...
        // let it = event.iterator(event.startDate)

        comp.getAllSubcomponents().forEach(element =>{
            console.debug("-----------------")
            let cmp = new ICAL.Component(element)

            console.debug(cmp)
        })

        // event.iterator()






        // var summary = vevent.getFirstPropertyValue("summary");

        // console.debug(summary)

        // let it = eve

    }catch (e) {
        console.error(e)
    }

}

function fetchYear() {

    let url1 = new URL('https://www.univ-orleans.fr/EDTWeb/export?project=2019-2020&resources=12741&type=ical')


    return new Promise((resolve,reject) =>{


        let output = {ready : 0, rawdata : ''}

        let req = https.get(url1, res => {

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    output = {
                        ready: 1,
                        rawdata: rawData}

                        resolve(output)
                } catch (e) {
                    console.error(e.message);
                    reject("ça marche pas")
                }
            });


        })
        // console.debug(req)
        req.on('error',(err => console.error(err)))
        req.end()
    } )
}

function fetchYearOffline(){

    var data = '';

    var readStream = fs.createReadStream('ICALfile', 'utf8');


    return new Promise(((resolve, reject) => {

        readStream.on('data', function(chunk) {
            data += chunk;
        }).on('end', function() {
            // console.log(data);
            let output = {
                ready: 1,
                rawdata: data
            }
            resolve(output)
        });

        readStream.on('error', (err => reject("promise rejected : "+err)))
    }))

}
router.get("/", function (request, res, next) {

    // var out = fetchYear(res)
    // res.send(out);

    // res.send("API is working properly ")
    // res.send("ITS WORKING")

    /*var url = 'http://www.univ-orleans.fr/EDTWeb/export?project=2019-2020&resources=12741&type=ical';
    // var req = new XMLHttpRequest({mozSystem: true});
    var req = new XMLHttpRequest();


    req.open('GET', url,true);
    req.send();
    req.onreadystatechange = function () {
        console.debug("je passe là");
        if (req.readyState == 4 && req.status == 200) {
            // const type = req.getResponseHeader('Content-Type');
            // }
            // if (type.indexOf("vcs") !== 1) {
            console.debug(res)
        }
    };*/

    ready = 0


    // fetchYear().then((data)=>{ready = 1; parseRawIcal(data) ; res.json(data)})
    fetchYearOffline().then((data)=>{
        parseRawIcal(data) ; res.json(data)
    })



    // res.send("It's working : " + ready)

})



module.exports = router