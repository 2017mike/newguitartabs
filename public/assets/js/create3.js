const populateTab = () => {
  let newTemplateElem =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n";

  document.getElementById("tabField").value += newTemplateElem;
};
//populates initial tab in tabfield textarea
populateTab();

let cursorPosition;
//we need this function to check where we are in the textarea. We want a certain behavior within the tab, and a certain behavior outside of the tab.
const getCursorPosition = () => {
  var elem = document.getElementById("tabField");
  cursorPosition = elem.selectionStart;
};

const setCursorPosition = (pos) => {
  var elem = document.getElementById("tabField");
  elem.focus();
  elem.setSelectionRange(pos, pos);
};

let pastTabFieldValue = document.getElementById("tabField").value;

document.getElementById("tabField").addEventListener("input", (event) => {
  let tabValue = document.getElementById("tabField").value;

  //the main functonality of the textarea input is at the bottom of the event listener. Here, we will handle speical cases including return, backspace, and paste

  //We will handle return first.

  getCursorPosition();

  // MAIN FUNCTIONALITY
  //check length of each line within tab to see if it has the correct number of dashes. If there is less than or more than 53 then we add or remove dashes to equal 53. This is the main functionality,
  tabValue = tabValue.split("\n");

  //splice here to check the length of each element in the array.this array will have each line as an item; each template line should have a length of 53
  for (let i = 0; i < tabValue.length; i++) {
    // console.log(typeof tabValue);
    if (typeof tabValue === "string") {
      tabValue = tabValue.split("\n");
    }
    // console.log(tabValue)
    let element = tabValue[i];

    if (
      element[0] === "E" ||
      element[0] === "A" ||
      element[0] === "D" ||
      element[0] === "G" ||
      element[0] === "B"
    ) {
      // here we are checking to make sure we are actually in the tab part of the textarea
      // console.log(element);
      if (element.length < 53) {
        //if we are in the tab part of the textarea, and we find ourselves with less than 53 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.

        element = element.split("");
        while (element.length < 53) {
          element.push("-");
        }
        element = element.join("");
        // console.log(tabValue);
        tabValue.splice(i, 1, element);
        //we are putting the corrected line back into our array, at its original index. we are replacing the old short line with the new longer line
        tabValue = tabValue.join("\n");
        document.getElementById("tabField").value = tabValue;
        setCursorPosition(cursorPosition);
      } else if (element.length > 53) {
        //if we are in the tab part of the textarea, and we find ourselves with less than 53 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.
        // console.log(i);

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

  pastTabFieldValue = document.getElementById("tabField").value;
});

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
