//this code is for the special case when a user has previously tried to submit a tab and been told to log in/create an account
if (localStorage.getItem("tabValue")) {
  document.getElementById("tabField").value = localStorage.getItem("tabValue");
  alert(
    "Thanks for creating an account! You can now save your tab as a draft or publish it."
  );
  localStorage.removeItem("tabValue");
}

//IMPORTANT: THIS CODE USES A ZERO WIDTH SPACE BEFORE THE FIRST LETTER OF EACH LINE IN THE TABLATURE. YOU CAN INSTALL THE VSCODE EXTENSION "GREMLINS" TO SHOW WHERE THESE SPACES ARE.
//Without this or a similar extension, this code will make no sense to you.
//I used these zero-width spaces in order to distinguish the first letter of tab versus a normal capital E, A, D, G, or B. Users must be capable of starting their sentences with a capital letter without the code assuming it is the first letter of a new line of tablature.
//9/3/22 I've also decided to use a different type of empty space for both the ending and beginning of the tab. This makes it much easier for us to check if our cursor is within our tab.

//TODO: need functionality to ensure that start space is always at start and end space is always at end. Currently user can elongate tab by 10 spaces successfully. However, this actually misplaces the start space and then things get wonky. Once start space is always guaranteed to be at the start, elongation should be able to continue indefinitely.

const emptySpace = "​";
const tenEmptySpaces = "​​​​​​​​​​";
const fiveEmptySpaces = "​​​​​";

// const tenEmptySpaces = "eeeeeeeeee";
const fiftyFourEmptySpaces =
  "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​";
const fiftyFiveEmptySpaces =
  "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​";
const fiftySixEmptySpaces =
  "​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​";
const endSpace = " ";
const startSpace = "­";
// const startSpace = "s";
// const endSpace = "e";

console.log(tenEmptySpaces.length);
console.log(fiveEmptySpaces.length);
// console.log(fiftyFourEmptySpaces.length);
// console.log(fiftyFiveEmptySpaces.length);
// console.log(fiftySixEmptySpaces.length);

const newTemplateElem = `\n${startSpace}${fiftyFiveEmptySpaces}E----------------------------------------------------\n${fiftyFourEmptySpaces}B----------------------------------------------------\n${fiftyFourEmptySpaces}G----------------------------------------------------\n${fiftyFourEmptySpaces}D----------------------------------------------------\n${fiftyFourEmptySpaces}A----------------------------------------------------\n${fiftyFiveEmptySpaces}E----------------------------------------------------${endSpace}\n`;

const populateTab = () => {
  document.getElementById("tabField").value += newTemplateElem;
};
//populates initial tab in tabfield textarea
populateTab();

let cursorPosition;

//we need this function to check where we are in the textarea. We want a certain behavior within the tab, and a certain behavior outside of the tab.
const getCursorPosition = () => {
  var elem = document.getElementById("tabField");
  cursorPosition = elem.selectionStart;
  console.log(cursorPosition);
};

const setCursorPosition = (pos) => {
  var elem = document.getElementById("tabField");
  elem.focus();
  elem.setSelectionRange(pos, pos);
};

//each individual tab can have variable length. This function will be useful for us to check the length of each line of tab.
const checkTabLength = (singleLine) => {
  //the amount of empty spaces at the beginning of each line of tab is the length of the tab. The default length is 54 but the user may increase it.
  //lets check here how many empty spaces are at the beginnning of the line
  let tabLength = 0;
  //we'll start tabLength at zero and increment it
  for (let index = 0; index < singleLine.length; index++) {
    const el = singleLine[index];
    if (el === "​") {
      tabLength++;
    }
  }
  return tabLength;
};

function getCurrentLine(cursorPosition, tabValue) {
  getCursorPosition();
  tabValue = tabValue.split("\n");
  let total = 0;
  let selectedLine;
  for (let i = 0; i < tabValue.length; i++) {
    let currentLine = tabValue[i];

    total += currentLine.length;
    if (
      cursorPosition > total &&
      cursorPosition <= total + tabValue[i + 1]?.length
    ) {
      selectedLine = tabValue[i + 1];
      break;
    }
  }
  return selectedLine;
}

function getCurrentLineIndex(cursorPosition, tabValue) {
  getCursorPosition();
  tabValue = tabValue.split("\n");
  let total = 0;
  let selectedLine;
  let selectedLineIndex;
  for (let i = 0; i < tabValue.length; i++) {
    let currentLine = tabValue[i];

    total += currentLine.length;
    if (
      cursorPosition > total &&
      cursorPosition <= total + tabValue[i + 1]?.length
    ) {
      selectedLine = tabValue[i + 1];
      selectedLineIndex = i + 1;
      break;
    }
  }
  return selectedLineIndex;
}

//function to return true or false if user is within the tab inside the textarea
//Once we get our cursor position, we check if there is a zero-width space within the last 55 items at the index of the cursor position
//we do this by slicing the array so that we get a new array with only the last 55 items before our cursor
//If there is a zero-width space, then we must be in the tabarea
const inTabCheck = (tabValue) => {
  //we need to find out which line of tab we're actually in to determine if we're in the tab. This is because each line of tab can have a variable length.

  getCursorPosition();
  tabValue = tabValue.split("");

  for (let index = cursorPosition; index <= tabValue.length * 2; index++) {
    const element = tabValue[index];
    if (element === endSpace) {
      return true;
      break;
    }
    if (element === startSpace) {
      return false;
      break;
    }
  }
  return false;
};

