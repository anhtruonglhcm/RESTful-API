const router = require('express').Router();
const Category = require('../models/category');

// post create a new owner
router.post('/categories', async (req, res) => {
  try {
    const categories = new Category();
    categories.type = req.body.type;
    await categories.save();
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

// get all owner
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// get a owner
router.get('/categories/:categoriesID', async (req, res) => {
  try {
    const categories = await Category.findOne({ _id: req.params.categoriesID });
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// update a owner
router.put('/categories/:categoriesID', async (req, res) => {
  try {
    const categories = await Category.findOneAndUpdate(
      { _id: req.params.categoriesID },
      {
        $set: {
          type: req.body.type,
        },
      },
      { upsert: true }
    );
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// deleta a owner
router.delete('/categories/:categoriesID', async (req, res) => {
  try {
    const categories = await Category.findOneAndDelete({ _id: req.params.categoriesID });
    if (categories) {
      res.json({ msg: 'success delete' });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});
module.exports = router;
