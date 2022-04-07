const express = require('express')
const process = require('process')



const app = express()

const port = process.argv[0] || 9000


app.get('/', (req, res) => {

    res.send('Sensen Terminal UI')

})

app.listen(port)


// console.log('Sensen Terminal Server', 'Init...')


