async function createUser() {
  const name = document.getElementById("nameCreate").value;
  const email = document.getElementById("emailCreate").value;
  const password = document.getElementById("passwordCreate").value;

  const validate = { email, password };
  let regexPassword =
    /^(?=.*\d)(?=.*[{}[\],$^?~=+\-_/*\-+.|@])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z{}[\],$^?~=+\-_/*\-+.|@]{8,}$/;
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validationEmail = regexEmail.test(validate.email);
  const validationPassword = regexPassword.test(validate.password);

/*   const errors = {
    name: false,
    email: false,
    password: false,
  };

  function hasErrors() {
    return Object.values(errors).some((error) => error === true);
  }

  function setError(field, message) {
    if (!errors[field]) {
      const errorDiv = document.getElementById(
        `returnError${field.charAt(0).toUpperCase() + field.slice(1)}Create`
      );
      const pError = document.createElement("p");
      pError.innerHTML = message;
      pError.className = "error";
      errorDiv.appendChild(pError);
      errors[field] = true;
    }
  }

  const errorDivs = document.querySelectorAll(".returnErrors");
  errorDivs.forEach((div) => {
    div.innerHTML = "";
  }); */

  if (name.trim() === "") {
    setError("name", "Enter a name");
  }

  if (email.trim() === "") {
    setError("email", "Enter a email");
  } else if (!validationEmail) {
    setError("email", "Enter a valid email");
  }

  if (password.trim() === "") {
    setError("password", "Enter a password");
  } else if (!validationPassword) {
    setError("password", "Enter a valid password");
  }

  if (hasErrors()) {
    return;
  } else {
    const response = await fetch(`http://localhost:3000/createUser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.status === 409) {
      setError("email", "Email Already exists!");
    } else {
      const successDiv = document.getElementById("returnSuccessCreate");
      const pSuccess = document.createElement("p");
      pSuccess.innerHTML = "User created successfully!";
      pSuccess.className = "success";
      successDiv.appendChild(pSuccess);

      const nameCreateInput = document.getElementById("nameCreate");
      const emailCreateInput = document.getElementById("emailCreate");
      const passwordCreateInput = document.getElementById("passwordCreate");

      if (nameCreateInput && emailCreateInput && passwordCreateInput) {
        nameCreateInput.value = "";
        emailCreateInput.value = "";
        passwordCreateInput.value = "";
      }

      setTimeout(function () {
        window.location.href = "/login";
      }, 1000);
    }
  }
}

const btnSignUp = document.querySelector("#btn_Create");
const form = document.querySelector("#formCreate");

btnSignUp.addEventListener("click", createUser);

form.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    createUser();
  }
});
