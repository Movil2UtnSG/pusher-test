const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1960965",
  key: "99ac28b6c07939e543bd",
  secret: "18f277c8447922e7cdca",
  cluster: "us3",
  useTLS: true
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  // This authenticates every user. Don't do this in production!
  const authResponse = pusher.authorizeChannel(socketId, channel);
  res.send(authResponse);
});

app.get('/mensaje', (req, res) => {

  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  });
  res.send('Hello World!')
})

app.get('/mensaje-privado', (req, res) => {

  pusher.trigger("my-channel-private-1", "my-event-private", {
    message: "hello world private"
  });
  res.send('Hello World!')
})
app.get('/mensaje-privado-2', (req, res) => {

  pusher.trigger("my-channel-private-2", "my-event-private", {
    message: "hello world private"
  });
  res.send('Hello World!')
})

const port = process.env.PORT || 5000;
app.listen(port);

