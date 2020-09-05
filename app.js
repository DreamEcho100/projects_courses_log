/*
const section = document.querySelectorAll("section");

let modelObj = {};
init(modelObj);
let randomTime = randomNum(100, 100);
let maxDeg = 720;
let minDeg = -720;

const range = (function (max, min) {
  if (minDeg < 0) {
    return Math.floor(maxDeg + Math.abs(minDeg)) * 2;
  }
  if (minDeg >= 0) {
    return Math.floor(maxDeg - Math.abs(minDeg)) * 2;
  } 
})(maxDeg, minDeg)

let collectionObj = {
  currentIdx: 0,
  continue1: true,
  continue2Negatively: true,
  collection: []
}

section.forEach((item) => {
  //init(item);
  item.color1 = modelObj.color1;
  item.color2 = modelObj.color2;
  item.color3 = modelObj.color3;
  item.deg = modelObj.deg;
  
  changeBGColor(item, randomTime, collectionObj);
})

function changeBGColor(item, time, objCollector) {
  setInterval(function() {
    if (objCollector.continue1) {
      let valColor1 = action("rgbColor", item.color1, randomNum(1, 0), 0, 256);
      let valColor2 = action("rgbColor", item.color2, randomNum(10, 0), 0, 256);
      let valColor3 = action("rgbColor", item.color3, randomNum(1, 0), 0, 256);
      let valDeg = action("deg", item.deg, randomNum(5, 1), minDeg, maxDeg);
      randomTime = randomNum(25, 50);

      objCollector.collection.push({
        id: objCollector.currentIdx,
        color1: valColor1,
        color2: valColor2,
        color3: valColor3,
        deg: valDeg,
        timeForThis: randomTime
      })
      objCollector.currentIdx += 1;
      if (objCollector.currentIdx >= range) {
        objCollector.continue1 = false;
      }

      let val = `linear-gradient(${valDeg}deg,
            rgb(${valColor1}, ${valColor2}, ${valColor3}),
            rgb(${valColor3}, ${valColor1}, ${valColor2}),
            rgb(${valColor2}, ${valColor3}, ${valColor1}))`;
      item.style.backgroundImage = val;
    } else {
      let currentItem;
      if (objCollector.continue2Negatively) {
        if (objCollector.currentIdx === range) {
          currentItem =  objCollector.collection[range - 1];
          objCollector.currentIdx -= 1;
        } else {
          currentItem =  objCollector.collection[objCollector.currentIdx - 1];
          objCollector.currentIdx -= 1;
          if ((objCollector.currentIdx - 1) < 0) {
            objCollector.continue2Negatively = false;
          }         
        }
      } else {
        if ((objCollector.currentIdx) === 0) {
          currentItem =  objCollector.collection[0];
          objCollector.currentIdx += 1;
        } else {
          currentItem =  objCollector.collection[objCollector.currentIdx + 1];
          objCollector.currentIdx += 1;
          if ((objCollector.currentIdx + 1) === range) {
            objCollector.continue2Negatively = true;
          } 
        }
          
      }

      let val = `linear-gradient(${currentItem.deg}deg,
            rgb(${currentItem.color1}, ${currentItem.color2}, ${currentItem.color3}),
            rgb(${currentItem.color3}, ${currentItem.color1}, ${currentItem.color2}),
            rgb(${currentItem.color2}, ${currentItem.color3}, ${currentItem.color1}))`;
      item.style.backgroundImage = val;
      randomTime = currentItem.timeForThis;
    }

  }, randomTime)

    

  }
*/

