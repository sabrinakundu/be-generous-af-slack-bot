const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/welcome', (req, res) => {
    const { user_name } = req.body
    res.status(200).json({
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hey @${user_name} 👋 Welcome to Generous++ Foundation stats!`
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

app.post('/highlights', (req, res) => {
    const leaderboard = [
        {
            name: "Sabrina Kundu",
            hours: 20
        },
        {
            name: "Enika Biswas",
            hours: 10
        },
        {
            name: "Nick Vargas",
            hours: 5
        }
    ]
    const opportunities = [
        {
            contact: "Gautam Jethwani",
            date: "10/01",
            description: "Plant trees in the office"
        },
        {
            contact: "Victoria Huynh",
            date: "05/21",
            description: "Be Generous AF"
        },
        {
            contact: "Geoffrey Tian",
            date: "03/26",
            description: "Volunteer at orphanage"
        }
    ]
    let formattedLeaderboard = "*Leaderboard*: " 
    leaderboard.forEach(l => {
        formattedLeaderboard += `\n\n ${l.name}: ${l.hours} hours `
    })
    const blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": " "
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Foundations Leave Stats!* :chart_with_upwards_trend:"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": " :sparkles: *Highlights* :sparkles:"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": formattedLeaderboard
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ":calendar: |   *Volunteer Opportunities*  | :calendar: "
                }
            }
        ]
    opportunities.forEach(o => {
        blocks.push({
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*Contact ${o.contact}* ${o.date} ${o.description}`
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "RSVP",
                    "emoji": true
                }
            }
        })
    })
    res.status(200).json({
        "blocks": blocks
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})