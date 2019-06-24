const express = require('express');
const weatherController = require('../controllers/weathers');

const router = express.Router();



router.get('/', function(req, res) {
  
   weatherController.location_details(req, res);
 
      
 });

module.exports = router;
