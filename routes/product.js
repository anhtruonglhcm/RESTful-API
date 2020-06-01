const router = require('express').Router();
const Product = require('../models/product');
const upload = require('../middleware/upload-photo');

// post create a new owner
router.post('/products', upload.single('photo'), async (req, res) => {
  try {
    const product = new Product();
    product.category = req.body.category;
    product.owner = req.body.owner;
    product.name = req.body.name;
    product.stockQuantity = req.body.stockQuantity;
    product.price = req.body.price;
    product.description = req.body.description;
    product.photo = req.file.location;
    await product.save();
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});

// get all owner
router.get('/products', async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// get a owner
router.get('/products/:productID', async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productID });
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// update a owner
router.put('/products/:productID', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.productID },
      {
        $set: {
          type: req.body.type,
        },
      },
      { upsert: true }
    );
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({
      err: err.message,
    });
  }
});

// deleta a owner
router.delete('/products/:productID', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.productID });
    if (product) {
      res.json({ msg: 'success delete' });
    }
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
});
module.exports = router;