let UIController = (function () {
  const variablesString = {
    spinningBackground1: ".spinningBackground1",
  };

  let nodeListForEach = function (list, callback) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    variables: variablesString,
    spinningBackgroundForMulti: function (elemArr, arrayHoldingColors, range) {
      const arr = arrayHoldingColors;
      randomTime = arr[0].timeForThis;
      let desinding = true;
      nodeListForEach(elemArr, function (current, index) {
        let counter = 0;
        setInterval(function () {
          if (desinding) {
            current.style.backgroundImage = arr[counter].backgroundImage;
            counter++;
            if (counter === range - 1) {
              desinding = false;
            } else {
              randomTime[counter];
            }
          } else if (!desinding) {
            current.style.backgroundImage = arr[counter].backgroundImage;
            counter--;
            if (counter === 0) {
              desinding = true;
            } else {
              randomTime[counter];
            }
          }
        }, randomTime);
      });
    },
  };
})();

let calculationsMaker = (function () {
  let setupObj = function (item) {
    let colorsValues = {
      0: {
        num: randomNum(256, 0),
        positiveIncrease: TrueOrFalse(),
      },
      1: {
        num: randomNum(256, 0),
        positiveIncrease: TrueOrFalse(),
      },
      2: {
        num: randomNum(256, 0),
        positiveIncrease: TrueOrFalse(),
      },
    };

    let holder = Object.keys(colorsValues);

    let counter = 0;
    function randomaizeVals() {
      while (holder.length !== 0) {
        let randomIdx = randomNum(holder.length, 0);
        let r = String(holder.splice(randomIdx, 1));

        for (let i = 0; i < 1; i++) {
          item[`color${counter + 1}`] = colorsValues[r];
        }
        counter++;
      }
    }
    randomaizeVals();

    let deg = {
      num: randomNum(360, 0),
      positiveIncrease: TrueOrFalse(),
    };
    item.deg = deg;
    return item;
  };

  let randomNum = function (num, min) {
    if (num <= 1) {
      return Number((Math.random() * num + min).toFixed(2));
    }
    return Math.floor(Math.random() * num) + min;
  };

  let TrueOrFalse = function () {
    return Math.random() >= 0.5 ? true : false;
  };

  const range = function (max, min) {
    if (min < 0) {
      return Math.abs(Math.floor(max + Math.abs(min)) * 2);
    }
    if (min >= 0) {
      return Math.abs(Math.floor(max - Math.abs(min)) * 2);
    }
  };

  let action = function (type, obj, num, min, max) {
    if (type === "deg" || type === "rgbColor") {
      if (obj.positiveIncrease) {
        if (obj.num + num >= max) {
          obj.positiveIncrease = false;
          obj.num = obj.num + num;
          return obj.num;
        } else {
          obj.num = obj.num + num;
        }
      }
      if (!obj.positiveIncrease) {
        if (obj.num - num <= min) {
          obj.positiveIncrease = true;
          obj.num = obj.num - num;
        } else {
          obj.num = obj.num - num;
        }
      }
      return obj.num;
    }
  };

  return {
    buildingColorsAndTimesObj: function (
      randomTime,
      randomTimeMin,
      minDeg,
      maxDeg
    ) {
      let obj = {};
      setupObj(obj);
      let degRange = range(minDeg, maxDeg);
      obj.collectionObj = {
        currentIdx: 0,
        continuePosetively: false,
        continueNegatively: true,
        colorsCollection: [],
      };
      let valColor1, valColor2, valColor3, valDeg;

      while (obj.collectionObj.currentIdx !== degRange) {
        valColor1 = action("rgbColor", obj.color1, randomNum(1, 0), 0, 256);
        valColor2 = action("rgbColor", obj.color2, randomNum(10, 0), 0, 256);
        valColor3 = action("rgbColor", obj.color3, randomNum(1, 0), 0, 256);
        valDeg = action("deg", obj.deg, randomNum(5, 1), 0, maxDeg);
        randomTime = randomNum(randomTime, randomTimeMin);

        obj.collectionObj.colorsCollection.push({
          id: obj.collectionObj.currentIdx,
          color1: valColor1,
          color2: valColor2,
          color3: valColor3,
          backgroundImage: `linear-gradient(${valDeg}deg, rgb(${valColor1}, ${valColor2}, ${valColor3}), rgb(${valColor3}, ${valColor1}, ${valColor2}), rgb(${valColor2}, ${valColor3}, ${valColor1}))`,
          deg: valDeg,
          timeForThis: randomTime,
        });
        obj.collectionObj.currentIdx += 1;
      }
      return {
        colors: obj.collectionObj.colorsCollection,
        range: degRange,
      };
    },
  };
})();

