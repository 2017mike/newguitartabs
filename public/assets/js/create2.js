
//IMPORTANT: THIS CODE USES A ZERO WIDTH SPACE BEFORE THE FIRST LETTER OF EACH LINE IN THE TABLATURE. YOU CAN INSTALL THE VSCODE EXTENSION "GREMLINS" TO SHOW WHERE THESE SPACES ARE.
//Without this or a similar extension, this code will make no sense to you.
//I used these zero-width spaces in order to distinguish the first letter of tab versus a normal capital E, A, D, G, or B. Users must be capable of starting their sentences with a capital letter without the code assuming it is the first letter of a new line of tablature.



const populateTab = () => {
  let newTemplateElem =
    "\n​E----------------------------------------------------\n​B----------------------------------------------------\n​G----------------------------------------------------\n​D----------------------------------------------------\n​A----------------------------------------------------\n​E----------------------------------------------------\n"; 

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

//function to return true or false if user is within the tab inside the textarea
//Once we get our cursor position, we check if there is a zero-width space within the last 55 items at the index of the cursor position
//we do this by slicing the array so that we get a new array with only the last 55 items before our cursor
//If there is a zero-width space, then we must be in the tabarea
const inTabCheck = (tabValue) => {
  getCursorPosition();
  tabValue = tabValue.split("");

  let start;
  cursorPosition > 55 ? (start = cursorPosition-55) : (start = 0);
  //this conditional is to check that we are actually deep enough in the tabarea. If we are not at least 55 spaces deep witihin the tabarea then cursorPosition-55 will be negative, and we can't get the index at a negative number. So in that case we need to start slicing at index 0, which is contained within the else statement.


  let end = cursorPosition;

  let slicedValue = tabValue.slice(start, end);

  let inTab = false;
  for (let i = 0; i < slicedValue.length; i++) {
    const element = slicedValue[i];
    if (element === "​") {
      return true;
    }
  }
  if (!inTab) {
    return false;
  }
} 


let pastTabFieldValue = document.getElementById("tabField").value

document.getElementById("tabField").addEventListener("input", (event) => {
  // console.log(event)
  let tabValue = document.getElementById("tabField").value
  
  



  //the main functonality of the textarea input is at the bottom of the event listener. Here, we will handle special cases including return, backspace, and paste


  //in the case that a user presses enter, and is also within the tab, we just want their cursor to go down vertically by one line. The tab itself should not be affected. 
  if(event.inputType === "insertLineBreak") {
    
    
    // tabValue = tabValue.split("")
    if(inTabCheck(tabValue)) {
      tabValue = tabValue.split("");
      console.log(tabValue)
      console.log('hi')
      getCursorPosition()
      console.log(cursorPosition)
      
      console.log(cursorPosition)
      document.getElementById("tabField").value = pastTabFieldValue
      pastTabFieldValue = document.getElementById("tabField").value
      setCursorPosition(cursorPosition +54);
      return
    }
  }

  if (event.inputType === 'deleteContentBackward') {

    let currentTabValue = tabValue.split("");

    getCursorPosition();

    //this is making it so users cannot backspace over a zero-width space. We need to use the past-tab value because a user deleting over the zero-width will not allow us to actually have it in our array. So we need to look at the tabarea before they made their deletion. 
      if (pastTabFieldValue[cursorPosition] === "​") {
      document.getElementById("tabField").value = pastTabFieldValue;
      pastTabFieldValue = document.getElementById("tabField").value;
      setCursorPosition(cursorPosition);
      return;
    }

    
    //this is handling line breaks. Users shouldn't be able to delete line breaks when they are within the tab. 
    if (inTabCheck(tabValue)) {
      
     
      let currentTabValue = tabValue.split("")
     
      getCursorPosition()
     
      if (
     
        pastTabFieldValue[cursorPosition] === "\n"
      ) {
        console.log("hello");
        document.getElementById("tabField").value = pastTabFieldValue;
        pastTabFieldValue = document.getElementById("tabField").value;
        setCursorPosition(cursorPosition);
        return
      }
  }
}
    //still need to write this part lol
    //TODO: write functionality where users cannot backspace over a zero-width space. If they were allowed to do so, then the special functionality of the tab would be lost and that line of tab would be treated as normal text.

    // MAIN FUNCTIONALITY
    //check length of each line within tab to see if it has the correct number of dashes. If there is less than or more than 54 then we add or remove dashes to equal 54. This is the main functionality,
    getCursorPosition();

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
      element[0] === "​"
    ) {
      // here we are checking to make sure we are actually in the tab part of the textarea
      // we do this by checking for the zero-width space being at the first position
      if (element.length < 54) {
        //if we are in the tab part of the textarea, and we find ourselves with less than 53 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.
        // console.log(i);

        element = element.split("");
        while (element.length < 54) {
          element.push("-");
        }
        element = element.join("");
        // console.log(tabValue)
        tabValue.splice(i, 1, element);
        //we are putting the corrected line back into our array, at its original index. we are replacing the old short line with the new longer line
        tabValue = tabValue.join("\n");
        document.getElementById("tabField").value = tabValue;
        setCursorPosition(cursorPosition);
      } else if (element.length > 54) {
        //if we are in the tab part of the textarea, and we find ourselves with less than 53 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.
        // console.log(i)

        element = element.split("");
        while (element.length > 54) {
          element.pop();
        }
        element = element.join("");

        tabValue.splice(i, 1, element);
        //we are putting the corrected line back into our array, at its original index. we are replacing the old short line with the new longer line
        tabValue = tabValue.join("\n");
        document.getElementById("tabField").value = tabValue;
        setCursorPosition(cursorPosition);
      }
    }
  }

  pastTabFieldValue = document.getElementById("tabField").value 
}) 

//function to add a new empty template
document.getElementById("newTemplate").addEventListener("click", (event) => {
  event.preventDefault() 
  let newTemplateElem =
    "\n​E----------------------------------------------------\n​B----------------------------------------------------\n​G----------------------------------------------------\n​D----------------------------------------------------\n​A----------------------------------------------------\n​E----------------------------------------------------\n"; 

  document.getElementById("tabField").value += newTemplateElem 
  pastTabFieldValue = document.getElementById("tabField").value 
}) 

// document.querySelector("#newTemplate").click() 

//function to clear template
document.getElementById("clearTemplate").addEventListener("click", (event) => {
  event.preventDefault() 

  document.getElementById("tabField").value =
    "\n​E----------------------------------------------------\n​B----------------------------------------------------\n​G----------------------------------------------------\n​D----------------------------------------------------\n​A----------------------------------------------------\n​E----------------------------------------------------\n"; 
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
