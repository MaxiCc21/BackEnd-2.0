document.addEventListener("DOMContentLoaded", () => {
  const formReservatin = document.getElementById("reservationForm");

  //todo ---------------formReservatin----------------------
  formReservatin.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(formReservatin);
    let lastname = formData.get("lastname");
    let reservationCode = formData.get("reservationCode");
    console.log("dsfasdf", lastname);
    fetch("/checkout/reservation", {
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
        if (!data.ok) {
          alert(data.stateMsj);
          formReservatin.reset();
        } else {
          window.location.href = `/checkout/reservation?lastname=${lastname}&code=${reservationCode}`;
        }
      });
  });
  //todo ---------------formReservatin----------------------

  const oneWayCheckbox = document.getElementById("oneWay");
  const roundTripCheckbox = document.getElementById("roundTrip");

  const searchInput = document.getElementById("searchInput");
  const searchDropdown = document.getElementById("searchDropdown");

  const labelReturnDateFlight = document.getElementById(
    "label-returnDateFlight"
  );
  const returnDateFlightDIV = document.getElementById(
    "returnDateFlightContainer"
  );

  oneWayCheckbox.addEventListener("change", function () {
    if (!this.checked && !roundTripCheckbox.checked) {
      this.checked = true;
    } else {
      roundTripCheckbox.checked = false;

      returnDateFlightDIV.style.display = "none";
    }
  });

  roundTripCheckbox.addEventListener("change", function () {
    if (!this.checked && !oneWayCheckbox.checked) {
      this.checked = true;
    } else {
      oneWayCheckbox.checked = false;
      returnDateFlightDIV.style.display = "flex";
    }
  });

  const form = document.getElementById("searchFlyForm");
  const returnDateFlightInput = document.getElementById("returnDateFlight");

  form.addEventListener("submit", function (event) {
    if (!returnDateFlightInput.value) {
      returnDateFlightInput.disabled = true;
    } else {
      returnDateFlightInput.disabled = false;
    }
  });
});

const provincesArray = options.map((item) => item.province);

// Mostrar el dropdown cuando se escriba en el input
searchInput.addEventListener("input", function () {
  const inputValue = this.value.toLowerCase();
  let matches = [];

  if (inputValue.length > 3) {
    // Solo buscar coincidencias si se han tecleado al menos dos letras
    matches = provincesArray.filter((option) =>
      option.toLowerCase().includes(inputValue)
    );
  }

  // Crear el contenido del dropdown con las opciones que coincidan
  let dropdownContent = "";
  matches.forEach((match) => {
    dropdownContent += `<a href="#">${match}</a>`;
  });

  // Mostrar el dropdown y su contenido
  searchDropdown.style.display = "block";
  searchDropdown.innerHTML = dropdownContent;
});

// Ocultar el dropdown cuando se haga clic fuera de él
document.addEventListener("click", function (event) {
  if (
    !searchInput.contains(event.target) &&
    !searchDropdown.contains(event.target)
  ) {
    searchDropdown.style.display = "none";
  }
});

// Evento de clic para las opciones del dropdown
searchDropdown.addEventListener("click", function (event) {
  // Verificar si se hizo clic en un enlace dentro del dropdown
  if (event.target.tagName === "A") {
    // Completar el input con el texto del enlace
    searchInput.value = event.target.innerText;
    // Ocultar el dropdown
    searchDropdown.style.display = "none";
    // Evitar la acción predeterminada del enlace (que es la navegación)
    event.preventDefault();
  }
});

const $searchFlyForm = document.getElementById("searchFlyForm");

$searchFlyForm.addEventListener("submit", (e) => {
  // e.preventDefault()
  // const formData = new FormData($searchFlyForm);
  // const economyValue = formData.get("economy")
  // console.log(economyValue);
  // fetch(`/searchfly/${productID}`, {
  //   method: "get",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
});

const today = new Date().toISOString().split("T")[0];

// document.getElementById("myDateInput").setAttribute("min", today);

function showTab(tabName, element) {
  var tabs = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";

  // Remover la clase 'active' de todos los botones
  var tabButtons = document.getElementsByClassName("tab");
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  // Añadir la clase 'active' al botón clicado
  element.classList.add("active");
}

// Por defecto, mostrar la pestaña de vuelos
showTab("flights", document.getElementById("flights-tab"));
