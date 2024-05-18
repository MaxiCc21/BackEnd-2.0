console.log("Hola");

const $passengersFORM = document.getElementById("passengers-FORM");

$passengersFORM.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData($passengersFORM);

  fetch("/checkout/passengers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let text = data.stateMsj;
      let title = data.ok
        ? "Gracias por volar con nosotors"
        : "Perdon por las molestias";
      Swal.fire({
        title,
        text,
        timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/home";
      });
    });
});
