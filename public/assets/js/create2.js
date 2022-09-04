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

//it is easier to visualize with an 'e' and 's' for start and endspace during development. Just make sure that the gibberish you use to test the tab doesn't contain an 'e' and 's' otherwise you will think the code's not working lol

// console.log(tenEmptySpaces.length);
// console.log(fiveEmptySpaces.length);
// console.log(fiftyFourEmptySpaces.length);
// console.log(fiftyFiveEmptySpaces.length);
// console.log(fiftySixEmptySpaces.length);

const newTemplateElem = `\n${startSpace}${fiftyFiveEmptySpaces}E----------------------------------------------------\n${fiftyFourEmptySpaces}B----------------------------------------------------\n${fiftyFourEmptySpaces}G----------------------------------------------------\n${fiftyFourEmptySpaces}D----------------------------------------------------\n${fiftyFourEmptySpaces}A----------------------------------------------------\n${fiftySixEmptySpaces}${endSpace}E----------------------------------------------------${endSpace}\n`;

//putting endSpace twice as a fallback. One endspace at the end should work for most cases, but if a user deletes multiple characters from an ending line then the endSpace at the beginning will work as a fallback to let the tab know to append an endspace to the end again.

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
};

const setCursorPosition = (pos) => {
  var elem = document.getElementById("tabField");
  elem.focus();
  elem.setSelectionRange(pos, pos);
};

