const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path'); //used for file path
const { nanoid } = require('nanoid');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const CONNECTION_URL = "mongodb+srv://vichi:vichi123@cluster0.xujqm.mongodb.net";
const DATABASE_NAME = "ziggy";
var database;

app.listen(5000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        // collection = database.collection("personnel");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post("/addNewRestaurant", (request, response) => {
    database.collection("restaurant").insert(request.body, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});