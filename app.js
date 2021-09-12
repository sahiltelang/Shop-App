const express = require('express');

const app = express();
const port = process.env.port || 8080

const authRoute = require('./routes/auth-router');

const bodyParser = require('body-parser')
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(
    "mongodb+srv://sh20:root@livecode.up9ot.mongodb.net/shopData",
    (err) => {
        if(err){
            console.log("DB not connecting")
        }
        else {
            console.log("DB connected")
        }
    }
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors());

app.use('/auth', authRoute);
app.get('/', (req,res) => {
    res.send("Hellow Za World")
})

app.listen(port, () => {
    console.log("server connected: ", port)
})