// src/controllers/paymentController.js

const stripeService = require("../service/stripeService");

/**
 * Maneja la creación de un Payment Intent.
 *
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 */
async function handleCreatePaymentIntent(req, res) {
  const { amount, currency, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripeService.createPaymentIntent(
      amount,
      currency,
      paymentMethodId
    );

    res.status(200).json({ paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Maneja la confirmación de un Payment Intent.
 *
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 */
async function handleConfirmPaymentIntent(req, res) {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripeService.confirmPaymentIntent(
      paymentIntentId
    );

    res.status(200).json({ paymentIntent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handleCreatePaymentIntent,
  handleConfirmPaymentIntent,
};
