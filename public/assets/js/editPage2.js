let postId = localStorage.getItem("postId");

axios
  .get(`/api/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  .then(({ data }) => {
    // console.log(data)
    //get req or offer
    // console.log(data, 'this is data')
    // console.log(data.id)
    // console.log(data.body)
    console.log(songName);
    songName.value = data.song;
    artistName.value = data.artist;

    localStorage.setItem("id", data.id);

    let newTabFieldValue = data.body;

    document.getElementById("tabField").value = newTabFieldValue;
  })
  .catch((err) => console.log(err));

//submit tab function
document.getElementById("create").addEventListener("click", (event) => {
  event.preventDefault();

  // console.log(tabField.value)
  let newPost = {
    song: document.getElementById("songName").value,
    artist: document.getElementById("artistName").value,
    body: document.getElementById("tabField").value,
  };
  localStorage.getItem("id");
  axios
    .put(`/api/posts/${localStorage.getItem("id")}`, newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      // console.log(res)
      alert("your tab has been edited :)");
      window.location = "/";
    });
});
