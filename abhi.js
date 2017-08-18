   const express = require('express')
   const bodyParser = require('body-parser')
   const request = require('request')
   const app = express()

   app.set('port', (process.env.PORT || 5000))
   app.use(bodyParser.json())
   app.use(bodyParser.urlencoded({ extended: false }))

   app.get('/', function(req, res) {
       res.send('hello world i am a secret bot')
   })

   // for facebook verification
   app.get('/webhook', function(req, res) {
       if (req.query['hub.verify_token'] ===
           'my_voice_is_my_password_verify_me') {
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
                   req.body.entry.forEach(function(entry) {
                       entry.messaging.forEach(function(event) {
                           console.log(event.message);
                       });
                   });
               } else {
                   console.log('Message field not present');
               }
               // let messaging_events = req.body.entry[0].messaging
               // for (let i = 0; i < messaging_events.length; i++) {
               //     let event = req.body.entry[0].messaging[i]
               //     let sender = event.sender.id
               //     if (event.message && event.message.text) {
               //         let text = event.message.text
               //         if (text === 'Generic') {
               //             console.log("welcome to chatbot")
               //                 //sendGenericMessage(sender)
               //             continue
               //         }
               //         sendTextMessage(sender, "Text received, echo: " + 
               text.substring(0, 200))
           //     }
           //     if (event.postback) {
           //         let text = JSON.stringify(event.postback)
           //         sendTextMessage(sender, "Postback received: " + 
           text.substring(0, 200), token)
       //         continue
       //     }
       // }
   res.sendStatus(200);
   })


   // recommended injecting access tokens as environmental variables, 
   e.g.
       // const token = process.env.FB_PAGE_ACCESS_TOKEN
   const token =


       "my access token"

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
                           "payload": "Payload for first element in a generic 
                           bubble ",
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
   I have successfully given all the required permissions.I have added the messenger and webhook service to my app.I have got the submission verified from Facebook as well.But still, I am unable to get the 'messaging'
   the object in the webhook callback.I received it only once when the submission was approved.After that I never received.