$(document).ready(function () {
  $(".css-transitions-only-after-page-load").each(function (index, element) {
    setTimeout(function () {
      $(element).removeClass("css-transitions-only-after-page-load");
    }, 10);
  });
});

//this is for hamburger, signout and navbar buttons

//for hamburger menu
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
});

M.AutoInit();
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, {});
});

//js for searchbar animation
document.getElementById("mySearch").addEventListener("click", (event) => {
  document.getElementById("autocomplete-input").classList.add("showNav");
  document.getElementById("autocomplete-input").classList.remove("hidden");
});

document.getElementById("mySearchMobile").addEventListener("click", (event) => {
  document
    .getElementById("autocomplete-input-mobile")
    .classList.remove("hidden");
});

document.getElementById("logoButton").addEventListener("click", (event) => {
  window.location = "/";
});

document.getElementById("createNav").addEventListener("click", (event) => {
  window.location = "/create";
});

document.getElementById("createSideNav").addEventListener("click", (event) => {
  window.location = "/create";
});

document.getElementById("homePage").addEventListener("click", (event) => {
  window.location = "/";
});

document.getElementById("homePageNav").addEventListener("click", (event) => {
  window.location = "/";
});

document.getElementById("profilePage").addEventListener("click", (event) => {
  window.location = "/profile";
});

document.getElementById("profilePageNav").addEventListener("click", (event) => {
  window.location = "/profile";
});
document.getElementById("aboutPage").addEventListener("click", (event) => {
  window.location = "/about";
});

document.getElementById("aboutPageNav").addEventListener("click", (event) => {
  window.location = "/about";
});

function displaySignOut() {
  localStorage.getItem("token");
  if (localStorage.getItem("token") === null) {
    const signOut2 = document.createElement("li");
    signOut2.innerHTML = `
      <li id="logInButtonMain"><a href="/login">Log In</a></li>
      `;
    document.getElementById("signOutConditional").append(signOut2);
    document
      .getElementById("logInButtonMain")
      .addEventListener("click", (event) => {
        window.location = "/login";
      });
  } else {
    const signOut1 = document.createElement("li");
    signOut1.innerHTML = `
      <li id="signOutMain"><a href="/login">Sign Out</a></li>
      `;
    document.getElementById("signOutConditional").append(signOut1);
    document
      .getElementById("signOutMain")
      .addEventListener("click", (event) => {
        localStorage.removeItem("token");
        window.location = "/login";
      });
  }
}

function displaySignOutNav() {
  localStorage.getItem("token");
  if (localStorage.getItem("token") === null) {
    const signOut2 = document.createElement("li");
    signOut2.innerHTML = `
      <li id="logInButtonNav"><a href="/login">Log In</a></li>
      `;
    document.getElementById("signOutNav").append(signOut2);
    document
      .getElementById("logInButtonNav")
      .addEventListener("click", (event) => {
        window.location = "/login";
      });
  } else {
    const signOut1 = document.createElement("li");
    signOut1.innerHTML = `
      <li id="signOutButtonNav"><a href="/login">Sign Out</a></li>
      `;
    document.getElementById("signOutNav").append(signOut1);
    document
      .getElementById("signOutButtonNav")
      .addEventListener("click", (event) => {
        localStorage.removeItem("token");
        window.location = "/login";
      });
  }
}

displaySignOut();
displaySignOutNav();

function search(searchInput) {}

document.addEventListener("keydown", (event) => {
  if (
    (event.target.id === "autocomplete-input-mobile" &&
      event.code === "Enter") ||
    (event.target.id === "autocomplete-input" && event.code === "Enter")
  ) {
    const mobileSearchInput = document.getElementById(
      "autocomplete-input-mobile"
    ).value;
    const desktopSearchInput =
      document.getElementById("autocomplete-input").value;

    if (mobileSearchInput.trim()) {
      window.location = `/search/${mobileSearchInput}`;
    } else if (desktopSearchInput.trim()) {
      window.location = `/search/${desktopSearchInput}`;
    }
  }
});
