const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('mongodb+srv://Guest123:Guest123@brewerycluster0.nhbhmyl.mongodb.net/?retryWrites=true&w=majority&appName=BreweryCluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
  breweryId: String,
  rating: Number,
  description: String,
});

const Review = mongoose.model('Review', reviewSchema);

// Get all reviews for a specific brewery
app.get('/api/reviews/:breweryId', async (req, res) => {
  const reviews = await Review.find({ breweryId: req.params.breweryId });
  res.json(reviews);
});

// Add a new review
app.post('/api/reviews', async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.json(newReview);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
