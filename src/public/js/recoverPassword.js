
document.addEventListener("DOMContentLoaded", function () {
    const $recoverPasswordFORM  = document.getElementById("recoverPassword-form")


    $recoverPasswordFORM.addEventListener("submit",function (event)  {
        
        event.preventDefault();

        const formDataRecover = new FormData($recoverPasswordFORM); 

        fetch("/session/recuperar-contrasena",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formDataRecover)) 
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.ok) {
                Swal.fire({
                    title: data.statusMessage,
                    text: "Ya puedes utilizar tu nueva contraseña para iniciar sesion ",
                    icon: "success"
                  })
                .then((res) => {
                    console.log(res);
                    if (res.isConfirmed || res.isDismissed ) {
                        window.location.href = '/session/acceso';
                    } 
                });
             
            } else {
                Swal.fire({
                    title: data.statusMessage,
                    icon: "error"
                  })
            }
            $recoverPasswordFORM.reset();
        })
    })
})
