const listing = require("../models/listing.model");

module.exports = {
  uploadListing: async (req, res, next) => {
    const {
      userId,
      title,
      description,
      location,
      price,
      status,
      type,
      area,
      address,
      beds,
      baths,
      toilets,
      Serviced,
      Furnished,
      Parking,
      more,
    } = req.body;
    const newListing = new listing({
      title,
      description,
      location,
      price,
      status,
      type,
      area,
      address,
      beds,
      baths,
      toilets,
      Serviced,
      Furnished,
      Parking,
      more,
    });
    const savedListing = await newListing.save();
    if (!savedListing) {
      res.status(200).json({ message: "Property not Uploaded" });
    } else {
      res.status(200).json({ message: "Property Sucessfully Uploaded" });
    }

    next();
  },
};