const addTenToCurrentTab = (tabValue) => {
  //let's get the index of the line we're on. Getting the index refers to the index in the array where we split up the tab value by line break. So essentially, we're just figuring out what line we're on.
  getCursorPosition();
  let currentLineIndex = getCurrentLineIndex(cursorPosition, tabValue);
  console.log(currentLineIndex);
  //After we figure out which line we're on, let's find out how many lines we are away from both the start space and the end space. Once we find all the lines contained within the start and the end space, we can add 10 empty spaces to the beginning of each of those lines. Once those spaces have been added, we can splice the lines back into the tab array. Then the main functionality at the bottom of the input event listener will be invoked and will make our lines bigger for us.

  tabValue = tabValue.split("\n");
  let linesAwayFromStart = 0;
  //looping through our lines starting at our current line's index. Once we get to a line that has a startSpace at the beginning, we're at the beginning of our current tab.

  for (let i = currentLineIndex; i >= 0; i--) {
    const element = tabValue[i];
    console.log(element);
    if (element[0] === startSpace) {
      break;
    }
    linesAwayFromStart++;
  }

  //we now know our current line's index as well as the amount of lines away from the start it is. So now we should be able to tell exactly which line is our start line.
  //for example, if we are currently on line 11 and 3 lines away from the start, then our start line is on line 8. Now we can start adding the empty spaces and splicing our line values into the tab.
  const startIndex = currentLineIndex - linesAwayFromStart;
  for (let index = startIndex; index < 6 + startIndex; index++) {
    //we need to have a different functionality in the case of the start space so that it doesn't get misplaced. Without this if statement, the empty spaces would be added IN FRONT OF the start space, thus making the start space not at the start. We don't want that!! It completely kills the functionality of the start space and things get really wonky really fast.

    let singleLine = tabValue[index];
    if (index === startIndex) {
      //what we are going to do here is remove the start space, add in the empty spaces, then replace the start space at the start again. Easy enough!
      console.log(singleLine);
      singleLine = singleLine.split("");
      singleLine.shift();
      singleLine.unshift(fiveEmptySpaces);
      singleLine.unshift(startSpace);
      singleLine = singleLine.join("");
      tabValue.splice(index, 1, singleLine);
      const newTabValue = tabValue.join("\n");
      document.getElementById("tabField").value = newTabValue;
      continue;
    }
    singleLine = fiveEmptySpaces + singleLine;
    tabValue.splice(index, 1, singleLine);
    const newTabValue = tabValue.join("\n");
    document.getElementById("tabField").value = newTabValue;
  }

  // tabValue.splice(currentLineIndex, 1, newLine);
  // tabValue = tabValue.join("\n");
  // document.getElementById("tabField").value = tabValue;
  // setCursorPosition(cursorPosition);
};

let pastTabFieldValue = document.getElementById("tabField").value;

