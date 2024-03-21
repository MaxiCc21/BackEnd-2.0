document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.usersession-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const formData = new FormData(form); 

        fetch('/session/acceso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData)) 
        })
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            if (data.ok) {
                window.location.href = '/home';
            } else {
                alert(data.statusMessage);
            }
            form.reset();
        })

    });
});

