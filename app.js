const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/welcome', (req, res) => {
    console.log(req.body)
    console.log(req.params)
    console.log(req.query)
    res.status(200).json({
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Hey there 👋 Welcome to Generous++ Foundation stats!"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*1️⃣ Use the `/foundationStats` command*. Type `/foundationStats` followed by a channel name and a time scope (`month`, `year`, `allTime`). Example: `/foundationStats #interns year`"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*2️⃣ Use the `/opportunities` command* if you want to see all available volunteer opportunities"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*3️⃣ Use the `/addOpportunity` command* to list a potential volunteering opportunity followed by [point of contact] [opportunity date] [opportunity description] like so `/addOpportunity @nick 08/06/2020 Plant trees around the office`"
                }
            }
        ]
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})