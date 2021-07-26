Restaurent = {
    id: String,
    name: String,
    speciality: String,
    primary_mobile: String,
    mobiles: [],
    longitude: String,
    latitude: String,
    address: {
        address_line: String,
        area: String,
        landmark: String,
        city: String,
        pincode: String,
        state: String,


    },
    payment_details: { // this will be other document
        account_number: String,
        account_holder_name: String,
        account_type: String,
        bank_ifsc_code: String,
    }
}