document.getElementById("tabField").addEventListener("input", (event) => {
  // console.log(event)
  getCursorPosition();

  let tabValue = document.getElementById("tabField").value;

  let inTab = inTabCheck(tabValue);
  console.log(tabValue);
  //the main functonality of the textarea input is at the bottom of the event listener. Here, we will handle special cases including +, enter, backspace, and space

  //handle Plus
  //if a user presses +, we want to increase the length of the current tab by 10. As we've seen, the length of the tab is determined by the number of empty spaces before each line in the tab.
  //We want to add to the number of empty spaces before each in line in the tab we are currently in.
  //We also want to add to the number of empty spaces to all the preceding and proceeding lines
  if (inTab) {
    if (event.data === "+") {
      addTenToCurrentTab(tabValue);
      tabValue = document.getElementById("tabField").value;
    }
  }

  //handle space
  //if a user presses the spacebar, and is also within the tab, then we want to cursor to go forward by one but not affect the tab.
  if (inTabCheck(tabValue)) {
    // console.log(event)
    if (event.data === " ") {
      getCursorPosition();
      document.getElementById("tabField").value = pastTabFieldValue;
      pastTabFieldValue = document.getElementById("tabField").value;
      setCursorPosition(cursorPosition);
      return;
    }
  }

  //in the case that a user presses enter, and is also within the tab, we just want their cursor to go down vertically by one line. The tab itself should not be affected.
  if (event.inputType === "insertLineBreak") {
    console.log("yo");
    // tabValue = tabValue.split("")
    if (inTab) {
      getCursorPosition();
      document.getElementById("tabField").value = pastTabFieldValue;
      pastTabFieldValue = document.getElementById("tabField").value;
      let currentLine = getCurrentLine(cursorPosition, pastTabFieldValue);
      let currentLineLength = checkTabLength(currentLine);

      setCursorPosition(cursorPosition + currentLineLength);
      console.log(cursorPosition + currentLineLength);
      return;
    }
  }

  if (event.inputType === "deleteContentBackward") {
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
      let currentTabValue = tabValue.split("");

      getCursorPosition();

      if (pastTabFieldValue[cursorPosition] === "\n") {
        document.getElementById("tabField").value = pastTabFieldValue;
        pastTabFieldValue = document.getElementById("tabField").value;
        setCursorPosition(cursorPosition);
        return;
      }
    }
  }

  // MAIN FUNCTIONALITY
  //check length of each line within tab to see if it has the correct number of dashes. If there is less than or more than 54 then we add or remove dashes to equal 54. This is the main functionality,
  getCursorPosition();

  tabValue = tabValue.split("\n");

  //splice here to check the length of each element in the array.this array will have each line as an item  each template line should have a default length of 54.
  for (let i = 0; i < tabValue.length; i++) {
    if (typeof tabValue === "string") {
      tabValue = tabValue.split("\n");
    }

    let singleLine = tabValue[i];

    if (singleLine[0] === "​" || singleLine[0] === startSpace) {
      // here we are checking to make sure we are actually in the tab part of the textarea
      // we do this by checking for the zero-width space being at the first position

      let tabLength = checkTabLength(singleLine);
      tabLength = tabLength * 2 - 1;

      //why do we multiply by 2 here? A single line consists of all the empty spaces before it, which should equal the length of the tab in front of it. IE "              E------------" (imagining the empty space can be visualized). Therefore we need to multiply by 2 to account for the empty space before the tab as well as the tab itself.

      if (singleLine.length < tabLength) {
        //if we are in the tab part of the textarea, and we find ourselves with less than 54 characters, that means the tab is missing characters. We must add dashes to the end so that we have the correct amount of characters again.
        singleLine = singleLine.split("");
        while (singleLine.length < tabLength) {
          singleLine.push("-");
        }
        singleLine = singleLine.join("");
        tabValue.splice(i, 1, singleLine);
        //we are putting the corrected line back into our array, at its original index. we are replacing the old short line with the new longer line
        tabValue = tabValue.join("\n");
        document.getElementById("tabField").value = tabValue;
        setCursorPosition(cursorPosition);
      } else if (singleLine.length > tabLength) {
        //if we are in the tab part of the textarea, and we find ourselves with more than 54 characters, that means the tab has too many characters. We must take out characters from the end so that we have the correct amount of characters again.

        singleLine = singleLine.split("");
        while (singleLine.length > tabLength) {
          singleLine.splice(singleLine.length - 2, 1);
        }
        singleLine = singleLine.join("");

        tabValue.splice(i, 1, singleLine);
        //we are putting the corrected line back into our array, at its original index. we are replacing the old long line with the new shorter line
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
  document.getElementById("tabField").value += newTemplateElem;
  pastTabFieldValue = document.getElementById("tabField").value;
});

// document.querySelector("#newTemplate").click()

//function to clear template
document.getElementById("clearTemplate").addEventListener("click", (event) => {
  event.preventDefault();

  document.getElementById("tabField").value = newTemplateElem;
});

//submit tab function
document.getElementById("create").addEventListener("click", (event) => {
  event.preventDefault();

  if (
    document.getElementById("songName").value === "" ||
    document.getElementById("artistName").value === ""
  ) {
    alert("your tab must have a song and an artist!");
    return;
  }

  if (loginVerify()) {
    let newPost = {
      song: document.getElementById("songName").value,
      artist: document.getElementById("artistName").value,
      body: document.getElementById("tabField").value,
      isDraft: false,
    };
    axios
      .post("/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("your tab has been created :)");
        window.location = "/";
      });
  } else {
    let tabValue = document.getElementById("tabField").value;
    localStorage.setItem("tabValue", tabValue);
    if (
      confirm(
        "Don't worry though, it's easy and free to make an account, and your progress here will be saved. Would you like to make an account now?"
      )
    )
      window.location = "/register";
  }
});

document.getElementById("createDraft").addEventListener("click", (event) => {
  event.preventDefault();

  if (
    document.getElementById("songName").value === "" ||
    document.getElementById("artistName").value === ""
  ) {
    alert("your tab must have a song and an artist!");
    return;
  }

  if (loginVerify()) {
    let newPost = {
      song: document.getElementById("songName").value,
      artist: document.getElementById("artistName").value,
      body: document.getElementById("tabField").value,
      isDraft: true,
    };
    axios
      .post("/api/posts", newPost, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("your tab has been created :)");
        window.location = "/";
      });
  } else {
    let tabValue = document.getElementById("tabField").value;
    localStorage.setItem("tabValue", tabValue);
    if (
      confirm(
        "Don't worry though, it's easy and free to make an account, and your progress here will be saved. Would you like to make an account now?"
      )
    )
      window.location = "/register";
  }
});

//login function, checks for token in local storage
function loginVerify() {
  if (localStorage.getItem("token") === null) {
    alert("you must be logged in to create a tab, sorry :/");
    return false;
  } else {
    return true;
  }
}

// loginVerify()

//conditional logic to display sign in or sign out depending on whether user is logged in

// document.querySelector('.myCreate').addEventListener("keyup", editString)
