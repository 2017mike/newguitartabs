//function renderCards puts each post (tab) into a card, with a clickable 'view button'. viewbutton contains unique id of the post, and  navigates you to /post/:id. when you go to /post/:id, the id is grabbed from the pathname, then an axios request is made to get that particular post.

if (localStorage.getItem("tabValue") && localStorage.getItem("token")) {
  window.location = "/create";
}

const renderCards = () => {
  axios
    .get("/api/posts")
    .then(({ data }) => {
      data.forEach((post) => {
        axios
          .get(
            `https://theaudiodb.com/api/v1/json/2/search.php?s=${post.artist}`
          )
          .then((res) => {
            let artist = res.data;
            console.log(artist, "this is artist");

            if (artist.artists === null) {
              document.getElementById("renderCards").innerHTML += `

                <div class="col s12 m6 l4">
                <div class="card #424242 grey darken-3 transparent hoverable">
                <div class="card-image waves-effect">
                <img class="viewPostImg" src='/assets/images/angel.webp' data-id=${post.id} alt="image of an angel">
                </div>
                <div class="card-content center-align">

                <span class="card-title activator white-text text-darken-4 myTitle truncate">${post.song} <br> ${post.artist}</span>
                <a class="waves-effect waves-light btn viewPost black myBtn"  data-id=${post.id}>Tab</a>
                </div>
                </div>
                `;
            } else {
              document.getElementById("renderCards").innerHTML += `

        <div class="col s12 m6 l4">
        <div class="card #424242 grey darken-3 transparent hoverable">
        <div class="card-image waves-effect">
        <img  class="viewPostImg" src=${artist.artists[0].strArtistThumb} data-id=${post.id} alt="image not found">
        </div>
        <div class="card-content center-align">
        <span class="card-title  white-text text-darken-4 myTitle truncate">${post.song} <br> ${post.artist}</span>
        <a class="waves-effect waves-light btn viewPost black myBtn" data-id=${post.id}>Tab</a>
        </div>
        </div>
        `;
            }
            // end forEach
          });
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
