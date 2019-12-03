const express = require('express');
const Pusher = require('pusher');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ 
    extended: false }));

var pusher = new Pusher({
    appId: '911426',
    key: '01baf649e7ad86f95d67',
    secret: 'a01b6e5a0b5f9349125f',
    cluster: 'ap2',
    encrypted: true
  });
  

app.post('/pusher/auth', (req, res)=>{
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
});

app.post('/message', (req, res) =>{
    var message = req.body.message;
    var name = req.body.name;
    pusher.trigger( 'private-chat','message-added', {
         message, name 
        });
    res.sendStatus(200);
});

app.get('/',function(req,res){
    res.sendFile('/public/index.html', {root: __dirname });
});



app.listen(port, () =>{
    console.log('Server is up on port '+ port)
});