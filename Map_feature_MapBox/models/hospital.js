// creatig a model in mongoose

const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const HospitalSchema = new mongoose.Schema({
    hospitalID:{
        type: String,
        required: [true, 'please add a hospital ID'],
        unique: true,
        trim: true,
        maxlength: [20]
    },
    location: {
        type: {
          type: String, 
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere' // 2dsphere supports queries that calculate geometries on an earth-like sphere
        },
        formattedAddress: String
   },
   createdAt:{
    type: Date,
    default: Date.now
   }
});

// Geocode & create location
HospitalSchema.pre('save', async function(next){
    const loc = await geocoder(this.address);
    console.log(loc);
})

module.exports = mongoose.model('hospital', HospitalSchema);