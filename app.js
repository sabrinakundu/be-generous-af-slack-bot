const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

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

const leaderboard = [
    {
        name: "skundu",
        hours: 20
    },
    {
        name: "ebiswas",
        hours: 10
    },
    {
        name: "nvargas",
        hours: 5
    }
]

const constructJSON = () => {
    const blocks = [
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
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Shout out to *Kevin Li* for volunteering *10 hours* this month!"
            }
        },
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": ":trophy: |    *Leaderboard*    | :trophy:"
            }
        },
        {
            "type": "divider"
        }
    ]
    leaderboard.forEach(l => {
        blocks.push({
            "type": "section",
                "text": {
                "type": "mrkdwn",
                "text": `*                          ${l.name}*                                           ${l.hours} hours`
            }
        })
    })
    blocks.push({
        "type": "divider"
    })
    blocks.push({
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": ":calendar: |   *Volunteer Opportunities*  | :calendar: "
        }
    })
    opportunities.forEach(o => {
        blocks.push({
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `*             Contact* ${o.contact} ` +  "`" + o.date + "` " + ` _${o.description}_ `
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
    return blocks
}

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/welcome', (req, res) => {
    const { user_name } = req.body
    console.log(user_name)
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
                    "text": "*1️⃣ Use the `/generous-af-highlights` command*. Type `/generous-af-highlights` to see the leaderboard and available opportunities"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*2️⃣ Use the `/generous-af-add-opportunity` command* to list a potential volunteering opportunity followed by [opportunity date] [opportunity description] like so `/generous-af-add-opportunity 08/06/2020 Plant trees around the office`"
                }
            }
        ]
    })
})

app.post('/highlights', (req, res) => {
    console.log(req.body.user_name)
    res.status(200).json({
        "blocks": constructJSON()
    })
})

app.post('/remove', (req, res) => {
    console.log(req.body.user_name)
    const { text } = req.body
    if (parseInt(text) === "NaN") {
        res.status(200).send("Error")
    } else {
        opportunities.splice(parseInt(text), 1)
        res.status(200).send("Successfully removed")
    }
})

app.post('/add-opportunity', (req, res) => {
    console.log(req.body)
    const { text } = req.body
    const split = text.split(" ")
    if (split.length < 2) {
        res.status(200).send("Error")
    } else {
        const contact = req.body.user_name
        const date = split[0]
        let description = ""
        for (let i = 1; i < split.length; i++) {
            description += split[i]
            description += " "
        }
        opportunities.push({
            contact,
            date,
            description
        })
        res.status(200).send({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Successfully added " +  "`" + description + "` " +  "organized by " +  "@" + contact + " ! \n\n Thank you for sharing, " + contact + "! Goodbye :wave:"
                    }
                }
            ]
        })
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})