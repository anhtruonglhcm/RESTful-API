const exress = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = exress();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect database
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log('false');
    } else {
      console.log('success');
    }
  }
);

// require api
const ownerRoutes = require('./routes/owner');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const usertRoutes = require('./routes/user');

app.use('/api', ownerRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/', usertRoutes);

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
