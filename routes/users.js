var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  function scaryClown() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('🤡');
      }, 2000);
    });
  }

  async function msg() {
    const msg = await scaryClown();
    res.render('index', { title: 'Express' });
    console.log('Message:', msg);
  }

  msg(); 

});

module.exports = router;
