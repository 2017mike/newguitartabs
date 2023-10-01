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

//here we render the post by id that the user clicked on,

let postId = window.location.pathname;

axios
  .get(`/api/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then(({ data }) => {
    //render post
    document.getElementById("postSong").innerHTML = data.song;
    document.getElementById("postArtist").innerHTML = data.artist;
    document.getElementById("postBody").innerHTML = data.body;
    document.getElementById(
      "postUser"
    ).innerHTML = `<div > posted by: <span class="goToUser" data-username="${data.User.username}" id="goToUser">${data.User.username}</span></div>`;

    document.getElementById("goToUser").addEventListener("click", (event) => {
      window.location = `/users/${event.target.dataset.username}`;
    });

    //render the comment onto the page
    //     data.comments.forEach(comment => {
    //       document.getElementById('comments').innerHTML += `
    // <li class="collection-item #212121 grey darken-4 white-text">${comment.body}</li>
    // `
    //     })
  })
  .catch((err) => console.log(err));

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

function closeDonationBar() {
  const donationBar = document.getElementById("donation-bar");
  donationBar.classList.add("closed");
  console.log("Donation bar closed.");
}
