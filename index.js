const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/image', (req, res) => {
    console.log(req.body)

    res.send('Henlo boi')
})

app.listen(process.env.PORT, () => {
    console.log(`Server up and running at port: ${process.env.PORT}`)
})
console.log('heloo')
