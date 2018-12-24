const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Cells = require('../models/cells');
const Prisoners = require('../models/prisoners');


// Find All Priosners Objects
router.get('/', async (req, res) => {
  try {

    const cellsFound = await Cells.find({});
    res.render('./cells/index.ejs', {
      cells: cellsFound

    });
  } catch (err) {
    res.send(err);
  }
});

// Route to update each cell
router.get('/update', async (req, res) => {
  try {
    const cellsFound = await Cells.find({});
    const prisonersFound = await Prisoners.find({});
    res.render('./cells/updateCells.ejs', {
      cells: cellsFound,
      prisoners: prisonersFound

    });
  } catch (err) {
    res.send(err);
  }
});


// Render New Form Page
router.get('/new', (req, res) => {
  res.render('./cells/new.ejs');
});

// Create New Prisoner From Info Passed From Function Above
router.post('/', async (req, res) => {
  try {
    const cellsCreated = await Cells.create(req.body);
    console.log(cellsCreated);
    res.redirect('/cells');

  } catch (err) {
    res.send(err);
  }
});

// Show Each Page For Prisoner
router.get('/:id', (req, res) => {
  Cells.findById(req.params.id, (err, foundCell) => {
    res.render('./cells/show.ejs', {
      cell: foundCell
    })
  });
});
// delete route
router.delete('/:id', (req, res) => {
  Cells.findByIdAndRemove(req.params.id, (err, deleteCell) => {
    res.redirect('/cells');
  });
});

// Render Edit Page

router.get('/:id/edit', async (req, res) => {
  try {

    const cellsFound = await Cells.findById(req.params.id);
    res.render('./cells/edit.ejs', {
      cells: cellsFound
    })

  } catch (err) {
    res.send(err);
  }
});

// Change Edited Information
router.put('/:id', async (req, res) => {
  console.log(req.params.id, req.body);
  try {

    await Cells.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/cells');

  } catch (err) {
    res.send(err);
  }
})



module.exports = router;