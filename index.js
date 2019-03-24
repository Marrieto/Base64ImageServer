const express = require('express')
const bodyParser = require('body-parser')
const base64Img = require('base64-img')
const Moment = require('moment')
const Sensor = require('./Models/Sensor')

require('dotenv').config()

const app = express()
app.use(
    require('body-parser').urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: '50000'
    })
)
app.use(bodyParser.json({ limit: '50mb' }))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.post('/image', (req, res) => {
    let time = Date.now()

    base64Img.img(
        req.body.data,
        '/root/LifeOfPi/public/clientapp/build/static',
        `${time}`,
        (err, filepath) => {
            if (err) {
                res.sendStatus(500)
            }

            let pathname = time

            res.send(200, pathname)
        }
    )
})

app.post('/movement', async (req, res) => {
    let movements = await Sensor.find({})
        .sort('-createdAt')
        .limit(5)

    let returningArray = []

    movements.forEach((movement) => {
        returningArray.push(movement.createdAt)
    })

    movements.map((value) => {
        let temp = Moment(value).add(1, 'hours')
        let tempMonth = Moment(temp).format('M')
        let tempDay = Moment(temp).format('D')
        let tempHours = Moment(temp).format('H')
        let tempMinutes = Moment(temp).format('mm')

        return `${tempMonth}/${tempDay} - ${tempHours}:${tempMinutes}`
    })

    console.log(returningArray)

    res.sendStatus(200)
})

app.listen(process.env.PORT, () => {
    console.log(`Server up and running at port: ${process.env.PORT}`)
    console.log(`Filepath: ${__dirname}`)
})
