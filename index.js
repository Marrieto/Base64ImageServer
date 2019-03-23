const express = require('express')
const bodyParser = require('body-parser')
const base64Img = require('base64-img')

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

app.post('/image', (req, res) => {
    base64Img.img(req.body.data, '', 'test', (err, filepath) => {
        if (err) {
            res.sendStatus(500)
        }

        let pathname = `${__dirname}/${filepath}`

        res.send(200, pathname)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server up and running at port: ${process.env.PORT}`)
    console.log(`Filepath: ${__dirname}`)
})
