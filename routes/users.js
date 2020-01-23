var express = require('express');
var router = express.Router();
const cheerio = require('cheerio');
const axios = require('axios')
/* GET home page. */
router.get('/',async function(req, res, next) {
  res.header('Content-Type: application/json');
  let url = req.query.url;
  console.log(url);
  var result={
    array:[]
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
            result.array.push(size);

            console.log($(el).attr('class'));
            console.log(($(el).text().trim()));
          })
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
