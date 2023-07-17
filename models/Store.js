const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const StoreSchema = new mongoose.Schema({

    storeId: {
        type: String,
        required: [true, 'Please add a store Id'],
        unique: true,
        trim: true,
        maxLength: [10, 'Store Id must be lass than 10 chars']
    },


    address: {
        type: String,
        required: [true, 'Please add an address']
    },


    // https://mongoosejs.com/docs/geojson.html
    location: {
        type: {
          type: String,     // Don't do `{ location: { type: String } }`
          enum: ['Point'],  // 'location.type' must be 'Point'
        },
        coordinates: {
          type: [Number],
          index: '2dsphere', // 2dsphere supports queries that calculate geometrics on an earth-like sphere
        },
        formattedAddress: String,
    },


    createdAt: {
        type: Date,
        default: Date.now
    }
});



// Geocode & create location
StoreSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].latitude, loc[0].longitude],
        formattedAddress: loc[0].formattedAddress
    }

    //Do not save address
    this.address = undefined;
    next();
});


module.exports = mongoose.model('Store',StoreSchema);