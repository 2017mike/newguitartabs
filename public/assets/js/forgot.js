function validateEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
};

document.getElementById("sendEmailForm").addEventListener("submit", (event) => {
  event.preventDefault();
  showLoader();
  const email = document.getElementById("email").value;
  if (!validateEmail(email)) {
    hideLoader();
    alert("email must have valid format");

    return;
  }
  const body = {
    email,
  };

  axios
    .post("/api/users/forgot", body)
    .then((res) => {
      hideLoader();
      alert(res.data);
    })
    .catch((err) => {
      hideLoader();
      alert(err.response.data);
    });
  event.preventDefault();
});
