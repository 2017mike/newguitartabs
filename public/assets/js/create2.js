const populateTab = () => {
  let newTemplateElem =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n" 

  document.getElementById("tabField").value += newTemplateElem 
} 
//populates initial tab in tabfield textarea
populateTab() 

let cursorPosition 
//we need this function to check where we are in the textarea. We want a certain behavior within the tab, and a certain behavior outside of the tab. 
const getCursorPosition = () => {
  var elem = document.getElementById("tabField") 
  cursorPosition = elem.selectionStart 
}

const setCursorPosition = (pos) => {
  var elem = document.getElementById("tabField") 
  elem.focus() 
  elem.setSelectionRange(pos, pos) 
}


//this function will verify whether the action performed within the textarea was within a tab template or not. If it was, return true, else return false
const verifyWithinTab = (tabValue) => {
  tabValue = tabValue.split("\n") 
  getCursorPosition() 
  // console.log(cursorPosition)
  elementArray = [] 
  let elementTotal = 0 
  let elementTotalArray = [] 
  for (let i = 0;  i < tabValue.length;  i++) {
    // console.log(tabValue)
    let element = tabValue[i] 
    elementArray.push(element) 
    elementTotal += element.length 
    elementTotalArray.push(elementTotal) 
  }
  // console.log(elementTotal)
  // console.log(elementTotalArray)
  // console.log(elementArray)

  let currentLine 

  for (let i = 0;  i < elementTotalArray.length;  i++) {
    if (
      cursorPosition > elementTotalArray[i] &&
      cursorPosition < elementTotalArray[i + 1]
    ) {
      // console.log(i)
      // console.log(i+1)
      // console.log(cursorPosition-tabValue.length)
      // console.log(elementTotalArray[i])
      // console.log(elementTotalArray[i+1])
      let adjustedCursorPosition = cursorPosition - i 
      console.log(elementArray) 
      console.log(cursorPosition) 
      console.log(adjustedCursorPosition) 

      if (
        (adjustedCursorPosition > elementTotalArray[i] &&
          adjustedCursorPosition < elementTotalArray[i + 1]) ||
        adjustedCursorPosition === elementTotalArray[i]
      ) {
        currentLine = elementArray[i + 1] 
      }
    }
  }
  console.log(elementTotalArray)
  console.log(currentLine) 
  if (!currentLine) {
    return 
  }

  // console.log(currentLine)

  if (
    currentLine[0] === "E" ||
    currentLine[0] === "A" ||
    currentLine[0] === "D" ||
    currentLine[0] === "G" ||
    currentLine[0] === "B"
  ) {
    console.log("inTab") 
  }
}



let pastTabFieldValue = document.getElementById("tabField").value

document.getElementById("tabField").addEventListener("input", (event) => {
  let tabValue = document.getElementById("tabField").value
  // verifyWithinTab(tabValue)
  //the main functonality of the textarea input is at the bottom of the event listener. Here, we will handle special cases including return, backspace, and paste

  //still need to write this part lol
 

  getCursorPosition()

  // verifyWithinTab(tabValue)




  // MAIN FUNCTIONALITY
  //check length of each line within tab to see if it has the correct number of dashes. If there is less than or more than 53 then we add or remove dashes to equal 53. This is the main functionality, 
  tabValue = tabValue.split("\n") 

  //splice here to check the length of each element in the array.this array will have each line as an item  each template line should have a length of 53
  for (let i = 0;  i < tabValue.length;  i++) {
    // console.log(typeof tabValue) 
    if (typeof tabValue === 'string') {
      tabValue = tabValue.split("\n") 
    }
    // console.log(tabValue)
    let element = tabValue[i] 

    if (
      element[0] === "E" ||
      element[0] === "A" ||
      element[0] === "D" ||
      element[0] === "G" ||
      element[0] === "B"
    ) {
      // here we are checking to make sure we are actually in the tab part of the textarea
      // at the moment we are doing this by seeing if the first character is EADGB.
      if (element.length < 53) {
        //if we are in the tab part of the textarea, and we find ourselves with less than 53 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.
        console.log(i) 

        element = element.split("") 
        while (element.length < 53) {
          element.push("-") 
        }
        element = element.join("") 
        // console.log(tabValue) 
        tabValue.splice(i, 1, element) 
        //we are putting the corrected line back into our array, at its original index. we are replacing the old short line with the new longer line
        tabValue = tabValue.join("\n") 
        document.getElementById("tabField").value = tabValue 
        setCursorPosition(cursorPosition) 
      } else if (element.length > 53) {
        //if we are in the tab part of the textarea, and we find ourselves with less than 53 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.
        // console.log(i) 

        element = element.split("") 
        while (element.length > 53) {
          element.pop() 
        }
        element = element.join("") 

        tabValue.splice(i, 1, element) 
        //we are putting the corrected line back into our array, at its original index. we are replacing the old short line with the new longer line
        tabValue = tabValue.join("\n") 
        document.getElementById("tabField").value = tabValue 
        setCursorPosition(cursorPosition) 
      }
    }
  }

  pastTabFieldValue = document.getElementById("tabField").value 
}) 

//function to add a new empty template
document.getElementById("newTemplate").addEventListener("click", (event) => {
  event.preventDefault() 
  let newTemplateElem =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n" 

  document.getElementById("tabField").value += newTemplateElem 
  pastTabFieldValue = document.getElementById("tabField").value 
}) 

// document.querySelector("#newTemplate").click() 

//function to clear template
document.getElementById("clearTemplate").addEventListener("click", (event) => {
  event.preventDefault() 

  document.getElementById("tabField").value =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n" 
}) 

//submit tab function
document.getElementById("create").addEventListener("click", (event) => {
  event.preventDefault() 

  // console.log(tabField.value)
  let newPost = {
    song: document.getElementById("songName").value,
    artist: document.getElementById("artistName").value,
    body: document.getElementById("tabField").value,
  } 
  axios
    .post("/api/posts", newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res) 
      alert("your tab has been created :)") 
      window.location = "/" 
    }) 
}) 

//login function, checks for token in local storage
function loginVerify() {
  if (localStorage.getItem("token") === null) {
    window.location = "/login" 
    alert("you must be logged in to create a tab, sorry :/") 
  }
}



// loginVerify() 

//conditional logic to display sign in or sign out depending on whether user is logged in

// document.querySelector('.myCreate').addEventListener("keyup", editString) 