//each individual tab can have variable length. This function will be useful for us to check the length of each line of tab.
const checkTabLength = (singleLine) => {
  //the amount of empty spaces at the beginning of each line of tab is the length of the tab. The default length is 54 but the user may increase it.
  //let's check here how many empty spaces are at the beginnning of the line
  let tabLength = 0;
  //we'll start tabLength at zero and increment it
  for (let index = 0; index < singleLine.length; index++) {
    const el = singleLine[index];
    if (el === emptySpace) {
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
  //After we figure out which line we're on, let's find out how many lines we are away from both the start space and the end space. Once we find all the lines contained within the start and the end space, we can add 10 empty spaces to the beginning of each of those lines. Once those spaces have been added, we can splice the lines back into the tab array. Then the main functionality at the bottom of the input event listener will be invoked and will make our lines bigger for us.

  tabValue = tabValue.split("\n");
  let linesAwayFromStart = 0;
  //looping through our lines starting at our current line's index. Once we get to a line that has a startSpace at the beginning, we're at the beginning of our current tab.

  for (let i = currentLineIndex; i >= 0; i--) {
    const element = tabValue[i];
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
    //we also need to have a different functionality for the end line so it doesn't overwirte the fallback endSpace! Remember, we have two endSpaces in the end line. The first is just to make sure that if our last endSpace gets overwritten/deleted, we have another one to fallback to. Phew!

    singleLine = fiveEmptySpaces + singleLine;
    tabValue.splice(index, 1, singleLine);
    const newTabValue = tabValue.join("\n");
    document.getElementById("tabField").value = newTabValue;
  }
  return linesAwayFromStart;
};

//this function is needed because the ending line of each tab must end with the end space. Without this function, a user can backspace normally through the tab, and the endSpace will move back along with the other characters. We don't want that!

// We'll handle this need with a function that takes in the tab value, finds all the lines with end spaces, and appends an end space to that line if there is not one already. We will also need to delete any other end spaces within that line since it is not in the right position.
const addEndSpaceToEndLine = (tabValue) => {
  tabValue = tabValue.split("\n");
  for (let index = 0; index < tabValue.length; index++) {
    const singleLine = tabValue[index];
    singleLine = singleLine.split("");
    if (singleLine.includes(endSpace)) {
      if (singleLine[singleLine.length - 1] === endSpace) {
        continue;
      }
    }
  }
};

let pastTabFieldValue = document.getElementById("tabField").value;

document.getElementById("tabField").addEventListener("input", (event) => {
  // console.log(event);
  getCursorPosition();
  console.log(cursorPosition);

  let tabValue = document.getElementById("tabField").value;

  let inTab = inTabCheck(tabValue);
  //the main functonality of the textarea input is at the bottom of the event listener. Here, we will handle special cases including +, enter, backspace, and space

  //handle Plus
  //if a user presses +, we want to increase the length of the current tab by 10. As we've seen, the length of the tab is determined by the number of empty spaces before each line in the tab.
  //We want to add to the number of empty spaces before each in line in the tab we are currently in.
  //We also want to add to the number of empty spaces to all the preceding and proceeding lines
  if (inTab) {
    if (event.data === "+") {
      let cursorVar = addTenToCurrentTab(tabValue);

      //now let's take out the "+" from the tab
      let newTabValue = document.getElementById("tabField").value;
      newTabValue = newTabValue.split("\n");
      for (let index = 0; index < newTabValue.length; index++) {
        let singleLine = newTabValue[index];
        if (singleLine[0] === startSpace || singleLine[0] === emptySpace) {
          singleLine = singleLine.replace("+", "-");
          newTabValue.splice(index, 1, singleLine);
        }
      }
      newTabValue = newTabValue.join("\n");
      document.getElementById("tabField").value = newTabValue;

      //once the lines have been added, we need to set the cursor based on how many lines away from start of the tab it's in. That is why addTenToCurrentTab returns the cursor var. Yes, I know, I should really refactor this so that cursorPosition isn't a global variable. I'm going to get to that but right now I'm just really interested in making this work.
      switch (cursorVar) {
        case 0:
          setCursorPosition(cursorPosition + 5);
          break;
        case 1:
          setCursorPosition(cursorPosition + 15);
          break;
        case 2:
          setCursorPosition(cursorPosition + 25);
          break;
        case 3:
          setCursorPosition(cursorPosition + 35);
          break;
        case 4:
          setCursorPosition(cursorPosition + 45);
          break;
        case 5:
          setCursorPosition(cursorPosition + 55);
          break;
      }

      //we also need to set tabValue to the tabField value because tabValue is used later on in the event listener and the tab has changed by running this function.
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
      return;
    }
  }

  if (event.inputType === "deleteContentBackward") {
    let currentTabValue = tabValue.split("");

    getCursorPosition();

    //this is making it so users cannot backspace over a zero-width space, endSpace or startSpace. We need to use the past-tab value because a user deleting over the zero-width will not allow us to actually have it in our array. So we need to look at the tabarea before they made their deletion.

    //this case is handling a single backspace.
    if (
      pastTabFieldValue[cursorPosition] === emptySpace ||
      pastTabFieldValue[cursorPosition] === endSpace ||
      pastTabFieldValue[cursorPosition] === startSpace
    ) {
      console.log("yo");
      document.getElementById("tabField").value = pastTabFieldValue;
      pastTabFieldValue = document.getElementById("tabField").value;
      setCursorPosition(cursorPosition);
      return;
    }

    //this is handling line breaks. Users shouldn't be able to delete line breaks when they are within the tab.
    if (inTab) {
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
  //check length of each line within tab to see if it has the correct number of dashes. If there is less than or more than the amount specified by the empty spaces before each line in the tab then we add or remove dashes to equal the correct number. This is the main functionality,
  getCursorPosition();

  tabValue = tabValue.split("\n");

  //splice here to check the length of each element in the array.this array will have each line as an item  each template line should have a default length of 54.
  for (let i = 0; i < tabValue.length; i++) {
    if (typeof tabValue === "string") {
      tabValue = tabValue.split("\n");
    }

    let singleLine = tabValue[i];

    if (singleLine[0] === emptySpace || singleLine[0] === startSpace) {
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

        //some more functionality here. We're just handling the case where a user has somehow moved the endSpace (usually through backspacing). We just need to make sure that the ending lines always end with endSpaces otherwise things get wonky real fast.
        if (singleLine.includes(endSpace)) {
          if (singleLine[singleLine.length - 1] !== endSpace) {
            //here we are handling what to do when our ending line doesn't actually end with an endSpace. What we are going to do is search through the line, delete any endSpaces that are not at the end, and then add the endSpace at the end.

            //why start at Math.ceil(tabLength/2) +1?
            //we want to start within the tab itself, not the empty spaces. The empty spaces in front of our actual line also contain the extra fallback endSpace, and we need to make sure not to delete that!

            for (
              let index = Math.ceil(tabLength / 2) + 1;
              index < singleLine.length;
              index++
            ) {
              const element = singleLine[index];

              if (element === endSpace) {
                singleLine.splice(index, 1);
              }
            }
            singleLine.push(endSpace);
          }
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
        console.log(singleLine);
        console.log(tabLength);
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
