const express = require('express'),
      router = express.Router(),
      ideaController = require('../controllers/ideaController.js');

router
  .route('/')
  .get(ideaController.getIdea);
