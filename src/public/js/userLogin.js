document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".usersession-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch("/session/acceso", {
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
        console.log(data);
        if (data.ok) {
          Swal.fire({
            title: "Acceso exitoso",
            text: data.stateMsj,
            icon: "success",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            timer: 1000,
          });
          window.location.href = "/home";
        } else {
          Swal.fire({
            title: "Ups!",
            text: data.stateMsj,
            icon: "error",
            showCancelButton: true,
            confirmButtonText: "Reintentar",
            cancelButtonText: "Registrarme",
            customClass: {
              confirmButton: "custom-retry",
              cancelButton: "custom-register",
            },
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
              // El usuario hizo clic en "Reintentar"
              Swal.close();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // El usuario hizo clic en "Registrarme"
              window.location.href = "/session/registro";
            }
          });
        }
        form.reset();
      });
  });
});
