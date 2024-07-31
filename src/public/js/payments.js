const stripe = Stripe(
  "pk_test_51Ns4MgHXAnuZTFFP0A7faHSvqj8I01aMIhAZhGUq1m0dGbWuReog4VEYBMG4th3wnJlwuaReMP2AFZOVFNdxwpKh00CLkqu8tH"
);

const elements = stripe.elements();
const form = document.getElementById("payment-form");
const cardElement = elements.create("card");
cardElement.mount("#card-element");

const submitButton = document.getElementById("submit-button");
const errorMessage = document.getElementById("error-message");
submitButton.addEventListener("click", async (e) => {
  e.preventDefault();
  // Mostrar el loader de SweetAlert2
  Swal.fire({
    title: "Procesando pago...",
    text: "Por favor, espera mientras procesamos tu pago.",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading(); // Mostrar el ícono de carga
    },
  });

  // Asegúrate de que el endpoint y el cuerpo de la solicitud sean correctos
  try {
    const response = await fetch("/api/payment/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Monto en centavos (p. ej., $50.00 USD)
        currency: "usd",
      }),
    });

    const { client_secret } = await response.json();

    if (!client_secret) {
      throw new Error("Client secret not found in response");
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      client_secret,
      {
        payment_method: {
          card: cardElement,
        },
        return_url: "http://localhost:9191/home",
      }
    );

    setTimeout(() => {
      if (error) {
        form.reset();
        Swal.fire({
          icon: "error",
          title: "Error en el pago",
          text: `${error.message}`,
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Pago exitoso",
          text: "Tu pago ha sido procesado con éxito.",
          confirmButtonText: "Cerrar",
        }).then(() => {
          window.location.href = "http://localhost:9191/home";
        });
      }
    }, 2000);
    if (error) {
      errorMessage.textContent = `Error: ${error.message}`;
    } else {
      errorMessage.textContent = `Pago exitoso: ${paymentIntent.id}`;
    }
  } catch (err) {
    console.log("Error processing payment:", err);
    errorMessage.textContent = `Error processing payment: ${err.message}`;
  }
});
