const populateTab = () => {
  let newTemplateElem =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n";

  document.getElementById("tabField").value += newTemplateElem;
}
//populates initial tab in tabfield textarea
populateTab()




 let cursorPosition


 function getCursorPosition() {
   var elem = document.getElementById("tabField");
   cursorPosition = elem.selectionStart;
 }

 function setCursorPosition(pos) {
   var elem = document.getElementById("tabField");
   elem.focus();
   elem.setSelectionRange(pos, pos);
 }


let pastTabFieldValue = document.getElementById("tabField").value




document.getElementById("tabField").addEventListener("input", (event) => {

 if(!document.getElementById("formatter").checked) {
   return
 }





 console.log(event)

  if(event.inputType === 'insertLineBreak') {
    let tabValue = event.target.value;
    getCursorPosition()
    if (
      tabValue[cursorPosition] == "-" ||
      tabValue[cursorPosition - 1] == "-" ||
      tabValue[cursorPosition + 1] == "E" ||
      tabValue[cursorPosition + 1] == "A" ||
      tabValue[cursorPosition + 1] == "D" ||
      tabValue[cursorPosition + 1] == "G" ||
      tabValue[cursorPosition + 1] == "B" 
    ) {
      console.log(tabValue)
      document.getElementById("tabField").value = pastTabFieldValue;

      // document.getElementById("tabField").value = tabValue;


      setCursorPosition(cursorPosition+53)
      return


    }
  }

 

  if (event.inputType === "deleteContentBackward") {
    getCursorPosition();

    let tabValue = event.target.value;

    tabValue = tabValue.split("");

    console.log(tabValue[cursorPosition - 1])
    console.log(tabValue[cursorPosition])
    console.log(tabValue[cursorPosition+1]);

    

    
    if (
      tabValue[cursorPosition] == "-" ||
      tabValue[cursorPosition - 1] == "-" ||
      tabValue[cursorPosition + 1] == "E" ||
      tabValue[cursorPosition + 1] == "A" ||
      tabValue[cursorPosition + 1] == "D" ||
      tabValue[cursorPosition + 1] == "G" ||
      tabValue[cursorPosition + 1] == "B" 
    ) {
      tabValue.splice(cursorPosition, 0, "--");
      console.log("spliced!");
    }

    tabValue = tabValue.join('')

    document.getElementById("tabField").value = tabValue;

    setCursorPosition(cursorPosition);
    
  }


  if (event.inputType === 'insertFromPaste') {
    return
  }

  let tabValue = event.target.value;

  getCursorPosition();

  console.log(tabValue[cursorPosition - 1]);
  console.log(tabValue[cursorPosition]);
  console.log(tabValue[cursorPosition + 1]);

  if (tabValue[cursorPosition + 1] === "E"  ||
    tabValue[cursorPosition + 1] === "A" ||
    tabValue[cursorPosition + 1] === "D" ||
    tabValue[cursorPosition + 1] === "G" ||
    tabValue[cursorPosition + 1] === "B" ||
    tabValue[cursorPosition + 1] === "E") 
    {
    tabValue = tabValue.split("");

    tabValue.splice(cursorPosition-1, 1);

    tabValue = tabValue.join("");

    document.getElementById("tabField").value = tabValue;

    setCursorPosition(cursorPosition);
    return;
  }

  if (
    tabValue[cursorPosition] === "E" ||
    tabValue[cursorPosition] === "A" ||
    tabValue[cursorPosition] === "D" ||
    tabValue[cursorPosition] === "G" ||
    tabValue[cursorPosition] === "B" ||
    tabValue[cursorPosition] === "E"
  ) {
    tabValue = tabValue.split("");

    tabValue.splice(cursorPosition - 1, 1);

    tabValue = tabValue.join("");

    document.getElementById("tabField").value = tabValue;

    setCursorPosition(cursorPosition);
    return;
  }

  

 

  tabValue = tabValue.split('')

  tabValue.splice(cursorPosition, 1)

  tabValue = tabValue.join('')

  document.getElementById("tabField").value = tabValue

  setCursorPosition(cursorPosition)



  //check length of each line within tab to see if it has the correct number of dashes. This is error-handling in case something goes wrong. Most notably, if a user backspaces while the cursor is not within one space of a dash, the behavior without this code will allow the user to backspace such that the line will have a length of less than 53. 
    tabValue=tabValue.split('\n')
    //splice here to check the length of each element in the array.this array will have each line as an item; each template line should have a length of 53
    for (let i = 0; i < tabValue.length; i++) {
      let element = tabValue[i];
      
      if (
        element[0] === "E" ||
        element[0] === "A" ||
        element[0] === "D" ||
        element[0] === "G" ||
        element[0] === "B"
      ) {
        // here we are checking to make sure we are actually in the tab part of the textarea
        console.log(element)
        if (element.length < 53) {
          //if we are in the tab part of the textarea, and we find ourselves with less than 53 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.
          console.log(i);

          element = element.split("");
          while (element.length < 53) {
            element.push("-");
          }
          element = element.join("");
          console.log(tabValue)
          tabValue.splice(i, 1, element);
          //we are putting the corrected line back into our array, at its original index. we are replacing the old short line with the new longer line
          tabValue = tabValue.join("\n");
          document.getElementById("tabField").value = tabValue;
          setCursorPosition(cursorPosition);
        }
        else if (element.length > 53) {
          //if we are in the tab part of the textarea, and we find ourselves with less than 53 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.
          console.log(i);

          element = element.split("");
          while (element.length > 53) {
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

    pastTabFieldValue = document.getElementById('tabField').value

  })



  


 



  



//function to add a new empty template
document.getElementById("newTemplate").addEventListener("click", (event) => {
  event.preventDefault();
  let newTemplateElem =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n";

  document.getElementById("tabField").value += newTemplateElem;
  pastTabFieldValue = document.getElementById("tabField").value;

});

// document.querySelector("#newTemplate").click();

//function to clear template
document.getElementById("clearTemplate").addEventListener("click", (event) => {
  event.preventDefault();

  document.getElementById("tabField").value =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n";
});

//submit tab function
document.getElementById("create").addEventListener("click", (event) => {
  event.preventDefault();

  // console.log(tabField.value)
  let newPost = {
    song: document.getElementById("songName").value,
    artist: document.getElementById("artistName").value,
    body: document.getElementById("tabField").value,
  };
  axios
    .post("/api/posts", newPost, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      console.log(res);
      alert("your tab has been created :)");
      window.location = "/";
    });
});

//login function, checks for token in local storage
function loginVerify() {
  if (localStorage.getItem("token") === null) {
    window.location = "/login";
    alert("you must be logged in to create a tab, sorry :/");
  }
}

loginVerify();

//conditional logic to display sign in or sign out depending on whether user is logged in

// document.querySelector('.myCreate').addEventListener("keyup", editString);
