'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var winston = require('winston');

app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/', function(req, res) {
    res.send('hello world i am a secret bot')
})

app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token')
    }
});

app.post('/webhook', function(req, res) {
    if (req.body.object === 'page') {
        var messaging = req.body.entry[0].messaging;
        winston.log('info', 'Messaging object:' + messaging);
        if (messaging) {
            var i;
            for (i = 0; i < messaging.length; i++) {
                winston.log('info', 'Message from:' + messaging[i].sender.id +
                    '\nMessage:' + messaging[i].message.text);
            }
        }
    } else {
        console.log('Message field not present');
    }
    res.sendStatus(200);
})

const token = "EAAcqgtNxib0BAFYv9lxH77yLUhCuRAsC1uJHiK0pU3J0N5QxfQTrs0XMS1dZCesFZBZArmaPDX2VEwt6r15D8O9YNeZBEGkp2MY7zPn1w73S816a1NBpZCNHqROeA5kcyVuIlxdUUKfy9wxVMu78uNzKvtMXZBXZAFKsQw4tpBz6wZDZD"


app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})