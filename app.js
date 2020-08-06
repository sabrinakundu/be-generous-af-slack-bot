const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/slack', (req, res) => {
    console.log(req.body)
    res.status(200).send()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})