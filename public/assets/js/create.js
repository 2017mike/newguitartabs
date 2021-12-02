

let tabField = document.getElementById('tabField').value

document.getElementById('tabField').addEventListener('input', updateValue)


function updateValue(tabfield) {
  tabField.replace('-', '')
}







//function to add a new empty template
document.getElementById('newTemplate').addEventListener('click', event => {
  event.preventDefault()
  let newTemplateElem =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n"

  document.getElementById('tabField').value += (newTemplateElem)
})


document.querySelector("#newTemplate").click();

//function to clear template
document.getElementById('clearTemplate').addEventListener('click', event => {
  event.preventDefault()

  document.getElementById('tabField').value = "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n"

})


//submit tab function
document.getElementById('create').addEventListener('click', event => {
  event.preventDefault()


  // console.log(tabField.value)
  let newPost = {
    song: document.getElementById('songName').value,
    artist: document.getElementById('artistName').value,
    body: document.getElementById('tabField').value
  }
  axios.post('/api/posts', newPost, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => {
      console.log(res)
      alert('your tab has been created :)')
      window.location = '/'
    })
})


//login function, checks for token in local storage     
function loginVerify() {
  if (localStorage.getItem("token") === null) {
    window.location = '/login'
    alert('you must be logged in to create a tab, sorry :/')
  }
}

loginVerify()


//conditional logic to display sign in or sign out depending on whether user is logged in




document.querySelector('.myCreate').addEventListener("keyup", editString);