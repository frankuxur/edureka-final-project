const express = require("express");
const router = express.Router();
const stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();

const stripeConfig = stripe(process.env.STRIPE_PRIVATE_KEY);

// Mock data
const storeItems = new Map([
  [1, { priceInCents: 1000, name: "Learn Express" }],
  [2, { priceInCents: 2000, name: "Learn MongoDB" }],
]);

// storeItems.get(1); // [1, { priceInCents: 1000, name: "Learn Express" }]

//  localhost:3500/payment/create-checkout-session
router.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);

  try {
    const session = await stripeConfig.checkout.sessions.create({
      // kind of payment you are going to accept
      payment_method_types: ["card"],
      // kind of payment, can be a one time payment (payment) / subscription (subscription) /emi
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
      // items you are going to purchase
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
