const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/codeListInfo', function(req, res, next) {
  let filePath = path.join(__dirname, '../simulation/CodeList.json');

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.send({
        status: -1,
        msg: err
      })
    } else {
      res.send(data)
    }
  });

});

module.exports = router;
