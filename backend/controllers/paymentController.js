
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);  

const paymentIntent = async (req,res)=>{
const {amount,quizId}= req.body ;
console.log(req.body)

try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        metadata: { quizId },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
} catch (error) {
    res.status(500).send({ error: error.message });
}
}
module.exports={
    paymentIntent
}