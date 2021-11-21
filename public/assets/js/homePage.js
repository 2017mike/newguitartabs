const renderCards = () => {
  axios.get('/api/posts', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(({ data }) => {

      data.forEach(post => {

        // console.log(post, 'this is post')

        axios.get(`https://theaudiodb.com/api/v1/json/1/search.php?s=${post.artist}`)
          .then(res => {
            let artist = res.data
            // console.log(artist)

            if (artist.artists[0].strArtistThumb) {
              document.getElementById('renderCards').innerHTML += `
      <div class="col s12 m4">
        <div class="card #424242 grey darken-3">
          <div class="card-image waves-effect">
            <img  src=${artist.artists[0].strArtistThumb} alt="image not found">
          </div>
          <div class="card-content center-align">
            
            <span class="card-title activator white-text text-darken-4 myTitle">${post.song} <br> ${post.artist}</span>
            <a class="waves-effect waves-light btn viewPost black" data-id=${post.id}>view</a>
          </div>
         
      </div>
      `
            } else {
              document.getElementById('renderCards').innerHTML += `
      <div class="col s12 m4">
        <div class="card #424242 grey darken-3">
          <div class="card-image waves-effect">
            <img  src='https://cdn.pixabay.com/photo/2018/10/11/17/38/angel-3740393_1280.jpg' alt="image not found">
          </div>
          <div class="card-content center-align">
            
            <span class="card-title activator white-text text-darken-4 myTitle">${post.song} <br> ${post.artist}</span>
            <a class="waves-effect waves-light btn viewPost black" data-id=${post.id}>view</a>
          </div>
         
      </div>
      `
            }



            //end forEach
          })
      })
    })
    .catch(err => console.log(err))
}

renderCards()


//listener to view post
document.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.classList.contains('viewPost')) {
    //grab post id, takes you to post/:id
    window.location = `/post/${event.target.dataset.id}`
  }
})



//this is for hamburger, signout and navbar buttons

//for hamburger menu
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

M.AutoInit();
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
});

function displaySignOut() {

  localStorage.getItem('token')
  if ('token') {
    const signOut1 = document.createElement('li')
    signOut1.innerHTML = `
      <li id="signOut"><a href="/login">Sign Out</a></li>
      `
    document.getElementById('signOutConditional').append(signOut1)
  } else {
    const signOut2 = document.createElement('li')
    signOut1.innerHTML = `
      <li id="logInButton"><a href="/login">Log In</a></li>
      `
    document.getElementById('signOutConditional').append(signOut2)
  }
}

function displaySignOutNav() {

  localStorage.getItem('token')
  if ('token') {
    const signOut1 = document.createElement('li')
    signOut1.innerHTML = `
      <li id="signOut"><a href="/login">Sign Out</a></li>
      `
    document.getElementById('signOutNav').append(signOut1)
  } else {
    const signOut2 = document.createElement('li')
    signOut1.innerHTML = `
      <li id="logInButton"><a href="/login">Log In</a></li>
      `
    document.getElementById('signOutNav').append(signOut2)
  }
}


displaySignOut()
displaySignOutNav()


document.getElementById('signOut').addEventListener('click', event => {
  localStorage.removeItem('token')
  window.location = '/login'
})

document.getElementById('signOutNav').addEventListener('click', event => {
  localStorage.removeItem('token')
  window.location = '/login'
})
