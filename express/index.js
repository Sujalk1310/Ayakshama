const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const initializeFirebaseSDK = require('./firebase');
const PORT = 8080;

initializeFirebaseSDK();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));


app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/ayakshma')
.then((data, error) => {
    if (!error) {
        console.log("Connected to DB");
        app.listen(PORT, (error) => {
            if (!error) console.log("Server started at http://localhost:" + PORT);
            else console.log(error.message);
        }); 
    } else console.log(error);
});