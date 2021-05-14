const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema(
  {
    // userId: { type: String, required: false },
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: String, required: true },
    beds: { type: String, required: true },
    toilets: { type: String, required: true },
    baths: { type: String, required: true },
    Furnished: { type: String, required: false },
    Serviced: { type: String, required: false },
    Parking: { type: String, required: false },
    // image1: { type: String, required: true },
    // image2: { type: String, required: true },
    // image3: { type: String, required: true },

    more: { type: String, required: false },
  },
  { timestamps: true }
);

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
