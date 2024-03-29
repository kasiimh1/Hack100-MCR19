var express = require('express');
var router = express.Router();

let index = require('../controllers/index');
let message = require('../controllers/message');

/* map GET pages */
router.get('/', index.index);
router.get('/message', message.message);
router.get('/message/send', message.sendMessage);
module.exports = router;