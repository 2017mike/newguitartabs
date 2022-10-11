const showBioInput = () => {
  document.getElementById("bioInput").classList.remove("hidden1");
};

const hideBioInput = () => {
  document.getElementById("bioInput").classList.add("hidden1");
};

const hideBioParagraph = () => {
  document.getElementById("myBio").classList.add("hidden1");
};

const showBioParagraph = () => {
  document.getElementById("myBio").classList.remove("hidden1");
};

const showSuccessNotification = () => {
  alert("your bio has been successfully updated!");
};

const showFailureNotification = () => {
  alert("uh oh, something went wrong. We couldn't update your bio :(");
};

function renderUsername() {
  axios
    .get("/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(({ data }) => {
      // console.log(data, "user data");
      document.getElementById("myProfileName").innerHTML = `${data.username}`;
      data.bio
        ? (document.getElementById("myBio").innerHTML = `${data.bio}`)
        : showBioInput();
    });
}

renderUsername();

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }
  if (document.getElementById("bioInput").value !== "") {
    const inputValue = document.getElementById("bioInput").value;
    const body = {
      bio: inputValue,
    };
    axios
      .put("/api/users/bio", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        document.getElementById("myBio").innerText = res.data;
        hideBioInput();
        showBioParagraph();
        M.toast({ html: "Bio successfully updated" });
      })
      .catch((err) => {
        M.toast({ html: "Failed to updated bio :( Try again later" });
      });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.id === "myBio") {
    const currentBio = document.getElementById("myBio").innerText;
    hideBioParagraph();
    showBioInput();
    document.getElementById("bioInput").value = currentBio;
  }
});

//here we render the users' profile by requesting all tabs that the user has created and rendering them in a grid of cards similar to the home page
const renderProfile = () => {
  axios
    .get("/api/posts/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(({ data }) => {
      data.forEach((post) => {
        if (post.isDraft !== true) {
          console.log(post, "this is post");

          axios
            .get(
              `https://theaudiodb.com/api/v1/json/523532/search.php?s=${post.artist}`
            )
            .then((res) => {
              let artist = res.data;
              console.log(artist, "this is artist");

              if (artist.artists == null) {
                document.getElementById("renderProfile").innerHTML += `
                <div class="col s12 m6 l4">
                <div class="card #424242 grey darken-3 transparent">
                <div class="card-image waves-effect">
                <img class="viewPostImg" src='/assets/images/angel.webp' data-id=${post.id} alt="image not found">
                </div>
                <div class="card-content center-align">

                <span class="card-title activator white-text text-darken-4 myTitle truncate">${post.song} <br> ${post.artist}</span>
                <a class="waves-effect waves-light btn viewPost black myBtn" data-id=${post.id}>Tab</a>
            
                <a class="waves-effect waves-light btn  orange myBtn editPost" data-id=${post.id}><i data-id=${post.id} class="material-icons editPost">edit</i></a>
                <a class="waves-effect waves-light btn deletePost red myBtn" data-id=${post.id}><i data-id=${post.id} class="material-icons deletePost">delete</i></a>
                </div>
                </div>
      `;
              } else {
                document.getElementById("renderProfile").innerHTML += `

          <div class="col s12 m6 l4">
          <div class="card #424242 grey darken-3">
          <div class="card-image waves-effect">
          <img  class="viewPostImg" src=${artist.artists[0].strArtistThumb} data-id=${post.id} alt="image not found">
          </div>
          <div class="card-content center-align">
          <span class="card-title  white-text text-darken-4 myTitle truncate">${post.song} <br> ${post.artist}</span>
          <a class="waves-effect waves-light btn viewPost black myBtn" data-id=${post.id}>Tab</a>

          <a class="waves-effect waves-light btn  orange myBtn editPost" data-id=${post.id}><i class="material-icons editPost" data-id=${post.id}>edit</i></a>
          <a class="waves-effect waves-light btn deletePost red myBtn" data-id=${post.id}><i data-id=${post.id} class="material-icons deletePost">delete</i></a>
          </div>
          </div>
          `;
              }
              // end forEach
            });
        } else {
          document.getElementById("renderDrafts").innerHTML += `
                <div class="col s12 m6 l4">
                <div class="card #424242 grey darken-3 transparent">
                <div class="card-image waves-effect">
                <img class="viewPostImg" src='/assets/images/angel.webp' data-id=${post.id} alt="image not found">
                </div>
                <div class="card-content center-align">

                <span class="card-title activator white-text text-darken-4 myTitle truncate">${post.song} <br> ${post.artist}</span>
                <a class="waves-effect waves-light btn viewPost black myBtn" data-id=${post.id}>Tab</a>
            
                <a class="waves-effect waves-light btn  orange myBtn editPost" data-id=${post.id}><i data-id=${post.id} class="material-icons editPost">edit</i></a>
                <a class="waves-effect waves-light btn deletePost red myBtn" data-id=${post.id}><i data-id=${post.id} class="material-icons deletePost">delete</i></a>
                </div>
                </div>
      `;
        }
      });
    })
    .catch((err) => console.log(err));
};
renderProfile();

//listener to view post. takes your to /post/post_id. Once you are at post/post_id, a get is performed to that post id and populates the post page.
document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("viewPost")) {
    window.location = `/post/${event.target.dataset.id}`;
  }
});

//verify user is logged in to view profile, otherwise send them to login page
function loginVerify() {
  if (localStorage.getItem("token") === null) {
    window.location = "/login";
  }
}

loginVerify();

//listener to delete post
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("deletePost")) {
    if (window.confirm("are you sure you want to delete this tab?")) {
      axios
        .delete(`/api/posts/${event.target.dataset.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          // console.log(res)
          window.location.reload();
        });
    }
  }
});

//listener to take you to correct post to edit
document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("editPost")) {
    //grab post id, takes you to edit/:id
    localStorage.setItem("postId", event.target.dataset.id);
    window.location = `/edit`;
  }
});

//listener for images to take you to your post
document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("viewPostImg")) {
    //grab post id, takes you to post/:id
    window.location = `/post/${event.target.dataset.id}`;
  }
});
