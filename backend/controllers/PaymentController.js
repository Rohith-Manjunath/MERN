require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

const Paymentgateway = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),

      success_url: "http://localhost:5174/success",
      cancel_url: "http://localhost:5174/cancel",
    });

    res.json({ url: session.url });
  } catch (e) {
    res.json(500).json({ error: e.message });
  }
};

module.exports = { Paymentgateway };
