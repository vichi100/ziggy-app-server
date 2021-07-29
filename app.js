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

app.use(function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    // // res.header(
    // //   //"Access-Control-Allow-Headers",
    // //   "Origin, X-Requested-With, Content-Type, Accept"
    // // );
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
    );

    next();
});

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


app.post('/getNearByRestaurant', function (req, res) {
    console.log('getNearByRestaurant');
    getNearByRestaurant(req, res);
});

app.post('/getMenuByRestaurantId', function (req, res) {
    console.log('getMenuByRestaurantId');
    getMenuByRestaurantId(req, res);
});


app.post("/addNewRestaurant", (request, response) => {
    console.log("Request: ", JSON.parse(JSON.stringify(request.body)));
    const reqObj = JSON.parse(JSON.stringify(request.body));
    const restaurantObjTemp = reqObj.restaurant_details;
    const restaurantObj = {
        id: nanoid(),
        name: reqObj.restaurant_details.name,
        speciality: reqObj.restaurant_details.speciality,
        primary_mobile: reqObj.restaurant_details.mobile,
        mobiles: reqObj.restaurant_details.other_mobile,
        location: {
            type: "Point",
            coordinates: [Number(reqObj.restaurant_details.longitude), Number(reqObj.restaurant_details.latitude)]
        },
        address: {
            address_line: reqObj.restaurant_details.address,
            area: reqObj.restaurant_details.city,
            landmark: reqObj.restaurant_details.landmark,
            city: reqObj.restaurant_details.city,
            pincode: reqObj.restaurant_details.pincode,
            state: reqObj.restaurant_details.state

        },
        rating: null

    }
    console.log("menu_with_dish_list: ", JSON.parse(JSON.stringify(reqObj.menu_with_dish_list)))
    reqObj.menu_with_dish_list.map(item => {
        item["rating"] = null;
    })
    const menuObj = {
        id: nanoid(),
        restaurent_id: restaurantObj.id,
        restaurent_name: restaurantObj.name,
        items: reqObj.menu_with_dish_list,
    }
    database.collection("restaurant").insertOne(restaurantObj).then(result => {
        database.collection("menu").insertOne(menuObj).then(result => {
            response.send(result.result);
            response.end();
        }).catch(err => {
            console.error(`addNewRestaurant# Failed to insert documents : ${err}`);
            response.send(JSON.stringify('fail'));
            response.end();
            return;
        })

    }).catch(err => {
        console.error(`addNewRestaurant# Failed to insert documents : ${err}`);
        response.send(JSON.stringify('fail'));
        response.end();
        return;
    })

    // database.collection("restaurant").insertOne(restaurantObj, (error, result) => {
    //     if (error) {
    //         return response.status(500).send(error);
    //     }
    //     response.send(result.result);
    // });
});



const getNearByRestaurant = (req, res) => {
    const reqObj = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body))
    const locationX = reqObj.user_location;
    console.log(JSON.stringify(locationX))
    database.collection("restaurant").find({
        location:
        {
            $near:
            {
                $geometry: locationX,
                $minDistance: 10,
                $maxDistance: 500000
            }
        }
    }).toArray().then(result => {
        console.log(JSON.stringify(result));
        res.send(result);
        res.end();
    }).catch(err => {
        console.error(`addNewRestaurant# Failed to insert documents : ${err}`);
        res.send([]);
        res.end();
        return;
    })


}

const getMenuByRestaurantId = (req, res) => {
    const reqObj = JSON.parse(JSON.stringify(req.body));
    console.log(JSON.stringify(req.body));
    database.collection("menu").findOne({ restaurent_id: reqObj.restaurant_id }).then(result => {
        console.log(JSON.stringify(result));
        res.send(result);
        res.end();
    }).catch(err => {
        console.error(`addNewRestaurant# Failed to insert documents : ${err}`);
        res.send([]);
        res.end();
        return;
    })

}