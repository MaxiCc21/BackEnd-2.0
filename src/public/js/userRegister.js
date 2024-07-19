document.addEventListener("DOMContentLoaded", () => {
  const $formRegistro = document.getElementById("userregister-form");

  $formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData($formRegistro);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    fetch("/session/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.ok) {
          Swal.fire({
            title: "Bienvenido",
            icon: "success",
            text: data.stateMsj,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            timer: 1500,
            willClose: () => {
              window.location.href = "/session/acceso"; // Redirige a la URL deseada
            },
          });
        } else {
          Swal.fire({
            title: "Ups!",
            text: data.stateMsj,
            icon: "warning",
            showCancelButton: true,

            reverseButtons: true,
          });
          $formRegistro.reset();
        }
      });
  });
});
