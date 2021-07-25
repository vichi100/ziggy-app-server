Customer = {
    id: String,
    name: String,
    mobile: String,
    delivery_addresses: [
        {
            flat_number: String,
            building_name: String,
            area: String,
            landmark: String,
            long_lat: String
        }
    ],
    create_time: Date,
    update_time: Date

}