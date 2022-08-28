document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  axios
    .post("/api/users/register", {
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    })
    .then((res) => {
      console.log(res);
      alert("account created!");
      window.location = "/login";
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 409) {
        alert(err.response.data);
        return;
      }

      alert("Sorry, there was a problem registering. Please try again later");
    });
});
