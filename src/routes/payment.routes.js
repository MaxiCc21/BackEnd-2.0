const express = require("express");
const paymentController = require("../controllers/paymentController");
const { reservationService } = require("../service");
const stripe = require("stripe")(
  "sk_test_51Ns4MgHXAnuZTFFP8uOuQJQkbVY0UtrHPxwiqxhRBdKxuOHlSepdbH10dEG2GxVkIa37GAedf1MuHgZRXng0dXka00rPseOCyN"
);

const router = express.Router();

router.get("/", async (req, res) => {
  let currentValue = JSON.parse(req.cookies.travelOptions);

  const options = {
    amount: currentValue.price,
  };

  res.render("payments/payments", options);
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Crear un PaymentIntent con el monto y la moneda proporcionados
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    let currentValue = JSON.parse(req.cookies.travelOptions);

    const flightReservationData = {
      ...currentValue,
      ...req.body,
    };

    const { status, ok, error, stateMsj, data } =
      await reservationService.postReservation(flightReservationData);

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creando PaymentIntent:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// // Ruta para confirmar un Payment Intent
// router.post(
//   "/confirm-payment-intent",
//   paymentController.handleConfirmPaymentIntent
// );

module.exports = router;
