document.addEventListener("DOMContentLoaded", function () {
  const $recoverPasswordFORM = document.getElementById("recoverPassword-form");

  $recoverPasswordFORM.addEventListener("submit", function (event) {
    event.preventDefault();

    const formDataRecover = new FormData($recoverPasswordFORM);

    fetch("/session/recuperar-contrasena", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formDataRecover)),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          Swal.fire({
            title: "Correo enviado con exito",
            text: data.stateMsj,
            icon: "success",
          }).then((res) => {
            console.log(res);
            if (res.isConfirmed || res.isDismissed) {
              window.location.href = "/session/acceso";
            }
          });
        } else {
          console.log(data, "sadfasdf");
          Swal.fire({
            title: "Error",
            text: data.stateMsj,

            icon: "error",
          });
        }
        $recoverPasswordFORM.reset();
      });
  });
});
