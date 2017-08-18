'use strict'
var FB = require('fb');
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))
    // parse application/json
app.use(bodyParser.json())
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



// index
app.get('/', function(req, res) {
    res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token')
    }
});

//{changes: [{ field: 'conversations', value: [Object] }],

// to post data
app.post('/webhook', function(req, res) {
    console.log(req.body);
    if (req.body.object === 'page') {
        var messaging = req.body.entry[0].messaging;
        console.log('Messaging object:' + messaging);
        if (messaging) {
            var i;
            for (i = 0; i < messaging.length; i++) {
                console.log('----------------------------------------\n' + 'Message from:' + messaging[i].sender.id +
                    '\nMessage:' + messaging[i].message.text + '\n---------------------------------');
            }
        }
    } else {
        console.log('Message field not present');
    }


    res.sendStatus(200);
})


// recommended to inject access tokens as environmental variables, e.g.
// const token = process.env.FB_PAGE_ACCESS_TOKEN
const token = "EAAcqgtNxib0BAFYv9lxH77yLUhCuRAsC1uJHiK0pU3J0N5QxfQTrs0XMS1dZCesFZBZArmaPDX2VEwt6r15D8O9YNeZBEGkp2MY7zPn1w73S816a1NBpZCNHqROeA5kcyVuIlxdUUKfy9wxVMu78uNzKvtMXZBXZAFKsQw4tpBz6wZDZD"

function sendTextMessage(sender, text) {
    let messageData = { text: text }

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


var body = 'My first post using facebook-node-sdk';
FB.api('122441918400802/feed', 'post', { message: body }, function(res) {
    if (!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log('Post Id: ' + res.id);
});
// spin spin sugar
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})