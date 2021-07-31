const menu = {
    id: String,
    restaurent_id: String,
    restaurent_name: String,
    items: [
        {
            item_id: String,
            item_name: String,
            is_customizable: String, // yes no
            price_details: [
                {
                    quantity: Number,// full, half, portion, 1kg, 1/2kg
                    price: Number,
                }
            ],

            customization_details: [
                {
                    header: String,
                    children_type: "radio", // checkbox
                    children: [
                        {
                            name: String,
                            price: String,
                        }
                    ],

                },
                {
                    header: String,
                    children_type: "checkbox", // checkbox
                    children: [],

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
            customization_details: [
                {
                    header: String,
                    children_type: "radio", // checkbox
                    children: [
                        {
                            name: String,
                            price: String,
                        }
                    ],

                },
                {
                    header: String,
                    children_type: "checkbox", // checkbox
                    children: [],

                }
            ],

            rating: Number,
            is_veg: String, // yes , no
            details: String
        }
    ]


}