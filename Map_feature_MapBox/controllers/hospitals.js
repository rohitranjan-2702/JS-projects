const Hospital = require('../models/hospital') ;

// @desc Get all hospitals
// @route GET /api/v1/hospitals
// @access Public

exports.getHospitals = async (req, res, next) => {
   try {   
    const hospitals = await Hospital.find();

    return res.status(200).json({
        success: true,
        count: hospitals.length,
        data: hospitals
    });
   } catch (err) {
    console.log(err);
    res.status(500).json({error: 'server error'})
   }
};


// @desc Get all hospitals
// @route POST /api/v1/hospitals
// @access Public

exports.addHospitals = async (req, res, next) => {
   try { 
    const hospital = await Hospital.create(req.body);
    
    return res.status(200).json({
        success: true,
        data: hospital
    });
    console.log(req.body);
   } catch (err) {
    console.log(err);
    res.status(500).json({error: 'server error'})
   }
};