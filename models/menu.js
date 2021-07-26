menu = {
    id: String,
    restaurent_id: String,
    restaurent_name: String,
    items: [
        {
            item_id: String,
            item_name: String,
            price_details: [
                {
                    quantity: Number,// full, half, portion, 1kg, 1/2kg
                    price: Number,
                }
            ],

            rating: Number,
            is_veg: String, // yes , no
            details: String
        },
        {
            item_id: String,
            item_name: String,
            quantity: Number,
            price_details: [
                {
                    quantity: Number,// full, half, portion, 1kg, 1/2kg
                    price: Number,
                },
                {
                    quantity: Number,// full, half, portion, 1kg, 1/2kg
                    price: Number,
                }
            ],
            rating: Number,
            is_veg: String, // yes , no
            details: String
        }
    ],
}