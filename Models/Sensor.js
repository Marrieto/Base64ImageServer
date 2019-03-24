//  Model for sensorValue
// Saves a true value to database for use in determining if
// someone is in proximity to PIR Sensor

const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const SensorSchema = new mongoose.Schema({
    sensorValue: {
        type: Boolean,
        required: true
    }
})

mongoose.connect(
    'mongodb://martinsimon1:martinsimon1@ds123012.mlab.com:23012/racebase',
    { useNewUrlParser: true },
    (err) => {
        if (err) {
            throw err
        }
    }
)

SensorSchema.plugin(timestamp)
let Sensor = mongoose.model('Sensor', SensorSchema)
module.exports = Sensor
