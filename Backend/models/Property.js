const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{
      type: String,
      validate: {
        validator: function(value) {
          return /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(value);
        },
        message: 'Invalid image URL'
      }
    }],
    video: { type: String },
    status: { type: String, enum: ['Available', 'Sold', 'Rented'], default: 'Available' },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    ratings: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      review: { type: String }
    }],
    propertyType: { 
      type: String, 
      enum: ['Apartment', 'House', 'Commercial', 'Land'], 
      required: true 
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    paymentStatus: { 
      type: String, 
      enum: ['Pending', 'Paid', 'Failed'], 
      default: 'Pending' 
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Virtual for average rating
PropertySchema.virtual('averageRating').get(function() {
  if (this.ratings && this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / this.ratings.length;
  }
  return 0;
});

module.exports = mongoose.model('Property', PropertySchema);
