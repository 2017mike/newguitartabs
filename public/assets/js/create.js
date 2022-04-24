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



document.getElementById("tabField").addEventListener("input", (event) => {
  
 
  if (event.inputType === "deleteContentBackward") {
    getCursorPosition();

    let tabValue = event.target.value;

    tabValue = tabValue.split("");

    console.log(tabValue[cursorPosition - 1])
    console.log(tabValue[cursorPosition])
    console.log(tabValue[cursorPosition+1]);


    
    if (tabValue[cursorPosition] == "-" || tabValue[cursorPosition - 1]== '-')  {
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

  if (tabValue[cursorPosition + 1] === "E" ||
    tabValue[cursorPosition + 1] === "A" ||
    tabValue[cursorPosition + 1] === "D" ||
    tabValue[cursorPosition + 1] === "G" ||
    tabValue[cursorPosition + 1] === "B" ||
    tabValue[cursorPosition + 1] === "E") 
    {
    
    return;
  }

  

 

  tabValue = tabValue.split('')

  tabValue.splice(cursorPosition, 1)

  tabValue = tabValue.join('')

  document.getElementById("tabField").value = tabValue

  setCursorPosition(cursorPosition)


  
  // if(event.data === '-') {
  //   getCursorPosition()
  //   console.log(cursorPosition)
    
  //    currentTabValue = currentTabValue.split(`\n`);
  //    console.log(currentTabValue)

  //    let linesArray = []
  //    for (let i = 0; i < currentTabValue.length; i++) {
  //      const element = currentTabValue[i];
  //      console.log(element)
  //      if (element[0] === "E" && element[1] === "-" || element[0] === "A" || element[0] === "D" || element[0] === 'G' || element[0] ==="B") {
  //        let lineObject = {
  //          text: element,
  //          index: i
  //        }
  //        linesArray.push(lineObject);
         
  //      }

  //    }
  //    console.log(linesArray)
     
  //    for (let i = 0; i < linesArray.length; i++) {
  //       let line = linesArray[i].text
  //       if(line.length != 53) {
  //         console.log(line)
  //         line = line.split('')
  //         console.log(line)
  //         line.pop()
  //         console.log(line)
  //         line = line.join('')
  //         console.log(line)
  //         linesArray[i] = {
  //           text: line,
  //           index: linesArray[i].index
  //         }
  //         break
  //       }
  //    }
  //    console.log(linesArray)
  //    linesArray.forEach(line => {
  //      console.log(line)
  //      line.text += '\n'
  //      currentTabValue += line.text
  //    })
  //    console.log(currentTabValue)

  //    document.getElementById("tabField").value = currentTabValue;
  //    currentTabValue = pastTabValue
     
     

   
  // } else if (event.inputType === "deleteContentBackward") {
  //   console.log(event)
  //    pastTabValue = pastTabValue.split("");
  //    currentTabValue = currentTabValue.split("");
  //    console.log(pastTabValue);
  //    console.log(currentTabValue);
  //    for (let i = 0; i < pastTabValue.length; i++) {
  //      const element = pastTabValue[i]
  //      const newElement = currentTabValue[i]
  //      if (element != newElement) {
  //        console.log(i, element, newElement)
  //        currentTabValue.splice(i + 1, 0, '-')
  //        cursorPosition = i
  //        break;
  //      }
  //    }
  //    console.log(currentTabValue, pastTabValue);
  //    currentTabValue = currentTabValue.join("");

  //    document.getElementById("tabField").value = currentTabValue;

  //    pastTabValue = currentTabValue;
  //    setCursorPosition(cursorPosition);
  // }
  // else {
  //    pastTabValue = pastTabValue.split("");
  //    currentTabValue = currentTabValue.split("");
  //    console.log(pastTabValue);
  //    console.log(currentTabValue);
  //    for (let i = 0; i < pastTabValue.length; i++) {
  //      const element = pastTabValue[i];
  //      const newElement = currentTabValue[i];
  //      if (element != newElement) {
  //        console.log(i, element, newElement);
  //        currentTabValue.splice(i + 1, 1);
  //        cursorPosition = i + 1

  //        break;
  //      }
  //    }
    
  //    console.log(currentTabValue, pastTabValue);
  //    currentTabValue = currentTabValue.join("");

  //    document.getElementById("tabField").value = currentTabValue;

  //    pastTabValue = currentTabValue;
  //    setCursorPosition(cursorPosition);
  //    console.log(cursorPosition)

  })


  

  // console.log(pastTabValue);
  // console.log(currentTabValue);

 


  // inputString = inputString.split('')
  // console.log(inputString)


//function to add a new empty template
document.getElementById("newTemplate").addEventListener("click", (event) => {
  event.preventDefault();
  let newTemplateElem =
    "\nE----------------------------------------------------\nB----------------------------------------------------\nG----------------------------------------------------\nD----------------------------------------------------\nA----------------------------------------------------\nE----------------------------------------------------\n";

  document.getElementById("tabField").value += newTemplateElem;
  pastTabValue = document.getElementById("tabField").value;
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
