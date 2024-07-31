const stripe = require("stripe");
const {
  STRIPE_SECRET_KEY,
  STRIPE_PRIV_SECRET_KEY,
} = require("../config/config");

// Inicializa el cliente de Stripe con la clave secreta
const stripeClient = stripe(STRIPE_PRIV_SECRET_KEY);

/**
 * Crea un Payment Intent para un pago específico.
 *
 * @param {number} amount - El monto a cobrar, en centavos (por ejemplo, $10.00 = 1000).
 * @param {string} currency - La moneda en la que se realizará el pago (por ejemplo, 'usd').
 * @param {string} [paymentMethodId] - ID opcional del método de pago.
 * @returns {Promise<object>} - Promesa que resuelve con el Payment Intent creado.
 */
async function createPaymentIntent(amount, currency, paymentMethodId) {
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
    });

    return paymentIntent;
  } catch (error) {
    throw new Error(`Error creating payment intent: ${error.message}`);
  }
}

/**
 * Confirma un Payment Intent existente.
 *
 * @param {string} paymentIntentId - El ID del Payment Intent a confirmar.
 * @returns {Promise<object>} - Promesa que resuelve con el Payment Intent confirmado.
 */
async function confirmPaymentIntent(paymentIntentId) {
  try {
    const paymentIntent = await stripeClient.paymentIntents.confirm(
      paymentIntentId
    );

    return paymentIntent;
  } catch (error) {
    throw new Error(`Error confirming payment intent: ${error.message}`);
  }
}

module.exports = {
  createPaymentIntent,
  confirmPaymentIntent,
};
