document.addEventListener('DOMContentLoaded', function() {
    var price = 45000; // Precio fijo para todos los días en pesos argentinos
    var selectedDate = null;
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        selectable: true,
        initialDate: dateFlight,
        select: function(info) {
            console.log('Fecha seleccionada:', info.startStr);
            selectedDate = info.startStr;
            console.log('Precio correspondiente:', price);
        },
        validRange: {
            start: new Date(),
        },
        dayCellContent: function(arg) {
            return { html: '<div class="fc-daygrid-day-content"><div class="fc-daygrid-day-number">' + arg.dayNumberText + '</div><div class="fc-daygrid-day-bottom">$' + price + '</div></div>' };
        },
        eventClick: function(info) {
            console.log('Evento clickeado:', info.event.title, ' - Precio:', info.event.extendedProps.price);
        },
        headerToolbar: {
            center: '',
            right: ''
        }
    });

    calendar.render();

    var confirmButton = document.getElementById('confirmButton');
    confirmButton.addEventListener('click', function() {
        if (selectedDate) {
            console.log('Confirmar selección:', selectedDate, ' - Precio:', price);
            let dataToSend = {
                from,
                date: selectedDate,
                price
            }; 
            fetch("/searchfly", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }).then(function(response) {
                // Redirigir a otra página después de enviar los datos
                window.location.href = "/checkout/passengers";
            }).catch(function(error) {
                console.error('Error al enviar los datos:', error);
            });

        } else {
            console.log('No hay selección.');
        }
    });
});

