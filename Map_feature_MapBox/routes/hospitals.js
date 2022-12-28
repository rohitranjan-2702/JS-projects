const express = require("express");
const { getHospitals, addHospitals } = require('../controllers/hospitals')
const router = express.Router();


// app.get -> router.get (before controller setup)
// router.get('/', (req, res) => {
//     res.send('hello');
// })

// after controller setup
router
.route('/')
.get(getHospitals)
.post(addHospitals);

module.exports = router;