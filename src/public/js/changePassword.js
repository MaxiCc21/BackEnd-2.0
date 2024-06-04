document.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    document.getElementById("reset-token").value = token;
  } else {
    alert(
      "No se proporcionó ningún token. Por favor, solicite un nuevo enlace de restablecimiento de contraseña."
    );
  }

  document
    .getElementById("reset-password-FORM")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      const token = document.getElementById("reset-token").value;

      try {
        const response = await fetch("/session/cambiar-contrasena", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        alert("Contraseña restablecida con éxito.");
        window.location.href = "/login"; // Redirigir a la página de inicio de sesión
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Hubo un problema al restablecer tu contraseña. Por favor, intenta de nuevo."
        );
      }
    });
});
