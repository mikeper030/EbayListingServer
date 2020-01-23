var express = require('express');
var router = express.Router();
var finishLineScraper = require('../scrapers/finishline_scraper');

router.post('/',async function(req, res, next) {
    res.header('Content-Type: application/json');
    let url = req.body.url;
    let provider = req.body.provider;
    console.log(url);
    res.send("error");
    var result = {};
    if(url==="undefined"||provider==="undefined"){
        result={"Error":"missing request params"};
        res.send(result);
    }
    if (provider==="finishline"){
       try {
           console.log("processing finishline")
           result = await finishLineScraper.newRequest(url);
           res.type('json').send(JSON.stringify(result, null, 2) + '\n');
       }catch (e) {
           console.log(e)
       }

    }

});

module.exports = router;
