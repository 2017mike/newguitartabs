//function renderCards puts each post (tab) into a card, with a clickable 'view button'. viewbutton contains unique id of the post, and  navigates you to /post/:id. when you go to /post/:id, the id is grabbed from the pathname, then an axios request is made to get that particular post.

let terms = window.location.pathname.split("/");

const searchTerm = terms[2];

const renderCards = () => {
  axios
    .get(`/api/posts/search/${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(({ data }) => {
      console.log(data);
      if (data[0] == null) {
        document.getElementById("renderCards").innerHTML = `
        <h2 class="white-text center">Sorry! Nothing matched your search :( </h2>
        `;
        return;
      }
      data.forEach((post) => {
        if (post.isDraft === true) {
          ("");
        } else if (post.song !== undefined) {
          // console.log(post, 'this is post')

          // axios.get(`https://theaudiodb.com/api/v1/json/1/search.php?s=${post.artist}`)
          //   .then(res => {
          // let artist = res.data
          // console.log(artist,  'this is artist')

          // if (artist.artists === null) {
          document.getElementById("renderCards").innerHTML += `

                <div class="col s12 m6 l4">
                <div class="card #424242 grey darken-3 transparent hoverable">
                <div class="card-image waves-effect">
                <img class="viewPostImg" src='/assets/images/angel.webp' data-id=${post.id} alt="image not found">
                </div>
                <div class="card-content center-align">

                <span class="card-title activator white-text text-darken-4 myTitle truncate">${post.song} <br> ${post.artist}</span>
                <a class="waves-effect waves-light btn viewPost black myBtn"  data-id=${post.id}>Tab</a>
                </div>
                </div>
                `;
          // } else {
          //   document.getElementById('renderCards').innerHTML += `

          // <div class="col s12 m6 l4">
          // <div class="card #424242 grey darken-3 transparent hoverable">
          // <div class="card-image waves-effect">
          // <img  class="viewPostImg" src=${artist.artists[0].strArtistThumb} data-id=${post.id} alt="image not found">
          // </div>
          // <div class="card-content center-align">
          // <span class="card-title  white-text text-darken-4 myTitle truncate">${post.song} <br> ${post.artist}</span>
          // <a class="waves-effect waves-light btn viewPost black myBtn" data-id=${post.id}>Tab</a>
          // </div>
          // </div>
          // `
          // }
          //end forEach
          //     })
        } else {
          document.getElementById("renderCards").innerHTML += `

                <div class="col s12 m6 l4">
                <div class="card #424242 grey darken-3 transparent hoverable">
                <div class="card-image waves-effect">
                <img class="viewUserImg" src='/assets/images/angel-913630_1280.webp' data-username=${post.username} alt="image not found">
                </div>
                <div class="card-content center-align">

                <span class="card-title activator white-text text-darken-4 myTitle truncate">User <br> ${post.username}</span>
                <a class="waves-effect waves-light btn viewUser black myBtn"  data-username=${post.username}>Profile</a>
                </div>
                </div>
                `;
        }
      });
    })
    .catch((err) => console.log(err));
};

renderCards();

//listener to view post
document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("viewPost")) {
    //grab post id, takes you to post/:id
    window.location = `/post/${event.target.dataset.id}`;
  }
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("viewPostImg")) {
    //grab post id, takes you to post/:id
    window.location = `/post/${event.target.dataset.id}`;
  }
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("viewUserImg")) {
    //grab post id, takes you to post/:id
    window.location = `/users/${event.target.dataset.username}`;
  }
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.classList.contains("viewUser")) {
    //grab post id, takes you to post/:id
    window.location = `/users/${event.target.dataset.username}`;
  }
});
