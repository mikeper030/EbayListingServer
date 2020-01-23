var express = require('express');
var router = express.Router();
var finishLineScraper = require('../scrapers/finishline_scraper');
const cheerio = require('cheerio');
const axios = require('axios');

router.post('/',function(req, res, next) {
    res.header('Content-Type: application/json');
    let url = req.body.url;

    console.log(url);
    var result={
        url:url,
        img:"",
        sizes:[]
    };

    try {
        axios.get(url)
            .then((response) => {
                let $ =  cheerio.load(response.data);
                $('#productSizes button').each(function (i,el) {
                    var size={};
                    size.size=($(el).text().trim());
                    let classAttr=$(el).attr('class');
                    size.available=!classAttr.includes('disabled');
                    result.sizes.push(size);

                    console.log($(el).attr('class'));
                    console.log(($(el).text().trim()));
                })
                let style= $('#styleColors').children().eq(1).html().trim().replace("- ","");
                let s =style.replace("&#xA0;","_");

                let img="//images.finishline.com/is/image/FinishLine/"+s+"_P1?$default$&wid=671&bgc=eeeeee"
                result.img=img;
                res.type('json').send(JSON.stringify(result, null, 2) + '\n');



            }).catch(function (e) {
            console.log(e);

        });
    }catch (e) {
        console.log(e);

        res.send(e);
    }


});

module.exports = router;
