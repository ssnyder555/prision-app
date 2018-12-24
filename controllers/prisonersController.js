const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Prisoner = require('../models/prisoners');
const Auth = require('../models/auth');
const Cells = require('../models/cells');

// Find All Priosners Objects
router.get('/', async (req, res) => {
  try {

    const prisonersFound = await Prisoner.find({});
    res.render('./prisoners/index.ejs', {
      prisoners: prisonersFound

    });
  } catch (err) {
    res.send(err);
  }
});


// Search Bar Route To Search Prisoner By Name
router.post('/prisonerS', (req, res) => {

  if (req.session.logged === true) {
    console.log(req.body);
    Prisoner.find({
      name: req.body.name
    }, (err, prisonerFound) => {
      res.render('./prisoners/prisonerS.ejs', {
        prisoners: prisonerFound
      });
    });
  } else {
    req.session.message = 'You have to be logged in to edit an author';
    res.redirect('/auth/login');
  }
})

// Render New Form Page
router.get('/new', (req, res) => {
  res.render('./prisoners/new.ejs');
});

// Create New Prisoner From Info Passed From Function Above
router.post('/', async (req, res) => {
  try {

    const prisonerCreated = await Prisoner.create(req.body);
    console.log(prisonerCreated);
    const cell = await Cells.find({
      name: prisonerCreated.crime
    });

    for (let i = 0; i < cell.length; i++) {
      cell[i].prisoner.push(prisonerCreated);
      cell[i].save((err, data) => {
        res.redirect('/prisoners');
      });
    }
    console.log(cell);



  } catch (err) {
    res.send(err);
  }
});

// Show Each Page For Prisoner
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {

    const prisonerFound = await Prisoner.findById(req.params.id);
    res.render('./prisoners/show.ejs', {
      prisoner: prisonerFound
    });

  } catch (err) {
    res.send(err);
  }
});

// Delete Prisoner

router.delete('/:id', async (req, res) => {

  if (req.session.logged === true) {

    try {

      const deletedPrisoner = await Prisoner.findByIdAndRemove(req.params.id);

      const prisonerCell = await Cells.find({
        name: deletedPrisoner.crime
      });

      for (let i = 0; i < prisonerCell.length; i++) {

        for (let k = 0; k < prisonerCell[i].prisoner.length; k++) {

          if (prisonerCell[i].prisoner[k]._id.toString() === deletedPrisoner._id.toString()) {
            prisonerCell[i].prisoner.splice(k, 1);
            prisonerCell[i].save();
          }
        }
      }

      console.log(prisonerCell);
      res.redirect('/prisoners');

    } catch (err) {
      res.send(err);
    }
  } else {
    req.session.message = 'You have to be logged in to edit an author';
    res.redirect('/auth/login');
  }
});

// Render Edit Page

router.get('/:id/edit', async (req, res) => {

  if (req.session.logged === true) {

    try {

      const prisonerFound = await Prisoner.findById(req.params.id);
      res.render('./prisoners/edit.ejs', {
        prisoner: prisonerFound
      })

    } catch (err) {
      res.send(err);
    }
  } else {
    req.session.message = 'You have to be logged in to edit an author';
    res.redirect('/auth/login');
  }
});

// Change Edited Information
router.put('/:id', async (req, res) => {
  console.log(req.params.id, req.body);
  try {

    await Prisoner.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/prisoners');

  } catch (err) {
    res.send(err);
  }
})



module.exports = router;