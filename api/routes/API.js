
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

const https = require("https");
const http = require('http');
const url = require("url");

const ical = require("ical.js")

let axios = require('axios');

let cheerio = require('cheerio');
let jsonframe = require('jsonframe-cheerio');

const fs = require('fs')

//todo: Fav Salle

var express = require("express")
var router = express.Router()



function parseRawIcal(data){

    var output = {
        salles: {}
    }


    try{

        let sdata = data.rawdata
        // fs.writeFile('ICALfile', sdata, ()=>{})
        // let sical = ICAL.stringify(data.rawdata)
        let jical = ICAL.parse(sdata)
        // console.debug(jical)

        let comp = new ICAL.Component(jical);
        let vevent = comp.getFirstSubcomponent("vevent");

        let event = new ICAL.Event(vevent);

        //20190906T113000Z prog imp

        // 23/10/2019 13h00

        let datetime = new ICAL.Time({
            year: 2019,
            month: 10,
            day: 23,
            hour:13,
            isDate: false
        })

        let datetimeend = new ICAL.Time({
            year: 2019,
            month: 10,
            day: 24,
            hour:0,
            isDate: false
        })



        // Sun Dec 17 1995 03:24:00 GMT...
        // let it = event.iterator(event.startDate)

        // element est un event ici
        comp.getAllSubcomponents().forEach(element =>{
            // console.debug("-----------------")

            let ev = new ICAL.Event(element)
            // console.debug(ev.location)

            let hor = {start:ev.startDate.toString(), end:ev.endDate.toString()}

            let t = new ICAL.Time(ev.startDate)

            // console.debug('TEMPS : '+t.hour);

            // -1 = < et 1 = >
            let b = datetime.compare(ev.endDate)
            let b2 = datetimeend.compare(ev.endDate)


            if(b === -1 && b2 === 1){


                // console.debug(datetime.toString()+" et "+ev.endDate.toString()+" = "+b)
                // console.debug(ev.location+" "+ev.toString()+"\n")
                console.debug(output.salles.hasOwnProperty(ev.location)+"\n")
                // if(mp.has(ev.location)){
                if(output.salles.hasOwnProperty(ev.location)){
                    // let horaires = mp.get(ev.location)
                    let horaires = output.salles[ev.location]

                    // console.debug(mp.get(ev.location)+" et "+mp.has(ev.location))
                    horaires.push(hor)

                    output.salles[ev.location] = horaires
                    // console.debug(ev.location+" et "+horaires.toString())
                    // console.debug(JSON.stringify(output.salles[ev.location])+" -"+ev.location+"-")


                }else{

                    // console.debug("sinon : "+ev.location)
                    // mp.set(ev.location, horaires)

                    // output.salles[ev.location] = [hor]
                    console.debug("BBBBBBBBBBBBBBBBBBBBb")

                    output.salles[ev.location] = ["azaaaaaaaaaaaaaaaaaaaaaaaa"]

                    // output.salles["SALLES"] = "AAAA"

                }

            }else{
                if(!output.salles.hasOwnProperty(ev.location)){

                    // console.debug(Object.keys(output)+" : "+ev.location)
                    // console.debug(output)
                    output.salles[ev.location] = []
                }
            }
        })
        // let s = Array.from(mp.keys())
        let stri = datetime.toString()
        let testTIME = ICAL.Time.fromDateTimeString(stri)
        /*output = {
            // salles : s.map(el=>({name : el}))
        }*/

        output["Test"] = ""



    }catch (e) {
        console.error(e)
    }
    return output
}

function fetchComposantes() {

    console.debug("AXIOS")
    let composantes = []




    return new Promise(((resolve, reject) => {

        axios('https://www.univ-orleans.fr/EDTWeb/').then((response) => {
            fs.writeFileSync('gh.html', response.data);
            if (response.status === 200) {
                let $ = cheerio.load(response.data);
                // jsonframe($);
                // console.debug(Object.keys($('[name=composantes]').children()[24]))
                // console.debug( $('[name=composantes] option').length)
                $('[name=composantes] option').each((i,e) => {
                    console.log($(e).val())

                    console.log($(e).text())

                    composantes.push({key:$(e).val(), value:$(e).text()})
                });

                resolve(composantes)

            }
        }).catch(reason => reject("promise rejected : "+reason));
    }))

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
    fetchYearOffline().then((data)=>{

            let out = parseRawIcal(data)
            fetchComposantes().then((d)=>{
                out['composantes'] = d;
                res.json(out)
            })

            console.debug(out)

        } );
        // fetchYear().then((data)=>{ready = 1; parseRawIcal(data) ; res.json(data)})
        console.debug(request.query.salle)




    // res.send("It's working : " + ready)

})



module.exports = router