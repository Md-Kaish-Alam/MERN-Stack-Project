const Razorpay = require('razorpay')
const crypto = require('crypto')
const shortid = require('shortid')
const Transactions = require('../models/transaction')


const instance = new Razorpay({
    key_id: 'rzp_test_wnR0tFBazk0lwY',
    key_secret: 'SgQJ7yTZwwlNjyFjVqGPQ61m'
})

exports.createOrder = async (req, res) => {
    console.log('Payment Initiated');
    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: shortid.generate(),
        notes: {
            key1: "value3",
            key2: "value2"
        }
    }
    try {
        const response = await instance.orders.create(options)
        console.log(response)
        res.json(response)
    } catch (error) {
        console.log(error)
    }

}

exports.saveTransaction=(req,res)=>{
    console.log('Saving transactions')

    const generated_signature = crypto.createHmac('sha256',instance.key_secret);
    generated_signature.update(req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id);

    if(req.body.razorpay_signature == generated_signature.digest('hex')){

        console.log('Creating Transactions object')
        //save the transaction to collection
        const transaction = new Transactions({
            transaction_id : req.body.razorpay_payment_id ,
            transaction_amount: req.body.razorpay_amount
        });

        transaction.save(function(err,saveTransaction){
            if(err){
                console.log(err);
                return res.status(500).send("Some Problem occurred",error)
            }
            console.log('Transaction saved successfully')
            res.send({transaction:transaction})
        })
    }
}
