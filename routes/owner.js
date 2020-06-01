const router = require('express').Router();
const Owner = require('../models/owner');
const upload = require('../middleware/upload-photo');

// post create a new owner
router.post('/owner', upload.single('photo'), async (req, res) => {
  try {
    const owner = new Owner();
    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.file.location;
    await owner.save();
    res.status(200).json({ owner });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

// get all owner
router.get('/owner', async (req, res) => {
  try {
    const owner = await Owner.find();
    res.status(200).json({ owner });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// get a owner
router.get('/owner/:ownerID', async (req, res) => {
  try {
    const owner = await Owner.findOne({ _id: req.params.ownerID });
    res.status(200).json({ owner });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// update a owner
router.put('/owner/:ownerID', upload.single('photo'), async (req, res) => {
  try {
    const owner = await Owner.findOneAndUpdate(
      { _id: req.params.ownerID },
      {
        $set: {
          name: req.body.name,
          about: req.body.about,
          photo: req.file.location,
        },
      },
      { upsert: true }
    );
    res.status(200).json({ owner });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// deleta a owner
router.delete('/owner/:ownerID', async (req, res) => {
  try {
    const owner = await Owner.findOneAndDelete({ _id: req.params.ownerID });
    if (owner) {
      res.json({ msg: 'success delete' });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});
module.exports = router;
