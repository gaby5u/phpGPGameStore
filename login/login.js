document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms["login"];
  const emailInput = form["email"];
  const passwordInput = form["password"];
  const errorContainer = document.createElement("div");
  errorContainer.style.color = "red";
  errorContainer.style.marginTop = "10px";

  form.addEventListener("submit", function (event) {
    let errors = [];

    if (!emailInput.value.trim()) {
      errors.push("Email is required.");
    } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
      errors.push("Please enter a valid email address.");
    }

    if (!passwordInput.value.trim()) {
      errors.push("Password is required.");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(passwordInput.value)
    ) {
      errors.push(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
    }

    if (errors.length > 0) {
      event.preventDefault();
      errorContainer.innerHTML = errors.join("<br>");
      if (!form.contains(errorContainer)) {
        form.appendChild(errorContainer);
      }
    } else if (form.contains(errorContainer)) {
      form.removeChild(errorContainer);
    }
  });
});
