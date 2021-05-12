const listing = require("../models/listing.model");

module.exports = {
  uploadListing: async (req, res, next) => {
    const {
      userId,
      title,
      location,
      description,
      marketStatus,
      category,
      type,
      area,
      address,
      price,
      bedrooms,
      toilets,
      bathrooms,
      parking,
      totalArea,
      furnished,
      image1,
      image2,
      image3,
      more,
    } = req.body;
    const newListing = new listing({
      userId,
      title,
      location,
      description,
      marketStatus,
      category,
      type,
      area,
      address,
      price,
      bedrooms,
      toilets,
      bathrooms,
      parking,
      totalArea,
      furnished,
      image1,
      image2,
      image3,
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
