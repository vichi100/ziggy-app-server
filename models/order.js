Order = {
    id: String,
    restaurent_id: String,
    restaurent_name: String,
    customer_id: String,
    customer_name: String,
    delivery_adress: String,
    items: [
        {
            item_id: String,
            item_name: String,
            quantity: Number,
            price: Number,
            discount_amount: Number,
        },
        {
            item_id: String,
            item_name: String,
            quantity: Number,
            price: Number,
            discount_amount: Number,
        }
    ],
    total_bill: Number,
    payment_status: String, // pending, paid
    order_status: String, // accepted, rejected by restaurent, out for delivery, delivery failed, delivered
    saving_on_order: Number,
    create_time: Date,
    update_time: Date
}