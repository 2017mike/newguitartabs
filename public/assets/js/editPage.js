

let postId = localStorage.getItem('postId')

axios.get(`/api/post/${postId}`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data }) => {
    // console.log(data)
    //get req or offer
    // console.log(data, 'this is data')
    // console.log(data.id)
    // console.log(data.body)
    songName.value = data.song
    artistName.value = data.artist

    localStorage.setItem('id', data.id)

    let newTabFieldValue = data.body

    document.getElementById('tabField').value = newTabFieldValue





  })
  .catch(err => console.log(err))






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
  localStorage.getItem('id')
  axios.put(`/api/posts/${localStorage.getItem('id')}`, newPost, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => {
      // console.log(res)
      alert('your tab has been edited :)')
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


