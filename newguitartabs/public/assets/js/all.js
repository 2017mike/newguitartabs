//this is for hamburger, signout and navbar buttons

//for hamburger menu
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});

M.AutoInit();
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, options);
});





document.getElementById('logoButton').addEventListener('click', event => {
  window.location = '/home'
})

document.getElementById('homePage').addEventListener('click', event => {
  window.location = '/home'
})

document.getElementById('homePageNav').addEventListener('click', event => {
  window.location = '/home'
})

document.getElementById('profilePage').addEventListener('click', event => {
  window.location = '/profile'
})

document.getElementById('profilePageNav').addEventListener('click', event => {
  window.location = '/profile'
})

document.getElementById('aboutPage').addEventListener('click', event => {
  window.location = '/aboutus'
})

document.getElementById('aboutPageNav').addEventListener('click', event => {
  window.location = '/aboutus'
})

document.getElementById('signOut').addEventListener('click', event => {
  localStorage.removeItem('token')
  window.location = '/login'
})

document.getElementById('signOutNav').addEventListener('click', event => {
  localStorage.removeItem('token')
  window.location = '/login'
})