let ContentBuilder = (function () {
  let temp;
  const contentObj = [
    {
      mainSectionHeader: "!personalProjects",
      mainSectionHeaderType: "h2",
      mainSectionInfo: "There is nothing at this moment :/",
      mainSectionClass: "spinningBackground1 main-section",
      exisist: false,
      courses: [],
    },
    {
      mainSectionHeader: "Developedbyed",
      mainSectionHeaderType: "h2",
      mainSectionInfo: "Developedbyed",
      mainSectionClass: "main-section Site",
      exisist: true,
      courses: [
        {
          courseSectionHeader: "The Creative Front End Development Bundle",
          courseSectionHeaderType: "h3",
          courseSectionInfo:
            "This course main focus is in practicing JavaScript",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "none",
              "Beatmaker",
              "index.html",
              2.5,
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Building a Beatmaker."
            ),
            coursesProjectObjBuilder(
              "none",
              "Coloors",
              "index.html",
              2.5,
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Building a colors library picker."
            ),
            coursesProjectObjBuilder(
              "none",
              "Photon",
              "index.html",
              2,
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Building a Photo search using pexels API."
            ),
            coursesProjectObjBuilder(
              "none",
              "Todo List",
              "index.html",
              2.25,
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Building a Todo List that have the functionality of saving, removing and filtering items."
            ),
            coursesProjectObjBuilder(
              "none",
              "Travel Website",
              "index.html",
              2.75,
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Building a Travel Website using some cool scrolling animations and page transitions."
            ),
          ],
        },
        {
          courseSectionHeader: "The Creative HTML5 & CSS3 Course",
          courseSectionHeaderType: "h3",
          courseSectionInfo: "This course main focus is in practicing HTML&CSS",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "specialCharsChange",
              "Travelly | Travelling Agency",
              "index.html",
              2.75,
              {
                languages: ["HTML", "CSS"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Building a Travelly | Travelling Agency website."
            ),
          ],
        },
      ],
    },
    {
      mainSectionHeader: "GitHub",
      mainSectionHeaderType: "h2",
      mainSectionInfo: "There is nothing at this moment :/",
      mainSectionClass: "spinningBackground1 main-section",
      exisist: false,
      courses: [],
    },
    {
      mainSectionHeader: "Khan Academy",
      mainSectionHeaderType: "h2",
      mainSectionInfo: "Khan Academy",
      mainSectionClass: "main-section Site",
      exisist: true,
      courses: [
        {
          courseSectionHeader: "JS",
          courseSectionHeaderType: "h3",
          courseSectionInfo:
            "This course main focus is practicing drawing and visualize in JavaScript",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "none",
              "Draw With JS",
              "Draw With JS 1.js",
              1,
              {
                languages: ["JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Draw With JS on Khan Academy, In document what I learned In this."
            ),
          ],
        },
      ],
    },
    {
      mainSectionHeader: "Udacity",
      mainSectionHeaderType: "h2",
      mainSectionInfo: "Udacity",
      mainSectionClass: "main-section Site",
      exisist: true,
      courses: [
        {
          courseSectionHeader:
            "Web Development Professional Nanodegree Program",
          courseSectionHeaderType: "h3",
          courseSectionInfo:
            "Udacity Web Development Professional Nanodegree Program, This course main focus is practicing JavaScript",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "none",
              "Landing Page",
              "index.html",
              1,
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Building a Landing Page with a JavaScript generated navigation bar, smooth scrolling to the specified sections on the navigation bar and some animations when scrolling near to every section."
            ),
          ],
        },
      ],
    },
    {
      mainSectionHeader: "Udemy",
      mainSectionHeaderType: "h2",
      mainSectionInfo: "Udemy",
      mainSectionClass: "main-section Site",
      exisist: true,
      courses: [
        {
          courseSectionHeader:
            "Monster JavaScript Course - 50+ projects and applications",
          courseSectionHeaderType: "h3",
          courseSectionInfo:
            "Monster JavaScript Course - 50+ projects and applications",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "none",
              "Accordion Component",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Alien Invader Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Audio Button Player",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Background Color & Font Color Divs Buttons Changer",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Background Color & Font Color Divs Buttons Changer2",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Background Color Body Buttons Changer",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Building A Flying Bird Game From Scratch",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Calculator Mini Web Application",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Car Driving Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Card War Project",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Catch Element Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Click Popper Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Click Reaction Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Clipboard - Copy And Move Text",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Coin Toss Game Code",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Combination Guessr Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Countdown Timer",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Create Form Validation Using JavaScript",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Creating A Tooltip Popup With JavaScript",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Creating An Image Popup Window On Image Elements",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Current Date(Eastern European Standard Time)",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Document Object Model",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Document Object Model Element Manipulation With JS",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Dom Content Loaded",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Dynamic Editable Shopping List",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "DOM Interaction Application DOMinator",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Dynamic welcome message",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Element Catcher Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Element Mouse And Click Events",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Element Scrolling Content",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Email Extractor Application",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Explore JavaScript Cookies While Building Cookie Get Set Tester Web Application",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "From Ten To Zero",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Functionator JavaScript Function practice Code",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Guess The Hidden Word Which Is Scrambled",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "High Low Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Image Carousel Animated Slideshow Application",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Input Field Character Counter",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "JavaScript Application To Create Files - Google Sheet Data To CSV File",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Just JavaScript Click Counter",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Keyboard Div Mover",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Keyboard Events Tracker",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Magic Eight Ball",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Modal Popup Example",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Number Guessing Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Pattern Matching Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Placeholder Image Path Generator",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Plane Bomber Game Simple JavaScript DOM Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Popup Message",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Random Array Message",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Random Background Color Button Generator",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Rock Paper Scissors Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Simple List",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "innerSubContent",
              "Some Js Code",
              "none",
              "none",
              "none",
              "??",
              [
                {
                  fileName: "Bubbling & Capturing",
                  fileType: "index.html",
                  difficulty: "??",
                  fileInfo: "??",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  fileName:
                    "Generating A Random Numbers In A Range That Doesn't Exist In From an Array",
                  fileType: "app.js",
                  difficulty: "??",
                  fileInfo: "??",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  fileName: "JS Local Strorage",
                  fileType: "index.html",
                  difficulty: "??",
                  fileInfo: "??",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
                {
                  fileName: "ProtoType in JS",
                  fileType: "app.js",
                  difficulty: "??",
                  fileInfo: "??",
                  tech: {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                },
              ],
              "h4"
            ),
            coursesProjectObjBuilder(
              "none",
              "Some Mouse Events",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Star Rating Project Click And Hover Events",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Tip Calculater",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Try & Catch",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Typing Test Mini Application",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Ultimate Dice Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Word Guessing Hangman Game",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Word Scrumble",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "xHR & Fetch",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
          ],
        },
        {
          courseSectionHeader: "The Modern Javascript Bootcamp Course (2020)",
          courseSectionHeaderType: "h3",
          courseSectionInfo: "The Modern Javascript Bootcamp Course (2020)",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "none",
              "Coin Chaser",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Coin Chaser",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
            coursesProjectObjBuilder(
              "none",
              "Practicing Promise, Async& Await",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Practicing Promise, Async& Await through a multi choose question application"
            ),
            coursesProjectObjBuilder(
              "none",
              "Practicing Prototypes, Classes, & The New Operator",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Practicing Prototypes, Classes, & The New Operator through a multi choose question application"
            ),
            coursesProjectObjBuilder(
              "none",
              "Timer",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Timer"
            ),
          ],
        },
      ],
    },
    {
      mainSectionHeader: "Youtube",
      mainSectionHeaderType: "h2",
      mainSectionInfo: "Youtube",
      mainSectionClass: "main-section Site",
      exisist: true,
      courses: [
        {
          courseSectionHeader: "Ania Kubów JavaScriptGames",
          courseSectionHeaderType: "h3",
          courseSectionInfo: "Ania Kubów JavaScriptGames",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "none",
              "Candy Crush",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Candy Crush"
            ),
          ],
        },
        {
          courseSectionHeader: "Fireship",
          courseSectionHeaderType: "h3",
          courseSectionInfo: "Fireship",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "none",
              "Animated Responsive Navbar With CSS",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "??"
            ),
          ],
        },
        {
          courseSectionHeader: "Ghost Tech",
          courseSectionHeaderType: "h3",
          courseSectionInfo: "Ghost Tech",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "innerSubCourse",
              "JavaScript Complete Course 2019- Build Real Projects! __ FOR BEGINNERS",
              "index.html",
              3,
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "JavaScript Complete Course 2019- Build Real Projects! __ FOR BEGINNERS",
              [
                [
                  "none",
                  "Budgety",
                  "index.html",
                  3,
                  {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                  "Budgety",
                ],
                [
                  "innerSubContent",
                  "Displaying A Question",
                  "none",
                  "none",
                  "none",
                  "??",
                  [
                    {
                      type: "none",
                      projectName: "(1)[Using Function&Prototypal Inheritance]",
                      projectFileType: "index.html",
                      difficulty: "??",
                      projectInfo: "(1)[Using Function&Prototypal Inheritance]",
                      tech: {
                        languages: ["HTML", "CSS", "JavaScript"],
                        libraries: [],
                        frameworks: [],
                        APIs: [],
                      },
                    },
                    {
                      type: "none",
                      projectName: "(2)[Using Maps&Classes]",
                      projectFileType: "index.html",
                      difficulty: "??",
                      projectInfo: "(2)[Using Maps&Classes]",
                      tech: {
                        languages: ["HTML", "CSS", "JavaScript"],
                        libraries: [],
                        frameworks: [],
                        APIs: [],
                      },
                    },
                  ],
                ],
                [
                  "none",
                  "Pig Game",
                  "index.html",
                  3,
                  {
                    languages: ["HTML", "CSS", "JavaScript"],
                    libraries: [],
                    frameworks: [],
                    APIs: [],
                  },
                  "Pig Game",
                ],
              ],
              "h4"
            ),
          ],
        },
        {
          courseSectionHeader: "Traversy Media",
          courseSectionHeaderType: "h3",
          courseSectionInfo: "Traversy Media",
          courseSectionClases: "spinningBackground1",
          projects: [
            coursesProjectObjBuilder(
              "none",
              "Bookmarker Application",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Bookmarker Application"
            ),
            coursesProjectObjBuilder(
              "none",
              "Full screen Image Slider",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Full screen Image Slider"
            ),
            coursesProjectObjBuilder(
              "none",
              "Full Screen Responsive Image Slider",
              "index.html",
              "??",
              {
                languages: ["HTML", "CSS", "JavaScript"],
                libraries: [],
                frameworks: [],
                APIs: [],
              },
              "Full Screen Responsive Image Slider"
            ),
          ],
        },
      ],
    },
  ];

  function coursesProjectObjBuilder(
    type,
    projectName,
    projectFileType,
    difficulty,
    tech,
    projectInfo,
    inner,
    innerHeadType
  ) {
    if (type === "innerSubCourse") {
      //debugger;
       temp = {
        type,
        projectName,
        projectFileType,
        difficulty,
        tech,
        projectInfo,
        innerCourseProjects: inner.map((i) => coursesProjectObjBuilder(...i)),
        innerCourseProjectsHeadType: innerHeadType,
      };
      console.log(temp);
      return temp;
    }
    if (type === "deepInnerSubCourse") {
    }

    if (type === "innerSubContent") {
      return {
        type,
        projectName,
        projectFileType,
        difficulty,
        tech,
        projectInfo,
        innerSubContentProjects: inner,
        innerSubContentProjectsHeadType: innerHeadType,
      };
    }

    return {
      type,
      projectName,
      projectFileType,
      difficulty,
      tech,
      projectInfo,
    };
  }

  function sectionBuilding() {
    let content = "";
    contentObj.forEach((section) => {
      if (!section.exisist) {
        return (content += `
    <section class="${section.mainSectionClass}">
      <${section.mainSectionHeaderType}>${section.mainSectionHeader} <button class="subElemContainngInfo tooltip-section" data-section-content="${section.mainSectionInfo}" data-section-content-show-on-until-click="show">i</button></${section.mainSectionHeaderType}>
    <div class="tooltip-output"></div>      
    <${section.mainSectionHeaderType}>${section.mainSectionInfo}</${section.mainSectionHeaderType}>
      <ol>
        <li>
          ${section.mainSectionInfo}
        </li>
      </ol>
    </section>
        `);
      }
      content += `<section class="${section.mainSectionClass}">`;
      content += `<${section.mainSectionHeaderType}>${section.mainSectionHeader} <button class="subElemContainngInfo tooltip-section" data-section-content="${section.mainSectionInfo}" data-section-content-show-on-until-click="show">i</button></${section.mainSectionHeaderType}>
      <div class="tooltip-output"></div><ol>`;
      content += innerContentHTMLBuilder(
        section.courses,
        section.mainSectionHeader
      );

      content += `</ol></section>`;
    });
    return content;
  }

  function innerContentHTMLBuilder(courses, urlStart) {
    let urlCont;
    let innerContent = "";
    courses.forEach((course) => {
      innerContent += `<li><section class="${course.courseSectionClases}">
          <${course.courseSectionHeaderType}>${course.courseSectionHeader} <button class="subElemContainngInfo tooltip-section" data-section-content="${course.courseSectionInfo}" data-section-content-show-on-until-click="show">i</button></${course.courseSectionHeaderType}>
          <div class="tooltip-output"></div>
          <ol>`;
      urlCont = `${urlStart}/${course.courseSectionHeader}`;
      innerContent += projectsContentHTMLBuilder(course.projects, urlCont);

      innerContent += ` </ol>
                </section></li>`;
    });
    return innerContent;
  }

  function projectsContentHTMLBuilder(projects, url) {
    let deepInnerContent = "";

    projects.forEach((project) => {
      if (project.type === "none") {
        deepInnerContent += `<li>
              <a href="${url}/${project.projectName}/${project.projectFileType}"  target="_blank">
                ${project.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                <div class="tooltip-output"></div>
              </a>
              </li>`;
      } else if (project.type === "specialCharsChange") {
        url = `${url}/${project.projectName.replace(/[|]/g, "-")}/${
          project.projectFileType
        }`;
        deepInnerContent += `<li>
              <a href="${url}"  target="_blank">
                ${project.projectName}
              </a>
              </li>`;
      } else if (project.type === "innerSubCourse") {
        deepInnerContent += `
            <ol>
              <li>
                <${project.innerCourseProjectsHeadType}>
                  ${project.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                <div class="tooltip-output"></div>
                </${project.innerCourseProjectsHeadType}>
                <ol>
        `;
        project.innerCourseProjects.forEach((subCourse) => {
          if (subCourse.type === "none" || subCourse.type === undefined) {
            deepInnerContent += `
                  <li>
                    <a
                      href="${url}/${project.projectName}/${subCourse.projectName}/${subCourse.projectFileType}"
                      target="_blank"
                    >
                      ${subCourse.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${subCourse.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                      <div class="tooltip-output"></div>
                    </a>
                  </li>
          `;
          } else if (subCourse.type === "innerSubContent") {
            deepInnerContent += `<li><${project.innerCourseProjectsHeadType}>
              ${subCourse.projectName}   <button class="subElemContainngInfo tooltip-section" data-section-content="${subCourse.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                      <div class="tooltip-output"></div>
            </${project.innerCourseProjectsHeadType}><ol>`;
            subCourse.innerSubContentProjects.forEach((item, idx) => {
              deepInnerContent += `<li>`;
              deepInnerContent += `
                    <a
                      href="${url}/${project.projectName}/${subCourse.projectName}/${item.projectName}/${item.projectFileType}"
                      target="_blank"
                    >
                      ${item.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${item.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                      <div class="tooltip-output"></div>
                    </a>
              `;
              deepInnerContent += `</li>`;
            });
              deepInnerContent += `</ol></li>`;
          }
        });
        deepInnerContent += `
                  <ol>
                  </li>
                </ol>
        `;
      } else if (project.type === "innerSubContent") {
        deepInnerContent += `
        <li><ol>
        <${project.innerSubContentProjectsHeadType}>
          ${project.projectName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
          <div class="tooltip-output"></div>
        </${project.innerSubContentProjectsHeadType}>`;
        project.innerSubContentProjects.forEach((sub) => {
          deepInnerContent += `
                  <li>
                    <a
                      href="${url}/${project.projectName}/${sub.fileName}/${sub.fileType}"
                      target="_blank"
                    >
                      ${sub.fileName}  <button class="subElemContainngInfo tooltip-section" data-section-content="${project.projectInfo}" data-section-content-show-on-until-click="show">i</button>
                      <div class="tooltip-output"></div>
                    </a>
                  </li>
                `;
        });
        deepInnerContent += `</ol></li>`;
      }
    });

    return deepInnerContent;
  }

  function tooltipBuilder() {
    const tooltipSection = document.querySelectorAll(".tooltip-section");
    let currElem,
      currSubElem,
      currOutput,
      show = true;

    function mouseOnOrOf(e) {
      if (e.type === "mousemove" && show) {
        displayBOrN(this, e, "block");
      } else if (e.type === "mouseout" && show) {
        displayBOrN(this, e, "none");
      }
    }

    function displayBOrN(elem, e, type) {
      if (type === "block") {
        let holder = elem.getAttribute("data-section-content");
        currOutput.style.display = "block";
        currOutput.style.top = `${e.clientY + 5}px`;
        currOutput.style.left = `${e.clientX + 5}px`;
        currOutput.innerHTML = holder;
        return;
      }

      currOutput.style.display = "none";
    }

    for (let i = 0; i < tooltipSection.length; i++) {
      currElem = tooltipSection[i];
      currOutput = currElem.parentElement.querySelector(".tooltip-output");
      currElem.addEventListener("mousemove", mouseOnOrOf);
      tooltipSection[i].addEventListener("mouseout", mouseOnOrOf);
      tooltipSection[i].addEventListener(
        "click",
        function (e) {
          e.preventDefault();
          if (show) {
            displayBOrN(this, e, "block");
            show = false;
          } else {
            displayBOrN(this, e, "none");
            show = true;
          }
        },
        false
      );
    }
  }

  return {
    HTMLContent: sectionBuilding,
    tooltipBuilder,
    temp
  };
})();

let controller = (function (contentBuilder, UICtrl, calcsMaker) {
  let init = function () {
    let HTMLContent = contentBuilder.HTMLContent();
    document.body.innerHTML = HTMLContent + "\n" + document.body.innerHTML;
    contentBuilder.tooltipBuilder();

    let variablesString = UICtrl.variables;

    let spinningBackground1 = document.querySelectorAll(
      variablesString.spinningBackground1
    );

    let obj1 = calcsMaker.buildingColorsAndTimesObj(25, 50, -720, 720);
    let colors1 = obj1.colors;
    let range1 = obj1.range;

    UICtrl.spinningBackgroundForMulti(spinningBackground1, colors1, range1);
  };

  return {
    init: init,
    t: contentBuilder.temp
  };
})(ContentBuilder, UIController, calculationsMaker);

controller.init();
console.log(controller.t)
