"use strict";
const express = require('express');
const enableWs = require('express-ws');
const mongoose = require('mongoose');
const app = express();
enableWs(app);
mongoose.connect('mongodb+srv://danik:danik@chess-db.zlsbk.mongodb.net/chess-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connect sucksess'))
    .catch((err) => console.log(err));
// const matchSchema = new mongoose.Schema({
//   moves: {
//     '#FFC533' :IMoves [],
//     [FigureColor.WHITE] :IMoves []
//   }
// })
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.ws('/echo', (ws) => {
    ws.on('message', (msg) => {
        console.log(msg);
        ws.send(msg);
    });
    ws.on('close', () => {
        console.log('WebSocket was closed');
    });
});
app.listen(8999, () => console.log('Server started'));
